import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAccessCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return code
}

export function generateStreamKey(): string {
  return `stream_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getEventTypeColor(type: string): string {
  switch (type) {
    case 'FREE':
      return 'bg-green-500'
    case 'PAID':
      return 'bg-blue-500'
    case 'SPONSORED':
      return 'bg-purple-500'
    default:
      return 'bg-gray-500'
  }
}

export function getEventStatusColor(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-500'
    case 'APPROVED':
      return 'bg-green-500'
    case 'REJECTED':
      return 'bg-red-500'
    case 'LIVE':
      return 'bg-red-600 animate-pulse'
    case 'ENDED':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}