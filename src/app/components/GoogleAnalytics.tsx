import Script from 'next/script'

const FALLBACK_GA_ID = 'G-72DTHTKDPY'

export function GoogleAnalytics() {
  // Endre GA-ID ved å sette `NEXT_PUBLIC_GA_ID` i miljøvariabler (.env). Fallback er verdien under.
  const gaId = (process.env.NEXT_PUBLIC_GA_ID ?? '').trim() || FALLBACK_GA_ID

  return (
    <>
      <Script
        id="ga4-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
