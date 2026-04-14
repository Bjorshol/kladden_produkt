import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Post } from '@/payload-types'
import type { PostThemeColor } from '@/theme/postColorMap'
import { postColorMap } from '@/theme/postColorMap'
import { getPostTitleClassName } from '@/utilities/postTitleTypography'

interface LargePostProps {
  post: Post
}

export const LargePost: React.FC<LargePostProps> = ({ post }) => {
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
      className="card-link"
    >
      <div
        className="bg-white border border-gray-200 overflow-hidden w-full"
        style={themedStyle}
      >
        {imageUrl && (
          <div className="relative w-full overflow-hidden aspect-[16/9] max-h-[180px] md:max-h-[340px]">
            <NextImage
              src={imageUrl}
              alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
              quality={90}
              priority
            />
          </div>
        )}
        <div className="p-3 md:p-4">
          {stikktittel && (
            <div className={isDefaultTheme ? 'text-xs md:text-sm uppercase tracking-wide text-gray-500 mb-2 truncate' : 'text-xs md:text-sm uppercase tracking-wide mb-2 truncate opacity-80'}>
              {stikktittel}
            </div>
          )}
          <h2
            className={
              isDefaultTheme
                ? `${titleTypographyClass} leading-tight mb-2 break-words text-neutral-800`
                : `${titleTypographyClass} leading-tight mb-2 break-words`
            }
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1.1,
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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