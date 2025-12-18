'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Radio, List } from 'lucide-react'
import { motion } from 'framer-motion'

export function Navbar() {

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
              href="/stream" 
              className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-accent"
            >
              <Radio className="h-4 w-4" />
              <span>Stream</span>
            </Link>
            <Link 
              href="/events" 
              className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-accent"
            >
              <List className="h-4 w-4" />
              <span>Events</span>
            </Link>
            
            <div className="flex items-center space-x-3">
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
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}