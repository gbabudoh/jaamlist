'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  PlayCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Zap,
  DollarSign,
  Users
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Mock events data
const events = [
  { id: '1', title: 'Jazz Night Live', creator: 'Sarah Jenkins', type: 'PAID', status: 'LIVE', price: 15, viewers: 1250, scheduledAt: 'Jan 9, 2026 8:00 PM' },
  { id: '2', title: 'Comedy Hour Special', creator: 'The Laugh Factory', type: 'PAID', status: 'PENDING', price: 10, viewers: 0, scheduledAt: 'Jan 10, 2026 9:00 PM' },
  { id: '3', title: 'Tech Talk: AI in Music', creator: 'TechPro Studios', type: 'FREE', status: 'APPROVED', price: null, viewers: 0, scheduledAt: 'Jan 11, 2026 3:00 PM' },
  { id: '4', title: 'Acoustic Session', creator: 'Mike Johnson', type: 'SPONSORED', status: 'ENDED', price: null, viewers: 3420, scheduledAt: 'Jan 8, 2026 7:00 PM' },
  { id: '5', title: 'Stand-up Comedy Night', creator: 'Comedy Central', type: 'PAID', status: 'PENDING', price: 12, viewers: 0, scheduledAt: 'Jan 12, 2026 10:00 PM' },
  { id: '6', title: 'Classical Orchestra', creator: 'Symphony Hall', type: 'PAID', status: 'APPROVED', price: 25, viewers: 0, scheduledAt: 'Jan 15, 2026 6:00 PM' },
  { id: '7', title: 'Dance Performance', creator: 'Dance Studio X', type: 'FREE', status: 'LIVE', price: null, viewers: 890, scheduledAt: 'Jan 9, 2026 5:00 PM' },
  { id: '8', title: 'Rock Concert', creator: 'The Rockers', type: 'PAID', status: 'REJECTED', price: 20, viewers: 0, scheduledAt: 'Jan 14, 2026 9:00 PM' },
]

const statusColors = {
  LIVE: 'bg-red-500/20 text-red-400 border-red-500/30',
  PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  APPROVED: 'bg-green-500/20 text-green-400 border-green-500/30',
  REJECTED: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  ENDED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

const statusIcons = {
  LIVE: PlayCircle,
  PENDING: Clock,
  APPROVED: CheckCircle2,
  REJECTED: XCircle,
  ENDED: Eye,
}

const typeColors = {
  FREE: 'bg-green-500/20 text-green-400',
  PAID: 'bg-[#f7e774]/20 text-[#f7e774]',
  SPONSORED: 'bg-purple-500/20 text-purple-400',
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.creator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !selectedStatus || event.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Event Management" 
        description="Review, approve, and manage all platform events" 
      />

      <div className="p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
            <div className="flex items-center gap-3">
              <PlayCircle className="h-6 w-6 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-white">{events.filter(e => e.status === 'LIVE').length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Live</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">{events.filter(e => e.status === 'PENDING').length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Pending</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{events.filter(e => e.status === 'APPROVED').length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Approved</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{events.filter(e => e.status === 'ENDED').length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Ended</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#f7e774]/10 to-[#f7e774]/5 border border-[#f7e774]/20">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-[#f7e774]" />
              <div>
                <p className="text-2xl font-bold text-white">{events.length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Search events or creators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {['LIVE', 'PENDING', 'APPROVED', 'ENDED'].map((status) => (
                    <Button
                      key={status}
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                      className={`rounded-full text-xs font-medium ${
                        selectedStatus === status 
                          ? statusColors[status as keyof typeof statusColors]
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white/90 border-white/50 text-[#0f0f0f] hover:bg-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm" className="bg-white/90 border-white/50 text-[#0f0f0f] hover:bg-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Table */}
        <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Event</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Type</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Price</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Viewers</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Scheduled</th>
                  <th className="text-right text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEvents.map((event, index) => {
                  const StatusIcon = statusIcons[event.status as keyof typeof statusIcons]
                  return (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f7e774]/20 to-[#d4a500]/10 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-[#f7e774]" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{event.title}</p>
                            <p className="text-sm text-white/50">{event.creator}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${typeColors[event.type as keyof typeof typeColors]}`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[event.status as keyof typeof statusColors]}`}>
                          <StatusIcon className="h-3 w-3" />
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {event.price ? (
                          <span className="flex items-center gap-1 text-white/70">
                            <DollarSign className="h-3 w-3" />
                            {event.price}
                          </span>
                        ) : (
                          <span className="text-white/40">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-white/70">
                          <Users className="h-3 w-3" />
                          {event.viewers.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-white/50 text-sm">
                          <Calendar className="h-3 w-3" />
                          {event.scheduledAt}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {event.status === 'PENDING' && (
                            <>
                              <Button size="sm" className="h-7 px-3 bg-green-500/20 text-green-400 hover:bg-green-500/30 text-xs">
                                Approve
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 px-3 text-red-400 hover:bg-red-500/10 text-xs">
                                Reject
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-red-400 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-sm text-white/50">
              Showing <span className="text-white font-medium">{filteredEvents.length}</span> of <span className="text-white font-medium">{events.length}</span> events
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-white/70">Page 1 of 1</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
