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
        <p><strong>Telefon:</strong> [+47 454 87 884]</p>
        <p><strong>E-post:</strong> <a href="mailto:redaksjonen@innsikt.no">redaksjonen@innsikt.no</a></p>
        <p><strong>Redaktør:</strong> [Eirik Reinaas Bjørshol]</p>
      </article>
    </main>
  )
}
