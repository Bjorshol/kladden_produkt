import React from 'react'
import { SmallCard } from './SmallPost'
import { SmallRow } from './SmallRow'
import { LargePost } from './LargePost'
import type { Post } from '@/payload-types'

interface PostsListProps {
  posts: Post[]
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  const renderDesktopPosts = () => {
    const elements: React.ReactElement[] = []
    let i = 0

    while (i < posts.length) {
      const post = posts[i]
      const postSize = post.size || 'large'
      if (postSize === 'small' && i + 1 < posts.length && (posts[i + 1].size || 'large') === 'small') {
        // Two small posts - different layouts for mobile and desktop
        elements.push(
          <div key={`pair-${i}`}>
            {/* Mobile: stripes */}
            <div className="block md:hidden space-y-3">
              <SmallRow post={post} />
              <SmallRow post={posts[i + 1]} />
            </div>
            {/* Desktop: side by side */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-3">
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
          elements.push(<LargePost key={post.id} post={post} />)
        } else {
          // Single small post - always use stripe layout
          elements.push(<SmallRow key={post.id} post={post} />)
        }
        i += 1
      }
    }

    return elements
  }

  const renderMobilePosts = () => {
    return posts.map((post) => {
      const size = post.size || 'large'
      return size === 'small' ? <SmallRow key={post.id} post={post} /> : <LargePost key={post.id} post={post} />
    })
  }

  return (
    <div className="max-w-[48rem] mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col gap-3 md:gap-6">
        <div className="flex flex-col gap-3 md:hidden">{renderMobilePosts()}</div>
        <div className="hidden md:flex md:flex-col md:gap-6">{renderDesktopPosts()}</div>
      </div>
    </div>
  )
}