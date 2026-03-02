import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Om oss',
}

export default function OmOssPage() {
  return (
    <main className="container max-w-[48rem] mx-auto px-4 py-16">
      <article className="prose max-w-none">
        <h1>Om oss</h1>
        <p>[Kort introduksjon om avisa og hvem den er for.]</p>

        <h2>Formål</h2>
        <p>[Beskriv formålet med avisa.]</p>

        <h2>Redaksjonell linje</h2>
        <p>[Beskriv hva dere dekker, og hvordan dere jobber journalistisk.]</p>

        <h2>Organisering</h2>
        <p>[Skriv kort om organiseringen, styre og redaksjon.]</p>

        <h2>Kontakt</h2>
        <p>
          Har du spørsmål? Se <Link href="/kontakt">kontaktsiden</Link> for informasjon.
        </p>
      </article>
    </main>
  )
}
