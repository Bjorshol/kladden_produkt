import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React from 'react'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { StudentActivity } from '@/payload-types'
import {
  studentActivityCampusLabels,
  studentActivityCategoryLabels,
} from '@/collections/StudentActivities/shared'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const longDateFormatter = new Intl.DateTimeFormat('nb-NO', {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
})

const timeFormatter = new Intl.DateTimeFormat('nb-NO', {
  hour: '2-digit',
  minute: '2-digit',
})

export default async function StudentActivityPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/studentportalen/${decodedSlug}`
  const activity = await queryStudentActivityBySlug({ slug: decodedSlug })

  if (!activity) {
    return <PayloadRedirects url={url} />
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 md:px-6 lg:py-14">
      <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
        <Link href="/studentportalen" className="text-sm font-medium text-red-700 hover:underline">
          ← Tilbake til Studentportalen
        </Link>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
            {studentActivityCategoryLabels[activity.category]}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            {studentActivityCampusLabels[activity.campus]}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-950">{activity.title}</h1>
          <p className="max-w-3xl text-lg text-gray-700">{activity.summary}</p>
        </div>

        <dl className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-gray-50 p-4">
            <dt className="text-sm font-medium text-gray-500">Når</dt>
            <dd className="mt-1 text-sm text-gray-900">{formatActivityDate(activity)}</dd>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4">
            <dt className="text-sm font-medium text-gray-500">Hvor</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {activity.locationName}
              {activity.locationDetails ? ` · ${activity.locationDetails}` : ''}
            </dd>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4">
            <dt className="text-sm font-medium text-gray-500">Arrangør</dt>
            <dd className="mt-1 text-sm text-gray-900">{activity.organizer || 'Ikke oppgitt'}</dd>
          </div>
        </dl>

        {activity.signupUrl ? (
          <div>
            <Link
              href={activity.signupUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 hover:text-white hover:no-underline"
            >
              {activity.signupLabel || 'Les mer / meld deg på'}
            </Link>
          </div>
        ) : null}
      </div>

      {activity.heroImage && typeof activity.heroImage === 'object' ? (
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <Media className="w-full" imgClassName="h-auto w-full object-cover" resource={activity.heroImage} size="100vw" />
        </div>
      ) : null}

      <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
        <RichText className="max-w-none" data={activity.content} enableGutter={false} />
      </article>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const activity = await queryStudentActivityBySlug({ slug: decodedSlug })

  return {
    title: activity?.title || 'Studentaktivitet',
    description: activity?.summary || 'Studentaktivitet i Studentportalen.',
  }
}

async function queryStudentActivityBySlug({ slug }: { slug: string }) {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'student-activities',
    draft,
    depth: 1,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

function formatActivityDate(activity: StudentActivity) {
  const start = new Date(activity.startAt)
  const end = activity.endAt ? new Date(activity.endAt) : null

  if (activity.allDay && end) {
    return `${capitalize(longDateFormatter.format(start))} – ${capitalize(longDateFormatter.format(end))} · hele dagen`
  }

  if (activity.allDay) {
    return `${capitalize(longDateFormatter.format(start))} · hele dagen`
  }

  if (end && isSameDay(start, end)) {
    return `${capitalize(longDateFormatter.format(start))} · ${timeFormatter.format(start)}–${timeFormatter.format(end)}`
  }

  if (end) {
    return `${capitalize(longDateFormatter.format(start))} kl. ${timeFormatter.format(start)} – ${capitalize(longDateFormatter.format(end))} kl. ${timeFormatter.format(end)}`
  }

  return `${capitalize(longDateFormatter.format(start))} · kl. ${timeFormatter.format(start)}`
}

function isSameDay(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate()
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}