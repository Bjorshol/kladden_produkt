import clsx from 'clsx'
import React from 'react'

type LogoTextVariant = 'topbar' | 'footer' | 'default'

const variantClasses: Record<LogoTextVariant, string> = {
  default: 'text-2xl tracking-[-0.02em]',
  topbar: 'text-[32px] tracking-[-0.02em] md:text-2xl',
  footer: 'text-2xl tracking-[-0.02em]',
}

interface Props {
  className?: string
  children?: React.ReactNode
  variant?: LogoTextVariant
}

export const LogoText: React.FC<Props> = ({
  className,
  children = 'KLADDEN',
  variant = 'default',
}) => {
  return (
    <span
      className={clsx(
        'font-logo font-extrabold uppercase leading-[1.02] whitespace-nowrap antialiased',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
