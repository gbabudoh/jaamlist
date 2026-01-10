'use client'

import { motion } from 'framer-motion'
import { Users, MessageCircle, Heart, Share2, Globe, Shield, Zap, Award, ExternalLink, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'

const stats = [
  { label: 'Community Members', value: '250K+', icon: Users, color: 'text-blue-500' },
  { label: 'Live Monthly Events', value: '1.2K+', icon: Zap, color: 'text-primary' },
  { label: 'Creators Worldwide', value: '15K+', icon: Globe, color: 'text-green-500' },
  { label: 'Event Shares', value: '10M+', icon: Share2, color: 'text-purple-500' },
]

const hubs = [
  {
    title: 'Official Discord',
    description: 'Join our vibrant community of creators and fans. Chat live, share tips, and get early access to features.',
    icon: MessageCircle,
    color: 'bg-[#5865F2]',
    linkText: 'Join Discord',
    members: '45k Members'
  },
  {
    title: 'Creator Forums',
    description: 'Deep dive into technical discussions, production equipment, and monetization strategies.',
    icon: Users,
    color: 'bg-primary',
    linkText: 'Browse Forums',
    members: '12k Daily Posts'
  },
  {
    title: 'Community Rewards',
    description: 'Earn badges, exclusive flair, and special event access by participating in our ecosystem.',
    icon: Award,
    color: 'bg-accent',
    linkText: 'View Rewards',
    members: 'Invite Only'
  }
]

const guidelines = [
  {
    title: 'Be Respectful',
    description: 'Treat everyone with kindness. Harassment, hate speech, and bullying are strictly prohibited.'
  },
  {
    title: 'Share Quality',
    description: 'Focus on constructive discussions and high-quality content that adds value to the community.'
  },
  {
    title: 'Stay Safe',
    description: 'Protect your privacy and respect others\' data. Never share personal information in public hubs.'
  },
  {
    title: 'Creators First',
    description: 'Our community exists to support and celebrate the hard work of artists and performers.'
  }
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2d2d2a] to-[#1a1a18] text-white px-4 py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto relative z-10">
          <BackButton className="mb-6 text-white/70 hover:text-white" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f7e774]/20 border border-[#f7e774]/30 px-4 py-2 mb-6 text-[#f7e774] text-sm font-medium">
              <Users className="h-4 w-4" />
              <span>Connect & Collaborate</span>
            </div>
            <h1 className="font-display text-5xl font-bold sm:text-6xl lg:text-7xl mb-6">
              The Jaamlist Community
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto italic">
              &quot;Where creators flourish and fans belong.&quot;
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-[#f7e774] text-[#2d2d2a] hover:bg-[#d4a500] h-14 px-8 rounded-full text-lg">
                Join our Discord
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 px-8 rounded-full text-lg">
                Explore Forums
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b border-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Hubs */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold sm:text-4xl mb-4">Our Hubs</h2>
            <p className="text-muted-foreground text-lg">Find the right place for you to engage and grow.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {hubs.map((hub, index) => (
              <motion.div
                key={hub.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-xl overflow-hidden group">
                  <div className={`h-2 ${hub.color}`} />
                  <CardContent className="p-8">
                    <div className={`${hub.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                      <hub.icon className="h-7 w-7" />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-bold">{hub.title}</h3>
                      <span className="text-xs font-semibold text-muted-foreground uppercase">{hub.members}</span>
                    </div>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {hub.description}
                    </p>
                    <Button className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 group-hover:scale-[1.02] transition-transform rounded-xl">
                      {hub.linkText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Events Highlight */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-[#2d2d2a] rounded-[2rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Calendar className="h-64 w-64 rotate-12" />
            </div>
            
            <div className="max-w-2xl relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Upcoming Global Creators Summit</h2>
              <p className="text-xl text-white/70 mb-10 leading-relaxed">
                A community-exclusive 2-day virtual event featuring top creators, masterclasses, and networking opportunities. 
                Free for all registered members.
              </p>
              <div className="flex flex-wrap gap-8 items-center">
                <div>
                  <div className="text-[#f7e774] text-sm uppercase font-bold tracking-widest mb-1">Date</div>
                  <div className="text-2xl font-semibold italic">Feb 14-15, 2026</div>
                </div>
                <Button className="bg-[#f7e774] text-[#2d2d2a] hover:bg-[#d4a500] h-14 px-8 rounded-xl text-lg font-bold">
                  RSVP Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold sm:text-4xl mb-4">Community Guidelines</h2>
            <p className="text-muted-foreground">The standards we live by to keep our community great.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {guidelines.map((guide, index) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center shrink-0 font-bold text-primary">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                  <p className="text-muted-foreground leading-relaxed italic">{guide.description.replace("'","&apos;")}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Card className="max-w-2xl mx-auto bg-green-500/5 border-green-500/20">
              <CardContent className="p-8 flex items-center gap-6 text-left">
                <Shield className="h-10 w-10 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Safe Harbor Initiative</h4>
                  <p className="text-sm text-muted-foreground">
                    We take safety seriously. If you ever feel uncomfortable or see something that breaks these rules, please use our 
                    <span className="text-primary font-semibold ml-1 cursor-pointer hover:underline">Priority Reporting Tool</span>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Social Footer Section */}
      <section className="py-20 px-4 border-t">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Follow Our Journey</h2>
          <div className="flex justify-center gap-12">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14 rounded-full border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                <Share2 className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">X (Twitter)</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14 rounded-full border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                <Heart className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Instagram</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14 rounded-full border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                <Globe className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Global Wiki</span>
            </div>
          </div>
          <p className="mt-16 text-sm text-muted-foreground italic">
            © 2026 Jaamlist. Content is power. Community is everything.
          </p>
        </div>
      </section>
    </div>
  )
}
