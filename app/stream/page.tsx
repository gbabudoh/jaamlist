'use client'

import { motion } from 'framer-motion'
import { Radio, Video, Users, Zap, Globe, Shield, DollarSign, BarChart3, Sparkles, Play, CheckCircle2, ArrowRight, Music, Mic, Theater, Laugh, Headphones, Settings, Monitor, Award, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const features = [
  {
    icon: Video,
    title: 'HD Quality Streaming',
    description: 'Stream in stunning 1080p HD with adaptive bitrate for viewers on any connection',
  },
  {
    icon: Zap,
    title: 'Ultra-Low Latency',
    description: 'Sub-second latency for real-time interaction with your audience',
  },
  {
    icon: Users,
    title: 'Unlimited Viewers',
    description: 'Scale from 10 to 10 million viewers without any infrastructure worries',
  },
  {
    icon: Globe,
    title: 'Global CDN',
    description: 'Reach audiences worldwide with our 150+ point-of-presence network',
  },
  {
    icon: Shield,
    title: 'Secure Streaming',
    description: 'DRM protection and secure payment processing for paid events',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track viewers, engagement, and revenue with detailed dashboards',
  },
]

const eventTypes = [
  { id: 'concert', icon: Music, label: 'Live Concerts', desc: 'Experience music like never before', color: 'bg-gradient-to-br from-[#f7e774] to-[#d4a500]' },
  { id: 'interview', icon: Mic, label: 'Live Interviews', desc: 'Exclusive conversations', color: 'bg-gradient-to-br from-[#60615b] to-[#3d3d38]' },
  { id: 'drama', icon: Theater, label: 'Stage Dramas', desc: 'Theater at your fingertips', color: 'bg-gradient-to-br from-[#f7e774] to-[#d4a500]' },
  { id: 'comedy', icon: Laugh, label: 'Comedy Shows', desc: 'Laugh out loud moments', color: 'bg-gradient-to-br from-[#60615b] to-[#3d3d38]' },
]

const revenueModels = [
  {
    icon: DollarSign,
    title: 'Paid Live Streams',
    description: 'Set your own ticket price per viewer',
    features: [
      'You set the price for your event',
      'Viewers pay per stream access',
      'Keep 85% of ticket revenue',
      'Instant payouts after events',
    ],
    highlighted: true,
  },
  {
    icon: Award,
    title: 'Sponsored Streams',
    description: 'Partner with brands for your events',
    features: [
      'Connect with relevant sponsors',
      'Brand placement during streams',
      'Sponsored event promotions',
      'Additional revenue stream',
    ],
    highlighted: false,
  },
  {
    icon: Heart,
    title: 'Free Streams',
    description: 'Let viewers watch for free',
    features: [
      'Viewers watch for free',
      'Grow your fanbase',
      'Accept tips from viewers',
      'Great for building audience',
    ],
    highlighted: false,
    price: '$150',
    priceLabel: 'per event',
  },
]

const steps = [
  { icon: Settings, title: 'Create Your Event', description: 'Set up your event details, schedule, and pricing in minutes' },
  { icon: Monitor, title: 'Configure Stream', description: 'Connect OBS, Streamlabs, or use our browser-based studio' },
  { icon: Play, title: 'Go Live', description: 'Start streaming and engage with your audience in real-time' },
  { icon: DollarSign, title: 'Get Paid', description: 'Receive payments directly to your account after each event' },
]

const stats = [
  { value: '50K+', label: 'Creators' },
  { value: '10M+', label: 'Hours Streamed' },
  { value: '150+', label: 'Countries' },
  { value: '$5M+', label: 'Creator Earnings' },
]

export default function StreamPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#2d2d2a] to-[#1a1a18] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #f7e774 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f7e774]/20 border border-[#f7e774]/30 px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-[#f7e774]" />
                <span className="text-sm font-medium text-[#f7e774]">Start Streaming Today</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Share Your
                <br />
                <span className="bg-gradient-to-r from-[#f7e774] to-[#d4a500] bg-clip-text text-transparent">
                  Live Performance
                </span>
              </h1>
              
              <p className="text-lg text-white/70 mb-8 max-w-xl">
                The all-in-one platform to stream concerts, interviews, stage dramas, and comedy shows to audiences worldwide. Monetize your talent and grow your fanbase.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 text-base font-semibold bg-[#f7e774] text-[#2d2d2a] hover:bg-[#f0df5f]">
                    <Play className="mr-2 h-5 w-5" />
                    Start Streaming Free
                  </Button>
                </Link>
                  <Link href="/events">
                    <Button size="lg" className="h-14 px-8 text-base font-semibold bg-white text-[#2d2d2a] hover:bg-gray-100">
                      Watch Live Events
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                {['No credit card required', 'Free forever plan', 'Setup in 5 minutes'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle2 className="h-4 w-4 text-[#f7e774]" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Stream Preview Card */}
                <div className="relative aspect-video rounded-2xl border-4 border-[#f7e774] bg-gradient-to-br from-[#3d3d38] to-[#2d2d2a] shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-[#f7e774]/20 blur-xl" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#f7e774] shadow-lg">
                        <Radio className="h-8 w-8 text-[#2d2d2a]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Live indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-sm font-semibold bg-red-500 px-2 py-1 rounded">LIVE</span>
                  </div>

                  {/* Stats overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">12.5K watching</span>
                  </div>

                  {/* Earnings Badge - Inside */}
                  <motion.div
                    animate={{ opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-lg shadow-lg p-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Earnings Today</p>
                        <p className="text-sm font-bold text-[#2d2d2a]">$1,250</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Audio Quality Badge - Inside */}
                  <motion.div
                    animate={{ opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-lg shadow-lg p-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#f7e774] flex items-center justify-center">
                        <Headphones className="h-4 w-4 text-[#2d2d2a]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Audio Quality</p>
                        <p className="text-sm font-bold text-[#2d2d2a]">320kbps Stereo</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#f7e774] px-4 py-12">
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
                <p className="text-[#60615b] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Types Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-[#d4a500] mb-4">WHAT YOU CAN STREAM</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
              Stream Any Performance
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Whether it&apos;s music, comedy, theater, or talk shows - we&apos;ve got you covered
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {eventTypes.map((type, index) => (
              <motion.div
                key={type.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                >
                <Link href={`/events?category=${type.id}`}>
                  <Card className="h-full border-2 hover:border-[#f7e774] transition-all text-center p-6 bg-card/50 backdrop-blur-sm group hover:shadow-lg">
                    <div className={`${type.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <type.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 group-hover:text-[#d4a500] transition-colors">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.desc}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-[#d4a500] mb-4">HOW IT WORKS</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
              Go Live in 4 Easy Steps
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From setup to getting paid, we make streaming simple
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-[#f7e774]/30" />
                )}
                <div className="relative text-center">
                  <div className="mx-auto w-20 h-20 rounded-full bg-[#f7e774] flex items-center justify-center mb-4 relative z-10">
                    <step.icon className="h-10 w-10 text-[#2d2d2a]" />
                  </div>
                  <span className="inline-block bg-[#2d2d2a] text-white text-sm font-bold px-3 py-1 rounded-full mb-3">
                    Step {index + 1}
                  </span>
                  <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-[#d4a500] mb-4">FEATURES</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
              Everything You Need to Stream
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional streaming tools and features to help you succeed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full border-2 hover:border-[#f7e774] transition-all group">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-[#f7e774]/20 flex items-center justify-center mb-4 group-hover:bg-[#f7e774] transition-colors">
                      <feature.icon className="h-7 w-7 text-[#d4a500] group-hover:text-[#2d2d2a] transition-colors" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How You Earn Section */}
      <section className="bg-[#2d2d2a] text-white px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-[#f7e774] mb-4">HOW YOU EARN</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
              No Subscriptions. You Keep What You Earn.
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Jaamlist is completely free to use. We only earn when you earn — through paid streams and sponsorships.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {revenueModels.map((model, index) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${model.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {model.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f7e774] text-[#2d2d2a] text-sm font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <Card className={`h-full ${model.highlighted ? 'border-[#f7e774] border-2 bg-white/5' : 'border-white/10 bg-white/5'}`}>
                  <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 rounded-2xl bg-[#f7e774]/20 flex items-center justify-center mx-auto mb-4">
                      <model.icon className="h-8 w-8 text-[#f7e774]" />
                    </div>
                    <CardTitle className="text-2xl text-white">{model.title}</CardTitle>
                    {'price' in model && model.price && (
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-[#f7e774]">{model.price}</span>
                        <span className="text-white/60 text-sm ml-1">{'priceLabel' in model ? model.priceLabel : 'one-time'}</span>
                      </div>
                    )}
                    <CardDescription className="text-white/60 mt-2">
                      {model.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-3 mb-6">
                      {model.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-white/80">
                          <CheckCircle2 className="h-5 w-5 text-[#f7e774] flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Revenue Split Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 bg-white/5 rounded-2xl px-8 py-4 border border-white/10">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#f7e774]">85%</p>
                <p className="text-white/60 text-sm">You Keep</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-4xl font-bold text-white/60">15%</p>
                <p className="text-white/60 text-sm">Platform Fee</p>
              </div>
            </div>
            <p className="text-white/50 text-sm mt-4">Only on paid events. Free events have zero platform fees.</p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
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
                Ready to Start Streaming?
              </h2>
              <p className="text-[#2d2d2a]/80 text-lg max-w-2xl mx-auto mb-8">
                Join thousands of creators already streaming on Jaamlist. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 bg-[#2d2d2a] text-white hover:bg-[#1a1a18]">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/events">
                  <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-[#2d2d2a] text-[#2d2d2a] hover:bg-[#2d2d2a] hover:text-white">
                    Browse Live Events
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
