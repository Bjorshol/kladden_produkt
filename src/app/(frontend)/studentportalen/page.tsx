import type { Metadata } from 'next'

import Link from 'next/link'
import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import {
  studentActivityCampusLabels,
  studentActivityCategoryLabels,
} from '@/collections/StudentActivities/shared'
import type { StudentActivity } from '@/payload-types'
import { SubmitTipForm } from './SubmitTipForm'

export const metadata: Metadata = {
  title: 'Studentportalen',
  description: 'Kalender og oversikt over studentaktiviteter i Innlandet.',
}

type PortalActivity = {
  id: string
  title: string
  summary: string
  startAt: string
  endAt?: string
  allDay?: boolean
  category: keyof typeof studentActivityCategoryLabels
  campus: keyof typeof studentActivityCampusLabels
  featured?: boolean
  organizer?: string
  locationName: string
  locationDetails?: string
  requiresSignup?: boolean
  signupUrl?: string
  signupLabel?: string
  slug: string
}

type PageProps = {
  searchParams: Promise<{
    month?: string
  }>
}

const monthFormatter = new Intl.DateTimeFormat('nb-NO', {
  month: 'long',
  year: 'numeric',
})

const weekdayFormatter = new Intl.DateTimeFormat('nb-NO', {
  weekday: 'short',
})

const longDateFormatter = new Intl.DateTimeFormat('nb-NO', {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
})

const timeFormatter = new Intl.DateTimeFormat('nb-NO', {
  hour: '2-digit',
  minute: '2-digit',
})

const weekdayLabels = buildWeekdayLabels()

