import { CollectionConfig } from 'payload/types';

const References: CollectionConfig = {
  slug: 'references',
  labels: {
    singular: "Referenz",
    plural: "Referenzen"
  },
  admin: {
    group: "Inhalte",
    useAsTitle: 'title',
    defaultColumns: ["title", "address", "description"],
    disableDuplicate: true,
  },
  hooks: {
    // TODO: add the trigger CMS content changed hook
  },
  versions: {
    maxPerDoc: 5,
    retainDeleted: true,
    drafts: 
    {
      autosave: false
    }
  },
  fields: [
    {
      name: 'address',
      type: 'text',
      label: "Adresse",
      unique: true,
      required: true,
    },
    {
      name: "title",
      type: "text",
      label: "Titel",
      required: true,
      // todo: add take from link
    },
    {
      name: "description",
      type: "textarea",
      label: "Beschreibung",
      required: true,
      // todo: add take from link
    },
    {
      name: "image",
      type: "text",
      label: "Titelbild",
      required: true,
      admin: {
        components: {
          Field: undefined // todo: add this component with context
        }
      }
    },
    {
      name: "showOnLandingPage",
      type: "checkbox",
      label: "Diese Seite enthält kostenpflichtigen Inhalt ⚠️",
      required: true,
    },
    {
      name: 'keywords',
      type: 'textarea',
      label: "Schlüsselwörter",
    },
    {
      name: "source",
      type: 'relationship',
      label: "Für den Inhalt verantwortlich",
      relationTo: "sources",
      required: true,
      hasMany: false,
    },
    {
      name: "categories",
      type: 'relationship',
      label: "Kategorien",
      relationTo: "categories",
      required: true,
      hasMany: true,
    },
    {
      name: "opengraph",
      type: "group",
      admin: {
        hidden: true,
      },
      fields: [

      ]
    },
  ],
}

export default References;
