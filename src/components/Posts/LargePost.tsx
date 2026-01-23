import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Post } from '@/payload-types'

interface LargePostProps {
  post: Post
}

export const LargePost: React.FC<LargePostProps> = ({ post }) => {
  const imageUrl = post.heroImage && typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage.url) : null
  const stikktittel = post.stikktittel || ''

  return (
    <Link href={`/posts/${post.slug}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      {imageUrl && (
        <div className="relative w-full overflow-hidden rounded-t-lg aspect-[16/9] max-h-[340px]">
          <NextImage
            src={imageUrl}
            alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || post.title : post.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 120vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        {stikktittel && <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">{stikktittel}</div>}

        <h2 className="text-2xl md:text-6xl font-bold leading-tight mb-2">{post.title}</h2>

      </div>
    </div>
    </Link>
  )
}