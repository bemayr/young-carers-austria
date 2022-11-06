import { Express } from "express";
// import ogs from "open-graph-scraper";
import { PayloadHandler } from "payload/dist/config/types";

// export type OpenGraphData = {
//   title?: string;
//   type?: string;
//   siteName?: string;
//   description?: string;
//   imageUrl?: string;
//   imageAlt?: string;
//   favicon?: string;
// };

// export async function getOpenGraphData(
//   url: string,
//   timeoutTime: number = 20000
// ): Promise<OpenGraphData | undefined> {
//   try {
//     const { result } = await ogs({ url: url!, timeout: timeoutTime });
//     if (!result.success) return undefined;
//     else
//       return {
//         title: result.ogTitle,
//         type: result.ogType,
//         siteName: result.ogSiteName,
//         description: result.ogDescription,
//         imageUrl:
//           result.ogImageURL ??
//           result.ogImageSecureURL ??
//           (result.ogImage as { url: string } | undefined)?.url,
//         imageAlt:
//           (result.ogImage as { alt: string } | undefined)?.alt,
//         favicon: result.favicon,
//       };
//   } catch (error) {
//     return undefined;
//   }
// }


export const parseLink: PayloadHandler = async (req, res) => {
  const url = req.query.url?.toString();
  try {
    // const result = await getOpenGraphData(url!);
    // if (result === undefined) throw new Error();
    // res.json(result);
  } catch {
    res.status(422);
    res.end();
  }
}


export const opengraph = {
  parse: parseLink
}
