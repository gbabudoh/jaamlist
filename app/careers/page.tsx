'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, ArrowRight, Zap, Globe, Users, Shield, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'

const values = [
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We push boundaries and explore new technologies to build the future of streaming.'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'We build for our creators and viewers, always putting their needs first.'
  },
  {
    icon: Globe,
    title: 'Remote First',
    description: 'Work from anywhere in the world. We believe in talent, not geography.'
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'We prioritize the safety and security of our platform and community.'
  }
]

const jobs = [
  {
    department: 'Engineering',
    roles: [
      { id: 1, title: 'Senior Frontend Engineer', type: 'Full-time', location: 'Remote (US/EU)' },
      { id: 2, title: 'Backend Developer (Go)', type: 'Full-time', location: 'Remote (Global)' },
      { id: 3, title: 'DevOps Engineer', type: 'Full-time', location: 'London, UK' },
    ]
  },
  {
    department: 'Product',
    roles: [
      { id: 4, title: 'Senior Product Manager', type: 'Full-time', location: 'New York, USA' },
      { id: 5, title: 'Product Designer', type: 'Full-time', location: 'Remote (US)' },
    ]
  },
  {
    department: 'Marketing',
    roles: [
      { id: 6, title: 'Growth Marketing Manager', type: 'Full-time', location: 'Remote (Global)' },
      { id: 7, title: 'Content Strategist', type: 'Contract', location: 'Remote (Global)' },
    ]
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2d2d2a] to-[#1a1a18] text-white px-4 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto relative z-10">
          <BackButton className="mb-6 text-white/70 hover:text-white" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f7e774]/20 border border-[#f7e774]/30 px-4 py-2 mb-6">
              <Rocket className="h-4 w-4 text-[#f7e774]" />
              <span className="text-sm font-medium text-[#f7e774]">We&apos;re Hiring</span>
            </div>
            <h1 className="font-display text-5xl font-bold sm:text-6xl lg:text-7xl mb-6">
              Join Our Mission
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Help us build the next generation of live streaming entertainment. We&apos;re looking for passionate people to join our global team.
            </p>
            <Button size="lg" className="bg-[#f7e774] text-[#2d2d2a] hover:bg-[#d4a500] text-lg px-8 h-14">
              View Open Positions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-24 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold sm:text-4xl mb-4">Why Work With Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We&apos;re building a culture of creativity, collaboration, and continuous learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg bg-card/50 backdrop-blur">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#f7e774]/10 flex items-center justify-center mx-auto mb-4 text-[#d4a500]">
                      <value.icon className="h-7 w-7" />
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

      {/* Open Positions */}
      <section className="px-4 py-24">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold sm:text-4xl mb-4">Open Positions</h2>
            <p className="text-muted-foreground text-lg">
              Find your next role at Jaamlist
            </p>
          </div>

          <div className="space-y-12">
            {jobs.map((dept, deptIndex) => (
              <motion.div
                key={dept.department}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: deptIndex * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#f7e774] rounded-full" />
                  {dept.department}
                </h3>
                <div className="grid gap-4">
                  {dept.roles.map((role) => (
                    <Card key={role.id} className="group hover:border-[#f7e774] transition-colors cursor-pointer">
                      <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold mb-2 group-hover:text-[#d4a500] transition-colors">
                            {role.title}
                          </h4>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {role.type}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {role.location}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="shrink-0 group-hover:bg-[#f7e774] group-hover:text-[#2d2d2a]">
                          Apply Now
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
