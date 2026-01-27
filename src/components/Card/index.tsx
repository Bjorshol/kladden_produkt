'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import { postColorMap } from '@/theme/postColorMap'
import type { CardPostDataPatched } from './CardPostDataPatched'

import { Media } from '@/components/Media'

// Bakoverkompatibilitet: andre steder importerer fortsatt CardPostData fra denne modulen
export type CardPostData = CardPostDataPatched

type CardStyleVars = React.CSSProperties & {
  '--post-bg'?: string
  '--post-fg'?: string
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostDataPatched
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, themeColor } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  // Finn farger fra themeColor eller bruk default
  const colorKey = themeColor && postColorMap[themeColor] ? themeColor : 'default'
  const { bg, text } = postColorMap[colorKey]

  const style: CardStyleVars = {
    '--post-bg': bg,
    '--post-fg': text,
    backgroundColor: 'var(--post-bg, #fff)',
    color: 'var(--post-fg, #2a2a2a)',
  }

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
      style={style}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4" style={{ color: 'var(--post-fg, #2a2a2a)' }}>
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3
              className="font-bold leading-tight break-words"
              style={{
                fontSize: 'clamp(1.15rem, 5vw, 1.5rem)',
                lineHeight: 1.18,
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: 0,
                color: 'var(--post-fg, #2a2a2a)',
              }}
              title={titleToUse}
              tabIndex={-1}
            >
              <Link className="not-prose" href={href} ref={link.ref} tabIndex={-1} style={{ color: 'inherit' }}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2"><p style={{ color: 'var(--post-fg, #2a2a2a)' }}>{sanitizedDescription}</p></div>}
      </div>
    </article>
  )
}
