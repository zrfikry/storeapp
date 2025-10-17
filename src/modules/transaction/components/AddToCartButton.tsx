'use client'

import React from 'react'
import type { Product } from "_/modules/product/dto";
import { useCartActions } from "../context";
import Button from "_/modules/common/components/Button";

/**
 * Button that adds a product to the cart using Redux-backed actions.
 * Prevents link navigation when used inside clickable cards.
 */
export default function AddToCartButton({ product, qty = 1, className = "" }: { product: Product; qty?: number; className?: string }) {
  const { add } = useCartActions()

  return (
    <Button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); add(product, qty) }}
      className={className}
      aria-label="Add to cart"
   >
      Add to cart
    </Button>
  )
}
