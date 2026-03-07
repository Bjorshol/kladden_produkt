import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

import {
  studentActivityCampusOptions,
  studentActivityCategoryOptions,
} from './shared'

export const StudentActivities: CollectionConfig = {
  slug: 'student-activities',
  labels: {
    singular: 'Studentaktivitet',
    plural: 'Studentaktiviteter',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
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
      name: 'startAt',
      type: 'date',
      label: 'Starter',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endAt',
      type: 'date',
      label: 'Slutter',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori',
      options: [...studentActivityCategoryOptions],
      required: true,
    },
    {
      name: 'campus',
      type: 'select',
      label: 'Campus',
      options: [...studentActivityCampusOptions],
      defaultValue: 'all',
      required: true,
    },
    {
      name: 'locationName',
      type: 'text',
      label: 'Sted',
      required: true,
    },
    {
      name: 'organizer',
      type: 'text',
      label: 'Arrangør',
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
      name: 'allDay',
      type: 'checkbox',
      label: 'Hele dagen',
      defaultValue: false,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Fremhev aktivitet',
      defaultValue: false,
    },
    {
      name: 'requiresSignup',
      type: 'checkbox',
      label: 'Krever påmelding',
      defaultValue: false,
    },
    {
      name: 'signupUrl',
      type: 'text',
      label: 'Påmeldingslenke',
      admin: {
        description: 'Valgfritt. Bruk full URL hvis aktiviteten har en ekstern lenke.',
      },
    },
    {
      name: 'signupLabel',
      type: 'text',
      label: 'Tekst på lenke',
      defaultValue: 'Les mer / meld deg på',
    },
    slugField({
      position: undefined,
    }),
  ],
}