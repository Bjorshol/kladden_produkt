// Type for Card-data som støtter themeColor selv før payload-types er regenerert

import type { Post } from '@/payload-types'
import type { PostThemeColor } from '@/theme/postColorMap'

export type CardPostDataPatched = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'> & {
	themeColor?: PostThemeColor
}
