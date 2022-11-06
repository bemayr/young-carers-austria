import { CollectionConfig } from 'payload/types';

const Emojis: CollectionConfig = {
  slug: 'chatbot-emojis',
  labels: {
    singular: "Emoji",
    plural: "Emojis"
  },
  admin: {
    group: "Chatbot",
    useAsTitle: 'emoji',
    defaultColumns: ["emoji"],
    disableDuplicate: true,
  },
  hooks: {
    // TODO: add the trigger CMS content changed hook
  },
  fields: [
    {
      name: 'emoji',
      type: 'text',
      label: "Emoji",
      unique: true,
      required: true,
    },
  ],
}

export default Emojis;
