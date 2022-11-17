import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';

const DataProtectionDeclaration: GlobalConfig = {
  slug: 'app-gdpr',
  label: "Datenschutzerklärung",
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

export default DataProtectionDeclaration;