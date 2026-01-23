import React from 'react'
import Link from 'next/link'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Post } from '@/payload-types'

interface LargePostProps {
  post: Post
}

export const LargePost: React.FC<LargePostProps> = ({ post }) => {
  const imageUrl = post.heroImage && typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage.url) : null
  const excerpt = '' // TODO: Extract excerpt from content

  return (
    <Link href={`/posts/${post.slug}`} className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {imageUrl && (
        <div className="w-full h-64">
          <img
            src={imageUrl}
            alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        {excerpt && <p className="text-gray-700">{excerpt}...</p>}
      </div>
    </Link>
  )
}