import { GlobalConfig } from 'payload/types';

const Imprint: GlobalConfig = {
  slug: 'website-imprint',
  label: "Impressum",
  admin: {
    group: "Webseite",
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
