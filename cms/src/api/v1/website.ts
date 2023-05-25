import { Payload } from "payload";
import { markdownify } from "../markdown";
import { WebsiteLanding } from "payload/generated-types";

const a11y = {
  get: async (payload: Payload) =>
    await payload
      .findGlobal({ slug: "website-accessibility" })
      .then((result) => markdownify(result.content)),
};

const copyright = {
  get: async (payload: Payload) =>
    await payload
      .findGlobal({ slug: "website-copyright" })
      .then((result) => markdownify(result.content)),
};

const gdpr = {
  get: async (payload: Payload) =>
    await payload
      .findGlobal({ slug: "website-gdpr" })
      .then((result) => markdownify(result.content)),
};

const imprint = {
  get: async (payload: Payload) =>
    await payload
      .findGlobal({ slug: "website-imprint" })
      .then((result) => markdownify(result.content)),
};

const landingpage = {
  transform: function (entry: WebsiteLanding) {
    return {
      cards: entry.cards,
      quotes: entry["app-quotes"].map((quote) => quote.text),
      about: markdownify(entry.about),
    };
  },
  get: async (payload: Payload) =>
    await payload
      .findGlobal({ slug: "website-landing" })
      .then(landingpage.transform),
};

export const getWebsiteData = async (payload: Payload) => ({
  a11y: await a11y.get(payload),
  copyright: await copyright.get(payload),
  gdpr: await gdpr.get(payload),
  imprint: await imprint.get(payload),
  landingpage: await landingpage.get(payload),
});
