'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, RefreshCw, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  
  useEffect(() => {
    console.error('Critical System Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f7e774]/5 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-lg w-full text-center space-y-10"
      >
        <div className="mx-auto h-24 w-24 rounded-[40px] bg-[#f7e774]/10 flex items-center justify-center ring-1 ring-[#f7e774]/20">
          <Zap className="h-10 w-10 text-[#f7e774]" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tighter uppercase">System Interference</h1>
          <p className="text-white/40 font-bold text-sm leading-relaxed max-w-sm mx-auto uppercase tracking-wider">
            We encountered a data synchronization error in the studio core. 
            The node has been isolated for safety.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-[#f7e774] text-[#0f0f0f] font-black hover:bg-white transition-all shadow-xl shadow-[#f7e774]/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reboot Node
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white/5 text-white font-black hover:bg-white/10 transition-all border border-white/10"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Exit to Lobby
          </Button>
        </div>

        <div className="pt-10">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Error Digest: {error.digest || 'Internal-500'}</p>
        </div>
      </motion.div>
    </div>
  )
}
