import { CollectionConfig } from 'payload/types';

const Characters: CollectionConfig = {
  slug: 'chatbot-characters',
  labels: {
    singular: "Charakter",
    plural: "Charaktere"
  },
  admin: {
    group: "Chatbot",
    useAsTitle: 'name',
    defaultColumns: ["name", "emoji"],
    disableDuplicate: true,
  },
  hooks: {
    // TODO: add the trigger CMS content changed hook
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: "Name",
      unique: true,
      required: true,
    },
    {
      name: 'emoji',
      type: 'text',
      label: "Emoji",
      unique: true,
      required: true,
    },
  ],
}

export default Characters;
