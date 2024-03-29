import { GlobalConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';
import { virtualPlainRichtextField } from '../util/fields';
import { markdownify } from '../api/markdown';

const FAQ: GlobalConfig = {
  slug: 'faq',
  label: "FAQ",
  access: {
    read: () => true
  },
  admin: {
    group: "Inhalte",
  },
  hooks: {
    afterChange: [ notifyGitHub ],
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
        virtualPlainRichtextField("answer"),
        {
          name: "answerMarkdown",
          type: "text",
          admin: {
            hidden: true, // hides the field from the admin panel
          },
          hooks: {
            beforeChange: [
              ({ siblingData }) => {
                // ensures data is not stored in DB
                delete siblingData["answerMarkdown"];
              },
            ],
            afterRead: [
              ({ siblingData }) => {
                return markdownify(siblingData.answer).trim();
              },
            ],
          },
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
