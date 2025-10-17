import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { Product } from '_/modules/product/dto'
import type { CartItem } from '_/modules/transaction/helpers'

export type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add a product to the cart or increase its quantity if it already exists.
     */
    add: (state, action: PayloadAction<{ product: Product; qty?: number }>) => {
      const { product, qty = 1 } = action.payload
      const idx = state.items.findIndex(it => it.product.id === product.id)
      if (idx === -1) {
        state.items.push({ product, qty: Math.max(1, qty) })
      } else {
        state.items[idx].qty += Math.max(1, qty)
      }
    },
    /**
     * Remove a product from the cart by id.
     */
    remove: (state, action: PayloadAction<{ productId: number }>) => {
      state.items = state.items.filter(it => it.product.id !== action.payload.productId)
    },
    /**
     * Increase the quantity of a product by a given amount (default 1).
     */
    increase: (state, action: PayloadAction<{ productId: number; amount?: number }>) => {
      const { productId, amount = 1 } = action.payload
      const item = state.items.find(i => i.product.id === productId)
      if (item) item.qty += Math.max(1, amount)
    },
    /**
     * Decrease the quantity of a product and remove it if it reaches zero.
     */
    decrease: (state, action: PayloadAction<{ productId: number; amount?: number }>) => {
      const { productId, amount = 1 } = action.payload
      const item = state.items.find(i => i.product.id === productId)
      if (item) {
        item.qty = Math.max(0, item.qty - Math.max(1, amount))
        if (item.qty === 0) {
          state.items = state.items.filter(i => i.product.id !== productId)
        }
      }
    },
    /**
     * Set the quantity of a product explicitly; removes item if qty becomes zero.
     */
    setQty: (state, action: PayloadAction<{ productId: number; qty: number }>) => {
      const { productId, qty } = action.payload
      const item = state.items.find(i => i.product.id === productId)
      if (item) {
        item.qty = Math.max(0, qty)
        if (item.qty === 0) {
          state.items = state.items.filter(i => i.product.id !== productId)
        }
      }
    },
    /**
     * Clear all items from the cart.
     */
    clear: (state) => {
      state.items = []
    },
  },
})

export const { add, remove, increase, decrease, setQty, clear } = cartSlice.actions

export default cartSlice.reducer
