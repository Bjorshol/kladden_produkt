import Link from 'next/link'
import React from 'react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-300 bg-gray-100 text-black">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <Link className="flex items-center" href="/">
            <h1 className="text-2xl font-bold text-red-600">KLADDEN</h1>
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
