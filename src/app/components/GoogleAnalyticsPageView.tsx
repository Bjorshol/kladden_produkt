'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const FALLBACK_GA_ID = 'G-72DTHTKDPY'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function GoogleAnalyticsPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Endre GA-ID ved å sette `NEXT_PUBLIC_GA_ID` i miljøvariabler (.env). Fallback er verdien under.
  const gaId = (process.env.NEXT_PUBLIC_GA_ID ?? '').trim() || FALLBACK_GA_ID

  useEffect(() => {
    const query = searchParams?.toString()
    const url = query ? `${pathname}?${query}` : pathname

    // Sørg for at events kan queues selv om gtag-scriptet ikke er lastet helt ennå.
    window.dataLayer = window.dataLayer || []
    window.gtag =
      window.gtag ||
      ((...args: unknown[]) => {
        window.dataLayer?.push(args)
      })

    window.gtag('config', gaId, {
      page_path: url,
    })
  }, [pathname, searchParams, gaId])

  return null
}
