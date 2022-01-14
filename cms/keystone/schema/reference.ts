import { list } from "@keystone-6/core";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const reference = list({
  ui: {
    description: "Referenzen",
    labelField: "title",
    searchFields: ["url", "title", "description"],
  },
  fields: {
    // [TODO]: create custom field that also includes the Title, Description and OpenGraph Data, then remove the properties beneath
    url: text({
      isIndexed: "unique",
    }),
    title: text(),
    description: text(),
    type: select({
      label: "Typ",
      type: "enum",
      options: [
        { label: "Dokument", value: "booklet" },
        { label: "Podcast", value: "podcast" },
        { label: "Lied", value: "song" },
        { label: "Video", value: "video" },
        { label: "Webseite", value: "website" },
      ],
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: "segmented-control",
      },
    }),
    target: select({
      label: "Zielgruppe",
      type: "enum",
      options: [
        { label: "Alle", value: "all" },
        { label: "Young Carers", value: "youngcarers" },
        { label: "Eltern und Interessierte", value: "parents" },
      ],
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: "segmented-control",
      },
    }),
    lastUpdated: timestamp({
      isFilterable: false,
      db: {
        updatedAt: true,
      },
      ui: {
        itemView: { fieldMode: 'hidden' }
      }
    }),
    owner: relationship({
      label: "Quelle",
      ref: "Owner.references",
      many: false,
      ui: {
        displayMode: "select",
        hideCreate: false,
      }
    }),
    categories: relationship({
      ref: "Category.references",
      many: true,
      ui: {
        hideCreate: true,
        displayMode: "cards",
        cardFields: ["name"],
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    keywords: relationship({
      ref: "Keyword",
      many: true,
      ui: {
        displayMode: "select",
      },
    }),
  },
});
