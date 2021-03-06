import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { isNonBatchedChange, runWebsiteBuildIfProduction } from "../github-actions";

export const owner = list({
  ui: {
    description: "Quellen",
    labelField: "name",
    searchFields: ["name"],
  },
  fields: {
    name: text({
      label: "Name der Einrichtung",
      isIndexed: "unique",
    }),
    url: text({
      label: "Homepage"
    }),
    references: relationship({
      label: "Referenzen",
      ref: "Reference.owner",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["title"],
        linkToItem: true,
        removeMode: "none",
        inlineCreate: undefined,
        inlineEdit: undefined,
        inlineConnect: undefined,
      },
    }),
  },
  hooks: {
    afterOperation: async ({ context }) => {
      if (isNonBatchedChange(context.req?.url))
        await runWebsiteBuildIfProduction();
    },
  }
});
