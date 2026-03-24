import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: {
    singular: 'Forfatter',
    plural: 'Forfattere',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'title'],
    useAsTitle: 'name',
    description: 'Forfattere som ikke har brukerkonto i systemet.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Navn',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Tittel / rolle',
      admin: {
        description: 'F.eks. «Redaktør», «Journalist», «Gjesteskribent»',
      },
    },
  ],
  timestamps: true,
}
