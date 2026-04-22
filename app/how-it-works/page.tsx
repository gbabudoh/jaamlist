'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Target,
  ShieldCheck,
  Video,
  Sparkles,
  ArrowRight,
  Gem,
  BarChart3,
  LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ReactNode } from 'react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] selection:bg-[#f7e774]/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[500px] bg-gradient-to-b from-[#f7e774]/10 to-transparent rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[400px] bg-indigo-50/50 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <span className="px-4 py-1.5 rounded-full bg-[#f7e774]/20 text-[#856404] text-xs font-black uppercase tracking-widest mb-6 inline-block">
              Inside the Jaamlist Ecosystem
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-8">
              The Future of <span className="text-[#d4a500]">Live Performance</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
              Jaamlist is a premium broadcast platform where creators turn their talent into high-revenue live events and fans experience the front row from anywhere.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-10 rounded-2xl bg-[#0f172a] text-white hover:bg-[#d4a500] font-black transition-all shadow-xl shadow-slate-200">
                  Join as Creator
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl border-slate-200 hover:bg-slate-50 font-black transition-all">
                  Explore Events
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Concept Grid */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <FeatureCard 
              icon={Target}
              title="Discovery"
              description="Fans discover exclusive performances, workshops, and comedy shows tailored to their interests through our intelligent discovery engine."
            />
            <FeatureCard 
              icon={Video}
              title="Premium Broadcast"
              description="Creators stream in ultra-low latency, high-fidelity 4K directly from their studio using our professional RTMP protocol."
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Secure Access"
              description="Our encrypted ticketing system ensures that only authorized fans gain access to private spotlight sessions."
            />
          </div>
        </div>
      </section>

      {/* Creator Revenue Section */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Monetize Your Talent <br />
                  <span className="text-[#d4a500]">Without Limits</span>
                </h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  We believe creators should keep more of what they earn. Jaamlist provides multiple revenue streams to ensure your artistry is sustainable.
                </p>

                <div className="space-y-6">
                  <RevenueItem 
                    icon={Gem}
                    title="Ticket Sales"
                    description="Set your own prices for live events. From $5 digital access to $500 VIP front-row experiences."
                  />
                  <RevenueItem 
                    icon={Sparkles}
                    title="Virtual Gifting"
                    description="Receive real-time tips and digital gifts from fans during your broadcast, instantly convertible to cash."
                  />
                  <RevenueItem 
                    icon={BarChart3}
                    title="Analytics-Driven Growth"
                    description="Deep audience insights help you understand when to stream and how to optimize your revenue per viewer."
                  />
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-[#f7e774]/20 rounded-[60px] blur-[80px] -z-10 animate-pulse" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 sm:p-12 rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100"
              >
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-xl">Revenue Forecast</h3>
                    <Badge variant="outline" className="text-[#d4a500] border-[#f7e774]">Live Data</Badge>
                  </div>
                  <div className="space-y-6">
                    <RevenueStat label="Event Tickets" value="$12,450" progress={85} color="bg-[#d4a500]" />
                    <RevenueStat label="Virtual Gifts" value="$3,120" progress={45} color="bg-indigo-500" />
                    <RevenueStat label="Backstage Passes" value="$8,900" progress={70} color="bg-rose-500" />
                  </div>
                  <div className="pt-8 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Total Earnings</span>
                      <span className="text-3xl font-black text-[#0f172a]">$24,470.00</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-32 bg-[#0f172a] text-white rounded-[60px] mx-4 sm:mx-8 mb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-20">Simple 3-Step Success</h2>
          <div className="grid md:grid-cols-3 gap-16">
            <StepItem number="01" title="Build Your Studio" description="Set up your profile, upload your portfolio, and configure your broadcast hub in seconds." />
            <StepItem number="02" title="Schedule & Market" description="Create your event, set your ticket price, and share the secure link with your audience." />
            <StepItem number="03" title="Go Live & Earn" description="Hit 'Initialize Spotlight' and start performing. Revenue is tracked in real-time as fans join." />
          </div>
          <div className="mt-20">
            <Link href="/signup">
              <Button size="lg" className="h-16 px-12 rounded-2xl bg-[#f7e774] text-[#0f172a] hover:bg-white font-black text-lg shadow-2xl transition-all group">
                Get Started Today <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Meta */}
      <footer className="py-20 container mx-auto px-4 text-center border-t border-slate-100">
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Empowering Artistry Worldwide</p>
        <p className="text-slate-500 max-w-lg mx-auto text-sm">
          Jaamlist uses industry-standard encryption and professional-grade infrastructure to protect your content and ensure secure payouts to creators in over 150 countries.
        </p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
    >
      <div className="h-14 w-14 rounded-2xl bg-[#f7e774]/10 flex items-center justify-center mb-8">
        <Icon className="h-7 w-7 text-[#d4a500]" />
      </div>
      <h3 className="text-2xl font-black mb-4">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
    </motion.div>
  )
}

function RevenueItem({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f7e774]/20 transition-colors">
        <Icon className="h-6 w-6 text-slate-400 group-hover:text-[#d4a500] transition-colors" />
      </div>
      <div>
        <h4 className="font-black text-lg mb-1">{title}</h4>
        <p className="text-slate-500 font-medium leading-tight">{description}</p>
      </div>
    </div>
  )
}

function RevenueStat({ label, value, progress, color }: { label: string, value: string, progress: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-sm font-bold text-slate-500">{label}</span>
        <span className="font-black text-[#0f172a]">{value}</span>
      </div>
      <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  )
}

function StepItem({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="space-y-6">
      <div className="text-6xl font-black text-white/5 font-display">{number}</div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed px-4">{description}</p>
    </div>
  )
}

function Badge({ children, className }: { children: ReactNode, variant?: string, className?: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${className}`}>
      {children}
    </span>
  )
}
