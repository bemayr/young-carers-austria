import { CollectionConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';
import { virtualPlainRichtextField } from '../util/fields';

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: "Kategorie",
    plural: "Kategorien"
  },
  access: {
    read: () => true
  },
  admin: {
    group: "Inhalte",
    useAsTitle: 'name',
    defaultColumns: ["name", "heading"],
    disableDuplicate: true,
  },
  hooks: {
    afterChange: [ notifyGitHub ],
    afterDelete: [ notifyGitHub ],
  },
  versions: {
    maxPerDoc: 5,
    drafts: 
    {
      autosave: false
    }
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
      name: 'heading',
      type: 'text',
      label: "Überschrift",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      label: "Beschreibung",
      required: true,
      admin: {
        elements: ["link", "ol", "ul"],
        leaves: ["bold"]
      }
    },
    virtualPlainRichtextField("description"),
    {
      name: 'keywords',
      type: 'textarea',
      label: "Schlüsselwörter",
    },
  ],
}

export default Categories;
