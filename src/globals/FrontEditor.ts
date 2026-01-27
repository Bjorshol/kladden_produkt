import type { GlobalConfig } from 'payload'
import { revalidateFrontEditor } from './FrontEditor/hooks/revalidateFrontEditor'

export const FrontEditor: GlobalConfig = {
  slug: 'front-editor',
  label: 'Front Editor',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user), // Only logged in users can update
  },
  fields: [
    {
      name: 'featuredPosts',
      type: 'array',
      label: 'Utvalgte saker på forsiden',
      maxRows: 10,
      admin: {
        description: 'Velg opp til 10 saker som skal vises øverst på forsiden. Rekkefølgen her bestemmer rekkefølgen på siden.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'post',
          type: 'relationship',
          relationTo: 'posts',
          required: true,
          label: 'Sak',
        },
        {
          name: 'themeColorOverride',
          type: 'select',
          label: 'Farge på kort (override)',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Beige', value: 'beige' },
            { label: 'Blå', value: 'blue' },
            { label: 'Grå', value: 'gray' },
            { label: 'Gul', value: 'yellow' },
            { label: 'Sort', value: 'black' },
          ],
          defaultValue: 'default',
          admin: {
            description:
              'Valgfritt: Overstyr fargen på kortet på forsiden. Default = bruk sakens egen farge.',
          },
        },
        {
          name: 'size',
          type: 'select',
          label: 'Størrelse',
          options: [
            { label: 'Stor', value: 'large' },
            { label: 'Liten', value: 'small' },
          ],
          defaultValue: 'large',
          admin: {
            description: 'Overstyr størrelsen for denne saken på forsiden.',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFrontEditor],
  },
}