import { Express } from "express";
import {
  BaseKeystoneTypeInfo,
  CreateRequestContext,
  KeystoneContext,
} from "@keystone-6/core/types";
import { gql } from "@keystone-6/core";

import fileApiContent from "../../data/migration/v1/brz-data.29-01-2022.json";
import { aboutEntriesIds } from "./migration";

function serializeTarget(targetGroup: string): string[] {
  if (targetGroup === "all") return ["Young Carers", "Eltern / Interessierte"];
  if (targetGroup === "youngcarers") return ["Young Carers"];
  if (targetGroup === "parents") return ["Eltern / Interessierte"];
  return ["Young Carers", "Eltern / Interessierte"];
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
export function registerAPIv1(
  app: Express,
  createContext: CreateRequestContext<BaseKeystoneTypeInfo>
) {
  app.get("/api/v1/entries", async (req, res) => {
    const context: KeystoneContext = await createContext(req, res);

    const references: Entry[] = (
      (
        await context.graphql.run({
          query: gql`
            query {
              references {
                id
                url
                title
                type
                description
                target
                owner {
                  name
                }
                categories {
                  name
                }
                keywords {
                  name
                }
                lastUpdated
              }
            }
          `,
        })
      ).references as any[]
    )
      .reduce(
        (flattened, reference) => [
          ...flattened,
          ...reference.categories.map((category: { name: string }) => ({
            ...reference,
            category: category.name,
          })),
        ],
        []
      )
      .map((reference: any) => ({
        id: reference.id,
        type: reference.type.toUpperCase(),
        title: reference.title,
        abstractText: reference.description,
        category: reference.category,
        subCategory: "Onlineinformation", // TODO: fix this if used
        targetGroups: serializeTarget(reference.target),
        owner: reference.owner.name,
        keywords: reference.keywords.map(
          (keyword: { name: string }) => keyword.name
        ),
        value: reference.url,
        favorite: false, // TODO: fix this
        createAt: reference.lastUpdated,
        modifiedAt: reference.lastUpdated,
      }));

    const categories: Entry[] = (
      (
        await context.graphql.run({
          query: gql`
            query {
              categories {
                id
                name
                title
                renderedInformation
                keywords {
                  name
                }
                lastUpdated
              }
            }
          `,
        })
      ).categories as any[]
    ).map((category: any) => ({
      id: category.id,
      type: "TEXT",
      title: category.title,
      abstractText: "", // TODO: check this
      category: category.name,
      subCategory: "Offlineinformation", // TODO: fix this if used
      targetGroups: serializeTarget("all"),
      owner: "Sozialministerium",
      keywords: category.keywords.map(
        (keyword: { name: string }) => keyword.name
      ),
      value: category.renderedInformation, // TODO: correctly render the information to markdown
      favorite: false,
      createAt: category.lastUpdated,
      modifiedAt: category.lastUpdated,
    }));

    // TODO: add Singletons
    const singletons = fileApiContent.entries.filter(({ id }) =>
      Object.keys(aboutEntriesIds).includes(id)
    ) as Entry[];

    // modifications
    const imNotfall = categories.find(({category}) => category === "Notfall(nummern)")!
    imNotfall.id = "50c64cf8-6acd-4e75-8fb9-cfae6470be78"
    const notrufnummern = references.find(({value}) => value === "https://www.gesundheit.gv.at/service/notruf/inhalt")!
    notrufnummern.id = "6cea795c-ef69-4047-ad28-ad3dd1670db6"
    const notruf = references.find(({value}) => value === "https://www.gesundheit.gv.at/krankheiten/erste-hilfe/notdienst/notruf")!
    notruf.id = "d9f325de-c086-497e-9765-8f78ce2a01d7"
    const ersteHilfe = references.find(({value}) => value === "https://www.gesundheit.gv.at/krankheiten/erste-hilfe/notdienst/inhalt")!
    ersteHilfe.id = "b166d4b3-c6ab-47bb-8845-a733b810e772"
    const massnahmen = references.find(({value}) => value === "https://www.gesundheit.gv.at/krankheiten/erste-hilfe/notdienst/massnahmen")!
    massnahmen.id = "660c508f-9f65-4353-8691-4528ab9cd04c"
    const kindernotruf = references.find(({value}) => value === "http://www.austria4kids.at/notruf-hilfe-kinder.html")!
    kindernotruf.id = "53baf566-409f-4ba8-a4d0-46797bc93978"

    const result: YCApiContent = {
      entries: [...categories, ...references, ...singletons],
      timestamp: new Date().toUTCString(),
      deleted: [],
    };

    res.json(result);
  });
}
