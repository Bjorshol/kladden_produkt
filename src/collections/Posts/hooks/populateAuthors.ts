import type { CollectionAfterReadHook } from 'payload'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy.
// Authors can come from the `users` collection OR the standalone `authors` collection (externalAuthors).
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  const populated: { id: string; name: string }[] = []

  // -- Users with accounts --
  if (doc?.authors && doc.authors.length > 0) {
    for (const author of doc.authors) {
      try {
        const id = typeof author === 'object' ? author?.id : author
        if (!id) continue
        const authorDoc = await payload.findByID({ id, collection: 'users', depth: 0 })
        if (authorDoc) {
          populated.push({ id: String(authorDoc.id), name: authorDoc.name || '' })
        }
      } catch {
        // swallow
      }
    }
  }

  // -- External authors without user accounts --
  if (doc?.externalAuthors && doc.externalAuthors.length > 0) {
    for (const author of doc.externalAuthors) {
      try {
        const id = typeof author === 'object' ? author?.id : author
        if (!id) continue
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const authorDoc = await payload.findByID({ id, collection: 'authors' as any, depth: 0 })
        if (authorDoc) {
          populated.push({
            id: String(authorDoc.id),
            name: (authorDoc as { name?: string }).name || '',
          })
        }
      } catch {
        // swallow
      }
    }
  }

  if (populated.length > 0) {
    doc.populatedAuthors = populated
  }

  return doc
}

