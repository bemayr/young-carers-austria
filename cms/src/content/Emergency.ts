import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';

const Emergency: GlobalConfig = {
  slug: 'emergency',
  label: "Im Notfall",
  access: {
    read: () => true
  },
  admin: {
    group: "Inhalte",
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
      name: "title",
      type: "text",
      label: "Titel",
      required: true,
      admin: {
        description: "Titel der \"Im Notfall\"-Seite"
      }
    },
    {
      name: "description",
      type: "richText",
      label: "Beschreibung",
      required: true,
      admin: {
        description: "Beschreibung der \"Im Notfall\"-Seite, wird unter dem Titel angezeigt",
        elements: ["link"],
        leaves: ["bold"],
      }
    },
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
