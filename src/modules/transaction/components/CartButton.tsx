'use client'

import React from 'react'
import { useCart } from '../context'
import Button from "_/modules/common/components/Button";

/**
 * Cart button showing the total items count.
 * @param onClick Optional click handler to toggle the cart drawer.
 */
export default function CartButton({ onClick }: { onClick?: () => void }) {
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <Button
      type="button"
      onClick={onClick}
      aria-label="Open cart"
    >
      <span>Cart</span>
      <span className="inline-flex items-center justify-center text-xs min-w-5 h-5 px-1 rounded-full text-white">{count}</span>
    </Button>
  )
}
