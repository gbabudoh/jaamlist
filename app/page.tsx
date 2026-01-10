'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Music, Mic, Theater, Laugh, Play, Users, Globe, Zap, Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

const categories = [
  { id: 'concert', icon: Music, label: 'Live Concerts', description: 'Experience music like never before', color: 'bg-gradient-to-br from-[#f7e774] to-[#d4a500]' },
  { id: 'interview', icon: Mic, label: 'Live Interviews', description: 'Exclusive conversations', color: 'bg-gradient-to-br from-[#60615b] to-[#3d3d38]' },
  { id: 'drama', icon: Theater, label: 'Stage Dramas', description: 'Theater at your fingertips', color: 'bg-gradient-to-br from-[#f7e774] to-[#d4a500]' },
  { id: 'comedy', icon: Laugh, label: 'Comedy Shows', description: 'Laugh out loud moments', color: 'bg-gradient-to-br from-[#60615b] to-[#3d3d38]' },
]

const features = [
  { icon: Globe, title: 'Global Reach', description: 'Stream to audiences worldwide with enterprise-grade infrastructure' },
  { icon: Zap, title: 'Ultra-Low Latency', description: 'Real-time interaction with sub-second streaming delays' },
  { icon: Shield, title: 'Secure & Reliable', description: 'Bank-level security with 99.9% uptime guarantee' },
  { icon: Users, title: 'Unlimited Viewers', description: 'Scale effortlessly from 10 to 10 million viewers' },
]

const stats = [
  { value: '10K+', label: 'Live Events' },
  { value: '500K+', label: 'Happy Viewers' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center px-4 py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7e774]/5 via-transparent to-transparent" />
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at center, #f7e774 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-[#f7e774]/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-[#f7e774]/20 blur-3xl"
          />
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#f7e774]/20 border border-[#f7e774]/30 px-4 py-2"
              >
                <Sparkles className="h-4 w-4 text-[#d4a500]" />
                <span className="text-sm font-medium text-[#60615b]">Live Streaming From Anywhere</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Live Performance
                <br />
                <span className="bg-gradient-to-r from-[#d4a500] via-[#f7e774] to-[#d4a500] bg-clip-text text-transparent">
                  from anywhere
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg text-muted-foreground lg:text-xl max-w-xl"
              >
                The premier platform for live concerts, interviews, stage dramas, and comedy shows. 
                Stream or watch high-quality performances from anywhere in the world.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              >
                <Link href="/events">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-semibold bg-[#f7e774] text-[#2d2d2a] hover:bg-[#f0df5f] shadow-lg hover:shadow-xl transition-all">
                    <Play className="mr-2 h-5 w-5" />
                    Explore Events
                  </Button>
                </Link>
                <Link href="/stream">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-semibold border-2 border-[#60615b] hover:bg-[#60615b] hover:text-white transition-all">
                    Start Streaming
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-6 pt-4 justify-center lg:justify-start"
              >
                {['HD Quality', 'Low Latency', 'Secure Payments'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-[#d4a500]" />
                    <span>{badge}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Video Card */}
                <div className="relative aspect-video overflow-hidden rounded-2xl border-4 border-[#f7e774] bg-gradient-to-br from-[#2d2d2a] to-[#1a1a18] shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-[#f7e774]/20 blur-xl" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#f7e774] shadow-lg cursor-pointer hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-[#2d2d2a] ml-1" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Live Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-sm font-semibold text-white bg-black/50 px-2 py-1 rounded">LIVE</span>
                  </div>

                  {/* Viewers Count */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full">
                    <Users className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">12.5K watching</span>
                  </div>

                  {/* Now Playing Badge - Reduced on mobile */}
                  <motion.div
                    animate={{ opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/95 backdrop-blur rounded-lg shadow-lg p-1.5 md:p-3"
                  >
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="h-5 w-5 md:h-8 md:w-8 rounded-full bg-[#f7e774] flex items-center justify-center">
                        <Music className="h-2.5 w-2.5 md:h-4 md:w-4 text-[#2d2d2a]" />
                      </div>
                      <div>
                        <p className="text-[8px] md:text-[10px] text-muted-foreground">Now Playing</p>
                        <p className="text-[10px] md:text-xs font-semibold text-[#2d2d2a]">Jazz Night Live</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Streaming To Badge - Reduced on mobile */}
                  <motion.div
                    animate={{ opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white/95 backdrop-blur rounded-lg shadow-lg p-1.5 md:p-3"
                  >
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="h-5 w-5 md:h-8 md:w-8 rounded-full bg-[#60615b] flex items-center justify-center">
                        <Globe className="h-2.5 w-2.5 md:h-4 md:w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[8px] md:text-[10px] text-muted-foreground">Streaming to</p>
                        <p className="text-[10px] md:text-xs font-semibold text-[#2d2d2a]">150+ Countries</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-[#f7e774]/10 px-4 py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl font-bold text-[#2d2d2a]">{stat.value}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="inline-block text-sm font-semibold text-[#d4a500] mb-4">CATEGORIES</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
              What&apos;s Streaming
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover live performances across various categories and find your next favorite show
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <Link href={`/events?category=${category.id}`}>
                  <Card className="h-full border-2 hover:border-[#f7e774] transition-all overflow-hidden">
                    <CardContent className="p-6">
                      <div className={`${category.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{category.label}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#2d2d2a] text-white px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="inline-block text-sm font-semibold text-[#f7e774] mb-4">WHY JAAMLIST</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
              Enterprise-Grade Streaming
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Built for scale, designed for performance. Everything you need to deliver world-class live experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto w-16 h-16 rounded-2xl bg-[#f7e774] flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-[#2d2d2a]" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#f7e774] to-[#d4a500] p-12 lg:p-16 text-center"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2d2d2a_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl text-[#2d2d2a] mb-4">
                Ready to Go Live?
              </h2>
              <p className="text-[#2d2d2a]/80 text-lg max-w-2xl mx-auto mb-8">
                Join thousands of creators and start streaming your performances to a global audience today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="h-12 px-8 bg-[#2d2d2a] text-white hover:bg-[#1a1a18]">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/events">
                  <Button size="lg" variant="outline" className="h-12 px-8 border-2 border-[#2d2d2a] text-[#2d2d2a] hover:bg-[#2d2d2a] hover:text-white">
                    Browse Events
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}