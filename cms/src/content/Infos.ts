import { GlobalConfig } from 'payload/types';

const Infos: GlobalConfig = {
  slug: 'infos',
  label: "Infos",
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
            description: "Titel der Infoseite"
          }
        },
        {
          name: "description",
          type: "richText",
          label: "Beschreibung",
          required: true,
          admin: {
            description: "Beschreibung der Infoseite, wird unter dem Titel angezeigt",
            leaves: ["bold"],
          }
        },
  ],
}

export default Infos;
