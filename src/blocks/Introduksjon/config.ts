import type { Block } from 'payload'

export const Introduksjon: Block = {
  slug: 'introduksjon',
  interfaceName: 'IntroduksjonBlock',
  labels: {
    singular: 'Introduksjon',
    plural: 'Introduksjoner',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Navn eller tittel',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Tekst under navn eller tittel',
      required: true,
    },
  ],
}
