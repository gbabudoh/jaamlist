'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Ticket, Users, Radio, Check, ArrowRight, DollarSign, Handshake, Gift, LucideIcon } from 'lucide-react'
import { BackButton } from '@/components/back-button'

type PricingModel = {
  icon: LucideIcon
  name: string
  subtitle: string
  description: string
  features: string[]
  revenue: string
  revenueDetail: string
  cta: string
  href: string
  color: string
  textColor: string
  buttonVariant: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  highlight?: boolean
}

const pricingModels: PricingModel[] = [
  {
    icon: Ticket,
    name: 'Pay-Per-View',
    subtitle: 'For Independent Creators',
    description: 'Stream for free. You set the price, your audience pays to watch.',
    features: [
      'Free for streamers to go live',
      'Set your own ticket price',
      'Secure payment processing',
      'Ticketing system included',
      'Live Concerts, Dramas, Comedy'
    ],
    revenue: 'Jaamlist takes 3-5%',
    revenueDetail: 'of the streaming access fee per person',
    cta: 'Start Streaming',
    href: '/stream',
    color: 'from-[#f7e774] to-[#d4a500]',
    textColor: 'text-[#2d2d2a]',
    buttonVariant: 'default'
  },
  {
    icon: Handshake,
    name: 'Sponsored',
    subtitle: 'For Brand Partnerships',
    description: 'Secure sponsors to cover costs. Viewers watch for free.',
    features: [
      'Free access for your viewers',
      'Access codes for entry',
      'Brand integration options',
      'Sponsor visibility tools',
      'Ideal for larger productions'
    ],
    revenue: '60% / 40% Split',
    revenueDetail: 'Streamer (60%) / Jaamlist (40%) of sponsorship fee',
    cta: 'Find Sponsors',
    href: '/contact',
    color: 'from-[#2d2d2a] to-[#1a1a18]',
    textColor: 'text-white',
    buttonVariant: 'outline',
    highlight: true
  },
  {
    icon: Gift,
    name: 'Partner Events',
    subtitle: 'Jaamlist Originals',
    description: 'Free live streaming events in partnership with third-parties.',
    features: [
      'Completely free for everyone',
      'Ad-supported content',
      'Partner-sponsored productions',
      'Global community access',
      'Diverse entertainment'
    ],
    revenue: 'Free Access',
    revenueDetail: 'Supported by advertisement sponsorship',
    cta: 'Browse Events',
    href: '/events',
    color: 'from-[#f7e774] to-[#d4a500]',
    textColor: 'text-[#2d2d2a]',
    buttonVariant: 'default'
  }
]

export default function PricingPage() {
  return (
    <div className="relative min-h-screen pt-20 pb-20">
      {/* Background Elements */}
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
      </div>

      <div className="container mx-auto px-4">
        <BackButton className="mb-6" />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            Flexible ways to
            <span className="block bg-gradient-to-r from-[#d4a500] via-[#f7e774] to-[#d4a500] bg-clip-text text-transparent">
              monetize & watch
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Whether you&apos;re selling tickets, securing sponsors, or hosting free events, we have a model that works for you.
          </p>
        </motion.div>

        {/* Pricing Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingModels.map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="relative"
            >
              <Card className={`h-full flex flex-col relative overflow-hidden transition-all duration-300 border-2 ${
                model.highlight 
                  ? 'border-[#f7e774] shadow-xl shadow-[#f7e774]/10 bg-[#2d2d2a] text-white' 
                  : 'border-border hover:border-[#f7e774]/50'
              }`}>
                
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${model.color}`}>
                    <model.icon className={`h-6 w-6 ${model.textColor}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{model.name}</CardTitle>
                  <p className={`font-medium ${model.highlight ? 'text-[#f7e774]' : 'text-[#d4a500]'}`}>
                    {model.subtitle}
                  </p>
                  <CardDescription className={`mt-2 ${model.highlight ? 'text-white/70' : ''}`}>
                    {model.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className={`p-4 rounded-lg mb-6 ${model.highlight ? 'bg-white/10' : 'bg-secondary/50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className={`h-4 w-4 ${model.highlight ? 'text-[#f7e774]' : 'text-[#d4a500]'}`} />
                      <span className="font-bold">{model.revenue}</span>
                    </div>
                    <p className="text-xs opacity-70">{model.revenueDetail}</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`mt-1 rounded-full p-0.5 ${model.highlight ? 'bg-[#f7e774]/20 text-[#f7e774]' : 'bg-[#d4a500]/10 text-[#d4a500]'}`}>
                          <Check className="h-3 w-3" />
                        </div>
                        <span className={`text-sm ${model.highlight ? 'text-white/80' : 'text-foreground/80'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Link href={model.href} className="w-full">
                    <Button 
                      className={`w-full h-12 font-semibold ${
                        model.buttonVariant === 'default'
                          ? 'bg-[#f7e774] text-[#2d2d2a] hover:bg-[#f0df5f]' 
                          : 'bg-transparent border-2 border-[#f7e774] text-[#f7e774] hover:bg-[#f7e774] hover:text-[#2d2d2a]'
                      }`}
                    >
                      {model.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <div className="p-6 rounded-2xl bg-[#f7e774]/10 border border-[#f7e774]/20">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-[#d4a500]" />
              <h3 className="font-bold text-[#2d2d2a]">For Viewers</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Most events are free or require a small access fee. Look for the &quot;Free Entry&quot; or &quot;Ticketed&quot; badges on event listings.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#2d2d2a]/5 border border-[#2d2d2a]/10">
            <div className="flex items-center gap-3 mb-2">
              <Radio className="h-5 w-5 text-[#2d2d2a]" />
              <h3 className="font-bold text-[#2d2d2a]">For Streamers</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose the model that fits your audience. Mix and match—host a free sponsored talk one day and a ticketed concert the next.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
