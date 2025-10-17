'use client'

import { Cart1Solid } from '@lineiconshq/free-icons'
import { Lineicons } from '@lineiconshq/react-lineicons'
import React from 'react'

import { t } from '_/i18n'
import Button from '_/modules/common/components/Button'

import { useCart } from '../context'


export type CartButtonProps = {
  onClick?: () => void
}

/**
 * Cart button showing the total items count.
 * @param onClick Optional click handler to toggle the cart drawer.
 */
const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <Button
      type="button"
      onClick={onClick}
      aria-label={t('common.openCart')}
    >
      <Lineicons icon={Cart1Solid} />
      {count > 0 && <span className="inline-flex items-center justify-center ml-2 text-xs min-w-5 h-5 px-1 rounded-full bg-white">{count}</span>}
    </Button>
  )
}

export default CartButton
