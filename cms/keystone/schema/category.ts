import { list } from "@keystone-6/core";
import { relationship, text, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import {
  isNonBatchedChange,
  runWebsiteBuildIfProduction,
} from "../github-actions";
import { slateToMarkdown } from "../_utils/markdown";

export const category = list({
  ui: {
    description: "Kategorien",
    label: "Kategorien",
    singular: "Kategorie",
    plural: "Kategorien",
    path: "kategorie",
    labelField: "name",
    searchFields: ["name", "title", "renderedInformation"],
  },
  fields: {
    name: text({
      label: "Name",
      isIndexed: "unique",
      isFilterable: true,
      isOrderable: true,
      validation: {
        isRequired: true,
        length: { min: 2, max: 50 },
      },
    }),
    title: text({
      label: "Überschrift",
      isFilterable: true,
      isOrderable: false,
      validation: {
        isRequired: true,
        length: { min: 2, max: 100 },
      },
    }),
    information: document({
      label: "Beschreibung",
      formatting: {
        inlineMarks: {
          bold: true,
        },
        listTypes: true,
        headingLevels: [2, 3],
      },
      links: true,
      hooks: {
        validateInput: ({ resolvedData, addValidationError }) => {
          const addError = () =>
            addValidationError(
              "Eine Kategorie sollte mit ein paar Worten beschrieben werden."
            );

          const { information } = resolvedData;

          if (information === undefined) addError();
          else {
            const markdown = slateToMarkdown(information);
            const trimmed = markdown
              .replace("\n", "")
              .replace("<br>", "")
              .trim();

            if (trimmed === "") addError();
          }
        },
      },
    }),
    renderedInformation: text({
      label: "Beschreibung als Markdown",
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" }, // [todo]: make readable only for administrators
        listView: { fieldMode: "hidden" },
        description: "This field gets automatically populated via Slate"
      },
      hooks: {
        resolveInput: ({ resolvedData, context }) => {
          const { information } = resolvedData;
          console.log({information, markdown: slateToMarkdown(information)})
          if (information === undefined) return undefined;
          return slateToMarkdown(information);
        },
      },
    }),
    lastUpdated: timestamp({
      isFilterable: false,
      isOrderable: true,
      db: {
        updatedAt: true,
      },
      ui: {
        itemView: { fieldMode: "hidden" },
        createView: { fieldMode: "hidden" },
      },
    }),
    references: relationship({
      label: "Beiträge",
      ref: "Reference.categories",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["title", "url"],
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
  hooks: {
    afterOperation: async ({ context }) => {
      if (isNonBatchedChange(context.req?.url))
        await runWebsiteBuildIfProduction();
    },
  },
});




