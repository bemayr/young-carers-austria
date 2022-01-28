import { Express } from "express";
import ogs from "open-graph-scraper";

export function registerOpenGraphService(
  app: Express,
) {
  app.get("/opengraph", async (req, res) => {
    const url = req.query.url?.toString();
    try {
      const { error, result } = await ogs({ url: url! });
      if (error) throw new Error("Invalid URL");
      res.json(result);
    } catch {
      res.status(422);
      res.end();
    }
  });
}
