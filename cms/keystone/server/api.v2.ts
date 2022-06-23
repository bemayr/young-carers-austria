import { Express } from "express";
import {
  BaseKeystoneTypeInfo,
  CreateRequestContext,
  KeystoneContext,
} from "@keystone-6/core/types";
import { gql } from "@keystone-6/core";

const category = {
  transform: (category: any) => ({
    name: category.name,
    title: category.title,
    information: category.renderedInformation,
    entries: Object.values(
      category.references.reduce((owners: any, reference: any) => {
        owners[reference.owner.id] = owners[reference.owner.id] ?? {
          ownerName: reference.owner.name,
          ownerUrl: reference.owner.url,
          references: [],
        };
        owners[reference.owner.id].references.push({
          url: reference.url,
          title: reference.title,
          description: reference.description,
          isPaidContent: reference.isPaidContent,
          lastUpdated: reference.lastUpdated,
          keywords: reference.keywords
            .map((keyword: any) => keyword.name)
            .sort(),
        });
        return owners;
      }, {})
    ).sort((a: any, b: any) => a.ownerName.localeCompare(b.ownerName)),
  }),
};

export function registerAPIv2(
  app: Express,
  createContext: CreateRequestContext<BaseKeystoneTypeInfo>
) {
  app.get("/api/v2", async (req, res) => {
    const context: KeystoneContext = await createContext(req, res);

    const insights = [{
      question: "Wie sieht ein typischer Tag eines Young Carers aus?",
      content: [
        {
          type: "text",
          text: "Das ist ein bisschen ein **Markdown**-Text, der sporadische Formatierungen zulässt.\n\nDie nächste Zeile stellt einen Verweis auf eine Referenz dar:"
        },
        {
          type: "reference",
          reference: {
            "url": "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=175",
            "title": "24-Stunden-Betreuung",
            "description": "Broschüre \"24-Stunden-Betreuung zu Hause\" als Download",
            "isPaidContent": false,
            "lastUpdated": "2022-04-12T08:43:35.740Z",
            "keywords": [
              "Sozialministerium"
            ]
          }
        },
        {
          type: "text",
          text: "Nun kommt wieder ein bisschen Erklärungstext, damit hier ein bisschen ein Text steht..."
        },
        {
          type: "category",
          category: {
            "name": "24-Stunden-Betreuung",
            "title": "24-Stunden-Betreuung",
            "information": "Eine 24-Stunden-Betreuung ist den ganzen Tag sowie die ganze Nacht da, um die pflegebedürftige Person zu betreuen. Dabei spielt die Qualität eine ganz wichtige Rolle und wird auch mit einem Qualitätszertifikat für Vermittlungsagenturen ausgezeichnet.",
            "entries": [
              {
                "ownerName": "ÖQZ-24",
                "ownerUrl": "",
                "references": [
                  {
                    "url": "https://oeqz.at/",
                    "title": "Gesicherte Qualität bei der 24-Stunden-Pflege (geändert)",
                    "description": "Für Agenturen der 24-Stunden-Betreuung gibt es ein freiwilliges Qualitätszertifikat.",
                    "isPaidContent": false,
                    "lastUpdated": "2022-06-16T13:23:16.713Z",
                    "keywords": [
                      "ÖQZ-24"
                    ]
                  }
                ]
              },
              {
                "ownerName": "Sozialministerium",
                "ownerUrl": "",
                "references": [
                  {
                    "url": "https://www.sozialministerium.at/Themen/Pflege/24-Stunden-Betreuung.html",
                    "title": "24-Stunden-Betreuung",
                    "description": "Für betreuungsbedürftige Personen kann es notwendig sein, dass in privaten Haushalten Tag und Nacht eine Betreuungsperson anwesend sein muss. Dies erfolgt im Rahmen einer 24-Stunden-Betreuung. Um die wichtige Qualität sicherzustellen, wird für Vermittlungsagenturen ein Qualitätszertifikat verliehen.",
                    "isPaidContent": false,
                    "lastUpdated": "2022-04-12T08:43:35.345Z",
                    "keywords": [
                      "Sozialministerium"
                    ]
                  },
                  {
                    "url": "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=175",
                    "title": "24-Stunden-Betreuung",
                    "description": "Broschüre \"24-Stunden-Betreuung zu Hause\" als Download",
                    "isPaidContent": false,
                    "lastUpdated": "2022-04-12T08:43:35.740Z",
                    "keywords": [
                      "Sozialministerium"
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    }]

    const categories = (
      (
        await context.graphql.run({
          query: gql`
            query {
              categories {
                id
                name
                title
                renderedInformation
                references {
                  id
                  url
                  title
                  description
                  address {
                    openGraphData
                  }
                  isPaidContent
                  lastUpdated
                  owner {
                    id
                    name
                    url
                  }
                  keywords {
                    name
                  }
                }
              }
            }
          `,
        })
      ).categories as any[]
    )
      .map(category.transform)
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    const emergency = {
      state: "wip",
    };

    const metadata = (
      (
        await context.graphql.run({
          query: gql`
            query {
              singletons {
                name
                title
                renderedContent
              }
            }
          `,
        })
      ).singletons as any[]
    ).map((metadata) => ({
      key: metadata.name,
      title: metadata.title,
      content: metadata.renderedContent,
    }));

    const timestamp = new Date().toISOString();

    res.json({ insights, abc: categories, emergency, metadata, timestamp });
  });
}
