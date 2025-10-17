'use client'

import React from 'react'
import { useAppDispatch, useAppSelector } from '_/store'
import { toggleTheme } from '../state/themeSlice'
import Button from "_/modules/common/components/Button";

/**
 * Toggle between light and dark themes backed by Redux slice.
 * Works with Tailwind's `dark:` variant by toggling the `dark` class on <html> via ThemeProvider.
 */
export default function ThemeToggle() {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((s) => s.theme.mode)

  return (
    <Button
      type="button"
      aria-label="Toggle theme"
      onClick={() => dispatch(toggleTheme())}
    >
      <span className="text-sm">{mode === 'dark' ? 'Light' : 'Dark'} theme</span>
    </Button>
  )
}
