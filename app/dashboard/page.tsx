'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { UserDashboard } from '@/components/dashboard/user-dashboard'
import { CreatorDashboard } from '@/components/dashboard/creator-dashboard'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session?.user?.role === 'CREATOR') {
      router.push('/creator/dashboard')
    }
  }, [status, session, router])

  if (status === 'loading' || status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role === 'CREATOR')) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdfdfd]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 border-4 border-[#f7e774] border-t-[#d4a500] rounded-full" 
        />
      </div>
    )
  }

  return <UserDashboard session={session} />
}
