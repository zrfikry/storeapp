'use client'

import React from 'react'

import { t as translate } from '.'

export type I18nContextValue = {
  locale: 'en'
  t: typeof translate
}

export const I18nContext = React.createContext<I18nContextValue>({ locale: 'en', t: translate })

/**
 * Minimal i18n provider for future multi-locale support. Currently fixes locale to 'en'.
 */
const I18nProvider: React.FC<{ children: React.ReactNode; locale?: 'en' }> = ({ children }) => {
  return (
    <I18nContext.Provider value={{ locale: 'en', t: translate }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => React.useContext(I18nContext)

export default I18nProvider
