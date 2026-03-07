import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateStudentActivity: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc?._status === 'published') {
      payload.logger.info('Revalidating student portal page')
      revalidatePath('/studentportalen')
    }

    if (previousDoc?._status === 'published' && doc?._status !== 'published') {
      payload.logger.info('Revalidating student portal page after unpublish')
      revalidatePath('/studentportalen')
    }
  }

  return doc
}

export const revalidateStudentActivityDelete: CollectionAfterDeleteHook = ({ req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/studentportalen')
  }

  return true
}