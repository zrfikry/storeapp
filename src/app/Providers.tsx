'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "_/store";
import ThemeProvider from "_/modules/common/components/ThemeProvider";

/**
 * Global providers for Redux store and redux-persist rehydration.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
