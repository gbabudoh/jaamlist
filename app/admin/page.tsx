'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  PlayCircle,
  MoreHorizontal,
  ArrowUpRight,
  Zap
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { StatsCard } from '@/components/admin/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Mock data for dashboard
const recentEvents = [
  { id: 1, title: 'Jazz Night Live', creator: 'Sarah Jenkins', status: 'live', viewers: 1250 },
  { id: 2, title: 'Comedy Hour Special', creator: 'The Laugh Factory', status: 'pending', viewers: 0 },
  { id: 3, title: 'Tech Talk: AI in Music', creator: 'TechPro Studios', status: 'approved', viewers: 0 },
  { id: 4, title: 'Acoustic Session', creator: 'Mike Johnson', status: 'ended', viewers: 3420 },
]

const recentUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'CREATOR', joinedAt: '2 hours ago' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'USER', joinedAt: '5 hours ago' },
  { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'CREATOR', joinedAt: '1 day ago' },
]

const statusColors = {
  live: 'bg-red-500/20 text-red-400 border-red-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  approved: 'bg-green-500/20 text-green-400 border-green-500/30',
  ended: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const statusIcons = {
  live: PlayCircle,
  pending: Clock,
  approved: CheckCircle2,
  ended: XCircle,
}

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Dashboard" 
        description="Welcome back! Here's what's happening today." 
      />

      <div className="p-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value="12,847"
            change="+12% from last month"
            changeType="positive"
            icon={Users}
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10"
          />
          <StatsCard
            title="Active Events"
            value="48"
            change="3 live now"
            changeType="positive"
            icon={Calendar}
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10"
          />
          <StatsCard
            title="Revenue"
            value="$284,500"
            change="+8% from last month"
            changeType="positive"
            icon={DollarSign}
            iconColor="text-green-400"
            iconBg="bg-green-500/10"
          />
          <StatsCard
            title="Total Views"
            value="1.2M"
            change="+23% from last month"
            changeType="positive"
            icon={Eye}
            iconColor="text-[#f7e774]"
            iconBg="bg-[#f7e774]/10"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Events - Takes 2 columns */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-white font-display text-lg">Recent Events</CardTitle>
              <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
                View All <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {recentEvents.map((event, index) => {
                  const StatusIcon = statusIcons[event.status as keyof typeof statusIcons]
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f7e774]/20 to-[#d4a500]/10 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-[#f7e774]" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{event.title}</p>
                          <p className="text-sm text-white/50">{event.creator}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {event.status === 'live' && (
                          <div className="flex items-center gap-2 text-white/50">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm font-medium">{event.viewers.toLocaleString()}</span>
                          </div>
                        )}
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[event.status as keyof typeof statusColors]}`}>
                          <StatusIcon className="h-3 w-3" />
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-white/50 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-white font-display text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#f7e774]" />
                Recent Users
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f7e774] to-[#d4a500] flex items-center justify-center text-[#0f0f0f] font-bold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-white/50">{user.joinedAt}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    user.role === 'CREATOR' 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {user.role}
                  </span>
                </motion.div>
              ))}
              <Button variant="ghost" className="w-full text-white/50 hover:text-white mt-2">
                View All Users
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
            <div className="flex items-center gap-3">
              <PlayCircle className="h-8 w-8 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Live Now</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Pending</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">156</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Approved</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">89%</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
