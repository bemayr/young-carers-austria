import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const singleton = list({
  ui: {
    description: "Metadaten",
    labelField: "title",
    searchFields: ["title", "renderedContent"],
  },
  fields: {
    name: text({
      isIndexed: "unique",
    }),
    title: text(),
    content: document({
      formatting: {
        inlineMarks: {
          bold: true,
        },
        listTypes: true,
        headingLevels: [2, 3],
      },
      links: true,
    }),
    renderedContent: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "hidden" },
      },
    }),
  },
});
