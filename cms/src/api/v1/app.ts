import { Payload } from "payload";
import { markdownify } from "../markdown";
import { AppWelcome } from "payload/generated-types";

const a11y = {
  get: async (payload: Payload) =>
    await payload
      .findGlobal({ slug: "app-accessibility" })
      .then((result) => markdownify(result.content)),
};

const copyright = {
  get: async (payload: Payload) =>
    await payload
      .findGlobal({ slug: "app-copyright" })
      .then((result) => markdownify(result.content)),
};

const gdpr = {
  get: async (payload: Payload) =>
    await payload
      .findGlobal({ slug: "app-gdpr" })
      .then((result) => markdownify(result.content)),
};

const imprint = {
  get: async (payload: Payload) =>
    await payload
      .findGlobal({ slug: "app-imprint" })
      .then((result) => markdownify(result.content)),
};

const welcome = {
  transform: function (entry: AppWelcome) {
    return {
      hello: markdownify(entry.hello),
      info: markdownify(entry.info),
      feedback: markdownify(entry.feedback),
    };
  },
  get: async (payload: Payload) =>
    await payload.findGlobal({ slug: "app-welcome" }).then(welcome.transform),
};

export const getAppData = async (payload: Payload) => ({
  a11y: await a11y.get(payload),
  copyright: await copyright.get(payload),
  gdpr: await gdpr.get(payload),
  imprint: await imprint.get(payload),
  welcome: await welcome.get(payload),
});
