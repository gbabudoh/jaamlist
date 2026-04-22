'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Radio, List, User, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'

export function MobileNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Events', icon: List, href: '/events' },
    { label: 'Stream', icon: Radio, href: '/stream' },
    { 
      label: session ? 'Dashboard' : 'Sign In', 
      icon: session ? TrendingUp : User, 
      href: session ? '/dashboard' : '/login' 
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden">
      <div className="bg-white/95 backdrop-blur-2xl border-t border-slate-100 px-6 py-4 pb-safe-offset-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <nav className="flex items-center justify-between max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1.5 transition-all",
                  isActive ? "text-[#0f172a]" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <div className="relative h-12 w-12 flex items-center justify-center">
                  {isActive && (
                    <motion.span
                      layoutId="mobile-nav-indicator"
                      className="absolute inset-0 rounded-full bg-[#0f172a] shadow-lg shadow-slate-200"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className={cn("h-6 w-6 relative z-10 transition-transform", isActive ? "text-[#f7e774] scale-110" : "")} />
                </div>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-[0.2em] transition-colors",
                  isActive ? "text-[#0f172a]" : "text-slate-400"
                )}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
