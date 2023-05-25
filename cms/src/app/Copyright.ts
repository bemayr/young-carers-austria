import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';

const Copyright: GlobalConfig = {
  slug: 'app-copyright',
  label: "Copyright",
  access: {
    read: () => true
  },
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
        elements: ["h3", "link", "ol", "ul"],
        leaves: ["bold"]
      }
    },
  ],
}

export default Copyright;
