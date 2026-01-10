'use client'

import { motion } from 'framer-motion'
import { Gavel, Scale, FileCheck, CreditCard, ShieldAlert, UserPlus, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'

const sections = [
  {
    id: 'acceptance',
    icon: FileCheck,
    title: '1. Acceptance of Terms',
    content: `
      By accessing or using Jaamlist, you agree to be bound by these Terms of Service. 
      If you do not agree to all terms and conditions, you may not access the service.
      These terms apply to all visitors, users, and others who access or use the Service.
    `
  },
  {
    id: 'accounts',
    icon: UserPlus,
    title: '2. User Accounts',
    content: `
      You must provide accurate and complete information when creating an account.
      You are responsible for safeguarding your password and for all activities that occur under your account.
      We reserve the right to suspend or terminate accounts that violate our community guidelines.
    `
  },
  {
    id: 'content',
    icon: Globe,
    title: '3. Content ownership',
    content: `
      Creators retain all ownership rights to the content they stream.
      By streaming on Jaamlist, you grant us a worldwide license to use, display, and distribute your content for promotional purposes.
      Users are responsible for ensuring they have the necessary rights to any content they stream.
    `
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: '4. Payments & Refunds',
    content: `
      All ticket sales and donations are final unless an event is cancelled by the creator.
      Creators are responsible for any taxes associated with their earnings.
      Jaamlist takes a service fee on all transactions, which is clearly disclosed during checkout.
    `
  },
  {
    id: 'liability',
    icon: ShieldAlert,
    title: '5. Limitation of Liability',
    content: `
      Jaamlist is provided "as is" without any warranties of any kind.
      We are not liable for any damages resulting from your use of the service or any content viewed thereon.
      This includes, but is not limited to, technical issues or conduct of other users.
    `
  }
]

export default function TermsPage() {
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
              <Gavel className="h-8 w-8 text-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Legal</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-secondary text-lg max-w-2xl italic">
              Last Updated: January 9, 2026. Please read these terms carefully before using our platform.
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
              <h3 className="font-bold text-sm uppercase text-muted-foreground mb-6">Navigation</h3>
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
                  Questions about our terms? <br />
                  <span className="text-primary font-bold cursor-pointer hover:underline">Contact Legal</span>
                </p>
              </div>
            </aside>

            {/* Main Terms Text */}
            <div className="lg:col-span-3 space-y-16">
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  These Terms of Service govern your use of the Jaamlist platform and services. 
                  By using our platform, you agree to these terms in full. If you are using the Service on behalf of an organization, 
                  you are agreeing to these Terms for that organization.
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
                <h2 className="text-2xl font-bold font-display mb-6">6. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed font-serif italic">
                  These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the Company is registered, without regard to its conflict of law provisions. 
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </div>

              <div className="pt-12">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Scale className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Legal Compliance</h3>
                      <p className="text-muted-foreground">
                        We are committed to full compliance with all local and international laws. For specific legal inquiries, please contact 
                        <span className="text-primary font-bold ml-1 cursor-pointer hover:underline">legal@jaamlist.com</span>.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <footer className="py-20 bg-muted/10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">Agreement Complete</p>
        <div className="h-px w-20 bg-primary mx-auto" />
      </footer>
    </div>
  )
}
