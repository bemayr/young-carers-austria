import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { runWebsiteBuild } from "../github-actions";
import { documentToMarkdown, documentToPlain } from "./category";

export const singleton = list({
  ui: {
    description: "Metadaten",
    labelField: "title",
    searchFields: ["title", "renderedContent"],
  },
  fields: {
    name: text({
      // [todo]: show only for administrators
      isIndexed: "unique",
      label: "Schlüssel",
    }),
    title: text({
      label: "Beschreibung",
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
    }),
    renderedContent: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "hidden" },
      },
      hooks: {
        resolveInput: ({ resolvedData, context }) => {
          const { content } = resolvedData;
          if (content === undefined) return undefined;
          return documentToPlain(content);
        },
      },
    })
  },
  hooks: {
    afterOperation: async () => {
      await runWebsiteBuild();
    },
  },
});
