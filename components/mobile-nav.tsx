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
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 pb-safe-offset-2">
        <nav className="flex items-center justify-between max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1.5 transition-all text-[#2d2d2a]",
                  isActive ? "text-[#d4a500]" : "opacity-40 hover:opacity-100"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-4 w-1 h-1 rounded-full bg-[#d4a500]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={cn("h-6 w-6", isActive && "scale-110")} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[9px]">
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
