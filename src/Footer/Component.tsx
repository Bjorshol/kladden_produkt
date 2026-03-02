import Link from 'next/link'
import React from 'react'

import { LogoText } from '@/components/Logo/LogoText'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-300 bg-gray-100 text-black">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <Link className="flex items-center" href="/">
            <LogoText variant="footer" className="text-red-600" />
          </Link>
          <div className="text-sm">
            <p>Avis av og for studenter i Innlandet.</p>
            <p>Ansvarlig redaktør: Eirik Reinaas Bjørshol</p>
            <p>Styreleder: Asgeir Holmseth Snerten</p>
            <p>Telefon: +47 454 87 884</p>
            <p>E-post: redaksjonen@avisainnsikt.no</p>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4">
            <Link href="/om-oss" className="text-black hover:underline">Om oss</Link>
            <Link href="/kontakt" className="text-black hover:underline">Kontakt</Link>
            <Link href="/arkiv" className="text-black hover:underline">Arkiv</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
