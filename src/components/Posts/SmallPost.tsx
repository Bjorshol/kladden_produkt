import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatDateTime } from '@/utilities/formatDateTime'
import type { Post } from '@/payload-types'

interface SmallCardProps {
  post: Post
}

export const SmallCard: React.FC<SmallCardProps> = ({ post }) => {
  const imageUrl = post.heroImage && typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage.url) : null
  const excerpt = post.ingress || post.meta?.description || ''
  const stikktittel = post.stikktittel || ''
  const hasAuthors = post.populatedAuthors && post.populatedAuthors.length > 0 && formatAuthors(post.populatedAuthors || []) !== ''

  return (
    <Link href={`/posts/${post.slug}`} className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      <div className="flex flex-row md:flex-col h-24 md:h-auto">
        {imageUrl && (
          <div className="w-28 md:w-full aspect-[4/3] relative flex-shrink-0 overflow-hidden rounded-t-lg md:rounded-t-lg">
            <NextImage
              src={imageUrl}
              alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="flex-1 p-3 md:p-3">
          {stikktittel && <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{stikktittel}</div>}
          <h3 className="text-4xl md:text-xl font-bold leading-tight line-clamp-2 mb-1">{post.title}</h3>
          {excerpt && <p className="text-sm leading-relaxed line-clamp-1 mb-1">{excerpt}</p>}
        </div>
      </div>
    </Link>
  )
}