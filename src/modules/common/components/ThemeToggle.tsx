'use client'

import { Sun1Solid, MoonHalfRight5Solid } from '@lineiconshq/free-icons'
import { Lineicons } from '@lineiconshq/react-lineicons'
import React from 'react'

import { t } from '_/i18n'
import { useAppDispatch, useAppSelector } from '_/store'

import { toggleTheme } from '../state/themeSlice'


/**
 * Switch-style theme toggle backed by Redux slice with Lineicons icon.
 * Accessible via role="switch" and aria-checked; sync handled by ThemeProvider.
 */
const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((s) => s.theme.mode)
  const isDark = mode === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={t('common.toggleTheme')}
      onClick={() => dispatch(toggleTheme())}
      className={`relative inline-flex justify-center items-center h-8 w-14 rounded-full border border-[color:var(--surface-border)]/70 bg-[color:var(--surface)]/60 backdrop-blur transition shadow-sm hover:shadow leading-none p-0 align-middle ${isDark ? 'ring-0' : ''}`}
    >
      <span
        className={`absolute left-1 h-6 w-6 rounded-full border border-[color:var(--surface-border)] bg-[color:var(--surface)] shadow transform transition-transform duration-200 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
      >
        <span className="flex items-center justify-center h-full w-full text-[11px] leading-none text-[color:var(--foreground)]">
          <Lineicons icon={isDark ? MoonHalfRight5Solid : Sun1Solid} size={16} />
        </span>
      </span>
    </button>
  )
}

export default ThemeToggle
