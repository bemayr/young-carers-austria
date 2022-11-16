import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/github-actions';

const Infos: GlobalConfig = {
  slug: 'infos',
  label: "Infos",
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
            elements: ["link"],
            leaves: ["bold"],
          }
        },
  ],
}

export default Infos;
