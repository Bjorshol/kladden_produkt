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

export async function generateStaticParams() {
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
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
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
  const frontEditor: FrontEditor = await payload.findGlobal({
    slug: 'front-editor',
    draft,
    overrideAccess: draft,
  })

  let posts: Post[] = []

  if (frontEditor.featuredPosts && frontEditor.featuredPosts.length > 0) {
    // Get the featured posts with overridden sizes
    const featuredIds = frontEditor.featuredPosts.map((fp) => typeof fp.post === 'number' ? fp.post : fp.post.id)
    const featuredPostsData = await payload.find({
      collection: 'posts',
      draft,
      overrideAccess: draft,
      where: {
        id: {
          in: featuredIds,
        },
      },
    })

    // Map to maintain order and apply size overrides
    const featuredPosts: Post[] = frontEditor.featuredPosts.map((fp) => {
      const post = featuredPostsData.docs.find((p) => p.id === (typeof fp.post === 'number' ? fp.post : fp.post.id))
      if (post) {
        return {
          ...post,
          size: fp.size || post.size, // Override size if set
        } as Post
      }
      return null
    }).filter((p): p is Post => p !== null)

    posts = [...featuredPosts]

    // Get remaining posts, excluding featured ones
    const remainingPosts = await payload.find({
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

    posts = [...posts, ...remainingPosts.docs]
  } else {
    // No featured posts, get all sorted by publishedAt
    const result = await payload.find({
      collection: 'posts',
      draft,
      limit: 50,
      pagination: false,
      overrideAccess: draft,
      sort: '-publishedAt,-createdAt',
    })

    posts = result.docs
  }

  return posts
})
