import {
  BaseKeystoneTypeInfo,
  CreateRequestContext,
  KeystoneContext,
} from "@keystone-6/core/types";
import { Express } from "express";
import { get as getHttp } from "http";
import { get as getHttps } from "https";

const isReachable = (urlString: string): Promise<boolean> => {
  const get = urlString.startsWith("https") ? getHttps : getHttp;
  const url = new URL(urlString);
  return new Promise((resolve, reject) => {
    const request = get(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        timeout: 10000,
      },
      (res) => {
        res.on("error", (_) => resolve(false));
        res.on("timeout", (_) => resolve(false));
        res.on("end", () => {
          if (
            res.statusCode &&
            res.statusCode >= 200 &&
            res.statusCode <= 299
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    );
    setTimeout(() => request.destroy(), 10000)
  });
};

export function registerDeadLinkDetection(
  app: Express,
  createContext: CreateRequestContext<BaseKeystoneTypeInfo>
) {
  // [todo]: change to post command
  app.get("/links/validate", async (req, res) => {
    const context: KeystoneContext = await createContext(req, res);

    const references = await context.query.Reference.findMany({
      query: "id url title",
    });

    let i = 0;

    console.log(`Checking URLs... ❓`);

    const result = await Promise.all(
      references.map(async (ref) => {
        try {
          console.log(`checking: ${ref.url}`);
          i++;
          const isOnline = await isReachable(ref.url);
          i--;
          console.log(`${i} SUCCESS: ${ref.url}`);
          return { ...ref, isOnline: isOnline ? "✅" : "⛔" };
        } catch (error) {
          console.log(`${i} ERROR: ${ref.url}`);
          i--;
          return { ...ref, isOnline: `ERROR: ${error}` };
        }
      })
    );

    console.log(`All URLs checked... 🏁`);

    res.json({
      result,
    });
  });
}

















/*
import {
  BaseKeystoneTypeInfo,
  CreateRequestContext,
  KeystoneContext,
} from "@keystone-6/core/types";
import { Express } from "express";
import { get as getHttp } from "http";
import { get as getHttps } from "https";

const isReachable = (url: string, timeout: number = 20000): Promise<boolean> => {
  const get = url.startsWith("https") ? getHttps : getHttp;
  return new Promise((resolve) => {
    const request = get(url, 
      (response) => {
        response.on("error", (_) => {
            console.log("error")
            return resolve(false);
        });
        response.on("end", () => {
            console.log("end")
            if (
            response.statusCode &&
            response.statusCode >= 200 &&
            response.statusCode <= 299
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    );
    // setTimeout(() => request.destroy(), timeout)
  });
};

export function registerDeadLinkDetection(
  app: Express,
  createContext: CreateRequestContext<BaseKeystoneTypeInfo>
) {
  // [todo]: change to post command
  app.get("/links/validate", async (req, res) => {
    const context: KeystoneContext = await createContext(req, res);

    const references = (
      await context.query.Reference.findMany({
        query: "id url title",
      })
    ).slice(5, 15);

    let result: string[] = [];

    console.log("Detecting dead links... 🔗💀")

    for (const ref of references) {
      try {
        console.log(`checking: ${ref.url}`);
        const isOnline = await isReachable(ref.url);
        console.log(`SUCCESS: ${ref.url} ${isOnline ? "✅" : "⛔"}`);
        result.push(`${isOnline ? "✅" : "⛔"} ${ref.url}`);
      } catch (error) {
        console.log(`ERROR: ${ref.url}`);
        result.push(`⛔ ${ref.url}`);
      }
    }

    console.log("Dead link detection finished... 🔗🏁")


    res.json({
      result,
    });
  });
}
*/
