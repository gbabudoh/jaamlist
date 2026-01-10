'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageSquare, Twitter, Instagram, Linkedin, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: 'support@jaamlist.com',
    description: 'Our support team is here to help 24/7.',
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+1 (555) 123-4567',
    description: 'Available Mon-Fri, 9am - 6pm EST.',
    color: 'bg-green-500/10 text-green-500'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: '123 Streamer Lane, Content City, CA 90210',
    description: 'Come say hi at our HQ.',
    color: 'bg-primary/10 text-primary'
  }
]

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

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
              <MessageSquare className="h-4 w-4 text-[#f7e774]" />
              <span className="text-sm font-medium text-[#f7e774]">Contact Us</span>
            </div>
            <h1 className="font-display text-5xl font-bold sm:text-6xl lg:text-7xl mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Have questions or feedback? We&apos;d love to hear from you. Our team is usually responsive within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className={`${info.color} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{info.title}</h3>
                        <p className="text-foreground font-medium mb-1">{info.details}</p>
                        <p className="text-muted-foreground text-sm">{info.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t">
                <h3 className="font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2 hover:border-primary/50 transition-all shadow-xl">
                <CardContent className="p-8 md:p-10">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                      <p className="text-muted-foreground text-lg mb-8">
                        Thank you for reaching out. We&apos;ve received your message and will get back to you shortly.
                      </p>
                      <Button 
                        onClick={() => setSubmitted(false)}
                        className="bg-primary text-primary-foreground hover:bg-accent"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-12"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full md:w-auto h-12 px-8 bg-primary text-primary-foreground hover:bg-accent text-lg"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Locations placeholder */}
      <section className="bg-muted/30 py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Global Presence</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-background shadow-sm border">
              <h3 className="font-bold text-lg mb-2">North America</h3>
              <p className="text-muted-foreground text-sm">New York, USA</p>
            </div>
            <div className="p-6 rounded-2xl bg-background shadow-sm border">
              <h3 className="font-bold text-lg mb-2">Europe</h3>
              <p className="text-muted-foreground text-sm">London, UK</p>
            </div>
            <div className="p-6 rounded-2xl bg-background shadow-sm border">
              <h3 className="font-bold text-lg mb-2">Asia Pacific</h3>
              <p className="text-muted-foreground text-sm">Singapore</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
