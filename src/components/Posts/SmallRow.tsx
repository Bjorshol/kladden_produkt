import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatDateTime } from '@/utilities/formatDateTime'
import type { Post } from '@/payload-types'

interface SmallRowProps {
  post: Post
}

export const SmallRow: React.FC<SmallRowProps> = ({ post }) => {
  const imageUrl = post.heroImage && typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage.url) : null
  const stikktittel = post.stikktittel || ''
  const hasAuthors = post.populatedAuthors && post.populatedAuthors.length > 0 && formatAuthors(post.populatedAuthors || []) !== ''

  return (
    <Link href={`/posts/${post.slug}`} className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      <div className="flex h-24">
        {imageUrl && (
          <div className="w-28 md:w-36 flex-shrink-0 relative">
            <NextImage
              src={imageUrl}
              alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
        )}
        <div className="flex-1 p-4 flex flex-col justify-center">
          {stikktittel && <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{stikktittel}</div>}
          <h2 className="text-lg md:text-xl font-bold leading-tight line-clamp-2 mb-1">{post.title}</h2>
        </div>
      </div>
    </Link>
  )
}