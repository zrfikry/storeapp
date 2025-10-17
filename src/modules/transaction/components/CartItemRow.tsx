'use client'

import {Trash3Solid} from '@lineiconshq/free-icons'
import {Lineicons} from '@lineiconshq/react-lineicons'
import Image from 'next/image'
import React from 'react'

import { t } from '_/i18n'
import Button from '_/modules/common/components/Button'

import { useCartActions } from '../context'
import { formatCurrency } from '../helpers'

import type { CartItem } from '../helpers'



/**
 * Render a single cart item row with quantity controls and summary price.
 * @param item The cart item to display.
 */
const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { increase, decrease, remove } = useCartActions()
  const image = item.product.images?.[0]

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/10">
      <div className="w-16 h-16 rounded overflow-hidden bg-white/10 flex-shrink-0">
        {image ? (
          <Image src={image} alt={item.product.title} width={64} height={64} unoptimized className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-xs text-gray-400">{t('common.noImage')}</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{item.product.title}</div>
        <div className="text-xs text-gray-400">{formatCurrency(item.product.price)}</div>
        <div className="mt-2 inline-flex items-center gap-2">
          <Button aria-label={t('cart.decrease')} size="sm" onClick={() => decrease(item.product.id)}>-</Button>
          <span className="text-sm w-6 text-center">{item.qty}</span>
          <Button aria-label={t('cart.increase')} size="sm" onClick={() => increase(item.product.id)}>+</Button>
          <button aria-label={t('cart.remove')} className="cursor-pointer ml-3 text-xs text-red-400 hover:text-red-300" onClick={() => remove(item.product.id)}>
            <Lineicons icon={Trash3Solid} size={18} />
          </button>
        </div>
      </div>
      <div className="text-sm font-medium ml-2">{formatCurrency(item.product.price * item.qty)}</div>
    </div>
  )
}

export default CartItemRow
