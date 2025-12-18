'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Users, Globe, Heart, Target, Zap, Shield, Award, ArrowRight } from 'lucide-react'

const stats = [
  { value: '50K+', label: 'Active Creators' },
  { value: '500K+', label: 'Monthly Viewers' },
  { value: '150+', label: 'Countries' },
  { value: '10M+', label: 'Hours Streamed' },
]

const values = [
  {
    icon: Heart,
    title: 'Creator First',
    description: 'We put creators at the center of everything we do, building tools that empower artistic expression.',
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Breaking down geographical barriers to bring live performances to audiences everywhere.',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Maintaining a safe, inclusive platform where creators and viewers can connect authentically.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Constantly pushing the boundaries of live streaming technology and user experience.',
  },
]

const team = [
  { name: 'Alex Johnson', role: 'CEO & Co-Founder', image: null },
  { name: 'Sarah Chen', role: 'CTO & Co-Founder', image: null },
  { name: 'Michael Obi', role: 'Head of Product', image: null },
  { name: 'Emma Williams', role: 'Head of Creator Success', image: null },
]

const milestones = [
  { year: '2022', title: 'Founded', description: 'Jaamlist was born with a vision to democratize live entertainment' },
  { year: '2023', title: 'Launch', description: 'Public launch with support for concerts, interviews, and comedy shows' },
  { year: '2024', title: 'Global Expansion', description: 'Expanded to 150+ countries with multi-language support' },
  { year: '2025', title: 'Creator Economy', description: 'Enabled $5M+ in creator earnings through paid events' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#2d2d2a] to-[#1a1a18] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #f7e774 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f7e774]/20 border border-[#f7e774]/30 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#f7e774]" />
              <span className="text-sm font-medium text-[#f7e774]">Our Story</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Bringing Live Entertainment
              <br />
              <span className="bg-gradient-to-r from-[#f7e774] to-[#d4a500] bg-clip-text text-transparent">
                to the World
              </span>
            </h1>
            
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Jaamlist is on a mission to connect performers with global audiences, making live entertainment accessible to everyone, everywhere.
            </p>
          </motion.div>
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

      {/* Mission Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-sm font-semibold text-[#d4a500] mb-4">OUR MISSION</span>
              <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-6">
                Empowering Creators, Connecting Audiences
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                We believe that live performance is a powerful form of human connection. Whether it's a jazz concert in New Orleans, a comedy show in Lagos, or a theatrical production in London – these moments deserve to be shared with the world.
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Jaamlist provides the technology and platform that enables creators to reach global audiences while maintaining the intimacy and energy of live performance. We're building the future of entertainment, one stream at a time.
              </p>
              <Link href="/stream">
                <Button size="lg" className="bg-[#f7e774] text-[#2d2d2a] hover:bg-[#f0df5f]">
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#f7e774]/20 to-[#60615b]/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <Target className="h-24 w-24 text-[#d4a500] mx-auto mb-6" />
                  <p className="font-display text-2xl font-bold text-[#2d2d2a]">
                    "Making live entertainment accessible to everyone, everywhere"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-[#d4a500] mb-4">OUR VALUES</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These core values guide everything we do at Jaamlist
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#f7e774] transition-all text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#f7e774] flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-[#2d2d2a]" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-[#d4a500] mb-4">OUR JOURNEY</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
              Milestones
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#f7e774] flex items-center justify-center font-bold text-[#2d2d2a]">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-[#f7e774]/30 mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="font-semibold text-xl mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[#2d2d2a] text-white px-4 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-[#f7e774] mb-4">OUR TEAM</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
              Meet the People Behind Jaamlist
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A passionate team dedicated to revolutionizing live entertainment
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#f7e774] to-[#d4a500] mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-[#2d2d2a]" />
                </div>
                <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                <p className="text-white/60">{member.role}</p>
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
                Join Our Community
              </h2>
              <p className="text-[#2d2d2a]/80 text-lg max-w-2xl mx-auto mb-8">
                Whether you're a creator looking to share your talent or a viewer seeking amazing live experiences, Jaamlist is for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 bg-[#2d2d2a] text-white hover:bg-[#1a1a18]">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/events">
                  <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-[#2d2d2a] text-[#2d2d2a] hover:bg-[#2d2d2a] hover:text-white">
                    Explore Events
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
