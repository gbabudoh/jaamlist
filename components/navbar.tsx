'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { List, LayoutDashboard, Settings, LogOut, ChevronDown, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { useState, useRef, useEffect } from 'react'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/events', label: 'Events', icon: List },
  { href: '/how-it-works', label: 'How It Works', icon: HelpCircle },
]

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo--.png"
              alt="Jaamlist Logo"
              width={140}
              height={70}
              priority
              unoptimized
            />
          </Link>

          <div className="flex items-center space-x-1">
            {navLinks
              .filter(({ label }) => label !== 'Dashboard' || session)
              .map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || pathname?.startsWith(href + '/')
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#d4a500] bg-[#f7e774]/15'
                        : 'text-muted-foreground hover:text-foreground hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full border border-[#f7e774]/40"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </Link>
                )
              })}

            <div className="ml-4 flex items-center space-x-3">
              {session ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#f7e774] flex items-center justify-center text-[#2d2d2a] text-sm font-bold border-2 border-[#f7e774]/60">
                      {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-[#2d2d2a] max-w-[100px] truncate">
                      {session.user?.name?.split(' ')[0] || 'Account'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-50">
                          <p className="text-xs text-gray-400">Signed in as</p>
                          <p className="text-sm font-semibold text-[#2d2d2a] truncate">{session.user?.email || session.user?.name}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2d2d2a] hover:bg-[#f7e774]/10 transition-colors"
                          >
                            <LayoutDashboard className="h-4 w-4 text-[#d4a500]" />
                            Dashboard
                          </Link>
                          <Link
                            href="/dashboard/settings"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2d2d2a] hover:bg-[#f7e774]/10 transition-colors"
                          >
                            <Settings className="h-4 w-4 text-gray-400" />
                            Settings
                          </Link>
                        </div>
                        <div className="border-t border-gray-50 py-1">
                          <button
                            onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: '/' }) }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="font-medium">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
