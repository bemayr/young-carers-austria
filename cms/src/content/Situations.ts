import { CollectionConfig } from 'payload/types';
import { notifyGitHub } from '../util/hooks';
import { virtualPlainRichtextField } from '../util/fields';

const Situations: CollectionConfig = {
  slug: 'situations',
  labels: {
    singular: "Alltagssituation",
    plural: "Alltagssituationen"
  },
  access: {
    read: () => true
  },
  admin: {
    group: "Inhalte",
    useAsTitle: 'name',
    defaultColumns: ["name", "content"],
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
      name: "content",
      type: "richText",
      label: "Beschreibung",
      required: true,
      admin: {
        elements: ["link", "ol", "ul", "relationship"],
        leaves: ["bold"]
      }
    },
    virtualPlainRichtextField("content"),
  ],
}

export default Situations;
