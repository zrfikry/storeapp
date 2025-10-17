'use client'

import { useCallback } from 'react'
import type { Product } from "_/modules/product/dto";
import { useAppDispatch, useAppSelector } from "_/store";
import { add as addAction, remove as removeAction, increase as increaseAction, decrease as decreaseAction, setQty as setQtyAction, clear as clearAction } from './state/cartSlice'
import type { CartState } from './state/cartSlice'

/**
 * Select the current cart state from the Redux store.
 * @returns The cart state slice (items only).
 */
export function useCart(): CartState {
  const items = useAppSelector((s) => s.cart.items)
  return { items }
}

/**
 * Provide memoized cart action dispatchers backed by Redux Toolkit.
 * @returns Bound action creators for cart operations.
 */
export function useCartActions() {
  const dispatch = useAppDispatch()

  const add = useCallback((product: Product, qty = 1) => dispatch(addAction({ product, qty })), [dispatch])
  const remove = useCallback((productId: number) => dispatch(removeAction({ productId })), [dispatch])
  const increase = useCallback((productId: number, amount = 1) => dispatch(increaseAction({ productId, amount })), [dispatch])
  const decrease = useCallback((productId: number, amount = 1) => dispatch(decreaseAction({ productId, amount })), [dispatch])
  const setQty = useCallback((productId: number, qty: number) => dispatch(setQtyAction({ productId, qty })), [dispatch])
  const clear = useCallback(() => dispatch(clearAction()), [dispatch])

  return { add, remove, increase, decrease, setQty, clear }
}
