import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Kladden - studentavis fra Innlandet.',
  images: [
    {
      url: `${getServerSideURL()}/opengraph-image`,
    },
  ],
  siteName: 'Kladden',
  title: 'Kladden - studentavis fra Innlandet',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
