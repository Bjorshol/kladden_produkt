import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { studentActivityCampusOptions } from '@/collections/StudentActivities/shared'

export const StudentActivityTips: CollectionConfig = {
  slug: 'student-activity-tips',
  labels: {
    singular: 'Studentportal-tips',
    plural: 'Studentportal-tips',
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'status', 'campus', 'tipsterName', 'createdAt'],
    description:
      'Tips som kommer inn fra Studentportalen. Disse opprettes ikke som publiserte aktiviteter automatisk.',
    group: 'Studentportalen',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'new',
      options: [
        { label: 'Nytt tips', value: 'new' },
        { label: 'Under vurdering', value: 'reviewing' },
        { label: 'Konvertert', value: 'converted' },
        { label: 'Avvist', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Hva skjer?',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'proposedStartAt',
          type: 'date',
          label: 'Når skjer det?',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
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
      type: 'row',
      fields: [
        {
          name: 'tipsterName',
          type: 'text',
          label: 'Navn på tipser',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'tipsterEmail',
          type: 'email',
          label: 'E-post til tipser',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'tipsterPhone',
      type: 'text',
      label: 'Telefon (valgfritt)',
    },
    {
      name: 'editorNotes',
      type: 'textarea',
      label: 'Interne notater',
    },
  ],
}