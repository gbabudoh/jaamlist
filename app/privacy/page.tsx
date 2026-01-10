'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText, UserCheck, Bell, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'

const sections = [
  {
    id: 'collection',
    icon: UserCheck,
    title: '1. Information We Collect',
    content: `
      Information You Provide: We collect information when you create an account, such as your name, email address, and profile details.
      Usage Data: We automatically collect session data, device information, and interaction logs when you use our platform.
      Public Content: Any content you stream or post publicly is collected and stored by Jaamlist.
    `
  },
  {
    id: 'usage',
    icon: Eye,
    title: '2. How We Use Your Information',
    content: `
      To provide and maintain our Service, including to monitor usage.
      To manage Your Account: your registration as a user of the Service.
      To contact You: By email or push notifications regarding updates or informative communications.
      To provide You with news, special offers and general information about other goods, services and events.
    `
  },
  {
    id: 'sharing',
    icon: Lock,
    title: '3. Information Sharing',
    content: `
      With Service Providers: We may share your personal information with vendors to monitor and analyze the use of our Service.
      For Business Transfers: In connection with any merger, sale of Company assets, or financing.
      With Your Consent: We may disclose your personal information for any other purpose with your explicit permission.
    `
  },
  {
    id: 'security',
    icon: Shield,
    title: '4. Data Security',
    content: `
      The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet is 100% secure. 
      While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
    `
  }
]

export default function PrivacyPage() {
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
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Legal</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-secondary text-lg max-w-2xl italic">
              Last Updated: January 9, 2026. This policy describes how Jaamlist collects and uses your data.
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
              <div className="pt-8 border-t">
                <p className="text-xs text-muted-foreground">
                  Need a physical copy? <br />
                  <span className="text-primary cursor-pointer hover:underline">Download PDF</span>
                </p>
              </div>
            </aside>

            {/* Main Policy Text */}
            <div className="lg:col-span-3 space-y-16">
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Welcome to Jaamlist. We respect your privacy and are committed to protecting it through our compliance with this policy. 
                  This document explains our practices for collecting, using, maintaining, protecting, and disclosing that information.
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
                <h2 className="text-2xl font-bold font-display mb-6">5. Changes to our Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users&apos; personal information, we will notify you through a notice on the Website home page.
                </p>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Bell className="h-6 w-6 text-primary" />
                    <p className="text-sm">
                      <strong>Automatic Notifications:</strong> Members with verified accounts receive email notifications for every major policy update.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-12">
                <h2 className="text-2xl font-bold font-display mb-6">6. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To ask questions or comment about this privacy policy and our privacy practices, contact our Privacy Officer at:
                </p>
                <div className="mt-6 flex items-center gap-4 text-primary font-bold">
                  <MessageCircle className="h-5 w-5" />
                  <span>privacy@jaamlist.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <footer className="py-20 bg-muted/10 opacity-50 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm uppercase tracking-widest font-bold">End of Document</p>
      </footer>
    </div>
  )
}
