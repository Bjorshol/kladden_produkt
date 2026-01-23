'use client'
import Link from 'next/link'
import React from 'react'

export const Topbar: React.FC = () => {
  return (
    <header className="bg-red-600 text-white w-full">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold uppercase tracking-wide">
          KLADDEN
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/kategori/studentliv" className="hover:text-red-200 transition-colors">Studentliv</Link>
          <Link href="/kategori/nyheter" className="hover:text-red-200 transition-colors">Nyheter</Link>
          <Link href="/kategori/inntriger" className="hover:text-red-200 transition-colors">Inntriger</Link>
          <Link href="/kategori/quiz" className="hover:text-red-200 transition-colors">Quiz</Link>
        </nav>
        {/* Mobil meny - enkel hamburger eller scroll */}
        <div className="md:hidden flex overflow-x-auto space-x-4">
          <Link href="/kategori/studentliv" className="whitespace-nowrap hover:text-red-200 transition-colors">Studentliv</Link>
          <Link href="/kategori/nyheter" className="whitespace-nowrap hover:text-red-200 transition-colors">Nyheter</Link>
          <Link href="/kategori/inntriger" className="whitespace-nowrap hover:text-red-200 transition-colors">Inntriger</Link>
          <Link href="/kategori/quiz" className="whitespace-nowrap hover:text-red-200 transition-colors">Quiz</Link>
        </div>
      </div>
    </header>
  )
}