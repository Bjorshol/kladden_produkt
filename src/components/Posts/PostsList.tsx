import React from 'react'
import { SmallPost } from './SmallPost'
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
        // Two small posts side by side
        elements.push(
          <div key={`pair-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SmallPost post={post} />
            <SmallPost post={posts[i + 1]} />
          </div>
        )
        i += 2
      } else {
        // Single post full width
        const currentSize = post.size || 'large'
        if (currentSize === 'large') {
          elements.push(
            <div key={post.id} className="mb-8">
              <LargePost post={post} />
            </div>
          )
        } else {
          elements.push(
            <div key={post.id} className="mb-6">
              <SmallPost post={post} />
            </div>
          )
        }
        i += 1
      }
    }

    return elements
  }

  return <div className="container mx-auto px-4 py-8">{renderPosts()}</div>
}