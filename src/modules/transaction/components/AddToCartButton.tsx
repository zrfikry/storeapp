'use client'

import { PlusSolid } from '@lineiconshq/free-icons'
import { Lineicons } from '@lineiconshq/react-lineicons'
import React from 'react'

import { t } from '_/i18n'
import Button from '_/modules/common/components/Button'
import type { Product } from '_/modules/product/dto'
import { useCartActions } from '_/modules/transaction/context'

/**
 * Button that adds a product to the cart using Redux-backed actions.
 * Prevents link navigation when used inside clickable cards.
 */
const AddToCartButton: React.FC<{ product: Product; qty?: number; className?: string }> = ({ product, qty = 1, className = '' }) => {
  const { add } = useCartActions()

  return (
    <Button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); add(product, qty) }}
      className={className}
      aria-label={t('product.addToCart')}
   >
      <Lineicons icon={PlusSolid} />
      {t('product.addToCart')}
    </Button>
  )
}

export default AddToCartButton
