'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BackButton({ className = '' }: { className?: string }) {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className={`gap-2 text-sm font-medium hover:bg-white/10 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  )
}
