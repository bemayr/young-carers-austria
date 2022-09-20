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

    const insights = (
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
    ).map((story) => ({
      question: story.name,
      content: serializeStory(story.content.document),
    }));

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

    res.json({
      insights,
      abc: categories,
      emergency,
      metadata,
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

    if (node.type === "relationship") {
      switch (node.relationship) {
        case "reference":
          return [...story, { type: "reference", reference: {...node.data.data, keywords: node.data.data.keywords.split(", ") } }];
        case "category":
          return [...story, { type: "category", category: category.transform(node.data.data) }];
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
        return extendStoryWith(
          `\r\n${node.children
            .map((n) => `* ${nodeToMarkdown(n)}`)
            .join(`\r\n`)}\r\n\r\n`
        );
      case "ordered-list":
        return extendStoryWith(
          `\r\n${node.children
            .map((n) => `1. ${nodeToMarkdown(n)}`)
            .join(`\r\n`)}\r\n\r\n`
        );
    }

    return node.children
      ? node.children.reduce(
          (result, children) => serialize(children, result),
          story
        )
      : story;
  }
  console.log(documentValue);
  const markdown = documentValue
    .flatMap((node) => serialize(node, []))
    .filter((node) => !(node.type === "text" && node.text === ""));
  return markdown;
}
