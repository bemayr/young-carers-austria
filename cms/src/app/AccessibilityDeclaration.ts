import { GlobalConfig } from 'payload/types';

const GdprDeclaration: GlobalConfig = {
  slug: 'app-accessibility',
  label: "Barrierefreiheitserklärung",
  admin: {
    group: "App",
  },
  hooks: {
    // TODO: add the trigger CMS content changed hook
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
        elements: ["h2", "h3", "link", "ol", "ul"],
        leaves: ["bold"]
      }
    },
  ],
}

export default GdprDeclaration;
