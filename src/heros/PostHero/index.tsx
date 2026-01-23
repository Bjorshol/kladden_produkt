import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, meta } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const categoryTitle = categories && categories.length > 0 && typeof categories[0] === 'object' ? categories[0].title : 'Nyheter'
  const ingress = post.ingress || meta?.description || ''

  return (
    <div className="pt-16 pb-8">
      <div className="container max-w-[48rem] mx-auto px-4">
        <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          {categoryTitle}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          {title}
        </h1>
      </div>
      {heroImage && typeof heroImage !== 'string' && (
        <div className="mb-6 flex justify-center">
          <div className="max-w-[56rem] bg-gray-100">
            <Media
              imgClassName="max-w-full max-h-[50vh] object-contain"
              resource={heroImage}
            />
          </div>
        </div>
      )}
      {ingress && (
        <div className="container max-w-[48rem] mx-auto px-4 mb-6">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            {ingress}
          </p>
        </div>
      )}
      <div className="container max-w-[48rem] mx-auto px-4 mb-6">
        <hr className="border-gray-300" />
      </div>
      <div className="container max-w-[48rem] mx-auto px-4 mb-6">
        <div className="text-sm text-gray-500">
          {hasAuthors && <span>Av {formatAuthors(populatedAuthors)}</span>}
          {hasAuthors && publishedAt && <span> · </span>}
          {publishedAt && <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>}
        </div>
      </div>
      <div className="container max-w-[48rem] mx-auto px-4 mb-8">
        <hr className="border-gray-300" />
      </div>
    </div>
  )
}
