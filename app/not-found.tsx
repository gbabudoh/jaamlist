'use client'

import { motion } from 'framer-motion'
import { Home, Search, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg w-full text-center space-y-10"
      >
        <div className="mx-auto h-24 w-24 rounded-[40px] bg-white/5 flex items-center justify-center ring-1 ring-white/10 relative">
          <div className="absolute inset-0 bg-[#f7e774]/20 blur-xl rounded-full opacity-50" />
          <Zap className="h-10 w-10 text-white/20 relative z-10" />
        </div>
        
        <div className="space-y-4">
          <div className="text-[120px] font-black leading-none tracking-tighter text-[#f7e774] opacity-20 select-none">404</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pt-16">
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">Signal Lost</h1>
            <p className="text-white/40 font-bold text-sm leading-relaxed max-w-xs mx-auto uppercase tracking-wider">
              The node you are trying to access is currently offline or does not exist in our registry.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12">
          <Button
            onClick={() => router.push('/')}
            className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-[#f7e774] text-[#0f0f0f] font-black hover:bg-white transition-all shadow-xl shadow-[#f7e774]/10"
          >
            <Home className="h-4 w-4 mr-2" />
            Home Base
          </Button>
          <Button
            onClick={() => router.push('/events')}
            className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white/5 text-white font-black hover:bg-white/10 transition-all border border-white/10"
          >
            <Search className="h-4 w-4 mr-2" />
            Explore Hub
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
