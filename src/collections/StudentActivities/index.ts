import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import {
  studentActivityCampusOptions,
  studentActivityCategoryOptions,
} from './shared'
import {
  revalidateStudentActivity,
  revalidateStudentActivityDelete,
} from './hooks/revalidateStudentActivity'

export const StudentActivities: CollectionConfig = {
  slug: 'student-activities',
  labels: {
    singular: 'Studentaktivitet',
    plural: 'Studentaktiviteter',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    summary: true,
    startAt: true,
    endAt: true,
    allDay: true,
    category: true,
    campus: true,
    featured: true,
    organizer: true,
    locationName: true,
    signupUrl: true,
  },
  admin: {
    defaultColumns: ['title', 'startAt', 'category', 'campus', 'featured'],
    description:
      'Et strukturert format for arrangementer, frister og studentaktiviteter. Dette er separat fra vanlige saker.',
    group: 'Studentportalen',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tittel',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Kort beskrivelse',
      required: true,
      admin: {
        description: 'Kort tekst som skal brukes i kalenderen og aktivitetslisten.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startAt',
          type: 'date',
          label: 'Starter',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            width: '50%',
          },
        },
        {
          name: 'endAt',
          type: 'date',
          label: 'Slutter',
          validate: (value, { siblingData }) => {
            const startAt = (siblingData as { startAt?: string | null } | undefined)?.startAt

            if (!value || !startAt) {
              return true
            }

            if (new Date(value).getTime() < new Date(startAt).getTime()) {
              return 'Sluttid må være etter starttid.'
            }

            return true
          },
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'allDay',
          type: 'checkbox',
          label: 'Hele dagen',
          defaultValue: false,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Fremhev aktivitet',
          defaultValue: false,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'requiresSignup',
          type: 'checkbox',
          label: 'Krever påmelding',
          defaultValue: false,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          label: 'Kategori',
          options: [...studentActivityCategoryOptions],
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'campus',
          type: 'select',
          label: 'Campus',
          options: [...studentActivityCampusOptions],
          defaultValue: 'all',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'locationName',
          type: 'text',
          label: 'Sted',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'organizer',
          type: 'text',
          label: 'Arrangør',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'locationDetails',
      type: 'text',
      label: 'Adresse eller rom',
      admin: {
        description: 'Valgfritt. For eksempel romnavn, bygg eller digital møteinfo.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'signupUrl',
          type: 'text',
          label: 'Påmeldingslenke',
          admin: {
            description: 'Valgfritt. Bruk full URL hvis aktiviteten har en ekstern lenke.',
            width: '70%',
          },
        },
        {
          name: 'signupLabel',
          type: 'text',
          label: 'Tekst på lenke',
          defaultValue: 'Les mer / meld deg på',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.signupUrl),
            width: '30%',
          },
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publisert',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }

            return value
          },
        ],
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateStudentActivity],
    afterDelete: [revalidateStudentActivityDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}