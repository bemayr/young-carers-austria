import { GlobalConfig } from 'payload/types';

const Messages: GlobalConfig = {
  slug: 'chatbot-messages',
  label: "Nachrichten",
  admin: {
    group: "Chatbot",
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
  ],
}

export default Messages;
