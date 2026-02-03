import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Topbar } from '@/components/Topbar'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="nb" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/tqh0ecm.css" />
      </head>
      <body className="bg-white">
        <Providers>
          <Topbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Kladden - studentavis fra Innlandet',
    template: '%s | Kladden',
  },
  description: 'Kladden - studentavis fra Innlandet.',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
