'use client'

import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
}

/**
 * Reusable themed button component.
 * - Variants: primary | secondary | ghost
 * - Sizes: sm | md | lg
 * - Honors disabled + loading states and supports full width.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded transition select-none whitespace-nowrap cursor-pointer'

  const sizeCls: Record<ButtonSize, string> = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2.5',
  }

  const variantCls: Record<ButtonVariant, string> = {
    primary:
      'bg-[color:var(--accent)] text-[color:var(--accent-contrast)] hover:brightness-95 disabled:opacity-60 disabled:pointer-events-none',
    secondary:
      'bg-[color:var(--surface)]/80 border border-[color:var(--surface-border)]/70 text-[color:var(--foreground)] hover:bg-[color:var(--surface)]/95 disabled:opacity-60 disabled:pointer-events-none',
    ghost:
      'bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--surface)]/40 border border-transparent disabled:opacity-60 disabled:pointer-events-none',
  }

  const widthCls = fullWidth ? 'w-full' : ''

  return (
    <button
      type="button"
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={`${base} ${sizeCls[size]} ${variantCls[variant]} ${widthCls} ${className}`}
      {...rest}
    >
      {loading && (
        <span
          className="mr-2 inline-block h-4 w-4 border-2 border-[color:var(--foreground)]/30 border-t-[color:var(--foreground)] rounded-full animate-spin"
          aria-hidden
        />
      )}
      {children}
    </button>
  )
}
