'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  LayoutDashboard, 
  Video, 
  BarChart3, 
  Users, 
  DollarSign, 
  Settings, 
  Calendar, 
  Plus, 
  Copy, 
  Check, 
  Play, 
  Square,
  ArrowUpRight,
  MoreVertical,
  MessageSquare,
  Zap,
  Eye,
  Music,
  Bell,
  Search,
  LogOut,
  Sparkles,
  Heart,
  Menu,
  X,
  LucideIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CreatorEvent {
  id: number | string
  title: string
  date: string
  viewers: string
  revenue: string
}

interface CreatorProfile {
  name: string
  role: string
  avatar: string
  revenue: string
  views: string
  followers: string
  engagement: string
  streamKey: string
  rtmpUrl: string
  recentEvents: CreatorEvent[]
}

// Mock Demo Data
const demoData: Record<string, CreatorProfile> = {
  'sarah-music': {
    name: 'Sarah Jenkins',
    role: 'Jazz Musician',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    revenue: '$12,450.00',
    views: '842K',
    followers: '125,402',
    engagement: '14.2%',
    streamKey: 'live_55421_sarah_j_key_abcdef',
    rtmpUrl: 'rtmp://stream.jaamlist.com/live',
    recentEvents: [
      { id: 1, title: 'Summer Midnight Jazz', date: '2024-05-12', viewers: '1.2K', revenue: '$850' },
      { id: 2, title: 'Solo Piano Session', date: '2024-05-08', viewers: '850', revenue: '$420' },
    ]
  },
  'comedy-mike': {
    name: 'Mike Laughs',
    role: 'Stand-up Comedian',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    revenue: '$8,200.50',
    views: '412K',
    followers: '89,120',
    engagement: '18.5%',
    streamKey: 'live_mike_laughs_7721_key',
    rtmpUrl: 'rtmp://stream.jaamlist.com/live',
    recentEvents: [
      { id: 1, title: 'The Roast of 2024', date: '2024-05-10', viewers: '3.4K', revenue: '$1,200' },
      { id: 2, title: 'Late Night Special', date: '2024-05-05', viewers: '1.8K', revenue: '$650' },
    ]
  },
  'alex-gaming': {
    name: 'Alex Plays',
    role: 'Pro Gamer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    revenue: '$45,120.00',
    views: '2.1M',
    followers: '210,000',
    engagement: '22.1%',
    streamKey: 'live_alex_gaming_pro_991_key',
    rtmpUrl: 'rtmp://stream.jaamlist.com/live',
    recentEvents: [
      { id: 1, title: 'Final Fantasy Speedrun', date: '2024-05-11', viewers: '12K', revenue: '$4,200' },
      { id: 2, title: 'Ranked Grinding', date: '2024-05-09', viewers: '8.5K', revenue: '$2,100' },
    ]
  }
}

