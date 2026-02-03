import clsx from 'clsx'
import React from 'react'

type LogoTextVariant = 'topbar' | 'footer' | 'default'

const variantClasses: Record<LogoTextVariant, string> = {
  default: 'text-2xl tracking-[0.12em]',
  topbar: 'text-[30px] tracking-[0.14em] md:text-2xl',
  footer: 'text-2xl tracking-[0.12em]',
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
        'font-logo uppercase leading-[1.05] whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
