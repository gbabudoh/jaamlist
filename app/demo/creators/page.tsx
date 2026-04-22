'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Music, Mic, Gamepad2, Camera, ArrowRight, Star, Users, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

const demoCreators = [
  {
    id: 'sarah-music',
    name: 'Sarah Jenkins',
    role: 'Jazz Musician',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    followers: '125K',
    rating: 4.9,
    icon: Music,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'comedy-mike',
    name: 'Mike Laughs',
    role: 'Stand-up Comedian',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
    followers: '89K',
    rating: 4.8,
    icon: Mic,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'alex-gaming',
    name: 'Alex Plays',
    role: 'Pro Gamer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    followers: '210K',
    rating: 4.9,
    icon: Gamepad2,
    color: 'from-blue-500 to-cyan-500'
  }
]

export default function DemoCreatorsPage() {
  const router = useRouter()

  const handleSelect = (id: string) => {
    // In a real app, we might set a cookie or state
    // For this demo, we'll just redirect to the dashboard
    router.push(`/creator/dashboard?demo=${id}`)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-hidden selection:bg-[#f7e774] selection:text-[#0f0f0f]">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#f7e774]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7e774]/10 border border-[#f7e774]/20 mb-6"
          >
            <Star className="h-4 w-4 text-[#f7e774]" />
            <span className="text-[#f7e774] text-xs font-bold tracking-widest uppercase">Experience the Future</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
          >
            Select a <span className="text-[#f7e774]">Demo Creator</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 max-w-2xl mx-auto"
          >
            Choose a profile to explore the premium Creator Dashboard. See how top artists manage their streams, track revenue, and grow their community.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 260, damping: 20 }}
            >
              <Card 
                className="group relative h-[500px] bg-[#1a1a1a] border-white/5 hover:border-[#f7e774]/50 transition-all duration-500 overflow-hidden cursor-pointer rounded-[32px] shadow-2xl"
                onClick={() => handleSelect(creator.id)}
              >
                {/* Cover Image */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={creator.cover} 
                    alt={creator.name} 
                    fill 
                    className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />
                </div>

                <CardContent className="relative z-10 h-full flex flex-col justify-end p-8">
                  {/* Floating Icon */}
                  <div className={`absolute top-8 right-8 p-4 rounded-2xl bg-gradient-to-br ${creator.color} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <creator.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Avatar */}
                  <div className="mb-6">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#f7e774] transition-colors duration-500">
                      <Image 
                        src={creator.avatar} 
                        alt={creator.name} 
                        fill 
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-3xl font-bold text-white group-hover:text-[#f7e774] transition-colors duration-300">
                        {creator.name}
                      </h3>
                      <CheckCircle2 className="h-5 w-5 text-blue-400 fill-blue-400/10" />
                    </div>
                    <p className="text-white/40 font-medium">{creator.role}</p>
                    
                    <div className="flex items-center gap-4 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-white/30" />
                        <span className="text-sm font-bold text-white/60">{creator.followers}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-[#f7e774] fill-[#f7e774]" />
                        <span className="text-sm font-bold text-white/60">{creator.rating}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full h-14 rounded-2xl bg-[#f7e774] text-[#0f0f0f] hover:bg-white font-bold transition-all duration-300 mt-4 group-hover:translate-y-[-4px] shadow-lg shadow-[#f7e774]/10"
                    >
                      Login as {creator.name.split(' ')[0]}
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <footer className="mt-20 text-center">
          <p className="text-white/20 text-sm">
            Interested in becoming a real creator? <span className="text-white/40 underline cursor-pointer hover:text-[#f7e774] transition-colors">Apply here</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
