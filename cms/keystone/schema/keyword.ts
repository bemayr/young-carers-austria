import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

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
});
