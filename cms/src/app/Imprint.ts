import { GlobalConfig } from 'payload/types';

const Imprint: GlobalConfig = {
  slug: 'app-imprint',
  label: "Impressum",
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
        elements: ["link"],
        leaves: ["bold"]
      }
    },
  ],
}

export default Imprint;
