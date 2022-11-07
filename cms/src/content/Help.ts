import { GlobalConfig } from 'payload/types';

const Help: GlobalConfig = {
  slug: 'help',
  label: "Hilfe",
  admin: {
    group: "Inhalte",
  },
  hooks: {
    // TODO: add the trigger CMS content changed hook
  },
  fields: [
        {
          name: "title",
          type: "text",
          label: "Titel",
          required: true,
          admin: {
            description: "Titel der Hilfeseite"
          }
        },
        {
          name: "description",
          type: "richText",
          label: "Beschreibung",
          required: true,
          admin: {
            description: "Beschreibung der Hilfeseite, wird unter dem Titel angezeigt",
            leaves: ["bold"],
          }
        },
  ],
}

export default Help;
