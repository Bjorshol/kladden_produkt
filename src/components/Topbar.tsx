'use client'
import Link from 'next/link'
import React from 'react'
import { Menu, Search } from 'lucide-react'

import { LogoText } from '@/components/Logo/LogoText'

export const Topbar: React.FC = () => {
  return (
    <header
      className="text-white sticky top-0 z-50 h-16"
      style={{ backgroundColor: 'var(--color-brand-red, #c9252c)' }}
    >
      <div className="max-w-[48rem] mx-auto w-full px-4 h-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex h-full items-center text-white hover:text-white hover:no-underline"
          aria-label="Innsikt"
        >
          <LogoText variant="topbar" />
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="inline-flex items-center rounded-md border border-white/60 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 hover:no-underline"
            aria-label="Søk"
          >
            <Search className="size-4" aria-hidden="true" />
            <span className="sr-only">Søk</span>
          </Link>

          <details className="relative">
            <summary
              className="list-none cursor-pointer inline-flex items-center rounded-md border border-white/60 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 [&::-webkit-details-marker]:hidden"
              aria-label="Meny"
            >
              <Menu className="size-4" aria-hidden="true" />
              <span className="sr-only">Meny</span>
            </summary>
            <nav className="absolute right-0 mt-2 w-44 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
              <Link href="/om-oss" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:no-underline">
                Om oss
              </Link>
              <Link href="/kontakt" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:no-underline">
                Kontakt
              </Link>
              <Link href="/studentportalen" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:no-underline">
                Studentportalen
              </Link>
              <Link href="/search" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:no-underline">
                Søk
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}