'use client'

import React from 'react'
import { useAppSelector } from '_/store'

/**
 * Syncs the current theme mode from Redux with the <html> element classes
 * and mirrors it into localStorage under key `theme` for fast first paint.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((s) => s.theme.mode)

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.remove('theme-light', 'theme-dark', 'light', 'dark')
    if (mode === 'dark') {
      root.classList.add('theme-dark', 'dark')
    } else {
      root.classList.add('theme-light', 'light')
    }
    try { window.localStorage.setItem('theme', mode) } catch {}
  }, [mode])

  return <>{children}</>
}
