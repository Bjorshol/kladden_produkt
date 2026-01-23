import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-red-600 text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
          <div className="text-sm">
            <p><strong>Kladden</strong> - Studentavis fra Innlandet</p>
            <p>Redaktør: [Navn]</p>
            <p>Styreleder: [Navn]</p>
            <p>Ansvarlig redaktør: [Navn]</p>
            <p>Kontakt: [E-post eller telefon]</p>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            <Link href="/om-oss" className="text-white hover:underline">Om oss</Link>
            <Link href="/kontakt" className="text-white hover:underline">Kontakt</Link>
            <Link href="/arkiv" className="text-white hover:underline">Arkiv</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
