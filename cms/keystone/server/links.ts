import {
  BaseKeystoneTypeInfo,
  CreateRequestContext,
  KeystoneContext,
} from "@keystone-6/core/types";
import { Express } from "express";
import { get as getHttp } from "http";
import { get as getHttps } from "https";

export type OnlineStatus = Online | Offline | Moved | Timeout | Error;

type Url = { url: string };
export type Online = Url & { status: "online" };
export type Offline = Url & {
  status: "offline";
  statusCode: number | undefined;
};
export type Moved = Url & {
  status: "moved";
  statusCode: number | undefined;
  location: string | undefined;
};
export type Timeout = Url & { status: "timeout" };
export type Error = Url & { status: "error"; error: unknown };

// TODO: find a better place for this
export function createValidUrl(passedUrl: string, passedBaseUrl: string) {
  try {
    const baseUrl = new URL(passedBaseUrl);
    return passedUrl.startsWith("/")
      ? `${baseUrl.protocol}//${baseUrl.host}${passedUrl}`
      : passedUrl;
  } catch (error) {
    return undefined;
  }
}
// TODO: find a better place for this
export const getOnlineStatus = (
  url: string,
  timeoutTime: number = 20000
): Promise<OnlineStatus> => {
  const get = url.startsWith("https") ? getHttps : getHttp;
  return new Promise((resolve) => {
    try {
      const realUrl = new URL(url);
      let options = {
        hostname: realUrl.hostname,
        path: realUrl.pathname,
        headers: { "User-Agent": "Mozilla/5.0" },
      };

      // handle youtube links differently: https://gist.github.com/tonY1883/a3b85925081688de569b779b4657439b
      if (realUrl.hostname.endsWith("youtube.com")) {
        const youtubeImgUrl = new URL(
          "http://img.youtube.com/vi/" +
            realUrl.searchParams.get("v") +
            "/mqdefault.jpg"
        );
        options = {
          ...options,
          hostname: youtubeImgUrl.hostname,
          path: youtubeImgUrl.pathname,
        };
      }

      const request = get(options, (response) => {
        const {
          statusCode,
          headers: { location },
        } = response;

        clearTimeout(timeout);

        if (statusCode && statusCode >= 200 && statusCode <= 299) {
          resolve({ status: "online", url });
        } else if (statusCode && statusCode >= 300 && statusCode <= 399) {
          resolve({
            status: "moved",
            url,
            statusCode,
            location: location ? createValidUrl(location, url) : undefined,
          });
        } else {
          resolve({ status: "offline", url, statusCode });
        }
      }).on("error", (error) => resolve({ status: "error", url, error }));
      const timeout = setTimeout(() => {
        resolve({ status: "timeout", url });
        request.destroy();
      }, timeoutTime);
    } catch (error) {
      resolve({ status: "error", url, error });
    }
  });
};

const scanAllReferences = async (
  context: KeystoneContext<BaseKeystoneTypeInfo>
) => {
  const references = await context.query.Reference.findMany({
    query: "id url title description",
  });

  console.log(`Checking URLs... ❓`);

  const resultTemp = await Promise.all(
    references.map(async (ref) => ({
      title: ref.title,
      onlineStatus: await getOnlineStatus(ref.url),
    }))
  );

  resultTemp
    .filter(({ onlineStatus: { status } }) => status !== "online")
    .forEach(({ title, onlineStatus }) => {
      switch (onlineStatus.status) {
        case "offline":
          console.log(
            `⛔ ${title} [${onlineStatus.statusCode}] (${onlineStatus.url})`
          );
          break;
        case "moved":
          const isSame = onlineStatus.url === onlineStatus.location;
          console.log(
            `➡ ${title} [${onlineStatus.statusCode}] ${isSame ? "🤣" : ""} (${
              onlineStatus.url
            }) MOVED TO ${onlineStatus.location}`
          );
          break;
        case "timeout":
          console.log(`⏰ ${title} (${onlineStatus.url})`);
          break;
        case "error":
          console.log(`⁉ ${title} (${onlineStatus.url}) ${onlineStatus.error}`);
          break;
      }
    });

  const data = await Promise.all(
    references.map(async (ref) => {
      let status = await getOnlineStatus(ref.url);

      return {
        where: { id: ref.id },
        data: {
          address: {
            url: ref.url,
            onlineStatus: JSON.stringify(status),
            title: ref.title,
            description: ref.description,
          },
        },
      };
    })
  );

  const result = await context.query.Reference.updateMany({
    data: data,
    query: `
      url
      title
      description
      address {
        url
        title
        description
        onlineStatus {
          ... on UrlOnline {
            status
          }
          ... on UrlOffline {
            status
            statusCode
          }
          ... on UrlMoved {
            status
            statusCode
            location
          }
          ... on UrlTimeout {
            status
          }
          ... on UrlError {
            status
            error
          }
        }
      }`,
  });

  console.log(`All URLs checked... 🏁`);

  return result;
};

export function registerDeadLinkDetection(
  app: Express,
  createContext: CreateRequestContext<BaseKeystoneTypeInfo>
) {
  app.post("/links/validate", async (req, res) => {
    const scanResult = await scanAllReferences(await createContext(req, res));
    res.json(scanResult);
  });

  app.get("/link/validate", async (req, res) => {
    const url = req.query.url?.toString();
    try {
      const status = await getOnlineStatus(url!);
      res.json(status);
    } catch {
      res.status(422);
      res.end();
    }
  });
}
