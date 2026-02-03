'use client'
import Link from 'next/link'
import React from 'react'

import { LogoText } from '@/components/Logo/LogoText'

export const Topbar: React.FC = () => {
  return (
    <header
      className="text-white sticky top-0 z-50 h-16"
      style={{ backgroundColor: 'var(--color-brand-red, #c9252c)' }}
    >
      <div className="max-w-[48rem] mx-auto w-full px-4 h-full flex items-center justify-center md:justify-start">
        <Link
          href="/"
          className="inline-flex h-full items-center text-white hover:text-white hover:no-underline"
          aria-label="Kladden"
        >
          <LogoText variant="topbar" />
        </Link>
      </div>
    </header>
  )
}