export default function CreatorDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const demoId = searchParams.get('demo')
  
  const isDemo = !!demoId
  const [creatorData, setCreatorData] = useState<CreatorProfile>(
    isDemo 
      ? (demoData[demoId as keyof typeof demoData] || demoData['sarah-music'])
      : {
          name: session?.user?.name || 'Creator',
          role: 'Verified Creator',
          avatar: session?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.name || 'User'}`,
          revenue: '$0.00',
          views: '0',
          followers: '0',
          engagement: '0%',
          streamKey: '••••••••••••••••••••',
          rtmpUrl: 'rtmp://stream.jaamlist.com/live',
          recentEvents: []
        }
  )

  const [activeTab, setActiveTab] = useState('overview')
  const [copiedKey, setCopiedKey] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Event Creation Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    type: 'FREE',
    category: 'Live Concerts',
    price: '',
    scheduledAt: ''
  })

  const fetchCreatorEvents = useCallback(async () => {
    if (isDemo) return
    try {
      const res = await fetch('/api/creator/events')
      if (res.ok) {
        const data = await res.json()
        setCreatorData(prev => ({
          ...prev,
          recentEvents: data.events
        }))
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  }, [isDemo])

  // Auth Protection
  React.useEffect(() => {
    if (status === 'unauthenticated' && !isDemo) {
      router.push('/login')
    } else if (status === 'authenticated' && session?.user?.role !== 'CREATOR' && !isDemo) {
      router.push('/dashboard')
    }
  }, [status, session, router, isDemo])

  // Fetch events on mount
  React.useEffect(() => {
    fetchCreatorEvents()
  }, [fetchCreatorEvents])

  // Update creatorData when session changes (for non-demo mode)
  React.useEffect(() => {
    if (session?.user && !isDemo) {
      setCreatorData(prev => ({
        ...prev,
        name: session.user?.name || 'Creator',
        avatar: session.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user?.name || 'User'}`,
      }))
    }
  }, [session, isDemo])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isDemo) {
      alert("Scheduling is disabled in demo mode.")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventForm)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create event')
      }

      await res.json()
      alert("Event scheduled successfully!")
      setIsModalOpen(false)
      setEventForm({
        title: '',
        description: '',
        type: 'FREE',
        category: 'Live Concerts',
        price: '',
        scheduledAt: ''
      })
      fetchCreatorEvents()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred'
      alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading' && !isDemo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 border-4 border-[#f7e774] border-t-[#d4a500] rounded-full" 
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0f172a] selection:bg-[#f7e774]/30 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#f7e774]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[0%] left-[-5%] w-[35%] h-[35%] bg-indigo-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="flex relative z-10">
        {/* Premium Sidebar - Desktop */}
        <aside className="fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-3xl border-r border-slate-200 shadow-[10px_0_50px_rgba(0,0,0,0.04)] hidden lg:flex flex-col py-10 px-6 z-50">
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} creatorData={creatorData} router={router} />
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.aside 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-[85%] max-w-sm bg-white z-[70] lg:hidden flex flex-col py-10 px-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8 px-4">
                  <div onClick={() => { router.push('/'); setIsSidebarOpen(false); }}>
                    <Image src="/logo--.png" alt="Jaamlist" width={120} height={48} unoptimized />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="rounded-xl">
                    <X className="h-6 w-6 text-slate-400" />
                  </Button>
                </div>
                <SidebarContent 
                  activeTab={activeTab} 
                  setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} 
                  creatorData={creatorData} 
                  router={router} 
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Fluid Content */}
        <main className="lg:ml-72 flex-1 min-h-screen px-6 sm:px-8 lg:px-12 py-6 lg:py-10 pb-32 lg:pb-10">
          {/* Header Bar */}
          <header className="sticky top-0 z-40 flex items-center justify-between gap-4 mb-8 lg:mb-12 -mx-6 px-4 sm:px-6 py-3 sm:py-4 md:mx-0 md:px-0 md:py-0 bg-[#f1f5f9]/95 backdrop-blur-md border-b border-slate-200/80 md:border-none lg:static lg:bg-transparent lg:backdrop-blur-none">
            {/* Title */}
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-1 sm:mb-2"
              >
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#f7e774] text-[#856404] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] shadow-sm whitespace-nowrap">
                  Creator Mode
                </span>
                <span className="text-slate-400 hidden sm:inline">•</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest hidden sm:inline">v2.4.0 Studio</span>
              </motion.div>
              <h1 className="text-lg sm:text-3xl lg:text-4xl font-display font-black tracking-tight text-[#0f172a] truncate">
                Pulse <span className="text-slate-300 hidden sm:inline">/</span>{' '}
                <span className="hidden sm:inline">{activeTab === 'overview' ? 'Command Center' : activeTab}</span>
              </h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Search - desktop only */}
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Quick search studio..."
                  className="h-12 w-64 lg:w-72 pl-11 bg-white border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-2xl focus:ring-4 focus:ring-[#f7e774]/30 transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Bell */}
              <Button variant="outline" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-white border-slate-200 shadow-sm hover:shadow-md transition-all relative flex-shrink-0 cursor-pointer">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 cursor-pointer" />
                <span className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-2 h-2 bg-[#d4a500] rounded-full border-2 border-white cursor-pointer" />
              </Button>

              {/* Schedule Event */}
              <Button
                onClick={() => setIsModalOpen(true)}
                className="h-10 w-10 sm:h-12 sm:w-auto sm:px-6 rounded-xl sm:rounded-2xl bg-[#0f172a] text-white hover:bg-[#d4a500] font-black shadow-xl shadow-slate-300/60 transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4 cursor-pointer" />
                <span className="hidden sm:inline cursor-pointer">Schedule Event</span>
              </Button>

              {/* Hamburger - mobile only */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-200 flex-shrink-0 cursor-pointer"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5 cursor-pointer" />
              </Button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 sm:space-y-10"
              >
                {/* Statistics Grid - Premium Cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                  <StatCard 
                    title="Gross Revenue" 
                    value={creatorData.revenue} 
                    icon={DollarSign} 
                    trend="+14.2%" 
                    color="gold"
                    delay={0.1}
                  />
                  <StatCard 
                    title="Live Reach" 
                    value={creatorData.views} 
                    icon={Eye} 
                    trend="+5.8%" 
                    color="indigo"
                    delay={0.2}
                  />
                  <StatCard 
                    title="Global Fans" 
                    value={creatorData.followers} 
                    icon={Users} 
                    trend="+2.1k" 
                    color="rose"
                    delay={0.3}
                  />
                  <StatCard 
                    title="Studio Health" 
                    value={creatorData.engagement} 
                    icon={Zap} 
                    trend="Optimal" 
                    color="emerald"
                    delay={0.4}
                  />
                </div>

                <div className="grid xl:grid-cols-12 gap-6 xl:gap-10">
                  {/* Left Column - Studio Controls & Data */}
                  <div className="xl:col-span-8 space-y-6 sm:space-y-10">
                    {/* Studio Control - Glass Pane */}
                    <Card className="bg-white border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[30px] sm:rounded-[40px] overflow-hidden group border">
                      <CardHeader className="p-6 sm:p-10 pb-4 sm:pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4 sm:gap-5">
                            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-[#f7e774] flex items-center justify-center shadow-lg shadow-[#f7e774]/20 group-hover:scale-110 transition-transform flex-shrink-0">
                              <Video className="h-6 w-6 sm:h-7 sm:w-7 text-[#0f172a]" />
                            </div>
                            <div className="min-w-0">
                              <CardTitle className="text-xl sm:text-2xl font-black text-[#0f172a]">Studio Broadcast Hub</CardTitle>
                              <CardDescription className="text-slate-500 font-bold mt-1 text-xs sm:text-sm">Configure and launch your high-fidelity live stream.</CardDescription>
                            </div>
                          </div>
                          <Badge className={`h-9 sm:h-10 px-4 sm:px-5 rounded-full border-none font-black text-[9px] sm:text-[10px] tracking-widest uppercase transition-all duration-500 shadow-sm self-start sm:self-center ${isLive ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {isLive ? 'Streaming Live' : 'System Ready'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 sm:p-10 pt-2 sm:pt-4 space-y-8 sm:space-y-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
                          <div className="space-y-3 sm:space-y-4">
                            <label className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-slate-500">Endpoint Protocol</label>
                            <div className="flex gap-2 p-1 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 focus-within:border-[#f7e774] focus-within:ring-4 focus-within:ring-[#f7e774]/20 transition-all">
                              <Input value={creatorData.rtmpUrl} readOnly className="bg-transparent border-none h-10 sm:h-12 text-xs sm:text-sm font-black text-[#0f172a]" />
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => copyToClipboard(creatorData.rtmpUrl)}
                                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl hover:bg-white hover:shadow-md transition-all flex-shrink-0"
                              >
                                <Copy className="h-4 w-4 text-slate-500" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-3 sm:space-y-4">
                            <label className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-slate-500">Secure Stream Key</label>
                            <div className="flex gap-2 p-1 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 focus-within:border-[#f7e774] focus-within:ring-4 focus-within:ring-[#f7e774]/20 transition-all">
                              <Input value="••••••••••••••••••••" type="password" readOnly className="bg-transparent border-none h-10 sm:h-12 text-xs sm:text-sm font-black text-[#0f172a]" />
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => copyToClipboard(creatorData.streamKey)}
                                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl hover:bg-white hover:shadow-md transition-all flex-shrink-0"
                              >
                                {copiedKey ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 sm:pt-8 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                              {[1,2,3].map(i => (
                                <div key={i} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 sm:border-4 border-white bg-slate-200 overflow-hidden ring-1 ring-slate-200 shadow-sm flex-shrink-0">
                                  <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} alt="User" width={40} height={40} unoptimized />
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] sm:text-xs font-black text-slate-500">
                              <span className="text-[#0f172a] underline decoration-2 decoration-[#f7e774] underline-offset-4">2,410 fans</span> waiting.
                            </p>
                          </div>

                          <Button 
                            onClick={() => setIsLive(!isLive)}
                            className={`h-14 sm:h-16 px-8 sm:px-12 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm tracking-widest uppercase transition-all duration-700 shadow-2xl w-full lg:w-auto ${
                              isLive 
                                ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-100' 
                                : 'bg-[#0f172a] text-white hover:bg-[#d4a500] hover:text-[#0f172a] shadow-slate-300'
                            }`}
                          >
                            {isLive ? (
                              <><Square className="h-4 w-4 sm:h-5 sm:w-5 mr-3 fill-current" /> Terminate Stream</>
                            ) : (
                              <><Play className="h-4 w-4 sm:h-5 sm:w-5 mr-3 fill-current" /> Initialize Spotlight</>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performances Table */}
                    <Card className="bg-white border-none shadow-xl shadow-slate-200/50 rounded-[30px] sm:rounded-[40px] overflow-hidden">
                      <div className="p-6 sm:p-10 flex items-center justify-between">
                        <h3 className="text-lg sm:text-xl font-black text-[#0f0f0f]">Recent Spotlights</h3>
                        <Button variant="ghost" className="text-[#d4a500] font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-slate-50 rounded-xl cursor-pointer">Archives</Button>
                      </div>
                      {/* Mobile event card list */}
                      <div className="sm:hidden divide-y divide-slate-100">
                        {creatorData.recentEvents.length > 0 ? (
                          creatorData.recentEvents.map((event: CreatorEvent) => (
                            <div key={event.id} className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                              <div className="h-10 w-10 rounded-xl bg-[#f7e774]/10 flex items-center justify-center flex-shrink-0">
                                <Music className="h-5 w-5 text-[#d4a500]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-[#0f0f0f] truncate">{event.title}</p>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">{event.date} · {event.viewers} viewers</p>
                              </div>
                              <p className="text-sm font-black text-[#d4a500] flex-shrink-0">{event.revenue}</p>
                            </div>
                          ))
                        ) : (
                          <div className="px-6 py-14 text-center">
                            <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                              <Calendar className="h-6 w-6 text-slate-200" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium">No performance data yet.</p>
                          </div>
                        )}
                      </div>

                      {/* Desktop table */}
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-left min-w-[600px] lg:min-w-0">
                          <thead>
                            <tr className="bg-slate-50/50">
                              <th className="px-6 sm:px-10 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Identity</th>
                              <th className="px-6 sm:px-10 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeline</th>
                              <th className="px-6 sm:px-10 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Analytics</th>
                              <th className="px-6 sm:px-10 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</th>
                              <th className="px-6 sm:px-10 py-4 sm:py-5"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {creatorData.recentEvents.length > 0 ? (
                              creatorData.recentEvents.map((event: CreatorEvent) => (
                                <tr key={event.id} className="hover:bg-slate-50/30 transition-all group">
                                  <td className="px-6 sm:px-10 py-4 sm:py-6">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-[#f7e774]/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                        <Music className="h-5 w-5 sm:h-6 sm:w-6 text-[#d4a500]" />
                                      </div>
                                      <span className="font-bold text-xs sm:text-sm text-[#0f0f0f] truncate max-w-[120px] sm:max-w-none">{event.title}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 sm:px-10 py-4 sm:py-6 text-xs sm:text-sm text-slate-500 font-medium">{event.date}</td>
                                  <td className="px-6 sm:px-10 py-4 sm:py-6 text-xs sm:text-sm font-bold text-slate-700">{event.viewers}</td>
                                  <td className="px-6 sm:px-10 py-4 sm:py-6">
                                    <span className="text-xs sm:text-sm font-black text-[#d4a500]">{event.revenue}</span>
                                  </td>
                                  <td className="px-6 sm:px-10 py-4 sm:py-6 text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl text-slate-300 hover:text-[#0f0f0f] hover:bg-white shadow-none cursor-pointer">
                                      <MoreVertical className="h-4 w-4 cursor-pointer" />
                                    </Button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={5} className="px-10 py-20 text-center">
                                  <div className="flex flex-col items-center gap-4">
                                    <div className="h-16 w-16 bg-slate-50 rounded-3xl flex items-center justify-center">
                                      <Calendar className="h-8 w-8 text-slate-200" />
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium">No performance data found.</p>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>

                  {/* Right Sidebar - Analytics & Trends */}
                  <div className="xl:col-span-4 space-y-6 sm:space-y-10">
                    {/* Wallet Card */}
                    <Card className="bg-gradient-to-br from-[#0f0f0f] to-[#2d2d2a] border-none rounded-[30px] sm:rounded-[40px] p-8 sm:p-10 text-white shadow-2xl shadow-slate-400/20 relative overflow-hidden group">
                      <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                      <div className="relative z-10 space-y-8 sm:space-y-10">
                        <div className="flex items-center justify-between">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-[#f7e774]" />
                          </div>
                          <Badge className="bg-[#f7e774] text-[#0f0f0f] border-none font-black text-[9px] sm:text-[10px] tracking-widest px-3 sm:px-4">Active</Badge>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-widest mb-1 sm:mb-2">Portfolio Balance</p>
                          <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tighter mb-1">$4,842<span className="text-white/20">.50</span></h2>
                          <div className="flex items-center gap-2 text-green-400 text-[10px] sm:text-xs font-bold">
                            <ArrowUpRight className="h-3 w-3" />
                            +12% growth
                          </div>
                        </div>
                        <Button className="w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-white text-[#0f0f0f] hover:bg-[#f7e774] font-black transition-all shadow-xl shadow-black/10 text-sm cursor-pointer">
                          Withdraw Funds
                        </Button>
                      </div>
                    </Card>

                    {/* Community Pulse Card */}
                    <Card className="bg-white border-none rounded-[30px] sm:rounded-[40px] p-8 sm:p-10 shadow-xl shadow-slate-200/50 space-y-6 sm:space-y-8">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-base sm:text-lg text-[#0f0f0f] flex items-center gap-3">
                          <MessageSquare className="h-5 w-5 text-[#d4a500]" />
                          Social Pulse
                        </h3>
                        <Badge variant="outline" className="border-slate-100 text-slate-400 text-[9px] sm:text-[10px] font-bold">Live Data</Badge>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {[
                          { label: 'Unread Comments', value: '18', icon: MessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                          { label: 'Collab Invites', value: '3', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50' },
                          { label: 'New Supporters', value: '+42', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' }
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 cursor-pointer group">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                                <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                              </div>
                              <span className="text-xs sm:text-sm font-bold text-slate-500">{item.label}</span>
                            </div>
                            <span className={`text-xs sm:text-sm font-black ${item.color}`}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                        <Button variant="ghost" className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl border border-slate-100 text-slate-400 hover:text-[#0f0f0f] hover:bg-slate-50 font-bold transition-all text-sm cursor-pointer">
                        Launch Hub
                      </Button>
                    </Card>

                    {/* Growth Tip Card */}
                    <div className="p-6 sm:p-10 rounded-[28px] sm:rounded-[40px] bg-indigo-50/50 border border-indigo-100/50 relative overflow-hidden group">
                      <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000" />
                      <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-200">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-black text-sm text-[#0f0f0f]">Studio Growth AI</h4>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium relative z-10">
                        Creators who host <span className="text-indigo-600 font-black underline">Solo Q&A Sessions</span> see a 40% higher fan retention. Spotlight yours today!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="other"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-32 h-32 rounded-[40px] bg-white shadow-xl flex items-center justify-center mb-8">
                  <Sparkles className="h-12 w-12 text-[#f7e774]" />
                </div>
                <h2 className="text-3xl font-display font-black text-[#0f0f0f] mb-4 capitalize">
                  {activeTab} Module
                </h2>
                <p className="text-slate-400 max-w-md font-medium text-lg mb-10">
                  We are currently architecting the {activeTab} workspace to provide you with industry-leading precision tools.
                </p>
                <Button 
                  onClick={() => setActiveTab('overview')}
                  className="h-14 px-10 rounded-2xl bg-[#0f0f0f] text-white hover:bg-[#d4a500] font-black transition-all shadow-xl cursor-pointer"
                >
                  Return to Headquarters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-1.5">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Home' },
            { id: 'live', icon: Video, label: 'Live' },
            { id: 'analytics', icon: BarChart3, label: 'Stats' },
            { id: 'monetization', icon: DollarSign, label: 'Revenue' },
            { id: 'events', icon: Calendar, label: 'Events' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-2xl transition-all duration-200 min-w-[52px] cursor-pointer ${
                activeTab === item.id ? 'text-[#0f172a]' : 'text-slate-400 active:text-slate-600'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${activeTab === item.id ? 'bg-[#f7e774]' : ''}`}>
                <item.icon className="h-5 w-5 cursor-pointer" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-wide leading-none cursor-pointer">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Schedule Event Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border-slate-200 rounded-[32px] p-0 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden [&>button]:hidden">
          {/* Fixed Header */}
          <div className="flex items-start justify-between gap-4 px-7 pt-7 pb-5 border-b border-slate-100 flex-shrink-0">
            <div>
              <DialogTitle className="text-xl font-black text-[#0f172a]">Schedule New Spotlight</DialogTitle>
              <DialogDescription className="text-slate-500 font-medium mt-1 text-sm">
                Create an upcoming event to share with your audience.
              </DialogDescription>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all flex-shrink-0 flex items-center justify-center cursor-pointer"
            >
              <X className="h-4 w-4 cursor-pointer" />
            </button>
          </div>

          {/* Scrollable Form Body */}
          <form onSubmit={handleCreateEvent} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto px-7 py-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-slate-400">Event Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Midnight Jazz Session"
                  required
                  value={eventForm.title}
                  onChange={e => setEventForm({...eventForm, title: e.target.value})}
                  className="h-12 rounded-xl border-slate-200 focus:ring-[#f7e774]/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-slate-400">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell your fans what to expect..."
                  required
                  value={eventForm.description}
                  onChange={e => setEventForm({...eventForm, description: e.target.value})}
                  className="min-h-[90px] rounded-xl border-slate-200 focus:ring-[#f7e774]/30 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Access Type</Label>
                  <Select
                    value={eventForm.type}
                    onValueChange={v => setEventForm({...eventForm, type: v})}
                  >
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 rounded-xl shadow-xl">
                      <SelectItem value="FREE">Free Access</SelectItem>
                      <SelectItem value="PAID">Paid Ticket</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Category</Label>
                  <Select
                    value={eventForm.category}
                    onValueChange={v => setEventForm({...eventForm, category: v})}
                  >
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 rounded-xl shadow-xl">
                      <SelectItem value="Live Concerts">Live Concerts</SelectItem>
                      <SelectItem value="Live Interviews">Live Interviews</SelectItem>
                      <SelectItem value="Live Stage Dramas">Live Stage Dramas</SelectItem>
                      <SelectItem value="Live Comedy Shows">Live Comedy Shows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduledAt" className="text-xs font-black uppercase tracking-widest text-slate-400">Date & Time</Label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  required
                  value={eventForm.scheduledAt}
                  onChange={e => setEventForm({...eventForm, scheduledAt: e.target.value})}
                  className="h-12 rounded-xl border-slate-200 focus:ring-[#f7e774]/30"
                />
              </div>
              {eventForm.type === 'PAID' && (
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-xs font-black uppercase tracking-widest text-slate-400">Ticket Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="9.99"
                    required
                    value={eventForm.price}
                    onChange={e => setEventForm({...eventForm, price: e.target.value})}
                    className="h-12 rounded-xl border-slate-200 focus:ring-[#f7e774]/30"
                  />
                </div>
              )}
            </div>

            {/* Fixed Footer */}
            <div className="flex items-center justify-end gap-3 px-7 py-5 border-t border-slate-100 flex-shrink-0">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-[#0f172a] text-white hover:bg-[#d4a500] font-black px-8 shadow-lg shadow-slate-200/80 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Scheduling..." : "Create Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SidebarContent({ 
  activeTab, 
  setActiveTab, 
  creatorData, 
  router 
}: { 
  activeTab: string, 
  setActiveTab: (id: string) => void, 
  creatorData: CreatorProfile, 
  router: ReturnType<typeof useRouter> 
}) {
  return (
    <>
      <div className="px-4 mb-12 hidden lg:block group cursor-pointer" onClick={() => router.push('/')}>
        <Image
          src="/logo--.png"
          alt="Jaamlist"
          width={140}
          height={56}
          priority
          unoptimized
          className="group-hover:scale-105 transition-transform"
        />
      </div>

      <nav className="flex-1 overflow-y-auto min-h-0 space-y-1 sm:space-y-2">
        {[
          { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
          { id: 'live', icon: Video, label: 'Broadcast Studio' },
          { id: 'analytics', icon: BarChart3, label: 'Performance' },
          { id: 'community', icon: Users, label: 'Audience' },
          { id: 'monetization', icon: DollarSign, label: 'Revenue Hub' },
          { id: 'events', icon: Calendar, label: 'Schedule' },
          { id: 'settings', icon: Settings, label: 'System Prefs' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 relative group overflow-hidden cursor-pointer ${
              activeTab === item.id 
                ? 'text-[#0f0f0f] font-bold' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeSideTab"
                className="absolute inset-0 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200 cursor-pointer" 
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <item.icon className={`h-5 w-5 relative z-10 transition-colors cursor-pointer ${activeTab === item.id ? 'text-[#d4a500]' : ''}`} />
            <span className="text-sm relative z-10 cursor-pointer">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeIndicator"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#f7e774] rounded-l-full cursor-pointer" 
              />
            )}
          </button>
        ))}
      </nav>

      <div className="pt-4 px-2 mt-auto">
        <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] cursor-pointer group">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 w-full px-2 py-2 text-red-500 hover:text-red-600 transition-all font-black text-xs group cursor-pointer mb-4 pb-4 border-b border-slate-50"
          >
            <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform cursor-pointer" />
            <span className="cursor-pointer">Secure Logout</span>
          </button>

          <div className="flex items-center gap-4 cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-white shadow-sm overflow-hidden border border-slate-200 cursor-pointer">
              <Image src={creatorData.avatar} alt={creatorData.name} width={40} height={40} unoptimized className="cursor-pointer" />
            </div>
            <div className="min-w-0 cursor-pointer">
              <p className="font-black text-[#0f172a] text-xs truncate cursor-pointer">{creatorData.name}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate cursor-pointer">{creatorData.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: string
  color: 'gold' | 'indigo' | 'rose' | 'emerald'
  delay: number
}

function StatCard({ title, value, icon: Icon, trend, color, delay }: StatCardProps) {
  const themes = {
    gold: "text-[#d4a500] bg-[#f7e774]/10 border-[#f7e774]/20",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    rose: "text-rose-600 bg-rose-50 border-rose-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="p-4 sm:p-8 rounded-[22px] sm:rounded-[40px] bg-white border border-slate-100 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer"
    >
      <div className={`absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 rounded-full blur-[50px] sm:blur-[80px] opacity-10 -mr-8 -mt-8 sm:-mr-16 sm:-mt-16 cursor-pointer ${themes[color].split(' ')[1]}`} />
      <div className="flex items-center justify-between mb-3 sm:mb-8 relative z-10 cursor-pointer">
        <div className={`h-9 w-9 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm sm:shadow-md cursor-pointer ${themes[color]}`}>
          <Icon className="h-4 w-4 sm:h-6 sm:w-6 cursor-pointer" />
        </div>
        <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-50 text-[8px] sm:text-[10px] font-black text-slate-400 group-hover:bg-[#f7e774] group-hover:text-[#0f172a] transition-all cursor-pointer">
          {trend}
        </div>
      </div>
      <div className="relative z-10 cursor-pointer">
        <p className="text-[8px] sm:text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 sm:mb-2 cursor-pointer">{title}</p>
        <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tighter group-hover:text-[#d4a500] transition-colors cursor-pointer">{value}</h2>
      </div>
    </motion.div>
  )
}
