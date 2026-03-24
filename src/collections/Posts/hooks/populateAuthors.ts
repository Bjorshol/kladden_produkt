import type { CollectionAfterReadHook } from 'payload'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
//
// Authors can now come from either the `users` collection or the standalone `authors` collection.
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  if (doc?.authors && doc.authors.length > 0) {
    const populatedAuthors: { id: string; name: string }[] = []

    for (const author of doc.authors) {
      try {
        // Polymorphic relationship: { relationTo, value } or a plain id (legacy)
        const relationTo: string =
          typeof author === 'object' && 'relationTo' in author ? author.relationTo : 'users'
        const id =
          typeof author === 'object' && 'value' in author
            ? typeof author.value === 'object'
              ? author.value?.id
              : author.value
            : typeof author === 'object'
              ? author?.id
              : author

        if (!id) continue

        const authorDoc = await payload.findByID({
          id,
          collection: relationTo as 'users' | 'authors',
          depth: 0,
        })

        if (authorDoc) {
          populatedAuthors.push({
            id: String(authorDoc.id),
            name: (authorDoc as { name?: string }).name || '',
          })
        }
      } catch {
        // swallow error
      }
    }

    if (populatedAuthors.length > 0) {
      doc.populatedAuthors = populatedAuthors
    }
  }

  return doc
}

