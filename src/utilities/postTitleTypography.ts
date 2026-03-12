type CategoryLike = {
  title?: null | string
} | null | number | string | undefined

const OPINION_CATEGORY_TITLES = new Set(['debatt', 'leder'])

const normalize = (value: string) => value.trim().toLowerCase()

export const isOpinionPost = (categories?: CategoryLike[] | null): boolean => {
  if (!Array.isArray(categories)) return false

  return categories.some((category) => {
    if (!category || typeof category !== 'object' || !('title' in category)) return false

    const title = category.title
    if (!title) return false

    return OPINION_CATEGORY_TITLES.has(normalize(title))
  })
}

export const getPostTitleClassName = (categories?: CategoryLike[] | null): string => {
  return isOpinionPost(categories) ? 'post-title-opinion' : 'post-title-news'
}
