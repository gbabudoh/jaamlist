'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useSyncExternalStore } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  avatar?: string
}

interface AdminAuthContextType {
  isAuthenticated: boolean
  user: AdminUser | null
  login: (user: AdminUser) => void
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

const AUTH_KEY = 'admin-authenticated'
const USER_KEY = 'admin-user'

// Subscribe to storage changes
function subscribeToAuth(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

// Get auth state
function getAuthSnapshot(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true'
}

function getServerAuthSnapshot(): boolean {
  return false
}

// Get user data
function getUserSnapshot(): AdminUser | null {
  const data = localStorage.getItem(USER_KEY)
  if (!data) return null
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  
  const isAuthenticated = useSyncExternalStore(subscribeToAuth, getAuthSnapshot, getServerAuthSnapshot)
  const [user, setUser] = useState<AdminUser | null>(() => {
    if (typeof window === 'undefined') return null
    return getUserSnapshot()
  })

  const login = useCallback((userData: AdminUser) => {
    localStorage.setItem(AUTH_KEY, 'true')
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
    router.push('/admin/login')
  }, [router])

  // Check if on login page
  const isLoginPage = pathname === '/admin/login'

  // Redirect if not authenticated and not on login page
  if (!isAuthenticated && !isLoginPage && typeof window !== 'undefined') {
    // Only redirect on client side
    if (pathname?.startsWith('/admin')) {
      router.push('/admin/login')
      return null
    }
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
