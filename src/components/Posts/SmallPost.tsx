import React from 'react'
import Link from 'next/link'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Post } from '@/payload-types'

interface SmallPostProps {
  post: Post
}

export const SmallPost: React.FC<SmallPostProps> = ({ post }) => {
  const imageUrl = post.heroImage && typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage.url) : null
  const excerpt = post.meta?.description || ''
  const category = post.categories && post.categories.length > 0 && typeof post.categories[0] === 'object' ? post.categories[0].title : 'Nyheter'

  return (
    <Link href={`/posts/${post.slug}`} className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      {imageUrl && (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={imageUrl}
            alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{category}</div>
        <h3 className="text-lg font-bold leading-tight line-clamp-2 mb-2">{post.title}</h3>
        {excerpt && <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{excerpt}</p>}
      </div>
    </Link>
  )
}