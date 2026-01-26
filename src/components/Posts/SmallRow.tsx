import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Post } from '@/payload-types'

interface SmallRowProps {
  post: Post
}

export const SmallRow: React.FC<SmallRowProps> = ({ post }) => {
  const imageUrl = post.heroImage && typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage.url) : null
  const stikktittel = post.stikktittel || ''

  return (
    <Link href={`/posts/${post.slug}`} className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 w-full focus:outline-none focus:ring-2 focus:ring-red-600">
      <div className="flex h-20 md:h-24">
        {imageUrl && (
          <div className="w-20 md:w-28 flex-shrink-0 relative">
            <NextImage
              src={imageUrl}
              alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
              fill
              className="object-cover object-center"
              sizes="80px"
              priority
            />
          </div>
        )}
        <div className="flex-1 px-3 py-2 md:p-4 flex flex-col justify-center min-w-0">
          {stikktittel && (
            <div className="text-xs md:text-sm uppercase tracking-wide text-gray-500 mb-1 truncate">
              {stikktittel}
            </div>
          )}
          <h2
            className="font-bold leading-tight break-words text-neutral-900"
            style={{
              fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', // 17.6px-24px
              lineHeight: 1.18,
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
            {post.title}
          </h2>
        </div>
      </div>
    </Link>
  )
}