'use client'
import Link from 'next/link'
import React from 'react'

export const Topbar: React.FC = () => {
  return (
    <header
      className="text-white sticky top-0 z-50 h-16 flex items-center px-8"
      style={{ backgroundColor: 'var(--color-brand-red, #c9252c)' }}
    >
      <Link href="/" className="text-2xl font-bold uppercase tracking-wide">
        KLADDEN
      </Link>
    </header>
  )
}