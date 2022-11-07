import { GlobalConfig } from 'payload/types';

const LandingPage: GlobalConfig = {
  slug: 'website-landing',
  label: "Landing Page",
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
              minLength: 1,
              maxLength: 1,
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
              minLength: 1,
              maxLength: 1,
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
              minLength: 1,
              maxLength: 1,
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
              minLength: 1,
              maxLength: 1,
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
              minLength: 1,
              maxLength: 1,
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
          type: 'text',
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
