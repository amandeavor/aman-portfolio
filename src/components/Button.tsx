import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import type { Icon } from '@phosphor-icons/react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  icon?: Icon
  iconPosition?: 'left' | 'right'
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  icon: IconComponent,
  iconPosition = 'right',
}: ButtonProps) {
  const baseStyles = 'inline-flex min-h-11 items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-full tracking-normal transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offblack/25 focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-zinc-100/40 dark:focus-visible:ring-offset-[#111111] select-none cursor-pointer'

  const variants = {
    primary: 'bg-offblack text-zinc-50 hover:bg-zinc-800 active:scale-[0.98]',
    secondary: 'bg-white border border-zinc-200 text-offblack hover:bg-zinc-50 active:scale-[0.98] shadow-sm',
    ghost: 'text-zinc-500 hover:text-offblack hover:bg-zinc-100/50 active:scale-[0.98]',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {IconComponent && iconPosition === 'left' && (
        <IconComponent size={14} weight="bold" className="shrink-0" aria-hidden="true" />
      )}
      <span>{children}</span>
      {IconComponent && iconPosition === 'right' && (
        <IconComponent size={14} weight="bold" className="shrink-0" aria-hidden="true" />
      )}
    </motion.button>
  )
}
