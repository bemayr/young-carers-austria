import { CollectionConfig } from 'payload/types';
import React from 'react';
import { AddressField, OpengraphDescription, PreviewImageUrlField } from './References.Extensions';

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
      type: 'row',
      fields: [
        {
          name: 'address',
          type: 'text',
          label: "Adresse",
          unique: true,
          required: true,
          admin: {
            width: "90%",
          }
        },
        {
          name: 'address-status',
          type: 'ui',
          admin: {
            width: "10%",
            components: {
              Field: AddressField
            }
          }
        }
      ]
    },
    {
      name: "title",
      type: "text",
      label: "Titel",
      required: true,
      admin: {
        description: () => <OpengraphDescription ogProperty="title" property="title" hint={''} />
      }
    },
    {
      name: "description",
      type: "textarea",
      label: "Beschreibung",
      required: true,
      admin: {
        description: () => <OpengraphDescription ogProperty="description" property="description" hint={''} />
      }
    },
    {
      name: "image",
      type: "text",
      label: "Titelbild",
      required: true,
      admin: {
        components: {
          Field: PreviewImageUrlField
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
        // hidden: true,
        readOnly: true,
      },
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "imageUrl",
          type: "text",
        },
      ]
    },
  ],
}

export default References;
