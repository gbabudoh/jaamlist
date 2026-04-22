import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Video, 
  BarChart3, 
  Users, 
  DollarSign, 
  Settings, 
  Calendar, 
  Plus,
  MessageSquare,
  Zap,
  Eye,
  Play,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CreatorEvent {
  id: string
  title: string
  date: string
  viewers: string
  revenue: string
}

interface User {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
}

interface CreatorDashboardProps {
  user: User
}

export function CreatorDashboard({ user }: CreatorDashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [events, setEvents] = useState<CreatorEvent[]>([])
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/creator/events')
        if (res.ok) {
          const data = await res.json()
          setEvents(data.events)
        }
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        // isLoading removed
      }
    }
    fetchEvents()
  }, [])

  const stats = {
    revenue: `$${events.reduce((sum, e) => sum + parseFloat(e.revenue.replace('$', '')), 0).toFixed(2)}`,
    views: events.reduce((sum, e) => sum + parseInt(e.viewers), 0).toString(),
    followers: '1,240', // Mock for now
    engagement: '18.4%' // Mock for now
  }

  const handleGoLive = async (eventId: string) => {
    try {
      const res = await fetch(`/api/creator/events/${eventId}/start`, {
        method: 'POST'
      })
      if (res.ok) {
        setIsLive(true)
        // In a real app, we might redirect to the stream page or update local state
        router.push(`/stream/${eventId}`)
      }
    } catch (error) {
      console.error('Go live error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white -mt-8 -mx-6 lg:-ml-64 relative z-10">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-[#0a0a0f] border-r border-white/5 z-50 flex flex-col items-center lg:items-stretch py-8">
        <div className="px-6 mb-12 flex items-center gap-3">
          <div className="h-10 w-10 bg-[#f7e774] rounded-xl flex items-center justify-center shadow-lg shadow-[#f7e774]/20">
            <Zap className="h-6 w-6 text-[#0f0f0f] fill-[#0f0f0f]" />
          </div>
          <span className="hidden lg:block font-display font-black text-2xl tracking-tighter text-white">JAAM<span className="text-[#f7e774]">LIST</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Studio' },
            { id: 'live', icon: Video, label: 'Broadcast' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            { id: 'community', icon: Users, label: 'Fans' },
            { id: 'events', icon: Calendar, label: 'Lifecycle' },
            { id: 'settings', icon: Settings, label: 'Preferences' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative group ${
                activeTab === item.id 
                  ? 'text-white' 
                  : 'text-white/30 hover:text-white/60 hover:bg-white/5'
              }`}
            >
              {activeTab === item.id && (
                <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10" />
              )}
              <item.icon className={`h-5 w-5 shrink-0 relative z-10 ${activeTab === item.id ? 'text-[#f7e774]' : ''}`} />
              <span className="hidden lg:block text-sm font-bold relative z-10 tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-4 mt-auto">
          <div className="flex items-center gap-3 lg:px-4 py-6 border-t border-white/5">
            <div className="relative h-10 w-10 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/20 shadow-xl">
              <Image src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'User'}`} alt={user.name || 'User'} fill className="object-cover" unoptimized />
            </div>
            <div className="hidden lg:block min-w-0">
              <p className="text-xs font-black truncate text-white uppercase tracking-wider">{user.name || 'User'}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.1em]">Verified Artist</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full bg-[#0a0a0f]/80 backdrop-blur-3xl border-b border-white/5 h-20 flex items-center justify-between px-8">
          <div className="flex flex-col">
            <h1 className="text-lg font-black uppercase tracking-[0.2em] text-[#f7e774]">{activeTab}</h1>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em]">Studio Workspace v2.0</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={() => router.push('/creator/events/new')} className="rounded-xl bg-[#f7e774] text-[#0f0f0f] hover:bg-white font-black h-11 px-6 shadow-xl shadow-[#f7e774]/10 transition-all border-none">
              <Plus className="h-4 w-4 mr-2 stroke-[3px]" /> New Spotlight
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-10">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {/* Performance Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Est. Revenue" value={stats.revenue} icon={DollarSign} trend="+12.4%" color="yellow" />
                <StatCard title="Studio Views" value={stats.views} icon={Eye} trend="+5.8k" color="purple" />
                <StatCard title="Global Fans" value={stats.followers} icon={Users} trend="+240" color="blue" />
                <StatCard title="Pulse" value={stats.engagement} icon={Zap} trend="Peak" color="green" />
              </div>

              <div className="grid xl:grid-cols-12 gap-8">
                {/* Live Control Panel */}
                <div className="xl:col-span-8 space-y-8">
                  <Card className="bg-[#12121a] border-white/5 rounded-[40px] overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-8">
                      <Badge className={`h-8 px-4 rounded-full border-none font-black text-[10px] tracking-widest ${isLive ? 'bg-red-500 animate-pulse' : 'bg-white/5 text-white/40'}`}>
                        {isLive ? 'BROADCASTING' : 'STUDIO READY'}
                      </Badge>
                    </div>
                    <CardHeader className="p-10 pb-6">
                      <CardTitle className="text-3xl font-black flex items-center gap-4 text-white">
                        <div className="h-12 w-12 rounded-2xl bg-[#f7e774]/10 flex items-center justify-center">
                          <Video className="h-6 w-6 text-[#f7e774]" />
                        </div>
                        Stage Control
                      </CardTitle>
                      <CardDescription className="text-white/40 font-bold mt-2">Ready to take the spotlight?</CardDescription>
                    </CardHeader>
                    <CardContent className="p-10 pt-4 space-y-10">
                      {events.length > 0 ? (
                        <div className="space-y-6">
                          {events.slice(0, 1).map((event) => (
                            <div key={event.id} className="p-8 rounded-[32px] bg-white/5 border border-white/10 group hover:border-[#f7e774]/30 transition-all">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                  <h3 className="text-xl font-black group-hover:text-[#f7e774] transition-colors">{event.title}</h3>
                                  <div className="flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {event.date}</span>
                                    <span className="flex items-center gap-1.5"><Users className="h-3 w-3" /> {event.viewers} Registered</span>
                                  </div>
                                </div>
                                <Button 
                                  onClick={() => handleGoLive(event.id)}
                                  className="rounded-2xl bg-white text-[#0f0f0f] hover:bg-[#f7e774] font-black h-14 px-10 shadow-2xl transition-all"
                                >
                                  <Play className="h-5 w-5 mr-3 fill-current" /> Go Live Now
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-16 rounded-[40px] bg-white/[0.02] border border-dashed border-white/10 text-center space-y-6">
                          <div className="h-20 w-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto ring-1 ring-white/10">
                            <Plus className="h-8 w-8 text-white/10" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-black">No Active Spotlights</h3>
                            <p className="text-xs font-bold text-white/30 max-w-xs mx-auto uppercase tracking-wider leading-relaxed">Schedule your first experience to activate your studio keys.</p>
                          </div>
                          <Button onClick={() => router.push('/creator/events/new')} className="rounded-2xl bg-[#f7e774] text-[#0f0f0f] hover:bg-white font-black h-14 px-10">
                            Create Premiere
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Archives */}
                  <Card className="bg-transparent border-none space-y-6">
                    <div className="flex items-center justify-between px-2">
                      <h3 className="text-xl font-black">Past Performances</h3>
                      <Button variant="ghost" className="text-[#f7e774] font-black text-[10px] uppercase tracking-widest hover:bg-white/5">View Archives</Button>
                    </div>
                    <div className="space-y-4">
                      {events.slice(1, 4).map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-6 rounded-3xl bg-[#12121a] border border-white/5 group hover:bg-[#1a1a26] transition-all">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#f7e774]/10 transition-colors">
                              <Calendar className="h-5 w-5 text-white/30 group-hover:text-[#f7e774]" />
                            </div>
                            <div>
                              <p className="font-bold text-sm">{event.title}</p>
                              <p className="text-[10px] font-black text-white/20 uppercase mt-1">{event.date} · {event.viewers} Fans</p>
                            </div>
                          </div>
                          <p className="font-black text-[#f7e774]">{event.revenue}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Right Sidebar */}
                <div className="xl:col-span-4 space-y-8">
                  <Card className="bg-gradient-to-br from-[#1a1a26] to-[#0a0a0f] border-white/5 rounded-[40px] p-10 space-y-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 h-40 w-40 bg-[#f7e774]/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
                    <div className="relative z-10 space-y-8">
                      <div className="h-14 w-14 rounded-2xl bg-[#f7e774]/10 flex items-center justify-center shadow-inner ring-1 ring-white/10">
                        <MessageSquare className="h-7 w-7 text-[#f7e774]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black tracking-tight">Community Pulse</h3>
                        <p className="text-xs font-bold text-white/30 uppercase tracking-wider leading-relaxed">Real-time engagement data will synchronize here during your next broadcast.</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== 'overview' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center space-y-8"
            >
              <div className="w-24 h-24 rounded-[40px] bg-white/5 flex items-center justify-center ring-1 ring-white/10">
                <Zap className="h-10 w-10 text-white/10" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black capitalize">{activeTab} Workspace</h3>
                <p className="text-white/40 max-w-sm mx-auto font-bold text-sm leading-relaxed">We are currently deploying the advanced features for this node. Expected online: Q3 2026.</p>
              </div>
              <Button onClick={() => setActiveTab('overview')} className="rounded-2xl bg-white/5 text-white hover:bg-white hover:text-[#0f0f0f] font-black h-14 px-10 transition-all border border-white/10">
                Back to Studio
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, trend, color }: { title: string, value: string, icon: React.ElementType, trend: string, color: string }) {
  const colors = {
    yellow: "text-[#f7e774] bg-[#f7e774]/10 border-[#f7e774]/10 shadow-[#f7e774]/5",
    purple: "text-purple-400 bg-purple-400/10 border-purple-400/10 shadow-purple-400/5",
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/10 shadow-blue-400/5",
    green: "text-emerald-400 bg-emerald-400/10 border-emerald-400/10 shadow-emerald-400/5"
  } as Record<string, string>

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-[#12121a] border-white/5 rounded-[32px] p-8 shadow-xl hover:border-white/20 transition-all group overflow-hidden relative">
        <div className={`absolute -right-4 -bottom-4 h-20 w-20 rounded-full blur-3xl opacity-20 ${colors[color].split(' ')[1]}`} />
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ring-1 ring-white/10 ${colors[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <Badge className="bg-white/5 text-white/40 border-none font-black text-[9px] tracking-widest">{trend}</Badge>
        </div>
        <div className="relative z-10 space-y-1">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{title}</p>
          <h2 className="text-3xl font-black tracking-tighter group-hover:text-[#f7e774] transition-colors">{value}</h2>
        </div>
      </Card>
    </motion.div>
  )
}
