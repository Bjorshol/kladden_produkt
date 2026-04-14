import React from 'react'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type IntroduksjonProps = {
  className?: string
  description: string
  disableInnerContainer?: boolean
  enableGutter?: boolean
  media: number | string | Record<string, unknown>
  name: string
}

export const IntroduksjonBlock: React.FC<IntroduksjonProps> = (props) => {
  const { className, description, enableGutter = true, media, name } = props

  return (
    <div
      className={cn(
        {
          'container md:px-4 px-0': enableGutter,
        },
        className,
      )}
    >
      <article className="w-full max-w-3xl border border-border bg-card p-3 sm:p-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-24">
            <Media
              fill
              imgClassName="object-cover"
              resource={media}
              size="(max-width: 640px) 80px, 96px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">{name}</h3>
            <p className="mt-1 whitespace-pre-line text-sm leading-snug text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
