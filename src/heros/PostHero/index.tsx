import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getPostTitleClassName } from '@/utilities/postTitleTypography'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, meta } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const categoryTitle = categories && categories.length > 0 && typeof categories[0] === 'object' ? categories[0].title : 'Nyheter'
  const titleTypographyClass = getPostTitleClassName(categories)
  const ingress = post.ingress || meta?.description || ''
  const heroCaption = heroImage && typeof heroImage === 'object' ? heroImage.caption : null
  const heroPhotographer = heroImage && typeof heroImage === 'object' ? heroImage.photographer : null

  return (
    <div className="pb-10">
      <div className="container max-w-[48rem] mx-auto px-4 pt-6">
        {/* Kategori med rød aksent */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-block w-5 h-0.5 shrink-0"
            style={{ backgroundColor: 'var(--color-brand-red)' }}
          />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: 'var(--color-brand-red)' }}
          >
            {categoryTitle}
          </span>
        </div>

        <h1
          className={`text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-5 ${titleTypographyClass}`}
        >
          {title}
        </h1>

        {ingress && (
          <p className="article-ingress mb-6">{ingress}</p>
        )}
      </div>

      {heroImage && typeof heroImage !== 'string' && (
        <div className="container max-w-[48rem] mx-auto px-4 mb-6">
          <figure className="image-figure">
            <Media
              imgClassName="max-w-full max-h-[55vh]"
              resource={heroImage}
            />
            {(heroCaption || heroPhotographer) && (
              <figcaption className="image-caption-box">
                {heroCaption && <RichText data={heroCaption} enableGutter={false} enableProse={false} />}
                {heroPhotographer && (
                  <span className="attribution">
                    <strong>Foto:</strong> {heroPhotographer}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      {/* Byline */}
      <div className="container max-w-[48rem] mx-auto px-4">
        <div
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3 border-t border-b"
          style={{ borderColor: 'oklch(88% 0 0deg)' }}
        >
          {hasAuthors && (
            <span className="text-sm font-semibold text-neutral-800">
              {formatAuthors(populatedAuthors || [])}
            </span>
          )}
          {publishedAt && (
            <time className="text-sm text-gray-400 tabular-nums" dateTime={publishedAt}>
              {formatDateTime(publishedAt)}
            </time>
          )}
        </div>
      </div>
    </div>
  )
}
