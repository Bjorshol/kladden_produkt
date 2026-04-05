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
  const { categories, heroImage, populatedAuthors, publishedAt, updatedAt, title, meta } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const categoryTitle = categories && categories.length > 0 && typeof categories[0] === 'object' ? categories[0].title : 'Nyheter'
  const titleTypographyClass = getPostTitleClassName(categories)
  const ingress = post.ingress || meta?.description || ''
  const heroCaption = heroImage && typeof heroImage === 'object' ? heroImage.caption : null
  const heroPhotographer = heroImage && typeof heroImage === 'object' ? heroImage.photographer : null
  const publishedDateLabel = publishedAt ? formatDateTime(publishedAt) : null
  const updatedDateLabel = updatedAt ? formatDateTime(updatedAt) : null

  return (
    <div className="pb-10">
      <div className="container max-w-[48rem] mx-auto px-4 pt-6">
        <p className="article-kicker mb-3">{categoryTitle}</p>

        <h1
          className={`article-headline text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 ${titleTypographyClass}`}
        >
          {title}
        </h1>
      </div>

      {heroImage && typeof heroImage !== 'string' && (
        <div className="max-w-[48rem] mx-auto px-0 md:px-4 mb-6">
          <figure className="image-figure">
            <Media
              imgClassName=""
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
          className="article-meta-row flex flex-wrap items-baseline gap-x-5 gap-y-1 py-3 border-t border-b"
          style={{ borderColor: 'oklch(88% 0 0deg)' }}
        >
          {hasAuthors && (
            <span className="article-meta-author text-sm font-semibold text-neutral-800">
              {formatAuthors(populatedAuthors || [])}
            </span>
          )}
          {publishedAt && publishedDateLabel && (
            <span className="article-meta-item text-sm text-neutral-600 tabular-nums">
              <span className="article-meta-label">Publisert:</span>{' '}
              <time dateTime={publishedAt}>{publishedDateLabel}</time>
            </span>
          )}
          {updatedAt && updatedDateLabel && (
            <span className="article-meta-item text-sm text-neutral-600 tabular-nums">
              <span className="article-meta-label">Sist endret:</span>{' '}
              <time dateTime={updatedAt}>{updatedDateLabel}</time>
            </span>
          )}
        </div>
      </div>

      {ingress && (
        <div className="container max-w-[48rem] mx-auto px-4 pt-5">
          <p className="article-ingress">{ingress}</p>
        </div>
      )}
    </div>
  )
}
