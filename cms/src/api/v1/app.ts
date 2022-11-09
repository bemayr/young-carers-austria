import { Payload } from "payload";
import {
  Barrierefreiheitserklarung,
  Copyright,
  Datenschutzerklarung,
  Impressum,
  Willkommensnachricht,
} from "../../payload-types";
import { markdownify } from "../markdown";

const a11y = {
    get: async (payload: Payload) =>
      await payload
        .findGlobal<Barrierefreiheitserklarung>({ slug: "app-accessibility" })
        .then((result) => markdownify(result.content)),
  }

const copyright = {
    get: async (payload: Payload) =>
      await payload
        .findGlobal<Copyright>({ slug: "app-copyright" })
        .then((result) => markdownify(result.content)),
  }

const gdpr = {
    get: async (payload: Payload) =>
      await payload
        .findGlobal<Datenschutzerklarung>({ slug: "app-gdpr" })
        .then((result) => markdownify(result.content)),
  }

  const imprint = {
    get: async (payload: Payload) =>
      await payload
        .findGlobal<Impressum>({ slug: "app-imprint" })
        .then((result) => markdownify(result.content)),
  }

  const welcome = {
    transform: function (entry: Willkommensnachricht) {
      return {
        hello: markdownify(entry.hello),
        info: markdownify(entry.info),
        feedback: markdownify(entry.feedback),
      };
    },
    get: async (payload: Payload) =>
      await payload
        .findGlobal<Willkommensnachricht>({ slug: "app-welcome" })
        .then(welcome.transform),
  }

export const getAppData = async (payload: Payload) => ({
  a11y: await a11y.get(payload),
  copyright: await copyright.get(payload),
  gdpr: await gdpr.get(payload),
  imprint: await imprint.get(payload),
  welcome: await welcome.get(payload)
});
