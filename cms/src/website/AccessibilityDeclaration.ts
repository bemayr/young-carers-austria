import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';

const GdprDeclaration: GlobalConfig = {
  slug: 'website-accessibility',
  label: "Barrierefreiheitserklärung",
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

export default GdprDeclaration;
