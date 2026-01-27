// Patch for CardPostData type to inkludere themeColor midlertidig til Payload types er regenerert

import type { Post } from '@/payload-types'

export type CardPostDataPatched = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'themeColor'>
