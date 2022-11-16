import { Payload } from "payload";
import {
  Barrierefreiheitserklarung1,
  Copyright1,
  Datenschutzerklarung1,
  Impressum1,
  LandingPage,
} from "../../payload-types";
import { markdownify } from "../markdown";

const a11y = {
    get: async (payload: Payload) =>
      await payload
        .findGlobal<Barrierefreiheitserklarung1>({ slug: "website-accessibility" })
        .then((result) => markdownify(result.content)),
  }

const copyright = {
    get: async (payload: Payload) =>
      await payload
        .findGlobal<Copyright1>({ slug: "website-copyright" })
        .then((result) => markdownify(result.content)),
  }

const gdpr = {
    get: async (payload: Payload) =>
      await payload
        .findGlobal<Datenschutzerklarung1>({ slug: "website-gdpr" })
        .then((result) => markdownify(result.content)),
  }

  const imprint = {
    get: async (payload: Payload) =>
      await payload
        .findGlobal<Impressum1>({ slug: "website-imprint" })
        .then((result) => markdownify(result.content)),
  }

const landingpage = {
    transform: function (entry: LandingPage) {
      return {
        cards: entry.cards,
        quotes: entry["app-quotes"].map(quote => quote.text),
        about: markdownify(entry.about),
      };
    },
    get: async (payload: Payload) =>
      await payload
        .findGlobal<LandingPage>({ slug: "website-landing" })
        .then(landingpage.transform),
  }

export const getWebsiteData = async (payload: Payload) => ({
  a11y: await a11y.get(payload),
  copyright: await copyright.get(payload),
  gdpr: await gdpr.get(payload),
  imprint: await imprint.get(payload),
  landingpage: await landingpage.get(payload)
});
