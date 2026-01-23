import React from 'react'
import Link from 'next/link'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatDateTime } from '@/utilities/formatDateTime'
import type { Post } from '@/payload-types'

interface LargePostProps {
  post: Post
}

export const LargePost: React.FC<LargePostProps> = ({ post }) => {
  const imageUrl = post.heroImage && typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage.url) : null
  const excerpt = post.ingress || post.meta?.description || ''
  const category = post.categories && post.categories.length > 0 && typeof post.categories[0] === 'object' ? post.categories[0].title : 'Nyheter'
  const hasAuthors = post.populatedAuthors && post.populatedAuthors.length > 0 && formatAuthors(post.populatedAuthors) !== ''

  return (
    <Link href={`/posts/${post.slug}`} className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      {imageUrl && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <div className="p-6">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{category}</div>
        <h2 className="text-2xl font-bold leading-tight mb-3">{post.title}</h2>
        {excerpt && <p className="text-gray-700 leading-relaxed line-clamp-3 mb-3">{excerpt}</p>}
        <div className="text-sm text-gray-500">
          {hasAuthors && <span>Av {formatAuthors(post.populatedAuthors)}</span>}
          {hasAuthors && post.publishedAt && <span> · </span>}
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>}
        </div>
      </div>
    </Link>
  )
}