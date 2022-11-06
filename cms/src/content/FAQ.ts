import { GlobalConfig } from 'payload/types';

const FAQ: GlobalConfig = {
  slug: 'faq',
  label: "FAQ",
  admin: {
    group: "Inhalte",
  },
  hooks: {
    // TODO: add the trigger CMS content changed hook
  },
  // TODO: validate correct number of questions on landing page
  versions: {
    drafts: 
    {
      autosave: false
    }
  },
  fields: [
    {
      name: 'entries',
      type: 'array',
      labels: {
        plural: "Fragen",
        singular: "Frage"
      },
      required: true,
      minRows: 3,
      fields: [
        {
          name: "question",
          type: "text",
          label: "Frage",
          required: true,
        },
        {
          name: "answer",
          type: "richText",
          label: "Antwort",
          required: true,
          admin: {
            elements: ["link", "ol", "ul"],
            leaves: ["bold"]
          }
        },
        {
          name: "showOnLandingPage",
          type: "checkbox",
          label: "Diese Frage auf der Startseite anzeigen",
          required: true,
        }
      ]
    }
  ],
}

export default FAQ;
