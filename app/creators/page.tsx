'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Users, Star, ArrowRight, Music, Mic, Theater, Laugh, CheckCircle2, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'

// Mock Data
const creators = [
  {
    id: 1,
    name: "Sarah Jenkins",
    handle: "@sarahj_music",
    category: "Music",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    cover: "bg-gradient-to-r from-purple-500 to-pink-500",
    followers: "125K",
    location: "London, UK",
    rating: 4.9,
    isLive: true,
    tags: ["Jazz", "Soul", "Piano"]
  },
  {
    id: 2,
    name: "Comedy Club Live",
    handle: "@comedyclub",
    category: "Comedy",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Comedy",
    cover: "bg-gradient-to-r from-yellow-400 to-orange-500",
    followers: "890K",
    location: "New York, USA",
    rating: 4.8,
    isLive: false,
    tags: ["Stand-up", "Sketch", "Improv"]
  },
  {
    id: 3,
    name: "The Daily Talk",
    handle: "@dailytalk",
    category: "Interviews",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Talk",
    cover: "bg-gradient-to-r from-blue-500 to-cyan-500",
    followers: "450K",
    location: "Toronto, CA",
    rating: 4.7,
    isLive: true,
    tags: ["Tech", "Culture", "News"]
  },
  {
    id: 4,
    name: "Royal Theater Co.",
    handle: "@royaltheater",
    category: "Drama",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Theater",
    cover: "bg-gradient-to-r from-red-600 to-rose-600",
    followers: "200K",
    location: "Melbourne, AU",
    rating: 4.9,
    isLive: false,
    tags: ["Classic", "Modern", "Shakespeare"]
  },
  {
    id: 5,
    name: "Electro Beats",
    handle: "@electrobeats",
    category: "Music",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Electro",
    cover: "bg-gradient-to-r from-green-400 to-emerald-600",
    followers: "310K",
    location: "Berlin, DE",
    rating: 4.8,
    isLive: true,
    tags: ["EDM", "House", "DJ"]
  },
  {
    id: 6,
    name: "Laugh Factory",
    handle: "@laughfactory",
    category: "Comedy",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laugh",
    cover: "bg-gradient-to-r from-pink-500 to-rose-500",
    followers: "1.2M",
    location: "Los Angeles, USA",
    rating: 4.9,
    isLive: false,
    tags: ["Stand-up", "Open Mic"]
  }
]

const categories = [
  { id: 'all', label: 'All Creators', icon: Users },
  { id: 'Music', label: 'Musicians', icon: Music },
  { id: 'Comedy', label: 'Comedians', icon: Laugh },
  { id: 'Interviews', label: 'Podcasters', icon: Mic },
  { id: 'Drama', label: 'Performers', icon: Theater },
]

export default function CreatorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          creator.handle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || creator.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2d2d2a] to-[#1a1a18] text-white px-4 py-20">
        <div className="container mx-auto">
          <BackButton className="mb-6 text-white/70 hover:text-white" />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f7e774]/20 border border-[#f7e774]/30 px-4 py-2 mb-6">
              <Users className="h-4 w-4 text-[#f7e774]" />
              <span className="text-sm font-medium text-[#f7e774]">Community</span>
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
              Meet Our Creators
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Discover the talented artists, performers, and personalities shaping the future of live entertainment.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search creators by name or handle..." 
                className="h-14 pl-12 bg-white text-black border-0 shadow-xl text-base rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              className={`rounded-full px-6 ${
                selectedCategory === cat.id 
                  ? 'bg-[#f7e774] text-[#2d2d2a] hover:bg-[#d4a500]' 
                  : 'hover:bg-[#f7e774]/10'
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <cat.icon className="h-4 w-4 mr-2" />
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-2 hover:border-[#f7e774] transition-all group h-full">
                {/* Cover Banner */}
                <div className={`h-24 ${creator.cover} relative`}>
                  {creator.isLive && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                      <Video className="h-3 w-3" />
                      LIVE
                    </div>
                  )}
                </div>
                
                <CardContent className="pt-0 pb-6 px-6 relative">
                  {/* Avatar */}
                  <div className="relative -mt-12 mb-4 flex justify-between items-end">
                    <div className="h-24 w-24 rounded-full border-4 border-background bg-white overflow-hidden shadow-lg relative">
                      {/* Using generic avatar service for demo */}
                      <Image 
                        src={creator.avatar} 
                        alt={creator.name} 
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <Button size="sm" className="bg-[#2d2d2a] text-white hover:bg-[#4d4e49] rounded-full">
                      Follow
                    </Button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-xl">{creator.name}</h3>
                      <CheckCircle2 className="h-4 w-4 text-blue-500 fill-blue-500/10" />
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{creator.handle}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{creator.followers}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{creator.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#d4a500]">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{creator.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {creator.tags.map(tag => (
                        <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md bg-[#f7e774]/20 text-[#d4a500] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full group-hover:bg-[#f7e774] group-hover:text-[#2d2d2a] transition-colors">
                      View Profile
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-semibold mb-2">No creators found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
