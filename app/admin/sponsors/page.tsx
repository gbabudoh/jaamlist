'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Handshake, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ExternalLink,
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
  Globe,
  Calendar
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Mock sponsors data
const sponsors = [
  { id: '1', name: 'Spotify', logo: '🎵', website: 'https://spotify.com', event: 'Jazz Night Live', priority: 1, createdAt: 'Jan 5, 2026' },
  { id: '2', name: 'Apple Music', logo: '🍎', website: 'https://music.apple.com', event: 'Acoustic Session', priority: 2, createdAt: 'Jan 3, 2026' },
  { id: '3', name: 'YouTube Music', logo: '▶️', website: 'https://music.youtube.com', event: 'Rock Concert', priority: 1, createdAt: 'Jan 8, 2026' },
  { id: '4', name: 'SoundCloud', logo: '☁️', website: 'https://soundcloud.com', event: 'Dance Performance', priority: 3, createdAt: 'Jan 7, 2026' },
  { id: '5', name: 'Tidal', logo: '🌊', website: 'https://tidal.com', event: 'Classical Orchestra', priority: 2, createdAt: 'Jan 6, 2026' },
  { id: '6', name: 'Amazon Music', logo: '📦', website: 'https://music.amazon.com', event: 'Comedy Hour Special', priority: 1, createdAt: 'Jan 9, 2026' },
]

export default function SponsorsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSponsors = sponsors.filter(sponsor => 
    sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sponsor.event.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Sponsor Management" 
        description="Manage event sponsors and partnerships" 
      />

      <div className="p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <Handshake className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{sponsors.length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Total Sponsors</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#f7e774]/10 to-[#f7e774]/5 border border-[#f7e774]/20">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-[#f7e774]" />
              <div>
                <p className="text-2xl font-bold text-white">{new Set(sponsors.map(s => s.event)).size}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Sponsored Events</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{sponsors.filter(s => s.priority === 1).length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Premium Partners</p>
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
                    placeholder="Search sponsors or events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
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
                <Button size="sm" className="bg-[#f7e774] text-[#0f0f0f] hover:bg-[#d4a500]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sponsor
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 overflow-hidden group hover:border-[#f7e774]/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl">
                        {sponsor.logo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{sponsor.name}</h3>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          sponsor.priority === 1 
                            ? 'bg-[#f7e774]/20 text-[#f7e774]' 
                            : sponsor.priority === 2
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-white/10 text-white/50'
                        }`}>
                          {sponsor.priority === 1 ? 'Premium' : sponsor.priority === 2 ? 'Standard' : 'Basic'}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between text-white/50">
                      <span>Event</span>
                      <span className="text-white font-medium">{sponsor.event}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/50">
                      <span>Added</span>
                      <span className="text-white/70">{sponsor.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 text-white/50 hover:text-white hover:bg-white/5"
                      asChild
                    >
                      <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-red-400 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/50">
            Showing <span className="text-white font-medium">{filteredSponsors.length}</span> of <span className="text-white font-medium">{sponsors.length}</span> sponsors
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
      </div>
    </div>
  )
}
