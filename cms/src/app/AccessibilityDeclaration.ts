import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from "../util/hooks"

const GdprDeclaration: GlobalConfig = {
  slug: 'app-accessibility',
  label: "Barrierefreiheitserklärung",
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

export default GdprDeclaration;
