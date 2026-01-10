'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  Calendar,
  Handshake,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAdminAuth } from '@/components/admin/auth-provider'

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    badge: null
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    badge: null
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
    badge: 'Live'
  },
  {
    title: 'Sponsors',
    href: '/admin/sponsors',
    icon: Handshake,
    badge: null
  },
  {
    title: 'Payments',
    href: '/admin/payments',
    icon: CreditCard,
    badge: null
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: TrendingUp,
    badge: null
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    badge: null
  }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAdminAuth()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-[#0f0f0f] border-r border-white/5 flex flex-col z-50"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f7e774] to-[#d4a500] flex items-center justify-center shadow-lg shadow-[#f7e774]/20">
            <Zap className="h-5 w-5 text-[#0f0f0f]" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-display text-lg font-bold text-white"
            >
              Jaamlist
            </motion.span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/5"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-r from-[#f7e774]/20 to-transparent text-[#f7e774]" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-nav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-[#f7e774]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={cn(
                "h-5 w-5 shrink-0 transition-transform",
                isActive && "scale-110"
              )} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium text-sm"
                >
                  {item.title}
                </motion.span>
              )}
              {!collapsed && item.badge && (
                <span className="ml-auto px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Admin Profile */}
      <div className="p-4 border-t border-white/5">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-xl bg-white/5",
          collapsed && "justify-center"
        )}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f7e774] to-[#d4a500] flex items-center justify-center">
            <Shield className="h-5 w-5 text-[#0f0f0f]" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-white/50 truncate">{user?.email || 'admin@jaamlist.com'}</p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="h-8 w-8 text-white/50 hover:text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
