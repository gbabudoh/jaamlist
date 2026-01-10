'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock, ChevronRight, Activity, Globe, Shield, CreditCard, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '../../components/ui/badge'
import { BackButton } from '@/components/back-button'

const services = [
  { name: 'Jaamlist Website', status: 'operational', icon: Globe, uptime: '100%' },
  { name: 'Core API Services', status: 'operational', icon: Activity, uptime: '99.98%' },
  { name: 'Streaming CDN (Global)', status: 'operational', icon: Globe, uptime: '99.95%' },
  { name: 'Payment Processing', status: 'operational', icon: CreditCard, uptime: '100%' },
  { name: 'Identity & Auth', status: 'operational', icon: Shield, uptime: '99.99%' },
  { name: 'Mobile Application', status: 'operational', icon: Smartphone, uptime: '99.92%' },
]

const incidents = [
  {
    date: 'Jan 9, 2026',
    title: 'Intermittent Streaming Latency in Asia-Pacific',
    status: 'Resolved',
    duration: '45 minutes',
    description: 'We experienced elevated latency in our Singapore edge location. The issue was traced to a provider routing error and has been resolved.'
  },
  {
    date: 'Jan 5, 2026',
    title: 'Scheduled Database Maintenance',
    status: 'Completed',
    duration: '2 hours',
    description: 'Standard maintenance was performed on our primary database cluster to ensure optimal performance.'
  },
  {
    date: 'Dec 28, 2025',
    title: 'Temporary Issues with SMS Authentication',
    status: 'Resolved',
    duration: '15 minutes',
    description: 'A third-party gateway experienced downtime affecting new user registrations. Services were restored promptly.'
  }
]

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Status */}
      <section className="bg-foreground text-background py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <BackButton className="mb-6 text-background/70 hover:text-background" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-pulse">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              All Systems Operational
            </h1>
            <p className="text-secondary text-lg">
              Updated just now • Refreshed every 60 seconds
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 -mt-10 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card/80 backdrop-blur-md">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{service.name}</h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">{service.uptime} Uptime</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium text-green-600">Operational</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Uptime History (Mock Visualization) */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-display">Service Availability</h2>
            <div className="text-sm text-muted-foreground">Last 90 days</div>
          </div>
          
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                {['Streaming', 'API', 'Website'].map((sys) => (
                  <div key={sys}>
                    <div className="flex justify-between text-sm mb-3 font-medium">
                      <span>{sys}</span>
                      <span className="text-green-500 font-bold">100.0%</span>
                    </div>
                    <div className="flex gap-[2px] h-8">
                      {Array.from({ length: 90 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 rounded-[1px] transition-colors cursor-help ${
                            i === 45 && sys === 'API' ? 'bg-yellow-400' : 'bg-green-500'
                          } hover:opacity-100 opacity-80`}
                          title={`Jan ${i + 1}: No incidents`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-2 uppercase tracking-tighter">
                      <span>90 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Incident History */}
      <section className="py-12 px-4 pb-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold font-display mb-8">Recent Incidents</h2>
          <div className="space-y-8">
            {incidents.map((incident, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-muted"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-muted border-4 border-background" />
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground uppercase">{incident.date}</span>
                  <Badge variant="outline" className="text-[10px] py-0">{incident.status}</Badge>
                </div>
                <h3 className="text-xl font-bold mb-3">{incident.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 italic">
                  {incident.description}
                </p>
                <div className="flex items-center text-sm font-medium text-primary">
                  <Clock className="h-4 w-4 mr-2" />
                  Resolution time: {incident.duration}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 h-12 px-8 rounded-full">
              Post-Mortem Reports <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 border-t">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-br from-[#f7e774] to-[#d4a500] border-none shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
            <CardContent className="p-10 relative z-10">
              <Activity className="h-12 w-12 text-[#2d2d2a] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#2d2d2a] mb-4">Subscribe to Updates</h2>
              <p className="text-[#2d2d2a]/80 text-lg mb-8 max-w-xl mx-auto font-medium">
                Get real-time SMS and email notifications whenever Jaamlist creates, updates or resolves an incident.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#2d2d2a] text-white hover:bg-black h-12 px-8 rounded-full">
                  Subscribe via Email
                </Button>
                <Button variant="outline" className="border-[#2d2d2a] text-[#2d2d2a] hover:bg-[#2d2d2a]/10 h-12 px-8 rounded-full">
                  RSS Feed
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
