import { stars } from "./../fields/stars-field/index";
import { list } from "@keystone-6/core";
import { checkbox, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { url } from "../fields/url-field";
import { runWebsiteBuild } from "../github-actions";

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
      ui: {
        itemView: { fieldMode: "hidden" },
        createView: { fieldMode: "hidden" },
      },
    }),
    title: text({
      label: "Titel",
      ui: {
        itemView: { fieldMode: "hidden" },
        createView: { fieldMode: "hidden" },
      },
    }),
    description: text({
      label: "Beschreibung",
      ui: {
        itemView: { fieldMode: "hidden" },
        createView: { fieldMode: "hidden" },
      },
    }),
    address: url({
      ui: {
        listView: { fieldMode: "hidden" },
      },
    }),
    onlineStatus: select({
      type: "enum",
      options: ["online", "offline", "moved", "timeout", "error"],
      ui: {
        itemView: { fieldMode: "hidden" },
        createView: { fieldMode: "hidden" },
      },
    }),
    isPaidContent: checkbox({
      label: "Diese Seite enthält kostenpflichtigen Inhalt ⚠️",
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
    owner: relationship({
      label: "Für den Inhalt verantwortlich (erforderlich)",
      ref: "Owner.references",
      many: false,
      ui: {
        displayMode: "select",
        hideCreate: false,
      },
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
  hooks: {
    resolveInput: ({ resolvedData, item, inputData }) => {
      // console.log({
      //   url: resolvedData.address.url,
      //   resolvedData,
      //   onlineStatus: resolvedData.address.onlineStatus,
      //   openGraphData: resolvedData.address.openGraphData,
      // });
      const onlineStatus =
        resolvedData.address.onlineStatus !== undefined
          ? JSON.parse(resolvedData.address.onlineStatus)
          : undefined;
      const openGraphData =
        resolvedData.address.openGraphData !== undefined
          ? JSON.parse(resolvedData.address.openGraphData)
          : undefined;
      resolvedData.url = resolvedData.address.url;
      resolvedData.title =
        resolvedData.address.title === undefined ||
        resolvedData.address.title === null ||
        resolvedData.address.title === ""
          ? openGraphData.title
          : resolvedData.address.title;
      resolvedData.description =
        resolvedData.address.description === undefined ||
        resolvedData.address.description === null ||
        resolvedData.address.description === ""
          ? openGraphData.description
          : resolvedData.address.description;
      resolvedData.onlineStatus = onlineStatus.status;
      return resolvedData;
    },
    afterOperation: async ({originalItem, item, context}) => {
      await runWebsiteBuild(originalItem, item, context.req?.url)
    }
  },
});
