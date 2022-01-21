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
      label: "Adresse",
      isIndexed: "unique", // [TODO]: re-enable this after duplicate references were discussed
    }),
    title: text({
      label: "Titel"
    }),
    description: text({
      label: "Beschreibung",
      ui: {
        displayMode: "textarea"
      }
    }),
    type: select({
      label: "Typ",
      type: "enum",
      defaultValue: "website",
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
      defaultValue: "all",
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
      isOrderable: true,
      db: {
        updatedAt: true,
      },
      ui: {
        itemView: { fieldMode: 'hidden' },
        createView: { fieldMode: 'hidden' },
      }
    }),
    owner: relationship({
      label: "Für den Inhalt verantwortlich (erforderlich)",
      ref: "Owner.references",
      many: false,
      ui: {
        displayMode: "select",
        hideCreate: false,
      }
    }),
    categories: relationship({
      label: "Kategorien",
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
      label: "Schlagwörter",
      ref: "Keyword",
      many: true,
      ui: {
        displayMode: "select",
      },
    }),
  },
});
