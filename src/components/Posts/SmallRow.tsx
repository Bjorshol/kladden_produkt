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
    <Link href={`/posts/${post.slug}`} className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      <div className="flex h-16 md:h-24">
        {imageUrl && (
          <div className="w-16 md:w-28 flex-shrink-0 relative">
            <NextImage
              src={imageUrl}
              alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
        )}
        <div className="flex-1 p-2 md:p-4 flex flex-col justify-center min-w-0">
          {stikktittel && <div className="text-xs md:text-sm uppercase tracking-wide text-gray-500 mb-1 truncate">{stikktittel}</div>}
          <h2 className="text-base md:text-xl font-bold leading-tight mb-1 break-words truncate" title={post.title}>{post.title}</h2>
        </div>
      </div>
    </Link>
  )
}