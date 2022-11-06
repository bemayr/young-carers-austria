import { CollectionConfig } from 'payload/types';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Examples: CollectionConfig = {
  slug: 'examples',
  admin: {
    useAsTitle: 'someField',
    description: 'some other description',
  },
  fields: [
    {
      name: 'someField',
      type: 'text',
    },
    {
      name: 'color', // required
      type: 'radio', // required
      options: [ // required
        {
          label: '🌐 (website)',
          value: 'web',
        },
        {
          label: '📧 (email)',
          value: 'email',
        },
        {
          label: '☎️ (telephone)',
          value: 'phone',
        },
      ],
      defaultValue: 'option_1',
      admin: {
        layout: 'horizontal',
      }
    }
  ],
}

export default Examples;
