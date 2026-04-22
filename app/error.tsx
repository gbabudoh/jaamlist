'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto h-16 w-16 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Something went wrong</h2>
        <p className="text-slate-500 font-medium text-sm leading-relaxed">
          An unexpected error occurred. Our team has been notified. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-[#d4a500] transition-all cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  )
}
