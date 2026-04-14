import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Post } from '@/payload-types'
import type { PostThemeColor } from '@/theme/postColorMap'
import { postColorMap } from '@/theme/postColorMap'
import { getPostTitleClassName } from '@/utilities/postTitleTypography'

interface SmallRowProps {
  post: Post
}

export const SmallRow: React.FC<SmallRowProps> = ({ post }) => {
  const imageUrl = post.heroImage && typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage.url) : null
  const stikktittel = post.stikktittel || ''
  const truncatedTitle = post.title && post.title.length > 65 ? post.title.slice(0, 65) + '…' : post.title

  const themeColor = (post as unknown as { themeColor?: PostThemeColor }).themeColor
  const titleTypographyClass = getPostTitleClassName(post.categories)
  const isDefaultTheme = !themeColor || themeColor === 'default'
  const theme = themeColor ? postColorMap[themeColor] ?? postColorMap.default : postColorMap.default
  const themedStyle = isDefaultTheme
    ? undefined
    : ({ backgroundColor: theme.bg, color: theme.text } satisfies React.CSSProperties)

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="card-link bg-white border border-gray-200 overflow-hidden w-full"
      style={themedStyle}
    >
      <div className="flex h-20 md:h-24">
        {imageUrl && (
          <div className="w-20 md:w-28 flex-shrink-0 relative">
            <NextImage
              src={imageUrl}
              alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 767px) 80px, 112px"
              quality={90}
              priority
            />
          </div>
        )}
        <div className="flex-1 px-3 py-2 md:p-4 flex flex-col justify-center min-w-0">
          {stikktittel && (
            <div className={isDefaultTheme ? 'text-xs md:text-sm uppercase tracking-wide text-gray-500 mb-1 truncate' : 'text-xs md:text-sm uppercase tracking-wide mb-1 truncate opacity-80'}>
              {stikktittel}
            </div>
          )}
          <h2
            className={
              isDefaultTheme
                ? `${titleTypographyClass} leading-tight break-words text-neutral-800`
                : `${titleTypographyClass} leading-tight break-words`
            }
            style={{
              fontSize: 'clamp(1.35rem, 4vw, 1.9rem)',
              lineHeight: 1.15,
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: 0,
            }}
            title={post.title}
            tabIndex={-1}
          >
            {truncatedTitle}
          </h2>
        </div>
      </div>
    </Link>
  )
}