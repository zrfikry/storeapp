'use client'

import {XmarkSolid} from '@lineiconshq/free-icons'
import {Lineicons} from '@lineiconshq/react-lineicons'
import React, {useCallback, useEffect, useState} from 'react'

import { t } from '_/i18n'
import Button from '_/modules/common/components/Button'

import { useCart, useCartActions } from '../context'
import { calcSubtotal, calcTotal, formatCurrency } from '../helpers'

import CartItemRow from './CartItemRow'

/**
 * Sliding cart drawer overlay that lists items and shows totals.
 * Controlled internally and via custom window events (cart:open|close|toggle).
 */
const CartDrawer: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { items } = useCart()
  const { clear } = useCartActions()

  const subtotal = calcSubtotal(items)
  const total = calcTotal(items)

  const toggleOpen = useCallback(() => {
    setOpen((v) => !v)
  }, [setOpen])

  const isItemEmpty = items.length === 0

  return (
    <div>
      {/* Drawer overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleOpen}
      />

      {/* Drawer panel */}
      <div className={`fixed top-0 right-0 h-full w-[90vw] max-w-md bg-[color:var(--surface)] text-[color:var(--foreground)] shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">{t('cart.title')}</h2>
          <Button variant="ghost" onClick={toggleOpen}>
            <Lineicons icon={XmarkSolid} />
          </Button>
        </div>
        <div className="p-4 overflow-auto h-[calc(100%-200px)]">
          {isItemEmpty ? (
            <p className="text-sm">{t('cart.empty')}</p>
          ) : (
            items.map((item) => <CartItemRow key={item.product.id} item={item} />)
          )}
        </div>
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{t('common.subtotal')}</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>{t('common.total')}</span>
            <span className="font-semibold">{formatCurrency(total)}</span>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Button disabled={isItemEmpty}>{t('common.checkout')}</Button>
            {!isItemEmpty && <Button className="hover:text-red-400" variant="ghost" onClick={() => clear()}>{t('common.clear')}</Button>}
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
const CartDrawerController: React.FC<{ open: boolean; setOpen: (v: boolean) => void }> = ({ open, setOpen }) => {
  useEffect(() => {
    const toggleHandler = () => setOpen(!open)

    window.addEventListener('cart:toggle', toggleHandler)
    return () => {
      window.removeEventListener('cart:toggle', toggleHandler)
    }
  }, [open, setOpen])
  return null
}

export default CartDrawer
