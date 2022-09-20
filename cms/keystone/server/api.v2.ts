import { Express } from "express";
import {
  BaseKeystoneTypeInfo,
  CreateRequestContext,
  KeystoneContext,
} from "@keystone-6/core/types";
import { gql } from "@keystone-6/core";
import { Node, Text } from "slate";
import escapeHtml from "escape-html";
import { nodeToMarkdown } from "../_utils/markdown";

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
          previewImageUrl: reference.previewImageUrl,
          isPaidContent: reference.isPaidContent,
          lastUpdated: reference.lastUpdated,
          keywords: reference.keywords.split(", "),
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

    const insights = [
      {
        question: "Wie sieht ein typischer Tag eines Young Carers aus?",
        content: [
          {
            type: "text",
            text: "Das ist ein bisschen ein **Markdown**-Text, der sporadische Formatierungen zulässt.\n\nDie nächste Zeile stellt einen Verweis auf eine Referenz dar:",
          },
          {
            type: "reference",
            reference: {
              url: "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=175",
              title: "24-Stunden-Betreuung",
              description:
                'Broschüre "24-Stunden-Betreuung zu Hause" als Download',
              previewImageUrl:
                "https://www.sozialministerium.at/dam/jcr:3c0e6acd-b52b-48c7-baae-b1b97065c162/Webbilder_YoungCarers-App_Bubble-closeup10.jpg",
              isPaidContent: false,
              lastUpdated: "2022-04-12T08:43:35.740Z",
              keywords: ["Sozialministerium"],
            },
          },
          {
            type: "text",
            text: "Nun kommt wieder ein bisschen Erklärungstext, damit hier ein bisschen ein Text steht...",
          },
          {
            type: "category",
            category: {
              name: "24-Stunden-Betreuung",
              title: "24-Stunden-Betreuung",
              information:
                "Eine 24-Stunden-Betreuung ist den ganzen Tag sowie die ganze Nacht da, um die pflegebedürftige Person zu betreuen. Dabei spielt die Qualität eine ganz wichtige Rolle und wird auch mit einem Qualitätszertifikat für Vermittlungsagenturen ausgezeichnet.",
              entries: [
                {
                  ownerName: "ÖQZ-24",
                  ownerUrl: "",
                  references: [
                    {
                      url: "https://oeqz.at/",
                      title:
                        "Gesicherte Qualität bei der 24-Stunden-Pflege (geändert)",
                      description:
                        "Für Agenturen der 24-Stunden-Betreuung gibt es ein freiwilliges Qualitätszertifikat.",
                      previewImageUrl:
                        "https://www.sozialministerium.at/dam/jcr:3c0e6acd-b52b-48c7-baae-b1b97065c162/Webbilder_YoungCarers-App_Bubble-closeup10.jpg",
                      isPaidContent: false,
                      lastUpdated: "2022-06-16T13:23:16.713Z",
                      keywords: ["ÖQZ-24"],
                    },
                  ],
                },
                {
                  ownerName: "Sozialministerium",
                  ownerUrl: "",
                  references: [
                    {
                      url: "https://www.sozialministerium.at/Themen/Pflege/24-Stunden-Betreuung.html",
                      title: "24-Stunden-Betreuung",
                      description:
                        "Für betreuungsbedürftige Personen kann es notwendig sein, dass in privaten Haushalten Tag und Nacht eine Betreuungsperson anwesend sein muss. Dies erfolgt im Rahmen einer 24-Stunden-Betreuung. Um die wichtige Qualität sicherzustellen, wird für Vermittlungsagenturen ein Qualitätszertifikat verliehen.",
                      previewImageUrl:
                        "https://www.sozialministerium.at/dam/jcr:3c0e6acd-b52b-48c7-baae-b1b97065c162/Webbilder_YoungCarers-App_Bubble-closeup10.jpg",
                      isPaidContent: false,
                      lastUpdated: "2022-04-12T08:43:35.345Z",
                      keywords: ["Sozialministerium"],
                    },
                    {
                      url: "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=175",
                      title: "24-Stunden-Betreuung",
                      description:
                        'Broschüre "24-Stunden-Betreuung zu Hause" als Download',
                      previewImageUrl:
                        "https://www.sozialministerium.at/dam/jcr:3c0e6acd-b52b-48c7-baae-b1b97065c162/Webbilder_YoungCarers-App_Bubble-closeup10.jpg",
                      isPaidContent: false,
                      lastUpdated: "2022-04-12T08:43:35.740Z",
                      keywords: ["Sozialministerium"],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        question: "Wie könnte eine weitere Alltagssituation aussehen?",
        content: [
          {
            type: "text",
            text: "Eine **24-Stunden-Betreuung** ist den ganzen Tag sowie die ganze Nacht da, um die pflegebedürftige Person zu betreuen. Dabei spielt die Qualität eine ganz wichtige Rolle und wird auch mit einem [Qualitätszertifikat für Vermittlungsagenturen](https://oeqz.at) ausgezeichnet.",
          },
          {
            type: "reference",
            reference: {
              url: "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=175",
              title: "24-Stunden-Betreuung",
              description:
                'Broschüre "24-Stunden-Betreuung zu Hause" als Download',
              previewImageUrl:
                "https://www.sozialministerium.at/dam/jcr:3c0e6acd-b52b-48c7-baae-b1b97065c162/Webbilder_YoungCarers-App_Bubble-closeup10.jpg",
              isPaidContent: false,
              lastUpdated: "2022-04-12T08:43:35.740Z",
              keywords: ["Sozialministerium"],
            },
          },
          {
            type: "reference",
            reference: {
              url: "https://www.gesundheit.gv.at/news/aktuelles.html",
              title: "Gesundheitsportal",
              description: "Aktuelle Themen des Gesundheitsportal Österreichs",
              previewImageUrl:
                "https://www.gesundheit.gv.at/dam/jcr:88ead326-91df-4fa9-b615-adf5ca365e39/logo-gesundheit%20(1).png",
              isPaidContent: false,
              lastUpdated: "2022-07-18T14:59:28.495Z",
              keywords: ["Gesundheitsportal Österreichs"],
            },
          },
          {
            type: "text",
            text: "Nun kommt wieder ein bisschen Erklärungstext, damit hier ein bisschen ein Text steht... Allerdings ist dieser Text um einiges länger und enthält auch **fetten**, *kursiven* und ~durchgestrichenen~ Text.\r\n\r\n> Außerdem ist das ein Zitat.",
          },
          {
            type: "category",
            category: {
              name: "24-Stunden-Betreuung",
              title: "24-Stunden-Betreuung",
              information:
                "Eine 24-Stunden-Betreuung ist den ganzen Tag sowie die ganze Nacht da, um die pflegebedürftige Person zu betreuen. Dabei spielt die Qualität eine ganz wichtige Rolle und wird auch mit einem Qualitätszertifikat für Vermittlungsagenturen ausgezeichnet.",
              entries: [
                {
                  ownerName: "ÖQZ-24",
                  ownerUrl: "",
                  references: [
                    {
                      url: "https://oeqz.at/",
                      title:
                        "Gesicherte Qualität bei der 24-Stunden-Pflege (geändert)",
                      description:
                        "Für Agenturen der 24-Stunden-Betreuung gibt es ein freiwilliges Qualitätszertifikat.",
                      previewImageUrl:
                        "https://www.sozialministerium.at/dam/jcr:3c0e6acd-b52b-48c7-baae-b1b97065c162/Webbilder_YoungCarers-App_Bubble-closeup10.jpg",
                      isPaidContent: false,
                      lastUpdated: "2022-06-16T13:23:16.713Z",
                      keywords: ["ÖQZ-24"],
                    },
                  ],
                },
                {
                  ownerName: "Sozialministerium",
                  ownerUrl: "",
                  references: [
                    {
                      url: "https://www.sozialministerium.at/Themen/Pflege/24-Stunden-Betreuung.html",
                      title: "24-Stunden-Betreuung",
                      description:
                        "Für betreuungsbedürftige Personen kann es notwendig sein, dass in privaten Haushalten Tag und Nacht eine Betreuungsperson anwesend sein muss. Dies erfolgt im Rahmen einer 24-Stunden-Betreuung. Um die wichtige Qualität sicherzustellen, wird für Vermittlungsagenturen ein Qualitätszertifikat verliehen.",
                      previewImageUrl:
                        "https://www.sozialministerium.at/dam/jcr:3c0e6acd-b52b-48c7-baae-b1b97065c162/Webbilder_YoungCarers-App_Bubble-closeup10.jpg",
                      isPaidContent: false,
                      lastUpdated: "2022-04-12T08:43:35.345Z",
                      keywords: ["Sozialministerium"],
                    },
                    {
                      url: "https://broschuerenservice.sozialministerium.at/Home/Download?publicationId=175",
                      title: "24-Stunden-Betreuung",
                      description:
                        'Broschüre "24-Stunden-Betreuung zu Hause" als Download',
                      previewImageUrl:
                        "https://www.sozialministerium.at/dam/jcr:3c0e6acd-b52b-48c7-baae-b1b97065c162/Webbilder_YoungCarers-App_Bubble-closeup10.jpg",
                      isPaidContent: false,
                      lastUpdated: "2022-04-12T08:43:35.740Z",
                      keywords: ["Sozialministerium"],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ];

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
                  previewImageUrl
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
                  keywords
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
      state: "yet to be defined",
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

    const stories = (
      (
        await context.graphql.run({
          query: gql`
            query {
              stories {
                name
                content {
                  document(hydrateRelationships: true)
                }
              }
            }
          `,
        })
      ).stories as any[]
    ).map(story => ({
      question: story.name,
      content: serializeStory(story.content.document)
    }));

    res.json({
      insights,
      abc: categories,
      emergency,
      metadata,
      stories,
      timestamp,
    });
  });
}

type Story = Array<
  | { type: "text"; text: string }
  | { type: "reference"; reference: any }
  | { type: "category"; category: any }
>;
export function serializeStory(documentValue: any): Story {
  let result = [];

  function serialize(node: Node, story: Story): Story {
    function extendStoryWith(text: string): Story {
      const last = story.at(-1);
      if (last?.type === "text") {
        last.text += text;
        return story;
      } else {
        return [...story, { type: "text", text: text }];
      }
    }

    if (Text.isText(node)) {
      let string = escapeHtml(node.text);
      if (node.bold) {
        string = `**${string}**`;
      }
      return extendStoryWith(string);
    }

    if(node.type === "relationship") {
      switch (node.relationship) {
        case "reference":
          return [...story, { type: "reference", reference: node.data.data }];
        case "category":
          return [...story, { type: "category", category: node.data.data }];
      }
    }

    const children = node.children.map((n) => nodeToMarkdown(n)).join("");

    switch (node.type) {
      case "paragraph":
        extendStoryWith(`${children}\r\n\r\n`);
        break;
      case "link":
        extendStoryWith(`[${children}](${escapeHtml(node.href)})`);
        break;
      case "unordered-list":
        return extendStoryWith(`\r\n${node.children
          .map((n) => `* ${nodeToMarkdown(n)}`)
          .join(`\r\n`)}\r\n\r\n`);
      case "ordered-list":
        return extendStoryWith(`\r\n${node.children
          .map((n) => `1. ${nodeToMarkdown(n)}`)
          .join(`\r\n`)}\r\n\r\n`);
    }

    return node.children
    ? node.children.reduce((result, children) => serialize(children, result), story)
    : story;
  }
  console.log(documentValue)
  const markdown = documentValue
    .flatMap(node => serialize(node, []))
    .filter(node => !(node.type === "text" && node.text === ""));
  return markdown;
}
