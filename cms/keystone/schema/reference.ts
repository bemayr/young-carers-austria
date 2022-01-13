import { list } from "@keystone-6/core";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const reference = list({
  ui: {
    description: "Referenzen",
    labelField: "title",
    searchFields: ["url", "title", "description", "owner"],
  },
  fields: {
    url: text({
      isIndexed: "unique",
    }),
    // Having the status here will make it easy for us to choose whether to display
    // posts on a live site.
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
    owner: text(),
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
    title: text(),
    description: text(),
    ogPreview: text({
      isFilterable: false,
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
