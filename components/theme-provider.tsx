'use client'

import * as React from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'prototype-theme'

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyThemeClass(resolvedTheme: 'light' | 'dark') {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(resolvedTheme)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>('light')
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initialTheme: Theme = saved ?? 'light'
    const initialResolved = initialTheme === 'system' ? getSystemTheme() : initialTheme

    setThemeState(initialTheme)
    setResolvedTheme(initialResolved)
    applyThemeClass(initialResolved)
  }, [])

  React.useEffect(() => {
    if (theme !== 'system') {
      applyThemeClass(resolvedTheme)
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const next = getSystemTheme()
      setResolvedTheme(next)
      applyThemeClass(next)
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme, resolvedTheme])

  const setTheme = React.useCallback((nextTheme: Theme) => {
    const nextResolved = nextTheme === 'system' ? getSystemTheme() : nextTheme

    setThemeState(nextTheme)
    setResolvedTheme(nextResolved)
    localStorage.setItem(STORAGE_KEY, nextTheme)
    applyThemeClass(nextResolved)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
