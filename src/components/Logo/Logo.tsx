import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span
      aria-label="Kladden"
      className={clsx(
        'inline-flex items-center justify-center font-logo font-extrabold leading-none',
        className,
      )}
      style={{ color: 'var(--color-brand-red, #c9252c)' }}
    >
      <span className="text-[34px]">K</span>
    </span>
  )
}
