'use client'

import React from 'react'
import CartButton from "./CartButton";

/**
 * Header controls for the cart, dispatching a toggle event on click.
 */
export default function CartHeaderControls() {
  const onClick = React.useCallback(() => {
    window.dispatchEvent(new Event('cart:toggle'))
  }, [])
  return (
    <CartButton onClick={onClick} />
  )
}
