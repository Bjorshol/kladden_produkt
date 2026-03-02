import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Innsikt - avis av og for studenter i Innlandet.',
  images: [
    {
      url: `${getServerSideURL()}/opengraph-image`,
    },
  ],
  siteName: 'Innsikt',
  title: 'Innsikt - avis av og for studenter i Innlandet',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
