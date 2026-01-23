import React from 'react'
import Link from 'next/link'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Post } from '@/payload-types'

interface SmallPostProps {
  post: Post
}

export const SmallPost: React.FC<SmallPostProps> = ({ post }) => {
  const imageUrl = post.heroImage && typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage.url) : null
  const excerpt = '' // TODO: Extract excerpt from content

  return (
    <Link href={`/posts/${post.slug}`} className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        {imageUrl && (
          <div className="w-1/3">
            <img
              src={imageUrl}
              alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
              className="w-full h-32 object-cover"
            />
          </div>
        )}
        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
          {excerpt && <p className="text-gray-600 text-sm">{excerpt}...</p>}
        </div>
      </div>
    </Link>
  )
}