'use client'

import { motion } from 'framer-motion'
import { Cookie, Info, ShieldCheck, Settings, ExternalLink, Globe, Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BackButton } from '@/components/back-button'

const sections = [
  {
    id: 'what',
    icon: Info,
    title: '1. What are Cookies?',
    content: `
      Cookies are small text files that are placed on your device by websites that you visit. 
      They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
      They cannot be used to run programs or deliver viruses to your computer.
    `
  },
  {
    id: 'how',
    icon: Settings,
    title: '2. How We Use Cookies',
    content: `
      We use cookies to improve your experience on our platform, remember your preferences, and help us understand how people use our site.
      Specifically, we use them for authentication, security, performance, and analytics.
      Without some of these cookies, certain features of the Service may not function correctly.
    `
  },
  {
    id: 'types',
    icon: ShieldCheck,
    title: '3. Types of Cookies We Use',
    content: `
      Essential Cookies: Necessary for the website to function. They handle login sessions and security.
      Performance Cookies: Help us understand how visitors interact with the site by collecting anonymous information.
      Functional Cookies: Allow the site to remember choices you make (like your language) and provide enhanced features.
      Marketing Cookies: Used to track visitors across websites to display relevant advertisements.
    `
  },
  {
    id: 'choices',
    icon: Lock,
    title: '4. Your Choices',
    content: `
      Most web browsers allow some control of most cookies through the browser settings. 
      To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
      Please note that if you choose to block cookies, you may not be able to use the full functionality of our Service.
    `
  }
]

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <BackButton className="mb-6 text-background/70 hover:text-background" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="h-8 w-8 text-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Legal</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-secondary text-lg max-w-2xl italic">
              Last Updated: January 9, 2026. This policy explains how and why we use cookies on the Jaamlist platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block space-y-4 sticky top-24 h-fit">
              <h3 className="font-bold text-sm uppercase text-muted-foreground mb-6">Sections</h3>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2 border-l-2 border-transparent hover:border-primary pl-4"
                >
                  {section.title.split('. ')[1]}
                </a>
              ))}
              <div className="pt-8 border-t space-y-4">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold border-primary text-primary hover:bg-primary/5 rounded-full">
                  Cookie Settings
                </Button>
                <p className="text-[10px] text-muted-foreground text-center uppercase tracking-tighter">
                  Manage your data preferences
                </p>
              </div>
            </aside>

            {/* Main Policy Text */}
            <div className="lg:col-span-3 space-y-16">
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  At Jaamlist, we value your privacy. This Cookie Policy provides clear and transparent information about the cookies 
                  and other tracking technologies we use when you visit our website.
                </p>
              </div>

              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-none shadow-none bg-muted/30">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                          <section.icon className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold font-display">{section.title}</h2>
                      </div>
                      <div className="space-y-4 text-muted-foreground leading-relaxed">
                        {section.content.trim().split('\n').map((para, i) => (
                          <p key={i}>{para.trim()}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <div className="pt-12 border-t">
                <h2 className="text-2xl font-bold font-display mb-6">5. Global Compliance</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Our cookie practices are designed to comply with global privacy standards, including the GDPR and CCPA. 
                  We only use non-essential cookies with your explicit consent.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-muted/50 border-none">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">EU Privacy Shield Compliant</span>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50 border-none">
                    <CardContent className="p-4 flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">CCPA Data Protection</span>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="pt-12">
                <h2 className="text-2xl font-bold font-display mb-6">Need more details?</h2>
                <p className="text-muted-foreground mb-8">
                  For more information about how we protect your overall privacy, please review our full 
                  <span className="text-primary font-bold mx-1 cursor-pointer hover:underline">Privacy Policy</span>.
                </p>
                <Button className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 rounded-full font-bold">
                  View full Privacy Policy <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <footer className="py-20 bg-muted/10 opacity-60 text-center">
        <div className="flex justify-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-primary opacity-50" />
          <div className="w-2 h-2 rounded-full bg-primary opacity-20" />
        </div>
        <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Cookies Policy v2.1</p>
      </footer>
    </div>
  )
}
