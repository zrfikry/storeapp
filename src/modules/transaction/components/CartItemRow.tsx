'use client'

import React from 'react'
import Image from 'next/image'
import { useCartActions } from '../context'
import type { CartItem } from '../helpers'
import { formatCurrency } from '../helpers'
import Button from "_/modules/common/components/Button";

/**
 * Render a single cart item row with quantity controls and summary price.
 * @param item The cart item to display.
 */
export default function CartItemRow({ item }: { item: CartItem }) {
  const { increase, decrease, remove } = useCartActions()
  const image = item.product.images?.[0]

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/10">
      <div className="w-16 h-16 rounded overflow-hidden bg-white/10 flex-shrink-0">
        {image ? (
          <Image src={image} alt={item.product.title} width={64} height={64} unoptimized className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-xs text-gray-400">No image</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{item.product.title}</div>
        <div className="text-xs text-gray-400">{formatCurrency(item.product.price)}</div>
        <div className="mt-2 inline-flex items-center gap-2">
          <Button aria-label="Decrease" size="sm" onClick={() => decrease(item.product.id)}>-</Button>
          <span className="text-sm w-6 text-center">{item.qty}</span>
          <Button aria-label="Increase" size="sm" onClick={() => increase(item.product.id)}>+</Button>
          <button aria-label="Remove" className="ml-3 text-xs text-red-400 hover:text-red-300" onClick={() => remove(item.product.id)}>Remove</button>
        </div>
      </div>
      <div className="text-sm font-medium ml-2">{formatCurrency(item.product.price * item.qty)}</div>
    </div>
  )
}
