'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useSyncExternalStore } from 'react'

type Theme = 'dark' | 'light'

interface AdminThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined)

// Storage key
const THEME_KEY = 'admin-theme'

// Subscribe to storage changes
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

// Get current theme from localStorage
function getSnapshot(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  return stored === 'light' ? 'light' : 'dark'
}

// Server snapshot
function getServerSnapshot(): Theme {
  return 'dark'
}

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  // Use useSyncExternalStore for proper hydration
  const storedTheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [theme, setThemeState] = useState<Theme>(storedTheme)

  // Sync theme state with stored theme
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
  }, [])

  return (
    <AdminThemeContext.Provider value={{ theme, setTheme }}>
      <div 
        data-theme={theme}
        className={theme === 'light' ? 'admin-light-mode' : ''}
      >
        {children}
      </div>
    </AdminThemeContext.Provider>
  )
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext)
  if (!context) {
    throw new Error('useAdminTheme must be used within AdminThemeProvider')
  }
  return context
}
