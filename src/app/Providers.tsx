'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import I18nProvider from '_/i18n/I18nProvider'
import ThemeProvider from '_/modules/common/components/ThemeProvider'
import { store, persistor } from '_/store'

/**
 * Global providers for Redux store and redux-persist rehydration.
 */
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default Providers
