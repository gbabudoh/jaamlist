'use client'

import { motion } from 'framer-motion'
import { Bell, Search, Command } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="h-full flex items-center justify-between px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-xl font-bold text-white">{title}</h1>
          {description && (
            <p className="text-sm text-white/50">{description}</p>
          )}
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search..."
              className="w-64 h-9 pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#f7e774]/50 focus:ring-[#f7e774]/20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-white/30">
              <Command className="h-3 w-3" />
              <span className="text-[10px] font-mono">K</span>
            </div>
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 text-white/60 hover:text-white hover:bg-white/5"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          {/* Quick Actions */}
          <Button
            size="sm"
            className="h-9 bg-[#f7e774] text-[#0f0f0f] hover:bg-[#d4a500] font-semibold"
          >
            + New Event
          </Button>
        </div>
      </div>
    </header>
  )
}