export default async function StudentportalenPage({ searchParams: searchParamsPromise }: PageProps) {
  const searchParams = await searchParamsPromise
  const selectedMonth = parseMonth(searchParams.month)
  const activities = await queryStudentActivities()
  const currentMonthActivities = activities.filter((activity) => overlapsMonth(activity, selectedMonth))
  const upcomingActivities = activities.filter(isUpcomingActivity).slice(0, 8)
  const highlightedActivities = currentMonthActivities.filter((activity) => activity.featured).slice(0, 3)

  const days = buildCalendarDays(selectedMonth)
  const activitiesByDay = groupActivitiesByDay(currentMonthActivities, selectedMonth)
  const previousMonth = addMonths(selectedMonth, -1)
  const nextMonth = addMonths(selectedMonth, 1)

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 md:px-6 lg:py-14">
      <section className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:grid-cols-[1.4fr_0.8fr] lg:p-8">
        <div className="space-y-4">
          <span className="inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
            Ny seksjon i topbarmenyen
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-950">Studentportalen</h1>
            <p className="max-w-3xl text-lg text-gray-700">
              Her kan redaksjonen publisere studentaktiviteter i et eget, strukturert format i stedet for vanlige saker.
              Hver aktivitet får tid, sted, kategori, arrangør og påmeldingslenke direkte i CMS-et.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-900">Kalenderformat</p>
              <p className="mt-2 text-sm text-gray-600">Aktivitetene legges inn som arrangementer med dato og klokkeslett.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-900">Egen innholdsmodell</p>
              <p className="mt-2 text-sm text-gray-600">Ingen blokker eller artikkeloppsett. Bare felt som er nyttige for hendelser.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-900">Klar for videre design</p>
              <p className="mt-2 text-sm text-gray-600">Denne siden er en første skisse som kan videreutvikles senere.</p>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Fremhevede aktiviteter</p>
          <div className="mt-4 space-y-3">
            {highlightedActivities.length > 0 ? (
              highlightedActivities.map((activity) => (
                <div key={activity.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                  <p className="text-xs font-medium uppercase tracking-wide text-red-700">
                    {studentActivityCategoryLabels[activity.category]}
                  </p>
                  <h2 className="mt-2 text-base font-semibold text-gray-950">{activity.title}</h2>
                  <p className="mt-2 text-sm text-gray-600">{formatActivityDate(activity)}</p>
                  <p className="mt-1 text-sm text-gray-600">{activity.locationName}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">Ingen fremhevede aktiviteter denne måneden ennå.</p>
            )}
          </div>
        </aside>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Kalender</p>
              <h2 className="text-2xl font-semibold text-gray-950">{capitalize(monthFormatter.format(selectedMonth))}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/studentportalen?month=${formatMonthKey(previousMonth)}`}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:no-underline"
              >
                Forrige måned
              </Link>
              <Link
                href={`/studentportalen?month=${formatMonthKey(nextMonth)}`}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:no-underline"
              >
                Neste måned
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            {weekdayLabels.map((label) => (
              <div key={label} className="py-2">
                {label}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-7">
            {days.map((day) => {
              const dayKey = toDateKey(day)
              const dayActivities = activitiesByDay.get(dayKey) ?? []
              const inCurrentMonth = day.getMonth() === selectedMonth.getMonth()

              return (
                <div
                  key={dayKey}
                  className={[
                    'min-h-36 rounded-2xl border p-3 text-left transition',
                    inCurrentMonth ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 text-gray-400',
                    isToday(day) ? 'ring-2 ring-red-200' : '',
                  ].join(' ')}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">{day.getDate()}</span>
                    {dayActivities.length > 0 ? (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                        {dayActivities.length}
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    {dayActivities.slice(0, 2).map((activity) => (
                      <a
                        key={`${activity.id}-${dayKey}`}
                        href={`#activity-${activity.slug}`}
                        className="block rounded-xl bg-gray-50 p-2 text-xs text-gray-700 transition hover:bg-red-50 hover:no-underline"
                      >
                        <span className="block font-medium text-gray-900">{activity.title}</span>
                        <span className="mt-1 block">{activity.allDay ? 'Hele dagen' : formatShortTime(activity.startAt)}</span>
                      </a>
                    ))}

                    {dayActivities.length > 2 ? (
                      <div className="text-xs font-medium text-gray-500">+ {dayActivities.length - 2} flere</div>
                    ) : null}

                    {dayActivities.length === 0 ? <div className="text-xs text-gray-400">Ingen aktiviteter</div> : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Kommende aktiviteter</p>
            <h2 className="mt-1 text-2xl font-semibold text-gray-950">Neste på kalenderen</h2>
          </div>

          {upcomingActivities.length > 0 ? (
            <div className="space-y-3">
              {upcomingActivities.map((activity) => (
                <article
                  id={`activity-${activity.slug}`}
                  key={activity.id}
                  className="rounded-2xl border border-gray-200 p-4"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                      {studentActivityCategoryLabels[activity.category]}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {studentActivityCampusLabels[activity.campus]}
                    </span>
                    {activity.requiresSignup ? (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        Krever påmelding
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-gray-950">{activity.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{activity.summary}</p>

                  <dl className="mt-4 space-y-2 text-sm text-gray-700">
                    <div>
                      <dt className="font-medium text-gray-900">Når</dt>
                      <dd>{formatActivityDate(activity)}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Hvor</dt>
                      <dd>
                        {activity.locationName}
                        {activity.locationDetails ? ` · ${activity.locationDetails}` : ''}
                      </dd>
                    </div>
                    {activity.organizer ? (
                      <div>
                        <dt className="font-medium text-gray-900">Arrangør</dt>
                        <dd>{activity.organizer}</dd>
                      </div>
                    ) : null}
                  </dl>

                  {activity.signupUrl ? (
                    <Link
                      href={activity.signupUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 hover:text-white hover:no-underline"
                    >
                      {activity.signupLabel || 'Les mer / meld deg på'}
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5 text-sm text-gray-600">
              Ingen aktiviteter enda. Siden er nå en trygg frontend-skisse mens CMS-delen kobles på igjen uten å påvirke admin.
            </div>
          )}
        </aside>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SubmitTipForm />

        <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Redaksjonell flyt</p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-950">Slik fungerer det i CMS</h2>
          <ol className="mt-4 space-y-4 text-sm text-gray-700">
            <li>
              <span className="font-semibold text-gray-900">1.</span> Tips sendes inn fra skjemaet og lagres i CMS under
              {' '}
              <span className="font-semibold text-gray-900">Studentportalen → Studentportal-tips</span>.
            </li>
            <li>
              <span className="font-semibold text-gray-900">2.</span> Redaksjonen vurderer tipset, legger inn interne notater og kan koble det til en faktisk aktivitet.
            </li>
            <li>
              <span className="font-semibold text-gray-900">3.</span> Når dere er klare, oppretter dere en post i
              {' '}
              <span className="font-semibold text-gray-900">Studentportalen → Studentaktiviteter</span>
              {' '}
              og publiserer den manuelt.
            </li>
          </ol>
        </aside>
      </section>
    </main>
  )
}

async function queryStudentActivities(): Promise<PortalActivity[]> {
  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'student-activities',
      draft,
      limit: 200,
      pagination: false,
      overrideAccess: draft,
      sort: 'startAt',
    })

    return result.docs.flatMap(mapActivityDoc)
  } catch {
    return []
  }
}

function mapActivityDoc(doc: StudentActivity): PortalActivity[] {
  if (!doc.startAt || !doc.title || !doc.summary || !doc.locationName || !doc.slug || !doc.category || !doc.campus) {
    return []
  }

  return [
    {
      id: String(doc.id),
      title: doc.title,
      summary: doc.summary,
      startAt: doc.startAt,
      endAt: doc.endAt || undefined,
      allDay: doc.allDay || false,
      category: doc.category,
      campus: doc.campus,
      featured: doc.featured || false,
      organizer: doc.organizer || undefined,
      locationName: doc.locationName,
      locationDetails: doc.locationDetails || undefined,
      requiresSignup: doc.requiresSignup || false,
      signupUrl: doc.signupUrl || undefined,
      signupLabel: doc.signupLabel || undefined,
      slug: doc.slug,
    },
  ]
}

function buildWeekdayLabels() {
  const monday = new Date(Date.UTC(2024, 0, 1))

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday)
    date.setUTCDate(monday.getUTCDate() + index)
    return weekdayFormatter.format(date)
  })
}

function parseMonth(monthParam?: string) {
  if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
    const [year, month] = monthParam.split('-').map(Number)

    if (year >= 2000 && month >= 1 && month <= 12) {
      return new Date(year, month - 1, 1)
    }
  }

  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function formatMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function buildCalendarDays(month: Date) {
  const start = startOfCalendar(month)
  const end = endOfCalendar(month)
  const days: Date[] = []

  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    days.push(new Date(date))
  }

  return days
}

function startOfCalendar(month: Date) {
  const start = new Date(month.getFullYear(), month.getMonth(), 1)
  const day = start.getDay()
  const offset = day === 0 ? 6 : day - 1
  start.setDate(start.getDate() - offset)
  return start
}

function endOfCalendar(month: Date) {
  const end = new Date(month.getFullYear(), month.getMonth() + 1, 0)
  const day = end.getDay()
  const offset = day === 0 ? 0 : 7 - day
  end.setDate(end.getDate() + offset)
  return end
}

function groupActivitiesByDay(activities: PortalActivity[], month: Date) {
  const map = new Map<string, PortalActivity[]>()
  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1)
  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999)

  activities.forEach((activity) => {
    const start = toDate(activity.startAt)
    const end = activity.endAt ? toDate(activity.endAt) : start
    const current = new Date(Math.max(start.getTime(), monthStart.getTime()))
    current.setHours(0, 0, 0, 0)
    const last = new Date(Math.min(end.getTime(), monthEnd.getTime()))
    last.setHours(0, 0, 0, 0)

    while (current.getTime() <= last.getTime()) {
      const key = toDateKey(current)
      const existing = map.get(key) ?? []
      map.set(key, [...existing, activity])
      current.setDate(current.getDate() + 1)
    }
  })

  return map
}

function overlapsMonth(activity: PortalActivity, month: Date) {
  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1)
  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999)
  const start = toDate(activity.startAt)
  const end = activity.endAt ? toDate(activity.endAt) : start

  return start <= monthEnd && end >= monthStart
}

function isUpcomingActivity(activity: PortalActivity) {
  const now = new Date()
  const start = toDate(activity.startAt)
  const end = activity.endAt ? toDate(activity.endAt) : start
  return end >= now
}

function formatActivityDate(activity: PortalActivity) {
  const start = toDate(activity.startAt)
  const end = activity.endAt ? toDate(activity.endAt) : null

  if (activity.allDay && end) {
    if (isSameDay(start, end)) {
      return `${capitalize(longDateFormatter.format(start))} · hele dagen`
    }

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

function formatShortTime(dateString: string) {
  return timeFormatter.format(toDate(dateString))
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function toDate(value: string) {
  return new Date(value)
}

function isSameDay(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate()
}

function isToday(date: Date) {
  return isSameDay(date, new Date())
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}