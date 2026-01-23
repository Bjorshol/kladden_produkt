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
  const excerpt = post.ingress || post.meta?.description || ''
  const category = post.categories && post.categories.length > 0 && typeof post.categories[0] === 'object' ? post.categories[0].title : 'Nyheter'
  const hasAuthors = post.populatedAuthors && post.populatedAuthors.length > 0 && formatAuthors(post.populatedAuthors || []) !== ''

  return (
    <Link href={`/posts/${post.slug}`} className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      <div className="flex h-24">
        {imageUrl && (
          <div className="w-32 flex-shrink-0 relative">
            <NextImage
              src={imageUrl}
              alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        )}
        <div className="flex-1 p-4 flex flex-col justify-center">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{category}</div>
          <h3 className="text-lg font-bold leading-tight line-clamp-2 mb-1">{post.title}</h3>
          {excerpt && <p className="text-sm leading-relaxed line-clamp-1 text-gray-600">{excerpt}</p>}
          <div className="text-xs text-gray-500 mt-1">
            {hasAuthors && <span>Av {formatAuthors(post.populatedAuthors || [])}</span>}
            {hasAuthors && post.publishedAt && <span> · </span>}
            {post.publishedAt && <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>}
          </div>
        </div>
      </div>
    </Link>
  )
}