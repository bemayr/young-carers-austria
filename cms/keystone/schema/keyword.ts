import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { isNonBatchedChange, runWebsiteBuildIfProduction } from "../github-actions";

export const keyword = list({
  ui: {
    labelField: "name",
    isHidden: true,
  },
  fields: {
    name: text({
      label: "Name",
      isIndexed: "unique",
    }),
  },
  hooks: {
    afterOperation: async ({ context }) => {
      if (isNonBatchedChange(context.req?.url))
        await runWebsiteBuildIfProduction();
    },
  },
});
