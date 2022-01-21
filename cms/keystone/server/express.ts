import { Express } from "express";
import {
  BaseKeystoneTypeInfo,
  CreateRequestContext,
  KeystoneContext,
} from "@keystone-6/core/types";
import fileApiContent from "../../data/migration/v1/brz-data.json";
import { deserializeMarkdown as deserializeMarkdownKeystone } from "../../keystone-fixes/document-field/markdown";

function deserializeMarkdown(markdown: string) {
  const slateContent = deserializeMarkdownKeystone(markdown);
  return slateContent[0].type === "paragraph"
    ? slateContent
    : // wrap content in paragraph, so that it adheres to the keystone slate spec ✅
      [{ type: "paragraph", children: slateContent }];
}

function parseTargetGroups(targetGroups: string[]) {
  if (targetGroups.length === 2) return "all";
  if (targetGroups.includes("Young Carers")) return "youngcarers";
  if (targetGroups.includes("Eltern / Interessierte")) return "parents";
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

const existingReferencesLookup: Record<string, {title: string, description: string}> = {
  "https://www.svs.at/cdscontent/?contentid=10007.816614&portal=svsportal": {
    title: "Wie kommts zum Angehörigengespräch?",
    description: "Keine Angst! Es ist kostenlos, vertraulich und kann je nach Wunsch entweder zu Hause, an einem anderen Ort oder telefonisch stattfinden. Termine werden per Telefon oder E-Mail vereinbart."
  },
  "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=667": {
    title: "Infos über das Angehörigengespräch",
    description: "Folder als Download"
  },
  "https://www.sozialministerium.at/Themen/Pflege/Betreuende-und-Pflegende-Angehoerige.html": {
    title: "Hilfe für betreuende und pflegende Angehörige",
    description: "Hier findest du eine kompakte Zusammenstellung der Unterstützungsangebote für betreuende und pflegende Angehörige des Sozialministeriums"
  },
  "https://www.superhands.at/fuer-dich/": {
    title: "Nicht gut drauf?",
    description: "Was du tun kannst, damit es DIR gut geht verraten dir die superhands."
  },
  "https://www.infoservice.sozialministerium.at/willkommen": {
    title: "Infoservice soziale Dienste",
    description: "Über Einrichtungen, Organisationen, Vereine und Selbsthilfegruppen kannst du dich beim Infoservice des Sozialministeriums erkundigen."
  },
  "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=307": {
    title: "Kinder und Jugendliche als pflegende Angehörige",
    description: "Die beiden Studien (2012, 2014) als Download"
  },
  "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=331": {
    title: "Unterstützungen für pflegende Angehörige",
    description: "Folder als Download"
  },
  "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=430": {
    title: "Who cares? YOUNG CARERS!",
    description: "Folder als Download"
  },
  "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=86": {
    title: "EIN:BLICK 5 - Pflege",
    description: "Broschüre als Download"
  },
  "https://www.1450.at/": {
    title: "Hotline 1450",
    description: "Wenn's weh tut - wähle die Gesundheitsnummer."
  },
  "https://www.youtube.com/watch?v=YMcu2a0Z0cQ": {
    title: "A Young Carer Song (Growing Up)",
    description: "Ein Song anlässlich der CARERS WEEK"
  },
  "https://www.gesundheit.steiermark.at/cms/ziel/142146817/DE/": {
    title: "Pflege Steiermark",
    description: "Das Land Steiermark bietet hier Informationen zu Pflegethemen."
  },
  "https://www.harmony4kids.at/": {
    title: "harmony4kids",
    description: "harmony4kids-Trainings geben Kindern Zeit, einfach nur Kind zu sein."
  },
  "https://www.superhands.at/pflege/taegliche-pflege/": {
    title: "Tägliche Pflege",
    description: "superhands bietet hier Hilfe und Anleitung für die tägliche Pflege."
  },
  "https://www.ig-pflege.at/service/pflegende_kinder_und_jugendliche.php": {
    title: "Angebote und Hilfe für Young Carers",
    description: "Die Interessengemeinschaft pflegender Angehöriger hat hier Infos und Angebote zum Thema."
  }
}

export function registerMigrateV1Data(
  app: Express,
  createContext: CreateRequestContext<BaseKeystoneTypeInfo>
) {
  // [todo]: change to post command
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
    await prune("Singleton");

    const webApiContent: YCApiContent = await fetch(
      "https://portal.lfrz.at/at.gv.lfrz.youngcarers-p/api/content/sync"
    ).then((response) => response.json());
    const apiContent: YCApiContent = webApiContent as YCApiContent;
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
        information: deserializeMarkdown(value),
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
      .filter(({ type }) => type !== "TEXT") // [TODO]: talk about handling this and rewrite this line
      .reduce((references, ref) => {
        // group by url
        references[ref.value] = references[ref.value] ?? [];
        references[ref.value].push(ref);
        return references;
      }, {} as Record<string, Entry[]>);
    const transformedReferences = Object.entries(existingReferences).map(
      ([url, ref]) => {
        const entry = ref[0];

        if(ref.length > 1 && existingReferencesLookup[url] === undefined)
          throw new Error(`${url} has ${ref.length} entries and has no lookup entry`) // [todo]: improve this error message

        const title = ref.length === 1
          ? entry.value
          : existingReferencesLookup[url].title;
        
          const description = ref.length === 1
          ? entry.abstractText
          : existingReferencesLookup[url].description;
        
        const types = new Set(ref.map(e => e.type))
        if(types.size > 1) throw new Error("multiple types")
        const type = [...types][0].toLowerCase();

        const target = parseTargetGroups([...new Set(ref.flatMap(e => e.targetGroups))]);

        const categoryIds = ref.map(e => ({id: categoryLookup[e.category]}))

        const owners = new Set(ref.map(e => e.owner))
        if(owners.size > 1) console.error(`multiple owners for "${title}": ${[...owners].map(o => `"${o}"`).join(", ")}`)
        const ownerId = ownerLookup[[...owners][0]];

        const lastUpdated = new Date(entry.modifiedAt).toISOString();

        const keywordIds = ref
          .flatMap(e => e.keywords)
          .map(keyword => ({id: keywordLookup[keyword]}))

        return ({
          url: url,
          title: title,
          description: description,
          type: type,
          target: target,
          categories: { connect: categoryIds },
          owner: { connect: { id: ownerId } },
          lastUpdated: lastUpdated,
          keywords: { connect: keywordIds},
        });
      }
    );
    const insertedReferences = await context.query.Reference.createMany({
      data: transformedReferences,
      query: "id url",
    });

    async function addSingletonEntry(
      name: string,
      title: string,
      ...parts: string[]
    ) {
      const markdownContent = parts.join("");
      const slateContent = deserializeMarkdown(markdownContent);
      await context.query.Singleton.createOne({
        data: {
          name: name,
          title: title,
          content: slateContent,
        },
      });
    }

    await addSingletonEntry(
      "start",
      "Willkommensnachricht",
      entries.about.start1,
      entries.about.start2
    );
    await addSingletonEntry("imprint", "Impressum", entries.about.imprint);
    await addSingletonEntry("copyright", "Copyright", entries.about.copyright);
    await addSingletonEntry(
      "accessibility",
      "Datenschutzerklärung",
      entries.about.gdpr1,
      entries.about.gdpr2
    );
    await addSingletonEntry(
      "gdpr",
      "Barrierefreiheitserklärung",
      entries.about.accessibility1,
      entries.about.accessibility2,
      entries.about.accessibility3
    );
    const insertedSingletons = await context.query.Singleton.findMany({
      query: "id name",
    });

    // [TODO]: add favorites

    res.json({
      keywords: insertedKeywords.length,
      categories: insertedCategories.length,
      owners: insertedOwners.length,
      references: insertedReferences.length,
      metadata: insertedSingletons.length,
    });
  });
}
