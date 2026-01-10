'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  HelpCircle, 
  User, 
  Video, 
  CreditCard, 
  ShieldCheck, 
  ChevronDown, 
  Mail, 
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'

const categories = [
  {
    icon: User,
    title: 'Account & Profile',
    description: 'Manage your settings, password, and security.',
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    icon: Video,
    title: 'Streaming & Viewing',
    description: 'Technical help for streamers and viewers.',
    color: 'bg-primary/10 text-primary'
  },
  {
    icon: CreditCard,
    title: 'Billing & Payments',
    description: 'Information about payouts, refunds, and pricing.',
    color: 'bg-green-500/10 text-green-500'
  },
  {
    icon: ShieldCheck,
    title: 'Safety & Policy',
    description: 'Learn about our community guidelines and terms.',
    color: 'bg-red-500/10 text-red-500'
  }
]

const faqs = [
  {
    question: 'How do I start streaming on Jaamlist?',
    answer: 'To start streaming, simply create an account, go to your dashboard, and click on "Go Live". You can stream directly from your browser or use OBS with your unique stream key.'
  },
  {
    question: 'How do payouts work for creators?',
    answer: 'Payouts are processed automatically every 14 days. You must reach a minimum threshold of $50 to trigger a payout. We support direct bank transfers and major digital wallets.'
  },
  {
    question: 'Can I set custom ticket prices for my events?',
    answer: 'Yes! Creators have full control over their pricing. You can set your events as free, pay-per-view, or even suggest a donation amount.'
  },
  {
    question: 'What happens if a stream I paid for is cancelled?',
    answer: 'If a creator cancels a paid event, a full refund is automatically issued to all ticket holders within 3-5 business days.'
  },
  {
    question: 'Is there a limit to how many viewers can watch my stream?',
    answer: 'Our global CDN infrastructure is built to scale. Whether you have 10 or 10 million viewers, Jaamlist ensures a stable viewing experience for everyone.'
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <BackButton className="mb-6 text-background/70 hover:text-background" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              How can we help?
            </h1>
            <p className="text-background/70 text-lg mb-10 max-w-2xl mx-auto">
              Search our help center for answers to common questions or browse categories below.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
              <Input
                type="text"
                placeholder="Search for articles, topics..."
                className="w-full pl-12 h-14 bg-background text-foreground text-lg rounded-full border-none focus:ring-2 focus:ring-primary shadow-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-muted hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`${cat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <cat.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{cat.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {cat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick solutions for common inquiries.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-none shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <HelpCircle className="h-32 w-32" />
            </div>
            <CardContent className="p-8 md:p-12 relative z-10 text-center md:text-left md:flex items-center justify-between gap-8">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
                <p className="text-primary-foreground/80 text-lg">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-foreground text-background hover:bg-foreground/90 h-12 px-6 rounded-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" className="border-primary-foreground bg-white text-[#2d2d2a] hover:bg-primary-foreground/10 h-12 px-6 rounded-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Links (Mini) */}
      <footer className="py-10 border-t border-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-primary transition-colors">Safety Center</Link>
          </div>
          <p className="text-xs text-muted-foreground/60 flex items-center justify-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by Jaamlist
          </p>
        </div>
      </footer>
    </div>
  )
}

function Heart({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}
