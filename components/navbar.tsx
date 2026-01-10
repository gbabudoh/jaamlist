'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Radio, List } from 'lucide-react'
import { motion } from 'framer-motion'

import { useSession, signOut } from 'next-auth/react'

export function Navbar() {
  const { data: session } = useSession()

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

          <div className="flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-accent"
            >
              <Radio className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/events" 
              className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-accent"
            >
              <List className="h-4 w-4" />
              <span>Events</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              {session ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard">
                    <div className="h-9 w-9 rounded-full bg-[#f7e774] flex items-center justify-center text-[#2d2d2a] font-bold cursor-pointer border-2 border-transparent hover:border-[#f7e774]/50 transition-all">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="font-medium">
                      Sign Up
                    </Button>
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
