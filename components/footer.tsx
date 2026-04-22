'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Radio, Facebook, Twitter, Instagram, Youtube, Mail, ArrowRight } from 'lucide-react'

const footerLinks = {
  platform: [
    { label: 'Browse Events', href: '/events' },
    { label: 'Start Streaming', href: '/stream' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'For Creators', href: '/creators' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Community', href: '/community' },
    { label: 'Status', href: '/status' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <footer className="bg-[#2d2d2a] text-white">
      {/* Newsletter Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-sm">
              <h3 className="text-lg font-bold mb-1">Stay in the loop</h3>
              <p className="text-white/60 text-sm">Get notified about upcoming live events, new creators, and platform updates.</p>
            </div>
            {submitted ? (
              <div className="flex items-center gap-2 text-[#f7e774] font-semibold text-sm">
                <span className="w-5 h-5 rounded-full bg-[#f7e774]/20 flex items-center justify-center text-[#f7e774]">✓</span>
                You're subscribed — we'll be in touch!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-9 pr-4 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#f7e774]/60 focus:bg-white/15 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-[#f7e774] text-[#2d2d2a] text-sm font-bold hover:bg-white transition-colors flex items-center gap-2 shrink-0"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo--.png"
                alt="Jaamlist Logo"
                width={140}
                height={70}
                className="brightness-0 invert"
                unoptimized
              />
            </Link>
            <p className="text-white/70 mb-6 max-w-xs">
              The premier platform for live streaming performances. Watch concerts, interviews, dramas, and comedy shows from anywhere.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f7e774] hover:text-[#2d2d2a] transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-[#f7e774] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-[#f7e774] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-[#f7e774] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-[#f7e774] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Jaamlist. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Mail className="h-4 w-4" />
              <span>support@jaamlist.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
