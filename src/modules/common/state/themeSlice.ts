import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

export type ThemeState = {
  mode: ThemeMode
}

const detectInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = window.localStorage.getItem('theme') as ThemeMode | null
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* empty */ }
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const initialState: ThemeState = {
  mode: detectInitialMode(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    /**
     * Set the current theme mode explicitly.
     */
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
    },
    /**
     * Toggle theme mode between light and dark.
     */
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
