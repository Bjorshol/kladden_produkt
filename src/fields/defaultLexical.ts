
import type { TextFieldSingleValidation } from 'payload'
import React from 'react'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

// Character counter plugin for Lexical editor
const CharacterCounterPlugin = () => {
  const [charCount, setCharCount] = React.useState(0)
  // TODO: Connect to Lexical editor state to update charCount
  return (
    <div style={{
      padding: '8px 12px',
      borderTop: '1px solid #ddd',
      fontSize: '12px',
      color: '#666',
      textAlign: 'right',
      backgroundColor: '#f9f9f9',
    }}>
      Tegn (inkl. mellomrom): {charCount}
    </div>
  )
}

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
  plugins: [
    {
      Component: CharacterCounterPlugin,
    },
  ],
})
