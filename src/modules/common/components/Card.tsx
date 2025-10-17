'use client'

import Link from 'next/link'
import React from 'react'

export type CardProps = {
  href?: string
  className?: string
  children: React.ReactNode
}

/**
 * Presentational container with a subtle translucent surface and rounded corners.
 * If an href is provided, renders as a Next.js Link; otherwise renders a div.
 */
const Card: React.FC<CardProps> = ({ href, className = '', children }) => {
  const base = 'block rounded-lg p-4 bg-[color:var(--surface)]/70 hover:bg-[color:var(--surface)]/80 border border-[color:var(--surface-border)]/60 hover:shadow transition'
  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    )
  }
  return (
    <div className={`${base} ${className}`}>
      {children}
    </div>
  )
}

export default Card
