 'use client'

import React from 'react'
import { useMemo, useState } from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const COLLAPSE_AT = 220

type IntroduksjonProps = {
  className?: string
  description: string
  disableInnerContainer?: boolean
  enableGutter?: boolean
  media: MediaType | number | string | null
  name: string
}

export const IntroduksjonBlock: React.FC<IntroduksjonProps> = (props) => {
  const { className, description, enableGutter = true, media, name } = props

  const normalizedDescription = description.trim()
  const shouldCollapse = normalizedDescription.length > COLLAPSE_AT
  const [isExpanded, setIsExpanded] = useState(!shouldCollapse)

  const collapsedText = useMemo(() => {
    if (!shouldCollapse) return normalizedDescription

    return `${normalizedDescription.slice(0, COLLAPSE_AT).trimEnd()}...`
  }, [normalizedDescription, shouldCollapse])

  return (
    <div
      className={cn(
        {
          'container md:px-4 px-0': enableGutter,
        },
        className,
      )}
    >
      <article className="w-full max-w-3xl rounded-xl border border-border/80 bg-card p-3 shadow-sm transition-all sm:p-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg ring-1 ring-black/5 sm:h-24 sm:w-24 md:h-28 md:w-28">
            <Media
              fill
              imgClassName="object-cover"
              resource={media}
              size="(max-width: 640px) 96px, 128px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">{name}</h3>
            <div className="relative mt-1">
              <p className="whitespace-pre-line text-sm leading-snug text-muted-foreground sm:text-base">
                {isExpanded ? normalizedDescription : collapsedText}
              </p>

              {shouldCollapse && !isExpanded && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent" />
              )}
            </div>

            {shouldCollapse && (
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                className={cn(
                  'mt-2 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors sm:text-sm',
                  'border-border bg-background/70 text-foreground hover:bg-background',
                )}
              >
                {isExpanded ? 'Vis mindre' : 'Les mer'}
              </button>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
