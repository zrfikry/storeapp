'use client'

import React, { useState } from 'react'
import { useCart, useCartActions } from '../context'
import CartItemRow from './CartItemRow'
import { calcSubtotal, calcTotal, formatCurrency } from '../helpers'
import Button from "_/modules/common/components/Button";

/**
 * Sliding cart drawer overlay that lists items and shows totals.
 * Controlled internally and via custom window events (cart:open|close|toggle).
 */
export default function CartDrawer() {
  const [open, setOpen] = useState(false)
  const { items } = useCart()
  const { clear } = useCartActions()

  const subtotal = calcSubtotal(items)
  const total = calcTotal(items)

  return (
    <div>
      {/* Toggle Button (will be shown in layout via cart button prop ideally, but include here for fallback) */}
      {/* Hidden, kept for potential standalone usage */}

      {/* Drawer overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer panel */}
      <div className={`fixed top-0 right-0 h-full w-[90vw] max-w-md bg-[#111] text-white shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button className="text-sm text-gray-300 hover:text-white" onClick={() => setOpen(false)}>Close</button>
        </div>
        <div className="p-4 overflow-auto h-[calc(100%-200px)]">
          {items.length === 0 ? (
            <p className="text-sm text-gray-400">Your cart is empty.</p>
          ) : (
            items.map((item) => <CartItemRow key={item.product.id} item={item} />)
          )}
        </div>
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Total</span>
            <span className="font-semibold">{formatCurrency(total)}</span>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Button>Checkout</Button>
            <Button className="hover:text-red-400" variant="ghost" onClick={() => clear()}>Clear</Button>
          </div>
        </div>
      </div>

      {/* Control from outside via custom event */}
      <CartDrawerController open={open} setOpen={setOpen} />
    </div>
  )
}

// Small helper component to listen to custom events to open/close the drawer from header button
/**
 * Controller component that subscribes to window cart events to toggle state.
 * @param open Current open state used for toggle handler.
 * @param setOpen Setter for the open state.
 */
function CartDrawerController({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  React.useEffect(() => {
    const openHandler = () => setOpen(true)
    const closeHandler = () => setOpen(false)
    const toggleHandler = () => setOpen(!open)

    window.addEventListener('cart:open', openHandler)
    window.addEventListener('cart:close', closeHandler)
    window.addEventListener('cart:toggle', toggleHandler)
    return () => {
      window.removeEventListener('cart:open', openHandler)
      window.removeEventListener('cart:close', closeHandler)
      window.removeEventListener('cart:toggle', toggleHandler)
    }
  }, [open, setOpen])
  return null
}
