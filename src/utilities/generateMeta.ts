import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const BRAND_TITLE = 'Innsikt - avis av og for studenter i Innlandet'
const BRAND_DESCRIPTION = 'Innsikt - avis av og for studenter i Innlandet.'

const sanitizeBrandText = (value?: string | null): string | undefined => {
  if (!value) return undefined

  return value
    .replace(/payload\s*cms/gi, 'Innsikt')
    .replace(/payload/gi, 'Innsikt')
}

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/opengraph-image'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  pathname?: string
}): Promise<Metadata> => {
  const { doc, pathname } = args

  const serverUrl = getServerSideURL()
  const ogImage = getImageURL(doc?.meta?.image)
  const normalizedPath = pathname?.startsWith('/') ? pathname : pathname ? `/${pathname}` : '/'
  const canonicalUrl = `${serverUrl}${normalizedPath}`

  const metaTitle = sanitizeBrandText(doc?.meta?.title)
  const metaDescription = sanitizeBrandText(doc?.meta?.description)
  const title = metaTitle ? `${metaTitle} | Innsikt` : BRAND_TITLE

  return {
    description: metaDescription || BRAND_DESCRIPTION,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: mergeOpenGraph({
      description: metaDescription || undefined,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalUrl,
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription || BRAND_DESCRIPTION,
      images: ogImage ? [ogImage] : undefined,
    },
    title,
  }
}
