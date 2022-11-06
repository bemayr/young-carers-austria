import { CollectionConfig } from 'payload/types';

const Names: CollectionConfig = {
  slug: 'chatbot-names',
  labels: {
    singular: "Name",
    plural: "Namen"
  },
  admin: {
    group: "Chatbot",
    useAsTitle: 'name',
    defaultColumns: ["name"],
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
  ],
}

export default Names;
