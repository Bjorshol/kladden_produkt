'use client'
import Link from 'next/link'
import React from 'react'

export const Topbar: React.FC = () => {
  return (
    <header className="bg-offwhite sticky top-0 z-50 h-16 flex items-center justify-center">
      <Link href="/" className="text-2xl font-bold uppercase tracking-wide text-red-700">
        KLADDEN
      </Link>
    </header>
  )
}