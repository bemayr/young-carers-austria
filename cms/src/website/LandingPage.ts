import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';

const LandingPage: GlobalConfig = {
  slug: 'website-landing',
  label: "Landing Page",
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
      name: "cards",
      type: "group",
      label: "Banner Cards",
      fields: [
        {
          name: "infos",
          type: 'group',
          label: "Infos",
          fields: [
            {
              name: "icon",
              type: "text",
              label: "Icon",
              required: true
            },
            {
              name: "title",
              type: "text",
              label: "Titel",
              required: true
            },
            {
              name: "description",
              type: "textarea",
              label: "Beschreibung",
              required: true
            }
          ]
        },
        {
          name: "situations",
          type: 'group',
          label: "Alltagssituationen",
          fields: [
            {
              name: "icon",
              type: "text",
              label: "Icon",
              required: true
            },
            {
              name: "title",
              type: "text",
              label: "Titel",
              required: true
            },
            {
              name: "description",
              type: "textarea",
              label: "Beschreibung",
              required: true
            }
          ]
        },
        {
          name: "emergency",
          type: 'group',
          label: "Im Notfall",
          fields: [
            {
              name: "icon",
              type: "text",
              label: "Icon",
              required: true
            },
            {
              name: "title",
              type: "text",
              label: "Titel",
              required: true
            },
            {
              name: "description",
              type: "textarea",
              label: "Beschreibung",
              required: true
            }
          ]
        },
        {
          name: "chatbot",
          type: 'group',
          label: "Chatbot",
          fields: [
            {
              name: "icon",
              type: "text",
              label: "Icon",
              required: true
            },
            {
              name: "title",
              type: "text",
              label: "Titel",
              required: true
            },
            {
              name: "description",
              type: "textarea",
              label: "Beschreibung",
              required: true
            }
          ]
        },
        {
          name: "app",
          type: 'group',
          label: "App",
          fields: [
            {
              name: "icon",
              type: "text",
              label: "Icon",
              required: true
            },
            {
              name: "title",
              type: "text",
              label: "Titel",
              required: true
            },
            {
              name: "description",
              type: "textarea",
              label: "Beschreibung",
              required: true
            }
          ]
        }
      ]
    },
    {
      name: 'app-quotes',
      type: 'array',
      label: 'Zitate über die App',
      minRows: 2,
      maxRows: 2,
      labels: {
        singular: 'Zitat',
        plural: 'Zitate',
      },
      fields: [
        {
          name: 'text',
          label: "Text",
          type: 'textarea',
          required: true,
        }
      ]
    },
    {
      name: "about",
      type: "richText",
      label: "Informationstext über die Young Carers Austria App",
      required: true,
      admin: {
        elements: ["link"],
        leaves: ["bold"],
      }
    },
  ],
}

export default LandingPage;
