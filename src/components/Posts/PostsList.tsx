import React from 'react'
import { SmallCard } from './SmallPost'
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
        // Two small posts side by side on all screen sizes
        elements.push(
          <div key={`pair-${i}`} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <SmallCard post={post} />
            <SmallCard post={posts[i + 1]} />
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
          // Single small post - use SmallCard for consistency
          elements.push(
            <div key={post.id} className="mb-4">
              <SmallCard post={post} />
            </div>
          )
        }
        i += 1
      }
    }

    return elements
  }

  return (
    <div className="max-w-[48rem] mx-auto px-4 py-8">
      <div className="space-y-4">
        {renderPosts()}
      </div>
    </div>
  )
}