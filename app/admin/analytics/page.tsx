'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Calendar,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock analytics data
const weeklyStats = [
  { day: 'Mon', views: 1200, revenue: 450 },
  { day: 'Tue', views: 1800, revenue: 620 },
  { day: 'Wed', views: 1400, revenue: 380 },
  { day: 'Thu', views: 2200, revenue: 890 },
  { day: 'Fri', views: 2800, revenue: 1200 },
  { day: 'Sat', views: 3500, revenue: 1650 },
  { day: 'Sun', views: 2900, revenue: 1100 },
]

const topEvents = [
  { name: 'Jazz Night Live', views: 12500, revenue: 3750, trend: 'up' },
  { name: 'Comedy Hour Special', views: 8900, revenue: 2670, trend: 'up' },
  { name: 'Classical Orchestra', views: 6200, revenue: 3100, trend: 'down' },
  { name: 'Rock Concert', views: 5400, revenue: 2160, trend: 'up' },
]

const topCreators = [
  { name: 'Sarah Jenkins', events: 12, revenue: 4500, avatar: 'SJ' },
  { name: 'The Laugh Factory', events: 8, revenue: 3200, avatar: 'TL' },
  { name: 'Alex Chen', events: 25, revenue: 2800, avatar: 'AC' },
  { name: 'Symphony Hall', events: 5, revenue: 2500, avatar: 'SH' },
]

export default function AnalyticsPage() {
  const maxViews = Math.max(...weeklyStats.map(s => s.views))

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Analytics" 
        description="Platform performance and insights" 
      />

      <div className="p-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total Views</p>
                <p className="text-2xl font-bold text-white">1.2M</p>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +23% this week
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Revenue</p>
                <p className="text-2xl font-bold text-white">$284.5K</p>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +18% this week
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">New Users</p>
                <p className="text-2xl font-bold text-white">2,847</p>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12% this week
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-5 rounded-xl bg-gradient-to-br from-[#f7e774]/10 to-[#f7e774]/5 border border-[#f7e774]/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Events</p>
                <p className="text-2xl font-bold text-white">156</p>
                <p className="text-sm text-red-400 flex items-center mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  -5% this week
                </p>
              </div>
              <Calendar className="h-8 w-8 text-[#f7e774]" />
            </div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Views Chart */}
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#f7e774]" />
                Weekly Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-48 gap-2">
                {weeklyStats.map((stat, index) => (
                  <motion.div
                    key={stat.day}
                    initial={{ height: 0 }}
                    animate={{ height: `${(stat.views / maxViews) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div 
                      className="w-full bg-gradient-to-t from-[#f7e774] to-[#f7e774]/50 rounded-t-lg"
                      style={{ height: '100%' }}
                    />
                    <span className="text-xs text-white/50">{stat.day}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Events */}
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Top Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topEvents.map((event, index) => (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#f7e774]/20 text-[#f7e774] flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-white">{event.name}</p>
                      <p className="text-xs text-white/50">{event.views.toLocaleString()} views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">${event.revenue.toLocaleString()}</p>
                    <p className={`text-xs flex items-center justify-end ${event.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {event.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top Creators */}
        <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              Top Creators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {topCreators.map((creator, index) => (
                <motion.div
                  key={creator.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#f7e774] to-[#d4a500] flex items-center justify-center text-[#0f0f0f] font-bold text-lg mb-3">
                    {creator.avatar}
                  </div>
                  <p className="font-semibold text-white">{creator.name}</p>
                  <p className="text-xs text-white/50 mb-2">{creator.events} events</p>
                  <p className="text-lg font-bold text-green-400">${creator.revenue.toLocaleString()}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
