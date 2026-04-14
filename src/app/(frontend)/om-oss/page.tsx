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
<p>Innsikt er ei studentavis i Innlandet. Vi skriver om det som skjer, det som ikke fungerer, og det som fortjener mer oppmerksomhet. Vi arbeider etter Redaktør-plakaten og Vær Varsom-plakaten.</p>

<h2>Formål</h2>
<p>Formålet er å gi studenter bedre informasjon, flere stemmer og et sted for debatt. Vi skal også stille spørsmål på vegne av dem som sjelden blir hørt.</p>

<h2>Redaksjonell linje</h2>
<p>Vi dekker saker fra campus, studentmiljøet og samfunnet rundt. Vi jobber etter vanlige journalistiske prinsipper, med vekt på åpenhet, uavhengighet og saklighet.</p>

<h2>Organisering</h2>
<p>Avisa drives av studenter. Redaksjonen lager innholdet, mens styret har ansvar for drift og rammer.</p>

      </article>
    </main>
  )
}
