import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Kontakt',
}

export default function KontaktPage() {
  return (
    <main className="container max-w-[48rem] mx-auto px-4 py-16">
      <article className="prose max-w-none">
        <h1>Kontakt</h1>
        <p>Her kan du fylle inn hvordan lesere kan kontakte redaksjonen.</p>

        <h2>Kontaktinformasjon</h2>
        <p><strong>Telefon:</strong> [Sett inn telefonnummer]</p>
        <p><strong>E-post:</strong> [Sett inn e-postadresse]</p>
        <p><strong>Adresse:</strong> [Sett inn besøksadresse eller postadresse]</p>

        <h2>Tips oss</h2>
        <p>[Skriv hvordan man sender tips, inkludert eventuelle retningslinjer.]</p>

        <h2>Redaksjonen</h2>
        <ul>
          <li>[Navn – Rolle – E-post]</li>
          <li>[Navn – Rolle – E-post]</li>
          <li>[Navn – Rolle – E-post]</li>
        </ul>
      </article>
    </main>
  )
}
