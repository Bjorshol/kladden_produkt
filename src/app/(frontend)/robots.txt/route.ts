const getSiteUrl = () => {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    'https://example.com'
  )
}

export async function GET() {
  const siteUrl = getSiteUrl()

  const body = `User-agent: *
Allow: /
Disallow: /admin/*

Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/pages-sitemap.xml
Sitemap: ${siteUrl}/posts-sitemap.xml`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
