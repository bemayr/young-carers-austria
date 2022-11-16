import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';

const Help: GlobalConfig = {
  slug: 'help',
  label: "Hilfe",
  admin: {
    group: "Inhalte",
  },
  hooks: {
    afterChange: [ notifyGitHub ],
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
            elements: ["link"],
            leaves: ["bold"],
          }
        },
  ],
}

export default Help;
