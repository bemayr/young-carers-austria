import { CollectionConfig } from 'payload/types';
import { notifyGitHub } from '../util/github-actions';

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: "Kategorie",
    plural: "Kategorien"
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
    retainDeleted: true,
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
    {
      name: 'keywords',
      type: 'textarea',
      label: "Schlüsselwörter",
    },
  ],
}

export default Categories;
