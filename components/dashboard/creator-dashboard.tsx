'use client'

import React, { useState } from 'react'
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
  TrendingUp,
  ArrowUpRight,
  MessageSquare,
  Zap,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

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
  const [activeTab, setActiveTab] = useState('overview')

  // Mock stats for now, in a real app these would come from the user object or a separate API
  const stats = {
    revenue: '$0.00',
    views: '0',
    followers: '0',
    engagement: '0%'
  }

  return (
    <div className="min-h-screen bg-[#111118] text-white -mt-8 -mx-6 lg:-ml-64 relative z-10">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-[#0c0c14] border-r border-white/8 z-50 flex flex-col items-center lg:items-stretch py-8">
        <div className="px-6 mb-12 flex items-center gap-3">
          <div className="h-10 w-10 bg-[#f7e774] rounded-xl flex items-center justify-center">
            <Zap className="h-6 w-6 text-[#0f0f0f] fill-[#0f0f0f]" />
          </div>
          <span className="hidden lg:block font-display font-black text-2xl tracking-tighter text-white">JAAM</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'live', icon: Video, label: 'Go Live' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            { id: 'community', icon: Users, label: 'Community' },
            { id: 'monetization', icon: DollarSign, label: 'Revenue' },
            { id: 'events', icon: Calendar, label: 'Events' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-[#f7e774] text-[#0f0f0f] font-bold shadow-lg shadow-[#f7e774]/10' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="h-6 w-6 shrink-0" />
              <span className="hidden lg:block text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-4 mt-auto">
          <div className="mt-6 flex items-center gap-3 lg:px-4 py-4 border-t border-white/5">
            <div className="relative h-10 w-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
              <Image src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'User'}`} alt={user.name || 'User'} fill className="object-cover" unoptimized />
            </div>
            <div className="hidden lg:block min-w-0">
              <p className="text-sm font-bold truncate text-white">{user.name || 'User'}</p>
              <p className="text-xs text-white/40 truncate">Creator Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full bg-[#111118]/80 backdrop-blur-xl border-b border-white/8 h-20 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 text-white">
            <h1 className="text-xl font-bold capitalize">{activeTab.replace('-', ' ')}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button className="rounded-xl bg-[#f7e774] text-[#0f0f0f] hover:bg-white font-bold h-10 px-6">
              <Plus className="h-4 w-4 mr-2" /> Create Event
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total Revenue" 
                  value={stats.revenue} 
                  icon={DollarSign} 
                  trend="+0%" 
                  color="yellow"
                />
                <StatCard 
                  title="Total Views" 
                  value={stats.views} 
                  icon={Eye} 
                  trend="+0%" 
                  color="purple"
                />
                <StatCard 
                  title="Followers" 
                  value={stats.followers} 
                  icon={Users} 
                  trend="+0%" 
                  color="blue"
                />
                <StatCard 
                  title="Engagement" 
                  value={stats.engagement} 
                  icon={TrendingUp} 
                  trend="+0%" 
                  color="green"
                />
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Live Control Panel */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-[#1a1a26] border-white/8 rounded-[32px] overflow-hidden shadow-2xl">
                    <CardHeader className="p-8 border-b border-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl font-bold flex items-center gap-3 text-white">
                            <Video className="h-6 w-6 text-[#f7e774]" />
                            Stream Control Center
                          </CardTitle>
                          <CardDescription className="text-white/40 mt-1">Manage your live broadcast settings and keys</CardDescription>
                        </div>
                        <Badge className="h-8 px-4 rounded-full border-none font-bold bg-white/5 text-white/40">
                          OFFLINE
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8 text-white">
                      <div className="p-12 rounded-[24px] bg-white/5 border border-dashed border-white/10 text-center space-y-4">
                        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                          <Plus className="h-8 w-8 text-white/20" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold">No Active Events</h3>
                          <p className="text-sm text-white/40 max-w-xs mx-auto">Create an event to generate your unique stream keys and start broadcasting.</p>
                        </div>
                        <Button className="rounded-xl bg-[#f7e774] text-[#0f0f0f] hover:bg-white font-bold h-12 px-8">
                          Schedule First Event
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-6">
                  <Card className="bg-[#1a1a26] border-white/8 rounded-[32px] p-8 space-y-6 text-white">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-[#f7e774]" />
                      Community Pulse
                    </h3>
                    <div className="space-y-4">
                      <p className="text-sm text-white/40 text-center py-8">Your community activity will appear here once you start streaming.</p>
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
              className="flex flex-col items-center justify-center py-20 text-center space-y-6"
            >
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
                <BarChart3 className="h-10 w-10 text-white/20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold capitalize text-white">{activeTab} Section</h3>
                <p className="text-white/40 max-w-md">This feature is currently being finalized for your account.</p>
              </div>
              <Button onClick={() => setActiveTab('overview')} className="rounded-xl bg-[#f7e774] text-[#0f0f0f] hover:bg-white font-bold">
                Return to Overview
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ElementType
  trend: string
  color: 'yellow' | 'purple' | 'blue' | 'green'
}

function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  const colors = {
    yellow: "bg-[#f7e774]/10 text-[#f7e774] border-[#f7e774]/10",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/10",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/10",
    green: "bg-green-500/10 text-green-400 border-green-500/10"
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-[#1a1a26] border-white/8 rounded-[28px] p-1 shadow-xl overflow-hidden group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${colors[color]}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5">
              <ArrowUpRight className="h-3 w-3 text-green-400" />
              <span className="text-[10px] font-bold text-green-400">{trend}</span>
            </div>
          </div>
          <div className="space-y-1 text-white">
            <p className="text-xs font-bold text-white/30 uppercase tracking-widest">{title}</p>
            <h2 className="text-3xl font-black text-white tracking-tighter group-hover:text-[#f7e774] transition-colors">{value}</h2>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
