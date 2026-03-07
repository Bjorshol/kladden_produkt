'use client'

import React, { useState } from 'react'

import {
  studentActivityCampusOptions,
} from '@/collections/StudentActivities/shared'

type SubmissionState =
  | { type: 'idle' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

const initialState: SubmissionState = { type: 'idle' }

export function SubmitTipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionState, setSubmissionState] = useState<SubmissionState>(initialState)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmissionState(initialState)

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      title: String(formData.get('title') || '').trim(),
      description: String(formData.get('description') || '').trim(),
      proposedStartAt: String(formData.get('proposedStartAt') || '').trim(),
      campus: String(formData.get('campus') || 'all').trim(),
      locationName: String(formData.get('locationName') || '').trim(),
      organizer: String(formData.get('organizer') || '').trim(),
      tipsterName: String(formData.get('tipsterName') || '').trim(),
      tipsterEmail: String(formData.get('tipsterEmail') || '').trim(),
      tipsterPhone: String(formData.get('tipsterPhone') || '').trim(),
    }

    try {
      const response = await fetch('/api/student-activity-tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        setSubmissionState({
          type: 'error',
          message: data?.error || 'Kunne ikke sende inn tipset akkurat nå.',
        })
        return
      }

      form.reset()
      setSubmissionState({
        type: 'success',
        message: 'Takk! Tipset er sendt inn og ligger nå til vurdering i redaksjonens CMS.',
      })
    } catch {
      setSubmissionState({
        type: 'error',
        message: 'Noe gikk galt ved innsending. Prøv igjen om litt.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Tips redaksjonen</p>
        <h2 className="text-2xl font-semibold text-gray-950">Send inn tips om hva som skjer</h2>
        <p className="text-sm text-gray-600">
          Tipsene går inn i CMS-et som upubliserte forslag. Redaksjonen vurderer dem før noe eventuelt legges ut i Studentportalen.
        </p>
      </div>

      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm font-medium text-gray-900">Hva skjer?</span>
          <input
            required
            name="title"
            className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            placeholder="F.eks. quizkveld, foredrag eller konsert"
            type="text"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-900">Når skjer det?</span>
          <input
            name="proposedStartAt"
            className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            type="datetime-local"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-900">Campus</span>
          <select
            name="campus"
            defaultValue="all"
            className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500"
          >
            {studentActivityCampusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-900">Sted</span>
          <input
            name="locationName"
            className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            placeholder="F.eks. Studentsamfunnet"
            type="text"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-900">Arrangør</span>
          <input
            name="organizer"
            className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            placeholder="F.eks. linjeforening eller studentutvalg"
            type="text"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm font-medium text-gray-900">Beskrivelse</span>
          <textarea
            required
            name="description"
            rows={5}
            className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            placeholder="Fortell kort hva arrangementet handler om, hvem det passer for, og hvorfor det bør med."
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-900">Ditt navn</span>
          <input
            required
            name="tipsterName"
            className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            type="text"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-900">Din e-post</span>
          <input
            required
            name="tipsterEmail"
            className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            type="email"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm font-medium text-gray-900">Telefon (valgfritt)</span>
          <input
            name="tipsterPhone"
            className="rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            type="text"
          />
        </label>

        <div className="md:col-span-2 flex flex-col gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-fit items-center rounded-full bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sender inn…' : 'Send inn tips'}
          </button>

          {submissionState.type !== 'idle' ? (
            <p className={submissionState.type === 'success' ? 'text-sm text-green-700' : 'text-sm text-red-700'}>
              {submissionState.message}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  )
}