'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Settings, 
  LogOut,
  TrendingUp,
  Clock,
  Heart,
  ChevronRight,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  Users,
  Video,
  CheckCircle2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend: string
  color: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  if (status === 'loading') {
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

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#2d2d2a] pb-12">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden overflow-x-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#f7e774]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#d4a500]/10 rounded-full blur-[100px]" />
      </div>

      {/* Top Navbar Contextual */}
      <div className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-md border-b border-gray-200/50 mb-8">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2d2d2a] to-[#d4a500] shrink-0">Dashboard</h2>
            <nav className="flex items-center gap-6 shrink-0 pr-4">
              {['overview', 'events', 'schedule', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-bold capitalize transition-all relative py-2 shrink-0 ${
                    activeTab === tab ? 'text-[#d4a500]' : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4a500]"
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search events..." 
                className="pl-9 h-9 w-64 bg-gray-100/50 border-gray-200/50 rounded-full focus:bg-white transition-all focus:ring-[#f7e774]/20"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 space-y-8 mt-12 lg:mt-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#f7e774]/20 text-[#d4a500] text-[10px] font-bold uppercase tracking-wider">
                Member Pro
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight mb-2">
              Hello, {(session?.user?.name || 'User').split(' ')[0]}!
            </h1>
            <p className="text-gray-500 text-base md:text-lg">Here&apos;s what is happening with your events today.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <Button className="flex-1 md:flex-none bg-[#f7e774] text-[#0f0f0f] hover:bg-[#d4a500] hover:text-white font-bold h-12 px-6 rounded-2xl shadow-lg shadow-[#f7e774]/20 transition-all">
              <Plus className="h-5 w-5 mr-2" />
              Explore Events
            </Button>
            <Button variant="outline" className="h-12 w-12 rounded-2xl border-gray-200 bg-white hover:bg-gray-50 p-0 shadow-sm shrink-0">
              <Settings className="h-5 w-5 text-gray-500" />
            </Button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total Events" 
                  value="24" 
                  icon={<Video className="h-6 w-6" />} 
                  trend="+12% this month"
                  color="blue"
                />
                <StatCard 
                  title="Watch Time" 
                  value="142h" 
                  icon={<Clock className="h-6 w-6" />} 
                  trend="+8h this week"
                  color="purple"
                />
                <StatCard 
                  title="Saved Events" 
                  value="18" 
                  icon={<Heart className="h-6 w-6" />} 
                  trend="4 starting soon"
                  color="red"
                />
                <StatCard 
                  title="Community" 
                  value="1.2k" 
                  icon={<Users className="h-6 w-6" />} 
                  trend="+86 new followers"
                  color="green"
                />
              </div>

              {/* content Area */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Upcoming Events - Glass Card */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-white/80 backdrop-blur-xl border-white rounded-[32px] shadow-2xl shadow-gray-200/50 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-6 m-4 mt-8">
                      <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                          <Calendar className="h-6 w-6 text-[#d4a500]" />
                          Upcoming Experience
                        </CardTitle>
                        <CardDescription>Your registered streams for the week</CardDescription>
                      </div>
                      <Button variant="ghost" className="text-[#d4a500] font-bold hover:bg-[#f7e774]/10">
                        View All <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      {[1, 2].map((i) => (
                        <motion.div 
                          key={i}
                          whileHover={{ scale: 1.01, x: 5 }}
                          className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-[24px] bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 border border-transparent hover:border-gray-100 transition-all cursor-pointer"
                        >
                          <div className="relative w-full sm:w-32 h-40 sm:h-24 rounded-2xl overflow-hidden bg-gray-200">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#f7e774]/40 to-[#d4a500]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 text-[10px] font-bold uppercase">Live Soon</span>
                              <span className="text-xs text-gray-400">• Jazz & Soul</span>
                            </div>
                            <h4 className="text-xl font-bold group-hover:text-[#d4a500] transition-colors line-clamp-1">Summer Jazz Festival - Premium Stream</h4>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <Clock className="h-4 w-4" /> Today at 8:00 PM (GMT+1)
                            </p>
                          </div>
                          <Button className="w-full sm:w-auto rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-[#f7e774] hover:text-[#0f0f0f] border-none shadow-sm group-hover:shadow-md transition-all">
                            Join Stream
                          </Button>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Activity Feed / Recommendations */}
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-[#2d2d2a] to-[#0f0f0f] rounded-[32px] text-white p-2 shadow-2xl relative overflow-hidden group">
                    {/* Background Glow */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#f7e774]/20 rounded-full blur-2xl group-hover:bg-[#f7e774]/40 transition-all" />
                    
                    <div className="p-8 space-y-6 relative z-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Creator Account</h3>
                        <Video className="h-6 w-6 text-[#f7e774]" />
                      </div>

                      {session?.user?.role === 'CREATOR' ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-[#f7e774]">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-sm font-bold">Active Streamer</span>
                          </div>
                          <p className="text-white/60 text-xs">You are authorized to stream and earn on Jaamlist.</p>
                          <Button 
                            onClick={() => router.push('/stream')}
                            className="w-full h-12 rounded-2xl bg-[#f7e774] text-[#0f0f0f] hover:bg-white font-bold transition-all"
                          >
                            Go Live Now
                          </Button>
                        </div>
                      ) : session?.user?.streamingStatus === 'PENDING' ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-blue-400">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-bold">Review in Progress</span>
                          </div>
                          <p className="text-white/60 text-xs">We&apos;re reviewing your application. You&apos;ll be notified shortly.</p>
                          <Button disabled className="w-full h-12 rounded-2xl bg-white/5 text-white/40 font-bold border border-white/10 cursor-not-allowed">
                            Application Sent
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-white/60 text-xs leading-relaxed">
                            Want to perform and get paid? Set up your streaming account today.
                          </p>
                          <Button 
                            onClick={() => router.push('/dashboard/setup-streaming')}
                            className="w-full h-12 rounded-2xl bg-white/10 hover:bg-[#f7e774] hover:text-[#0f0f0f] text-white font-bold backdrop-blur-sm border border-white/10 transition-all"
                          >
                            Setup Streaming Account
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="bg-white rounded-[32px] border-gray-100 shadow-xl overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-[#d4a500]" />
                        What&apos;s Trending
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#f7e774]/20 group-hover:text-[#d4a500] transition-all">
                            {i}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate group-hover:text-[#d4a500] transition-colors text-[#2d2d2a]">Red Rocks Festival Live</p>
                            <p className="text-xs text-gray-400">1.2k viewing</p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-[#d4a500]" />
                        </div>
                      ))}
                      <Button variant="ghost" className="w-full text-gray-500 hover:text-[#d4a500] font-medium text-sm">
                        Discover more
                      </Button>
                    </CardContent>
                  </Card>

                  <Button 
                    variant="outline" 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full h-14 rounded-2xl border-red-100 bg-red-50/20 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out Securely
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold capitalize">{activeTab} Section</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We are currently building this section to provide you with the best experience possible. Stay tuned for more updates!
              </p>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('overview')}
                className="rounded-xl border-gray-200"
              >
                Return to Overview
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  )
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    red: "bg-red-50 text-red-600 border-red-100",
    green: "bg-green-50 text-green-600 border-green-100"
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-white/80 backdrop-blur-xl border-white rounded-[28px] shadow-xl shadow-gray-200/40 p-1">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-2xl ${colors[color as keyof typeof colors]}`}>
              {icon}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
              <h2 className="text-3xl font-black text-[#2d2d2a] tracking-tight">{value}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className={`font-bold ${color === 'red' ? 'text-gray-400' : 'text-green-500 flex items-center'}`}>
              {trend.startsWith('+') && <ArrowUpRight className="h-3 w-3 mr-0.5" />}
              {trend}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
