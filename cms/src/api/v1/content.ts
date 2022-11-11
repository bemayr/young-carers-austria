import { Payload } from "payload";
import { transformExtendedRichText, ExtendedRichText } from "../richtext";
import {
  Alltagssituation,
  FAQ,
  Hilfe,
  ImNotfall,
  Infos,
  Kategorie,
  Quelle,
  Referenz,
} from "../../payload-types";
import { slateToMarkdown, markdownify } from "../markdown";

const faq = {
  transform: function (entry: FAQ["entries"][number]) {
    return {
      question: entry.question,
      answer: slateToMarkdown(entry.answer),
      showOnLandingPage: entry.showOnLandingPage,
    };
  },
  get: async (payload: Payload) =>
    await payload
      .findGlobal<FAQ>({ slug: "faq" })
      .then((result) => result.entries.map(faq.transform)),
};

const emergency = {
  transform: function (entry: ImNotfall) {
    return {
      title: entry.title,
      description: slateToMarkdown(entry.description)?.trim(),
      numbers: {
        entries: entry.numbers.map(({ label, number }) => ({ label, number })),
        infoText: "Mehr Info zu den Notrufnummern findest du auf www.oesterreich.gv.at.",
        infoUrl: "https://www.oesterreich.gv.at/themen/gesundheit_und_notfaelle/notrufnummern.html"
      },
      content: transformExtendedRichText(entry.content as ExtendedRichText[]),
    };
  },
  get: async (payload: Payload) =>
    await payload
      .findGlobal<ImNotfall>({ slug: "emergency" })
      .then((entry) => emergency.transform(entry)),
};

const help = {
  transform: function (entry: Hilfe) {
    return {
      title: entry.title,
      description: markdownify(entry.description),
    };
  },
  get: async (payload: Payload) =>
    await payload.findGlobal<Hilfe>({ slug: "help" }).then(help.transform),
};

const infos = {
  transform: function (entry: Infos) {
    return {
      title: entry.title,
      description: markdownify(entry.description),
    };
  },
  get: async (payload: Payload) =>
    await payload.findGlobal<Infos>({ slug: "infos" }).then(infos.transform),
};

const situations = {
  transform: function (
    entry: Alltagssituation  ) {
    return {
      question: entry.name,
      content: transformExtendedRichText(
        entry.content as ExtendedRichText[]),
    };
  },
  get: async (payload: Payload) =>
    await payload
      .find<Alltagssituation>({
        collection: "situations",
        depth: 1,
        limit: 1000,
        sort: "-createdAt",
        where: {
          _status: {
            equals: "published",
          },
        },
      })
      .then((result) => result.docs)
      .then((entries) =>
        entries.map(situations.transform)
      ),
};

const categories = {
  transform: function (entry: Kategorie) {
    return {
      id: entry.id,
      name: entry.name,
      title: entry.heading,
      information: markdownify(entry.description),
      entries: [],
    };
  },
  get: async (payload: Payload) =>
    await payload
      .find<Kategorie>({
        collection: "categories",
        depth: 1,
        limit: 1000,
        sort: "-createdAt",
        where: {
          _status: {
            equals: "published",
          },
        },
      })
      .then((result) => result.docs)
      .then((entries) => entries.map(categories.transform)),
};

const sources = {
  transform: function (entry: Quelle) {
    return {
      id: entry.id,
      ownerName: entry.name,
      ownerUrl: entry.homepage ?? "",
    };
  },
  get: async (payload: Payload) =>
    await payload
      .find<Quelle>({
        collection: "sources",
        depth: 0,
        limit: 1000,
      })
      .then((result) => result.docs)
      .then((entries) => entries.map(sources.transform)),
};

const references = {
  transform: function (entry: Referenz) {
    return {
      id: entry.id,
      url: entry.address,
      title: entry.title,
      description: entry.description,
      previewImageUrl: entry.image,
      containsPaidContent: entry.containsPaidContent,
      keywords: entry.keywords?.split(",").map((keyword) => keyword.trim()),
    };
  },
  get: async (payload: Payload) =>
    await payload
      .find<Referenz>({
        collection: "references",
        depth: 1,
        limit: 2000,
        where: {
          _status: {
            equals: "published",
          },
        },
      })
      .then((result) => result.docs)
      .then((entries) => entries.map(references.transform)),
};

export const getContent = async (payload: Payload) => ({
  faqs: await faq.get(payload),
  emergency: await emergency.get(payload),
  help: await help.get(payload),
  infos: await infos.get(payload),
  insights: await situations.get(payload),
  categories: await categories.get(payload),
  references: await references.get(payload)
});
