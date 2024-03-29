import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';

const Copyright: GlobalConfig = {
  slug: 'website-copyright',
  label: "Copyright",
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
        elements: ["h2", "link", "ol", "ul"],
        leaves: ["bold"]
      }
    },
  ],
}

export default Copyright;
