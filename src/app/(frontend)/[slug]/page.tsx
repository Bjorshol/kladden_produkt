import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PostsList } from '@/components/Posts/PostsList'
import type { FrontEditor, Post } from '@/payload-types'
import type { PostThemeColor } from '@/theme/postColorMap'

export async function generateStaticParams() {
  // For Vercel deployment, return empty array since we can't connect to DB during build
  // In production, pages will be generated on-demand
  return []
  
  /*
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
  */
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  if (slug === 'home') {
    // For home page, render posts list instead
    const posts = await queryPosts()
    return (
      <>
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}
        <PostsList posts={posts} />
      </>
    )
  }

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const isHome = decodedSlug === 'home'
  
  try {
    const page = await queryPageBySlug({
      slug: decodedSlug,
    })
    const meta = await generateMeta({ doc: page })
    return isHome ? { ...meta, title: 'Kladden - studentavis fra Innlandet' } : meta
  } catch (error) {
    // Fallback for when DB is not available during build
    return {
      title: isHome ? 'Kladden - studentavis fra Innlandet' : decodedSlug,
    }
  }
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryPosts = cache(async (): Promise<Post[]> => {

  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  // First, get the front editor settings
  let frontEditor: FrontEditor | null = null
  try {
    frontEditor = await payload.findGlobal({
      slug: 'front-editor',
      draft,
      overrideAccess: draft,
    })
  } catch (error) {
    // If front-editor doesn't exist yet (migration not run), treat as empty
    frontEditor = { id: 0, featuredPosts: [] }
  }

  let posts: Post[] = []

  if (frontEditor && frontEditor.featuredPosts && frontEditor.featuredPosts.length > 0) {
    // Get the featured posts with overridden sizes
    const featuredIds = frontEditor.featuredPosts.map((fp) => typeof fp.post === 'number' ? fp.post : fp.post.id)
    let featuredPostsData
    try {
      featuredPostsData = await payload.find({
        collection: 'posts',
        draft,
        overrideAccess: draft,
        where: {
          id: {
            in: featuredIds,
          },
        },
      })
    } catch (error) {
      featuredPostsData = { docs: [] }
    }

    // Map to maintain order and apply size overrides
    type FeaturedPostItem = NonNullable<FrontEditor['featuredPosts']>[number] & {
      themeColorOverride?: PostThemeColor
    }

    const featuredPosts: Post[] = (frontEditor.featuredPosts as FeaturedPostItem[]).map((fp) => {
      const post = featuredPostsData.docs.find((p) => p.id === (typeof fp.post === 'number' ? fp.post : fp.post.id))
      if (post) {
        const override = fp.themeColorOverride
        const postThemeColor = (post as unknown as { themeColor?: PostThemeColor }).themeColor
        const resolvedThemeColor = override && override !== 'default' ? override : postThemeColor

        return {
          ...post,
          size: fp.size || post.size, // Override size if set
          themeColor: resolvedThemeColor,
        } as Post
      }
      return null
    }).filter((p): p is Post => p !== null)

    posts = [...featuredPosts]

    // Get remaining posts, excluding featured ones
    let remainingPosts
    try {
      remainingPosts = await payload.find({
        collection: 'posts',
        draft,
        limit: 50 - posts.length,
        pagination: false,
        overrideAccess: draft,
        sort: '-publishedAt,-createdAt',
        where: {
          id: {
            not_in: featuredIds,
          },
        },
      })
    } catch (error) {
      remainingPosts = { docs: [] }
    }

    posts = [...posts, ...remainingPosts.docs]
  } else {
    // No featured posts, get all sorted by publishedAt
    try {
      const result = await payload.find({
        collection: 'posts',
        draft,
        limit: 50,
        pagination: false,
        overrideAccess: draft,
        sort: '-publishedAt,-createdAt',
      })
      posts = result.docs
    } catch (error) {
      posts = []
    }
  }

  return posts
})
