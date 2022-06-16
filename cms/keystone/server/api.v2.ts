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
    entries: Object.values(category.references.reduce((owners: any, reference: any) => {
      owners[reference.owner.id] = owners[reference.owner.id] ?? {
        ownerName: reference.owner.name,
        ownerUrl: reference.owner.url,
        references: []
      }
      owners[reference.owner.id].references.push({
        url: reference.url,
        title: reference.title,
        description: reference.description,
        isPaidContent: reference.isPaidContent,
        lastUpdated: reference.lastUpdated,
        keywords: reference.keywords.map((keyword: any) => keyword.name)
      })
      return owners
    }, {}))
  })
}

export function registerAPIv2(
  app: Express,
  createContext: CreateRequestContext<BaseKeystoneTypeInfo>
) {
  app.get("/api/v2", async (req, res) => {
    const context: KeystoneContext = await createContext(req, res);

    const insights = {
      state: "wip"
    }

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
    ).map(category.transform);

    const emergency = {
      state: "wip"
    }

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
      content: metadata.renderedContent
    }));

    res.json({insights, abc: categories, emergency, metadata});
  });
}
