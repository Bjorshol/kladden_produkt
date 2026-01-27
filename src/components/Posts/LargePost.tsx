import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Post } from '@/payload-types'
import type { PostThemeColor } from '@/theme/postColorMap'
import { postColorMap } from '@/theme/postColorMap'

interface LargePostProps {
  post: Post
}

export const LargePost: React.FC<LargePostProps> = ({ post }) => {
  const imageUrl = post.heroImage && typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage.url) : null
  const stikktittel = post.stikktittel || ''

  const themeColor = (post as unknown as { themeColor?: PostThemeColor }).themeColor
  const isDefaultTheme = !themeColor || themeColor === 'default'
  const theme = themeColor ? postColorMap[themeColor] ?? postColorMap.default : postColorMap.default
  const themedStyle = isDefaultTheme
    ? undefined
    : ({ backgroundColor: theme.bg, color: theme.text } satisfies React.CSSProperties)

  return (
    <Link href={`/posts/${post.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-red-600">
      <div
        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 w-full"
        style={themedStyle}
      >
        {imageUrl && (
          <div className="relative w-full overflow-hidden rounded-t-lg aspect-[16/9] max-h-[180px] md:max-h-[340px]">
            <NextImage
              src={imageUrl}
              alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            className={isDefaultTheme ? 'font-bold leading-tight mb-2 break-words text-neutral-900' : 'font-bold leading-tight mb-2 break-words'}
            style={{
              fontSize: 'clamp(1.25rem, 5vw, 2rem)', // 20px-32px
              lineHeight: 1.15,
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={post.title}
            tabIndex={-1}
          >
            {post.title}
          </h2>
        </div>
      </div>
    </Link>
  )
}