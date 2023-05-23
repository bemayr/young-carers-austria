import { GlobalConfig } from 'payload/types';
import { notifyChatbot } from '../util/hooks';

const Messages: GlobalConfig = {
  slug: 'chatbot-messages',
  label: "Nachrichten",
  access: {
    read: () => true
  },
  admin: {
    group: "Chatbot",
  },
  hooks: {
    afterChange: [ notifyChatbot ],
  },
  versions: {
    drafts: 
    {
      autosave: false
    }
  },
  fields: [
    {
      name: "welcome",
      type: "group",
      label: "Begrüßung",
      admin: {
        description: "Diese Nachrichten werden als Begrüßung angezeigt."
      },
      fields: [
        {
          name: "choices",
          type: "array",
          labels: {
            singular: "Möglichkeit",
            plural: "Möglichkeiten"
          },
          minRows: 1,
          fields: [
            {
              name: "messages",
              type: "array",
              labels: {
                singular: "Nachricht",
                plural: "Nachrichten"
              },
              minRows: 1,
              fields: [
                {
                  name: "message",
                  type: "richText",
                  label: "Nachricht",
                  required: true,
                  admin: {
                    elements: ["ol", "ul"],
                    leaves: ["bold"]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "no-result-found",
      type: "group",
      label: "Keine Ergebnisse gefunden",
      admin: {
        description: "Diese Nachrichten werden angezeigt wenn keine Ergebnisse gefunden wurden."
      },
      fields: [
        {
          name: "choices",
          type: "array",
          labels: {
            singular: "Möglichkeit",
            plural: "Möglichkeiten"
          },
          minRows: 1,
          fields: [
            {
              name: "messages",
              type: "array",
              labels: {
                singular: "Nachricht",
                plural: "Nachrichten"
              },
              minRows: 1,
              fields: [
                {
                  name: "message",
                  type: "richText",
                  label: "Nachricht",
                  required: true,
                  admin: {
                    elements: ["ol", "ul"],
                    leaves: ["bold"]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "results-found",
      type: "group",
      label: "Ergebnisse gefunden",
      admin: {
        description: "Diese Nachrichten werden bei einer erfolgreichen Suche angezeigt."
      },
      fields: [
        {
          name: "choices",
          type: "array",
          labels: {
            singular: "Möglichkeit",
            plural: "Möglichkeiten"
          },
          minRows: 1,
          fields: [
            {
              name: "messages",
              type: "array",
              labels: {
                singular: "Nachricht",
                plural: "Nachrichten"
              },
              minRows: 1,
              fields: [
                {
                  name: "message",
                  type: "richText",
                  label: "Nachricht",
                  required: true,
                  admin: {
                    elements: ["ol", "ul"],
                    leaves: ["bold"]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "feedback",
      type: "group",
      label: "Feedbacknachricht nach den Ergebnissen",
      admin: {
        description: "Diese Nachrichten werden nach den Ergebnissen angezeigt und sind dazu gedacht nach Feedback zu fragen."
      },
      fields: [
        {
          name: "choices",
          type: "array",
          labels: {
            singular: "Möglichkeit",
            plural: "Möglichkeiten"
          },
          minRows: 1,
          fields: [
            {
              name: "messages",
              type: "array",
              labels: {
                singular: "Nachricht",
                plural: "Nachrichten"
              },
              minRows: 1,
              fields: [
                {
                  name: "message",
                  type: "richText",
                  label: "Nachricht",
                  required: true,
                  admin: {
                    elements: ["ol", "ul", "link"],
                    leaves: ["bold"]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
  ],
}

export default Messages;
