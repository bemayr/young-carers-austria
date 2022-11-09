import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/github-actions';

const Imprint: GlobalConfig = {
  slug: 'app-imprint',
  label: "Impressum",
  admin: {
    group: "App",
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
