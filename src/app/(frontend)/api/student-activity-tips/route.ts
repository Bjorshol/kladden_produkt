import { getPayload } from 'payload'

import configPromise from '@payload-config'
import type { StudentActivityCampusValue } from '@/collections/StudentActivities/shared'

const allowedCampuses = new Set([
  'all',
  'lillehammer',
  'hamar',
  'elverum',
  'rena',
  'gjovik',
  'digital',
])

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Ugyldig forespørsel.' }, { status: 400 })
  }

  const title = normalizeString(body.title)
  const description = normalizeString(body.description)
  const proposedStartAt = normalizeString(body.proposedStartAt)
  const campus = (normalizeString(body.campus) || 'all') as StudentActivityCampusValue
  const locationName = normalizeString(body.locationName)
  const organizer = normalizeString(body.organizer)
  const tipsterName = normalizeString(body.tipsterName)
  const tipsterEmail = normalizeString(body.tipsterEmail)
  const tipsterPhone = normalizeString(body.tipsterPhone)

  if (!title || !description || !tipsterName || !tipsterEmail) {
    return Response.json({ error: 'Fyll inn tittel, beskrivelse, navn og e-post.' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tipsterEmail)) {
    return Response.json({ error: 'E-postadressen ser ikke gyldig ut.' }, { status: 400 })
  }

  if (!allowedCampuses.has(campus)) {
    return Response.json({ error: 'Ugyldig campus.' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  try {
    await payload.create({
      collection: 'student-activity-tips',
      data: {
        title,
        description,
        proposedStartAt: proposedStartAt || undefined,
        campus,
        locationName: locationName || undefined,
        organizer: organizer || undefined,
        tipsterName,
        tipsterEmail,
        tipsterPhone: tipsterPhone || undefined,
      },
      overrideAccess: false,
    })

    return Response.json({ success: true })
  } catch (error) {
    payload.logger.error({ err: error }, 'Error creating student activity tip')
    return Response.json({ error: 'Kunne ikke lagre tipset akkurat nå.' }, { status: 500 })
  }
}

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}