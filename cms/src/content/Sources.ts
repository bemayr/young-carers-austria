import { CollectionConfig } from 'payload/types';
import { SourceReferenceCell, SourceReferenceField } from './Sources.Extensions';

const Sources: CollectionConfig = {
  slug: 'sources',
  labels: {
    singular: "Quelle",
    plural: "Quellen"
  },
  admin: {
    group: "Inhalte",
    useAsTitle: 'name',
    defaultColumns: ["name", "homepage"],
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
      name: 'name',
      type: 'text',
      label: "Name",
      unique: true,
      required: true,
      admin: {
        description: "Name der Einrichtung die für den Inhalt verantwortlich ist"
      }
    },
    {
      name: 'homepage',
      type: 'text',
      label: "Homepage",
      unique: true,
    },
    {
      name: 'references',
      type: 'ui',
      label: "Referenzen",
      admin: {
        position: 'sidebar',
        components: {
          Field: SourceReferenceField,
          Cell: SourceReferenceCell,
        }
      }
    }
  ],
}

export default Sources;
