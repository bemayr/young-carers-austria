import { GlobalConfig } from 'payload/types';

const Emergency: GlobalConfig = {
  slug: 'emergency',
  label: "Im Notfall",
  admin: {
    group: "Inhalte",
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
      name: 'numbers',
      type: 'array',
      label: "Notrufnummern",
      labels: {
        plural: "Notrufnummern",
        singular: "Notrufnummer"
      },
      required: true,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: "Name",
              required: true,
              admin: {
                width: '70%',
              },
            },
            {
              name: 'number',
              type: 'text',
              label: "Nummer",
              required: true,
              admin: {
                width: '30%',
              },
            },
          ],
        },
      ]
    },
    {
      name: "content",
      type: "richText",
      label: "Beschreibung",
      required: true,
      admin: {
        elements: ["h2", "h3", "link", "ol", "ul", "relationship"],
        leaves: ["bold"]
      }
    }
  ],
}

export default Emergency;
