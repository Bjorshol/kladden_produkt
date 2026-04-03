import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Post } from '@/payload-types'
import type { PostThemeColor } from '@/theme/postColorMap'
import { postColorMap } from '@/theme/postColorMap'
import { getPostTitleClassName } from '@/utilities/postTitleTypography'

interface SmallCardProps {
  post: Post
}

export const SmallCard: React.FC<SmallCardProps> = ({ post }) => {
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
      className="block bg-white border border-gray-200 overflow-hidden w-full [text-decoration-color:currentColor] hover:[text-decoration-color:currentColor] hover:[color:inherit] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
      style={themedStyle}
    >
      <div className="flex flex-row md:flex-col h-24 md:h-auto">
        {imageUrl && (
          <div className="w-24 md:w-full aspect-[4/3] relative flex-shrink-0 overflow-hidden">
            <NextImage
              src={imageUrl}
              alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}
        <div className="flex-1 px-3 py-2 md:p-3 flex flex-col justify-center min-w-0">
          {stikktittel && (
            <div className={isDefaultTheme ? 'text-xs uppercase tracking-wide text-gray-500 mb-1 truncate' : 'text-xs uppercase tracking-wide mb-1 truncate opacity-80'}>
              {stikktittel}
            </div>
          )}
          <h3
            className={
              isDefaultTheme
                ? `${titleTypographyClass} leading-tight break-words text-neutral-900`
                : `${titleTypographyClass} leading-tight break-words`
            }
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
              lineHeight: 1.12,
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
          </h3>
        </div>
      </div>
    </Link>
  )
}