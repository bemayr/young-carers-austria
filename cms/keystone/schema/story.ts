import { graphql, list } from "@keystone-6/core";
import { text, virtual } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { isNonBatchedChange, runWebsiteBuildIfProduction } from "../github-actions";

export const story = list({
  ui: {
    
    description: "Alltagssituationen",
    label: "Alltagssituationen",
    singular: "Alltagssituation",
    plural: "Alltagssituationen",
    path: "alltagssituationen",
    labelField: "name",
    searchFields: ["name"],
  },
  fields: {
    name: text({
      isIndexed: "unique",
      label: "Name der Alltagssituation",
      ui: {
        description: "möglichst kurz und sprechend"
      }
    }),
    content: document({
      label: "Inhalt",
      formatting: {
        inlineMarks: {
          bold: true,
        },
        listTypes: true,
        headingLevels: [2, 3],
      },
      links: true,
      relationships: {
        category: {
          listKey: "Category",
          label: "Kategorie",
          selection: `
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
            }`
        },
        reference: {
          listKey: "Reference",
          label: "Eintrag",
          selection: `
            url
            title
            description
            previewImageUrl
            isPaidContent
            lastUpdated
            keywords`
        }
      }
    }),
    renderedContent: virtual({
      field: graphql.field({
        type: graphql.String,
        args: { something: graphql.arg({ type: graphql.Int }) },
        resolve(item, args, context, info) {
          console.log(JSON.stringify(JSON.parse(item.content), null, 2))
          return "";
        }
      })
    }),
  },
  hooks: {
    afterOperation: async ({ context }) => {
      if (isNonBatchedChange(context.req?.url))
        await runWebsiteBuildIfProduction();
    },
  },
});
