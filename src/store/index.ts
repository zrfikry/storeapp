import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import themeReducer from '_/modules/common/state/themeSlice'
import cartReducer from '_/modules/transaction/state/cartSlice'

// Safe storage for SSR (noop on server)
/**
 * Create a no-op storage adapter to satisfy redux-persist during SSR.
 * @returns Storage-like object with Promise-based methods.
 */
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value)
    },
    removeItem() {
      return Promise.resolve()
    },
  }
}

const storage = typeof window !== 'undefined'
  ? createWebStorage('local')
  : createNoopStorage()

const rootReducer = combineReducers({
  cart: cartReducer,
  theme: themeReducer,
})

const persistConfig = {
  key: 'storeapp',
  storage,
  whitelist: ['cart', 'theme'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * Redux store configured with redux-persist and serializable checks tuned for persist actions.
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

/**
 * Persistor instance to control state rehydration.
 */
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/**
 * Typed dispatch hook for the app store.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()
/**
 * Typed selector hook bound to the app store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
