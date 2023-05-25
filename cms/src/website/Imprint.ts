import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';

const Imprint: GlobalConfig = {
  slug: 'website-imprint',
  label: "Impressum",
  access: {
    read: () => true
  },
  admin: {
    group: "Webseite",
  },
  hooks: {
    afterChange: [ notifyGitHub ],
  },
  versions: {
    drafts: 
    {
      autosave: false
    }
  },
  fields: [
    {
      name: "content",
      type: "richText",
      label: "Inhalt",
      required: true,
      admin: {
        elements: ["link"],
        leaves: ["bold"]
      }
    },
  ],
}

export default Imprint;
