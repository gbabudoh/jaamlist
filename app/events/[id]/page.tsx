'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  Share2, 
  Heart,
  ChevronLeft,
  Music,
  Star,
  Zap,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { formatDate, formatPrice, getEventStatusColor } from '@/lib/utils'

interface Event {
  id: string
  title: string
  description: string
  thumbnail?: string
  type: 'FREE' | 'PAID'
  status: string
  price?: number
  scheduledAt: string
  currentViewers: number
  creator: {
    id: string
    name: string
    avatar?: string
    bio?: string
  }
  sponsors: Array<{
    name: string
    logo: string
  }>
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/events/${params.id}`)
        if (!res.ok) {
          if (res.status === 404) throw new Error('Event not found')
          throw new Error('Failed to fetch event')
        }
        const data = await res.json()
        setEvent(data.event)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEvent()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-4 border-[#f7e774] border-t-[#d4a500] rounded-full" 
        />
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Zap className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-black text-[#0f172a] mb-2">{error || 'Event not found'}</h1>
        <p className="text-slate-500 mb-8">We couldn&apos;t find the event you&apos;re looking for.</p>
        <Button onClick={() => router.push('/events')} className="bg-[#0f172a] text-white hover:bg-[#d4a500] rounded-2xl h-12 px-8 font-black">
          Back to Events
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] selection:bg-[#f7e774]/30 pb-20">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#f7e774]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] bg-indigo-100/30 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100 h-20 flex items-center px-8 sm:px-12">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mr-4 rounded-xl hover:bg-slate-50 text-slate-500"
        >
          <ChevronLeft className="h-5 w-5 mr-2" /> Back
        </Button>
        <div className="h-6 w-px bg-slate-100 mx-2" />
        <span className="text-sm font-black text-slate-400 uppercase tracking-widest ml-4">
          Event Details
        </span>
      </header>

      <main className="container mx-auto px-4 sm:px-8 lg:px-12 py-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Visuals & Info */}
          <div className="lg:col-span-8 space-y-10">
            {/* Hero Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video rounded-[48px] overflow-hidden shadow-2xl border-8 border-white group"
            >
              {event.thumbnail ? (
                <Image 
                  src={event.thumbnail} 
                  alt={event.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Music className="h-32 w-32 text-slate-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                <div>
                  <Badge className={`mb-4 px-4 py-1.5 rounded-full border-none font-black text-[10px] tracking-widest uppercase shadow-lg ${getEventStatusColor(event.status)}`}>
                    {event.status === 'LIVE' && <span className="w-2 h-2 rounded-full bg-white animate-pulse mr-2 inline-block" />}
                    {event.status}
                  </Badge>
                  <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-lg">
                    {event.title}
                  </h1>
                </div>
              </div>
            </motion.div>

            {/* Description & Details */}
            <div className="bg-white rounded-[40px] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
              <div className="flex flex-wrap gap-8 items-center border-b border-slate-100 pb-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                    <p className="text-sm font-black">{formatDate(new Date(event.scheduledAt))}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                    <p className="text-sm font-black">{new Date(event.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#f7e774]/20 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-[#d4a500]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access</p>
                    <p className="text-sm font-black">{event.type === 'FREE' ? 'Open Access' : formatPrice(event.price || 0)}</p>
                  </div>
                </div>
                {event.status === 'LIVE' && (
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center">
                      <Users className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audience</p>
                      <p className="text-sm font-black">{event.currentViewers.toLocaleString()} Live</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black">About the Performance</h3>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  {event.description}
                </p>
              </div>

              {event.sponsors.length > 0 && (
                <div className="pt-8 border-t border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Event Sponsors</h4>
                  <div className="flex flex-wrap gap-8 items-center">
                    {event.sponsors.map(sponsor => (
                      <div key={sponsor.name} className="group relative">
                        <div className="h-16 w-32 relative grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                          <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" unoptimized />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Actions & Creator */}
          <div className="lg:col-span-4 space-y-10">
            {/* Booking Card */}
            <Card className="bg-[#0f172a] text-white border-none rounded-[40px] p-10 shadow-2xl shadow-slate-400/30 relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Zap className="h-7 w-7 text-[#f7e774]" />
                  </div>
                  <Badge className="bg-[#f7e774] text-[#0f172a] border-none font-black text-[10px] tracking-widest px-4 py-1.5 uppercase">
                    Secure Spot
                  </Badge>
                </div>
                
                <div>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-2">Admission Price</p>
                  <h2 className="text-5xl font-black tracking-tighter">
                    {event.type === 'FREE' ? 'FREE' : formatPrice(event.price || 0)}
                  </h2>
                </div>

                <div className="space-y-4 pt-4">
                  {event.status === 'LIVE' ? (
                    <Button 
                      onClick={() => router.push(`/stream/${event.id}`)}
                      className="w-full h-16 rounded-2xl bg-[#f7e774] text-[#0f172a] hover:bg-white font-black text-sm uppercase tracking-widest shadow-xl transition-all"
                    >
                      Join Live Stream <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      className="w-full h-16 rounded-2xl bg-white text-[#0f172a] hover:bg-[#f7e774] font-black text-sm uppercase tracking-widest shadow-xl transition-all"
                    >
                      Book Ticket Now
                    </Button>
                  )}
                  <div className="flex items-center justify-center gap-6">
                    <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold">
                      <Heart className="h-4 w-4" /> Save
                    </button>
                    <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold">
                      <Share2 className="h-4 w-4" /> Share
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-center text-white/30 font-medium">
                  Instant access upon purchase. Protected by Jaamlist Secure™
                </p>
              </div>
            </Card>

            {/* Creator Card */}
            <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6 group">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Featured Artist</h4>
              <div className="flex items-center gap-5">
                <div className="relative h-20 w-20 rounded-3xl overflow-hidden ring-4 ring-slate-50 group-hover:scale-105 transition-transform duration-500">
                  <Image src={event.creator.avatar || '/placeholder-avatar.png'} alt={event.creator.name} fill className="object-cover" unoptimized />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0f172a] mb-1">{event.creator.name}</h3>
                  <Badge variant="outline" className="border-slate-100 text-slate-400 text-[10px] font-black">Verified Creator</Badge>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                &quot;{event.creator.bio || 'Bringing unique live performances directly to your screen.'}&quot;
              </p>
              <Button variant="ghost" className="w-full h-12 rounded-xl border border-slate-100 text-[#d4a500] font-black text-xs uppercase tracking-widest hover:bg-slate-50">
                View Profile
              </Button>
            </div>

            {/* Quick Insights */}
            <div className="p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group">
               <div className="absolute right-[-10%] bottom-[-10%] w-32 h-32 bg-[#f7e774]/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000" />
               <div className="flex items-center gap-4 mb-4 relative z-10">
                 <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                   <Star className="h-5 w-5 text-[#f7e774]" />
                 </div>
                 <h4 className="font-black text-sm">Jaamlist Insight</h4>
               </div>
               <p className="text-xs text-white/50 leading-relaxed font-medium relative z-10">
                 This performance is part of the <span className="text-[#f7e774] font-black">Spotlight Series</span>. Ticket holders receive an exclusive digital badge.
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
