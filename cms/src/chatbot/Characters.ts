import { CollectionConfig } from 'payload/types';
import { notifyChatbot } from '../util/hooks';

const Characters: CollectionConfig = {
  slug: 'chatbot-characters',
  labels: {
    singular: "Charakter",
    plural: "Charaktere"
  },
  access: {
    read: () => true
  },
  admin: {
    group: "Chatbot",
    useAsTitle: 'name',
    defaultColumns: ["name", "emoji"],
    disableDuplicate: true,
  },
  hooks: {
    afterChange: [ notifyChatbot ],
    afterDelete: [ notifyChatbot ],
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
      required: true,
    },
  ],
}

export default Characters;
