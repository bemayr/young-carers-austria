import { Express } from "express";
import {
  BaseKeystoneTypeInfo,
  CreateRequestContext,
  KeystoneContext,
} from "@keystone-6/core/types";
import fileApiContent from "../../data/migration/v1/brz-data.json";

export type Entry = {
  id: string;
  type: "TEXT" | "WEBSITE" | "VIDEO" | "SONG" | "PODCAST" | "BOOKLET";
  title: string;
  abstractText: string;
  category: string;
  subCategory: string;
  targetGroups: string[];
  owner: string;
  keywords: string[];
  value: string;
  favorite: boolean;
  createAt: string;
  modifiedAt: string;
};

type YCApiContent = {
  entries: Entry[];
  timestamp: string;
  deleted: any[];
};

export function registerMigrateV1Data(
  app: Express,
  createContext: CreateRequestContext<BaseKeystoneTypeInfo>
) {
  app.get("/data/migrate/v1", async (req, res) => {
    const context: KeystoneContext = await createContext(req, res);

    async function prune(list: string) {
      await context.query[list]
        .findMany({ query: "id" })
        .then((ids) => context.query[list].deleteMany({ where: ids }));
    }

    await prune("Keyword");
    await prune("Category");
    await prune("Owner");
    await prune("Reference");

    // const webApiContent: YCApiContent = await fetch(
    //   "https://portal.lfrz.at/at.gv.lfrz.youngcarers-p/api/content/sync"
    // ).then((response) => response.json());
    const apiContent: YCApiContent = fileApiContent as YCApiContent;
    const entries = {
      all: apiContent.entries,
      ...partitionEntries(apiContent.entries),
    };

    // === KEYWORDS ===
    const existingKeywords = [
      ...new Set(entries.all.flatMap((entry) => entry.keywords)),
    ];
    const transformedKeywords = existingKeywords.map((keyword) => ({
      name: keyword,
    }));
    const insertedKeywords = await context.query.Keyword.createMany({
      data: transformedKeywords,
      query: "id name",
    });
    const keywordLookup = Object.fromEntries(
      insertedKeywords.map(({ id, name }) => [name, id])
    );

    // === CATEGORIES ===
    const existingCategories = entries.information.filter(isCategoryEntry);
    // title = title, category = name, targetGroups, value = information, keywords, (favorite, modifiedAt)
    const transformedCategories = existingCategories.map(
      ({ category, title, value, modifiedAt, keywords }) => ({
        name: category,
        title: title,
        information: [{ type: "paragraph", children: [{ text: value }] }], // [TODO]: deserialize markdown
        lastUpdated: new Date(modifiedAt).toISOString(),
        keywords: {
          connect: keywords.map((keyword) => ({
            id: keywordLookup[keyword],
          })),
        },
      })
    );
    const insertedCategories = await context.query.Category.createMany({
      data: transformedCategories,
      query: "id name",
    });
    const categoryLookup = Object.fromEntries(
      insertedCategories.map(({ id, name }) => [name, id])
    );

    // === OWNERS ===
    const existingOwners = [
      ...new Set(
        entries.information
          .filter((entry) => !isCategoryEntry(entry))
          .map((entry) => entry.owner)
      ),
    ];
    const transformedOwners = existingOwners.map((keyword) => ({
      name: keyword,
    }));
    const insertedOwners = await context.query.Owner.createMany({
      data: transformedOwners,
      query: "id name",
    });
    const ownerLookup = Object.fromEntries(
      insertedOwners.map(({ id, name }) => [name, id])
    );

    // === REFERENCES ===
    const existingReferences = entries.information
      .filter((entry) => !isCategoryEntry(entry))
      .filter(({ type }) => type !== "TEXT"); // [TODO]: talk about handling this and rewrite this line
    // (favorite, modifiedAt)
    const transformedReferences = existingReferences.map(
      ({
        value,
        title,
        abstractText,
        type,
        targetGroups,
        category,
        owner,
        modifiedAt,
        keywords,
      }) => ({
        url: value,
        title: title,
        description: abstractText, // [TODO]: deserialize markdown
        type: type.toLowerCase(),
        target: "all", // [TODO]: parse and map value
        categories: { connect: [{ id: categoryLookup[category] }] },
        owner: { connect: { id: ownerLookup[owner] } },
        lastUpdated: new Date(modifiedAt).toISOString(),
        keywords: {
          connect: keywords.map((keyword) => ({
            id: keywordLookup[keyword],
          })),
        },
      })
    );
    const insertedReferences = await context.query.Reference.createMany({
      data: transformedReferences,
      query: "id url",
    });

    const byLinks = existingReferences.reduce((byLinks, ref) => {
      const url = ref.value;
      byLinks[url] = byLinks[url] ?? [];
      byLinks[url].push(ref);
      return byLinks;
    }, {} as any);

    const duplicateReferences = Object.entries(byLinks)
      .filter(([_, refs]) => refs.length > 1)
      .map(
        ([url, refs]) =>
          `${url}\n${refs
            .map(({ title, category, abstractText }) => `- [${category}]: ${title} (${abstractText})`)
            .join("\n")}`
      );

    console.log(duplicateReferences.join("\n\n"));

    res.json({
      keywords: insertedKeywords.length,
      categories: insertedCategories.length,
      owners: insertedOwners.length,
      references: insertedReferences.length,
      duplicateReferences: duplicateReferences,
    });
  });
}

const aboutEntriesIds = {
  "a9a06cd4-f61f-4738-8121-693d613128db": "imprint",
  "27f77b43-85bc-497a-bf25-07c79adbaaa4": "accessibility1",
  "df6e5333-3f3a-468e-987f-9be160678d02": "accessibility2",
  "e7aa3e5e-5443-47c0-9059-da793339e854": "accessibility3",
  "899d51d3-0fa5-44fe-9a89-a04d105c3d1d": "gdpr1",
  "d82c36dd-e28d-483b-bd06-0d25e0c69f13": "gdpr2",
  "5a361d37-ea3d-42eb-b17f-9ce543b3dbe9": "copyright",
  "35ff36a2-8645-4ebf-b1f8-98c8b21ddb2e": "start1",
  "0c647c26-5202-4177-8dc7-58e364a248d3": "start2",
};
type InformationEntries = Entry[];
type AboutEntries = {
  [P in typeof aboutEntriesIds[keyof typeof aboutEntriesIds]]: string;
};
type Entries = {
  information: InformationEntries;
  about: AboutEntries;
};

export function isCategoryEntry(entry: Entry) {
  return entry.type === "TEXT" && entry.abstractText === "";
}

function partitionEntries(allEntries: Entry[]): Entries {
  let informationEntries: InformationEntries = [];
  let aboutEntries: AboutEntries = {
    imprint: "in Bearbeitung",
    accessibility1: "in Bearbeitung",
    accessibility2: "",
    accessibility3: "",
    gdpr1: "in Bearbeitung",
    gdpr2: "",
    copyright: "in Bearbeitung",
    start1: "in Bearbeitung",
    start2: "",
  };
  for (const entry of allEntries) {
    if (Object.keys(aboutEntriesIds).includes(entry.id))
      aboutEntries[aboutEntriesIds[entry.id as keyof typeof aboutEntriesIds]] =
        entry.value;
    else informationEntries.push(entry);
  }
  return {
    information: informationEntries,
    about: aboutEntries,
  };
}
