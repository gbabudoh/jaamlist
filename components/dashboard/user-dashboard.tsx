'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  Heart,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  Video,
  LayoutDashboard,
  Ticket,
  Sparkles,
  Star,
  Zap,
  Menu,
  X,
  Camera,
  User,
  CheckCircle2,
  LucideIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Session } from 'next-auth'

interface UserEvent {
  id: string
  title: string
  status: string
  type: string
  scheduledAt: string
  thumbnail?: string
  creator: {
    name: string
    avatar?: string
  }
}

interface MenuItem {
  id: string
  icon: LucideIcon
  label: string
}

interface UserDashboardProps {
  session: Session | null
}

export function UserDashboard({ session }: UserDashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [userEvents, setUserEvents] = useState<UserEvent[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  React.useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const res = await fetch('/api/user/events')
        if (res.ok) {
          const data = await res.json()
          setUserEvents(data.events)
        }
      } catch (error) {
        console.error('Failed to fetch user events:', error)
      }
    }
    fetchUserEvents()
  }, [])

  const nextEvent = userEvents[0] || null

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Control Center' },
    { id: 'tickets', icon: Ticket, label: 'My Experience' },
    { id: 'discover', icon: Sparkles, label: 'Discover' },
    { id: 'history', icon: Clock, label: 'Watch History' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
    { id: 'settings', icon: Settings, label: 'Preferences' }
  ]

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0f172a] selection:bg-[#f7e774]/30 relative overflow-hidden">
      {/* Background Accents */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#f7e774]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-[0%] left-[-5%] w-[35%] h-[35%] bg-indigo-200/30 rounded-full blur-[100px]" />
      </div>

      <div className="flex relative z-10">
        {/* Premium Sidebar - Desktop */}
        <aside className="fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-3xl border-r border-slate-200 shadow-[10px_0_50px_rgba(0,0,0,0.02)] hidden lg:flex flex-col py-10 px-6 z-50">
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} menuItems={menuItems} session={session} router={router} />
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
                  menuItems={menuItems} 
                  session={session} 
                  router={router} 
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="lg:ml-72 flex-1 min-h-screen px-6 sm:px-8 lg:px-12 py-6 lg:py-10 pb-32 lg:pb-10">
        <header className="sticky top-0 z-40 flex items-center justify-between gap-4 mb-8 lg:mb-12 -mx-6 px-4 sm:px-6 py-3 sm:py-4 md:mx-0 md:px-0 md:py-0 bg-[#f1f5f9]/95 backdrop-blur-md border-b border-slate-200/80 md:border-none lg:static lg:bg-transparent lg:backdrop-blur-none">
          {/* Title */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-1 sm:mb-2"
            >
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#f7e774] text-[#856404] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] shadow-sm whitespace-nowrap">
                Active Member
              </span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest hidden sm:inline">Workspace v1.2</span>
            </motion.div>
            <h1 className="text-lg sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0f172a] truncate">
              Hello, <span className="text-slate-300">{(session?.user?.name || 'User').split(' ')[0]}</span>
            </h1>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Search - desktop only */}
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Find upcoming streams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-64 lg:w-72 pl-11 bg-white border-slate-200 shadow-sm rounded-2xl focus:ring-4 focus:ring-[#f7e774]/20 transition-all font-medium"
              />
            </div>

            {/* Bell */}
            <Button variant="outline" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-white border-slate-200 shadow-sm relative flex-shrink-0">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
              <span className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-2 h-2 bg-[#d4a500] rounded-full border-2 border-white" />
            </Button>

            {/* Explore Events */}
            <Button
              onClick={() => router.push('/events')}
              className="h-10 w-10 sm:h-12 sm:w-auto sm:px-6 rounded-xl sm:rounded-2xl bg-[#0f172a] text-white hover:bg-[#d4a500] font-black shadow-xl transition-all flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Explore Events</span>
            </Button>

            {/* Hamburger - mobile only */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-200 flex-shrink-0"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
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
                {/* Stats Grid */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                  <QuickStat title="Total Experiences" value={userEvents.length.toString()} icon={Video} color="gold" delay={0.1} />
                  <QuickStat title="Watch Hours" value="48.5h" icon={Clock} color="indigo" delay={0.2} />
                  <QuickStat title="Saved Items" value="24" icon={Heart} color="rose" delay={0.3} />
                  <QuickStat title="Achievement Score" value="840" icon={Star} color="emerald" delay={0.4} />
                </div>

                <div className="grid xl:grid-cols-12 gap-6 xl:gap-10">
                  <div className="xl:col-span-8 space-y-6 sm:space-y-8">
                    {/* Primary Widget: Upcoming Event */}
                    {nextEvent ? (
                      <Card className="bg-white border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] rounded-[30px] sm:rounded-[40px] overflow-hidden group border">
                        <CardHeader className="p-6 sm:p-10 pb-4 sm:pb-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 sm:gap-5">
                              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-[#f7e774] flex items-center justify-center shadow-lg shadow-[#f7e774]/20 group-hover:scale-110 transition-transform flex-shrink-0">
                                <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-[#0f172a]" />
                              </div>
                              <div className="min-w-0">
                                <CardTitle className="text-xl sm:text-2xl font-black text-[#0f172a] truncate">Your Next Spotlight</CardTitle>
                                <CardDescription className="text-slate-500 font-bold truncate text-xs sm:text-sm">{nextEvent.title}</CardDescription>
                              </div>
                            </div>
                            <Badge className="bg-green-500 text-white border-none font-black text-[9px] sm:text-[10px] tracking-widest uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full animate-pulse self-start sm:self-center">
                              {nextEvent.status === 'LIVE' ? 'Live Now' : 'Coming Up'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-10 pt-2 sm:pt-4">
                          <div className="relative aspect-video sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 group/img">
                            <Image 
                              src={nextEvent.thumbnail || "https://images.unsplash.com/photo-1514525253344-f814d0c9e58a?auto=format&fit=crop&q=80"} 
                              alt="Banner" 
                              fill 
                              className="object-cover group-hover/img:scale-105 transition-transform duration-1000" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                                  <Image src={nextEvent.creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${nextEvent.creator.name}`} alt="Creator" width={40} height={40} unoptimized />
                                </div>
                                <span className="text-white font-black text-xs sm:text-sm truncate">{nextEvent.creator.name}</span>
                              </div>
                              <Button 
                                onClick={() => router.push(`/stream/${nextEvent.id}`)}
                                className="rounded-xl bg-white text-[#0f172a] hover:bg-[#f7e774] font-black h-10 px-6 w-full sm:w-auto text-xs sm:text-sm shadow-xl"
                              >
                                Join Waiting Room
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-[28px] bg-slate-50 border border-slate-100 flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
                              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0 sm:mb-1">Date</p>
                              <p className="text-xs sm:text-sm font-black text-[#0f172a]">{new Date(nextEvent.scheduledAt).toLocaleDateString()}</p>
                            </div>
                            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-[28px] bg-slate-50 border border-slate-100 flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
                              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0 sm:mb-1">Time</p>
                              <p className="text-xs sm:text-sm font-black text-[#0f172a]">{new Date(nextEvent.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-[28px] bg-slate-50 border border-slate-100 flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
                              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0 sm:mb-1">Type</p>
                              <p className="text-xs sm:text-sm font-black text-[#0f172a] capitalize">{nextEvent.type.toLowerCase()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-white border-slate-200 shadow-sm rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center">
                          <Ticket className="h-10 w-10 text-slate-200" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-[#0f172a]">No Upcoming Spotlight</h3>
                          <p className="text-slate-400 font-medium">You haven&apos;t booked any experiences yet.</p>
                        </div>
                        <Button 
                          onClick={() => router.push('/events')}
                          className="bg-[#0f172a] text-white hover:bg-[#d4a500] rounded-2xl h-12 px-8 font-black"
                        >
                          Find Events
                        </Button>
                      </Card>
                    )}

                    {/* Secondary List: Experience History */}
                    <Card className="bg-white border-none shadow-xl shadow-slate-200/40 rounded-[30px] sm:rounded-[40px] overflow-hidden">
                      <div className="p-6 sm:p-10 flex items-center justify-between">
                        <h3 className="text-lg sm:text-xl font-black text-[#0f172a]">Recent Experiences</h3>
                        <Button variant="ghost" className="text-[#d4a500] font-black text-[10px] sm:text-xs uppercase tracking-widest">See Archive</Button>
                      </div>
                      <div className="px-4 sm:px-10 pb-6 sm:pb-10 space-y-3 sm:space-y-4">
                        {userEvents.slice(1, 4).map((event, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-all group cursor-pointer gap-4">
                            <div className="flex items-center gap-4 sm:gap-5">
                              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#d4a500] group-hover:scale-110 transition-transform flex-shrink-0">
                                <Video className="h-5 w-5 sm:h-6 sm:w-6" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-[#0f172a] text-sm sm:text-base truncate">{event.title}</p>
                                <p className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">Hosted by {event.creator.name}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-6">
                              <div className="text-left sm:text-right">
                                <p className="text-xs sm:text-sm font-black text-slate-300">{new Date(event.scheduledAt).toLocaleDateString()}</p>
                                <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${event.status === 'ENDED' ? 'text-slate-400' : 'text-green-500'}`}>
                                  {event.status}
                                </p>
                              </div>
                              <Button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/stream/${event.id}`);
                                }}
                                className="h-9 sm:h-10 rounded-xl bg-[#0f172a] text-white hover:bg-[#d4a500] font-black px-4 sm:px-6 text-xs"
                              >
                                Join
                              </Button>
                            </div>
                          </div>
                        ))}
                        {userEvents.length <= 1 && (
                          <div className="py-10 text-center">
                            <p className="text-slate-400 font-medium italic text-sm">Your history will appear here soon.</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>

                  <div className="xl:col-span-4 space-y-6 sm:space-y-10">
                    {/* CTA: Creator Conversion */}
                    <Card className="bg-[#0f172a] border-none rounded-[30px] sm:rounded-[40px] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                      <div className="relative z-10 space-y-6 sm:space-y-8">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center">
                          <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-[#f7e774]" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-3">Host Your Own Spotlight?</h3>
                          <p className="text-white/40 text-xs sm:text-sm leading-relaxed font-medium">
                            Join our verified creators network and start earning from your performances.
                          </p>
                        </div>
                        <Button 
                          onClick={() => router.push('/dashboard/setup-streaming')}
                          className="w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-[#f7e774] text-[#0f172a] hover:bg-white font-black transition-all text-sm sm:text-base"
                        >
                          Become a Creator
                        </Button>
                      </div>
                    </Card>

                    {/* Trending Sidebar */}
                    <Card className="bg-white border-none rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 shadow-xl shadow-slate-200/40 space-y-6 sm:space-y-8">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-lg text-[#0f172a] flex items-center gap-3">
                          <TrendingUp className="h-5 w-5 text-[#d4a500]" />
                          Discovery
                        </h3>
                        <Badge className="bg-indigo-50 text-indigo-500 border-none font-black text-[10px] tracking-widest">Live Now</Badge>
                      </div>
                      <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#f7e774]/20 group-hover:text-[#d4a500] transition-all overflow-hidden relative">
                              <Image src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=100`} alt="T" fill className="object-cover opacity-50" />
                              <span className="relative z-10 font-black text-xs">{i}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-black truncate group-hover:text-[#d4a500] transition-colors">Global Music Awards 2026</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">12.4K Watching</p>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-slate-200 group-hover:text-[#d4a500]" />
                          </div>
                        ))}
                      </div>
                      <Button variant="ghost" className="w-full h-12 rounded-xl border border-slate-100 text-slate-400 hover:text-[#0f172a] font-bold">Discover More</Button>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'settings' ? (
              <SettingsView session={session} />
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
                <h2 className="text-3xl font-black text-[#0f172a] mb-4 capitalize">{activeTab} Hub</h2>
                <p className="text-slate-400 max-w-md font-medium text-lg mb-10">
                  We are currently architecting the {activeTab} workspace to provide you with the most immersive streaming experience.
                </p>
                <Button 
                  onClick={() => setActiveTab('overview')}
                  className="h-14 px-10 rounded-2xl bg-[#0f172a] text-white hover:bg-[#d4a500] font-black transition-all shadow-xl"
                >
                  Return to Control Center
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200">
        <div className="flex items-center justify-around px-2 py-1.5">
          {[
            { id: 'overview',  icon: LayoutDashboard, label: 'Home'      },
            { id: 'tickets',   icon: Ticket,          label: 'Events'    },
            { id: 'discover',  icon: Video,           label: 'Stream'    },
            { id: 'history',   icon: TrendingUp,      label: 'Dashboard' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-2xl transition-all duration-200 min-w-[60px] ${
                activeTab === item.id ? 'text-[#0f172a]' : 'text-slate-400 active:text-slate-600'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${activeTab === item.id ? 'bg-[#f7e774]' : ''}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-wide leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

function SidebarContent({ 
  activeTab, 
  setActiveTab, 
  menuItems, 
  session, 
  router 
}: { 
  activeTab: string, 
  setActiveTab: (id: string) => void, 
  menuItems: MenuItem[], 
  session: Session | null, 
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
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 relative group overflow-hidden cursor-pointer ${
              activeTab === item.id 
                ? 'text-[#0f172a] font-bold' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeSideTab"
                className="absolute inset-0 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-200 cursor-pointer" 
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
              <Image 
                src={session?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.name || 'User'}`} 
                alt={session?.user?.name || 'User'} 
                width={40} 
                height={40} 
                unoptimized 
                className="cursor-pointer"
              />
            </div>
            <div className="min-w-0 cursor-pointer">
              <p className="font-black text-[#0f172a] text-xs truncate cursor-pointer">{session?.user?.name || 'User'}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate cursor-pointer">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function QuickStat({ title, value, icon: Icon, color, delay }: { title: string, value: string, icon: LucideIcon, color: 'gold' | 'indigo' | 'rose' | 'emerald', delay: number }) {
  const themes = {
    gold: "text-[#d4a500] bg-[#f7e774]/10 border-[#f7e774]/20 shadow-yellow-100/50",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100 shadow-indigo-100/50",
    rose: "text-rose-600 bg-rose-50 border-rose-100 shadow-rose-100/50",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-100/50"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="p-4 sm:p-8 rounded-[22px] sm:rounded-[40px] bg-white border border-slate-100 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 rounded-full blur-[50px] sm:blur-[80px] opacity-10 -mr-8 -mt-8 sm:-mr-16 sm:-mt-16 ${themes[color].split(' ')[1]}`} />
        <div className="flex items-center justify-between mb-3 sm:mb-8 relative z-10">
          <div className={`h-9 w-9 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm sm:shadow-md ${themes[color]}`}>
            <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-200 group-hover:text-slate-400" />
        </div>
        <div className="relative z-10">
          <p className="text-[8px] sm:text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 sm:mb-2">{title}</p>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tighter group-hover:text-[#d4a500] transition-colors">{value}</h2>
        </div>
      </div>
    </motion.div>
  )
}

function SettingsView({ session }: { session: Session | null }) {
  const [name, setName] = useState(session?.user?.name || '')
  const [avatar, setAvatar] = useState(session?.user?.image || '')
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setMessage(null)

    try {
      // 1. Get presigned URL
      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name })
      })

      if (!res.ok) throw new Error('Failed to get upload URL')
      const { uploadUrl, publicUrl } = await res.json()

      // 2. Upload to Minio
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      })

      if (!uploadRes.ok) throw new Error('Failed to upload file')

      // 3. Update local preview
      setAvatar(publicUrl)
      setMessage({ type: 'success', text: 'Identity asset uploaded successfully.' })
    } catch (error) {
      console.error('Upload error:', error)
      setMessage({ type: 'error', text: 'Failed to synchronize asset.' })
    } finally {
      setIsUploading(false)
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image: avatar })
      })

      if (!res.ok) throw new Error('Failed to update profile')
      
      setMessage({ type: 'success', text: 'Profile node updated successfully.' })
    } catch (error) {
      console.error('Save error:', error)
      setMessage({ type: 'error', text: 'Failed to commit changes.' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-10"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#0f172a] tracking-tight">Preferences Hub</h2>
          <p className="text-slate-500 font-bold mt-1">Manage your digital identity and studio configurations.</p>
        </div>
        <Button 
          onClick={handleSaveProfile}
          disabled={isSaving || isUploading}
          className="h-14 px-10 rounded-2xl bg-[#0f172a] text-white hover:bg-[#d4a500] font-black transition-all shadow-xl disabled:opacity-50"
        >
          {isSaving ? 'Synchronizing...' : 'Commit Changes'}
        </Button>
      </div>

      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4 space-y-8">
          {/* Avatar Section */}
          <Card className="bg-white border-none shadow-xl shadow-slate-200/50 rounded-[40px] p-10 flex flex-col items-center text-center">
            <div className="relative group cursor-pointer">
              <div className="h-32 w-32 rounded-[40px] bg-slate-50 overflow-hidden ring-4 ring-white shadow-2xl relative">
                <Image 
                  src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || 'User'}`} 
                  alt="Avatar" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  unoptimized
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-8 w-8 border-4 border-[#f7e774] border-t-transparent rounded-full"
                    />
                  </div>
                )}
              </div>
              <label className="absolute bottom-[-10px] right-[-10px] h-12 w-12 rounded-2xl bg-[#f7e774] text-[#0f172a] shadow-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border-4 border-white">
                <Camera className="h-5 w-5" />
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
              </label>
            </div>
            <div className="mt-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] px-3 py-1 rounded-full">NODE ACTIVE</Badge>
            </div>
          </Card>
        </div>

        <div className="md:col-span-8 space-y-8">
          <Card className="bg-white border-none shadow-xl shadow-slate-200/50 rounded-[40px] p-10 space-y-10">
            {message && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
                  message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}
              >
                {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                {message.text}
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Identity Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-[#d4a500] transition-colors" />
                  <Input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-16 pl-14 bg-slate-50 border-none rounded-2xl font-bold text-lg focus:ring-4 focus:ring-[#f7e774]/20 transition-all"
                    placeholder="Enter your artist name"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative">
                  <Bell className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-200" />
                  <Input 
                    value={session?.user?.email || ''} 
                    readOnly 
                    className="h-16 pl-14 bg-slate-50/50 border-none rounded-2xl font-bold text-slate-400 cursor-not-allowed"
                  />
                </div>
                <p className="text-[10px] text-slate-300 font-bold ml-1 italic">* Contact support to modify your root email.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#0f172a]">Pro Account</p>
                  <p className="text-[10px] font-bold text-slate-400">Valid until 2027</p>
                </div>
              </div>
              <Button variant="ghost" className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-red-500">Deactivate Node</Button>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
