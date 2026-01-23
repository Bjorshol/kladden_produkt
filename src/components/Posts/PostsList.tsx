import React from 'react'
import { SmallCard } from './SmallPost'
import { SmallRow } from './SmallRow'
import { LargePost } from './LargePost'
import type { Post } from '@/payload-types'

interface PostsListProps {
  posts: Post[]
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  const renderPosts = () => {
    const elements: React.ReactElement[] = []
    let i = 0

    while (i < posts.length) {
      const post = posts[i]
      const postSize = post.size || 'large'
      if (postSize === 'small' && i + 1 < posts.length && (posts[i + 1].size || 'large') === 'small') {
        // Two small posts - different layouts for mobile and desktop
        elements.push(
          <div key={`pair-${i}`} className="mb-6">
            {/* Mobile: stripes */}
            <div className="block md:hidden space-y-4">
              <SmallRow post={post} />
              <SmallRow post={posts[i + 1]} />
            </div>
            {/* Desktop: side by side */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-4">
              <SmallCard post={post} />
              <SmallCard post={posts[i + 1]} />
            </div>
          </div>
        )
        i += 2
      } else {
        // Single post full width
        const currentSize = post.size || 'large'
        if (currentSize === 'large') {
          elements.push(
            <div key={post.id} className="mb-6">
              <LargePost post={post} />
            </div>
          )
        } else {
          // Single small post - always use stripe layout
          elements.push(
            <div key={post.id} className="mb-4">
              <SmallRow post={post} />
            </div>
          )
        }
        i += 1
      }
    }

    return elements
  }

  return (
    <div className="max-w-[48rem] mx-auto px-4 py-8 bg-red-50">
      <div className="space-y-4">
        {renderPosts()}
      </div>
    </div>
  )
}