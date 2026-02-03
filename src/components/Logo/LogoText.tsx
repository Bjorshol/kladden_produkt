import clsx from 'clsx'
import React from 'react'

type LogoTextVariant = 'topbar' | 'footer' | 'default'

const variantClasses: Record<LogoTextVariant, string> = {
  default: 'text-2xl tracking-[0.02em]',
  topbar: 'text-[38px] tracking-[0.035em] md:text-[34px] md:tracking-[0.03em]',
  footer: 'text-2xl tracking-[0.02em]',
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
