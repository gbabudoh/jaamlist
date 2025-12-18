'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Users, DollarSign, Radio, Search, MapPin, Filter, Grid, List, Music, Mic, Theater, Laugh, Globe, ChevronDown, X, Sparkles } from 'lucide-react'
import { formatDate, formatPrice, getEventTypeColor, getEventStatusColor } from '@/lib/utils'

interface Event {
  id: string
  title: string
  description: string
  thumbnail?: string
  type: string
  status: string
  price?: number
  scheduledAt: string
  currentViewers: number
  country?: string
  category?: string
  creator: {
    name: string
    avatar?: string
  }
  sponsors: Array<{
    name: string
    logo: string
  }>
}

const countries = [
  { code: 'all', name: 'All Countries', flag: '🌍' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
]

const categories = [
  { id: 'all', name: 'All Categories', icon: Grid },
  { id: 'concert', name: 'Concerts', icon: Music },
  { id: 'interview', name: 'Interviews', icon: Mic },
  { id: 'drama', name: 'Stage Dramas', icon: Theater },
  { id: 'comedy', name: 'Comedy Shows', icon: Laugh },
]

const statusFilters = [
  { id: 'all', name: 'All Events' },
  { id: 'LIVE', name: 'Live Now', dot: true },
  { id: 'APPROVED', name: 'Upcoming' },
  { id: 'ENDED', name: 'Past Events' },
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [countryFilter, setCountryFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [statusFilter, countryFilter, categoryFilter])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (countryFilter !== 'all') params.append('country', countryFilter)
      if (categoryFilter !== 'all') params.append('category', categoryFilter)
      
      const response = await fetch(`/api/events?${params}`)
      const data = await response.json()
      setEvents(data.events || [])
    } catch (error) {
      console.error('Failed to fetch events:', error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter(event => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.creator.name.toLowerCase().includes(query)
    )
  })

  const selectedCountry = countries.find(c => c.code === countryFilter)
  const activeFiltersCount = [statusFilter, countryFilter, categoryFilter].filter(f => f !== 'all').length

  const clearAllFilters = () => {
    setStatusFilter('all')
    setCountryFilter('all')
    setCategoryFilter('all')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#2d2d2a] to-[#1a1a18] text-white px-4 py-16">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f7e774]/20 border border-[#f7e774]/30 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#f7e774]" />
              <span className="text-sm font-medium text-[#f7e774]">Discover Live Events Worldwide</span>
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl mb-4">
              Live Events
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Discover and join live streaming events from creators around the world
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search events, creators, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-white border-0 shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {/* Country Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="h-14 px-4 bg-white rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors min-w-[180px]"
                >
                  <MapPin className="h-5 w-5 text-[#d4a500]" />
                  <span className="text-sm font-medium text-[#2d2d2a]">
                    {selectedCountry?.flag} {selectedCountry?.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
                </button>
                
                {showCountryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-2xl border z-50 max-h-80 overflow-y-auto"
                  >
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setCountryFilter(country.code)
                          setShowCountryDropdown(false)
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                          countryFilter === country.code ? 'bg-[#f7e774]/20' : ''
                        }`}
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span className="text-sm font-medium text-[#2d2d2a]">{country.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-[80px] z-40 bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Status Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {statusFilters.map((status) => (
                <Button
                  key={status.id}
                  variant={statusFilter === status.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status.id)}
                  className={`whitespace-nowrap ${
                    statusFilter === status.id ? 'bg-[#f7e774] text-[#2d2d2a] hover:bg-[#f0df5f]' : ''
                  }`}
                >
                  {status.dot && (
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                  {status.name}
                </Button>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Category Filter */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-[#f7e774] text-[#2d2d2a] text-xs px-1.5 py-0.5 rounded-full font-semibold">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#f7e774] text-[#2d2d2a]' : 'hover:bg-muted'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#f7e774] text-[#2d2d2a]' : 'hover:bg-muted'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t mt-4"
            >
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Category:</span>
                  <div className="flex gap-2">
                    {categories.map((cat) => (
                      <Button
                        key={cat.id}
                        variant={categoryFilter === cat.id ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setCategoryFilter(cat.id)}
                        className={`gap-2 ${
                          categoryFilter === cat.id ? 'bg-[#60615b] text-white hover:bg-[#4d4e49]' : ''
                        }`}
                      >
                        <cat.icon className="h-4 w-4" />
                        {cat.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `${filteredEvents.length} events found`}
            {countryFilter !== 'all' && ` in ${selectedCountry?.name}`}
          </p>
        </div>

        {/* Events Grid/List */}
        {loading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-[#f7e774]/20 flex items-center justify-center mx-auto mb-6">
              <Radio className="h-10 w-10 text-[#d4a500]" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `No events match "${searchQuery}". Try a different search term.`
                : 'No events match your current filters. Try adjusting your search criteria.'}
            </p>
            <Button onClick={clearAllFilters} className="bg-[#f7e774] text-[#2d2d2a] hover:bg-[#f0df5f]">
              Clear all filters
            </Button>
          </motion.div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/events/${event.id}`}>
                  <Card className={`group overflow-hidden transition-all hover:shadow-xl border-2 hover:border-[#f7e774] h-full ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}>
                    {/* Thumbnail */}
                    <div className={`relative overflow-hidden bg-gradient-to-br from-[#f7e774]/10 to-[#60615b]/10 ${
                      viewMode === 'list' ? 'w-64 aspect-[4/3]' : 'aspect-video'
                    }`}>
                      {event.thumbnail ? (
                        <Image
                          src={event.thumbnail}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Radio className="h-16 w-16 text-muted-foreground/30" />
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <span className={`rounded-full ${getEventStatusColor(event.status)} px-3 py-1 text-xs font-semibold text-white shadow-lg`}>
                          {event.status === 'LIVE' && (
                            <span className="relative flex h-2 w-2 mr-1.5 inline-block">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                          )}
                          {event.status}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`rounded-full ${getEventTypeColor(event.type)} px-3 py-1 text-xs font-semibold text-white shadow-lg`}>
                          {event.type}
                        </span>
                      </div>

                      {/* Country Badge */}
                      {event.country && (
                        <div className="absolute bottom-3 left-3">
                          <span className="rounded-full bg-white/90 backdrop-blur px-2 py-1 text-xs font-medium shadow flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {event.country}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <CardHeader>
                        <CardTitle className="line-clamp-2 group-hover:text-[#d4a500] transition-colors">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {event.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(new Date(event.scheduledAt))}</span>
                        </div>

                        {event.status === 'LIVE' && (
                          <div className="flex items-center gap-2 text-sm text-red-500 font-medium">
                            <Users className="h-4 w-4" />
                            <span>{event.currentViewers.toLocaleString()} watching now</span>
                          </div>
                        )}

                        {event.type === 'PAID' && event.price && (
                          <div className="flex items-center gap-2 text-sm font-semibold text-[#d4a500]">
                            <DollarSign className="h-4 w-4" />
                            <span>{formatPrice(event.price)}</span>
                          </div>
                        )}

                        {event.sponsors && event.sponsors.length > 0 && (
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground mb-2">Sponsored by</p>
                            <div className="flex gap-2">
                              {event.sponsors.slice(0, 3).map((sponsor) => (
                                <div key={sponsor.name} className="relative h-8 w-8 rounded-full border bg-white p-1">
                                  <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            by <span className="font-medium text-foreground">{event.creator.name}</span>
                          </p>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}