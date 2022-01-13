import { list } from "@keystone-6/core";
import { relationship, text, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const category = list({
  ui: {
    description: "Kategorien",
    labelField: "name",
    searchFields: ["name", "title", "renderedInformation"],
  },
  fields: {
    name: text({
        isIndexed: "unique"
    }),
    title: text(),
    information: document({
      formatting: {
        inlineMarks: {
          bold: true,
          superscript: true,
          subscript: true,
          keyboard: true,
        },
        listTypes: true,
        headingLevels: [2, 3],
        softBreaks: true,
      },
      links: true,
    }),
    renderedInformation: text({
        ui: {
            createView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'read' },
            listView: { fieldMode: 'hidden' },
        }
    }),
    lastUpdated: timestamp({
      db: {
        updatedAt: true,
      },
    }),
    references: relationship({
      label: "Beiträge",
      ref: "Reference.categories",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["url"],
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    keywords: relationship({
        label: "Schlagwörter",
        ref: "Keyword",
        many: true,
        ui: {
          displayMode: "select",
        //   linkToItem: false,
        //   inlineCreate: {
        //       fields: [ "name" ]
        //   },
        //   inlineConnect: true,
        },
      }),
  },
});
