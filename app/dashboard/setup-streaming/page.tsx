'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2,
  ArrowRight,
  Instagram,
  Globe,
  Mail,
  Lock,
  ChevronLeft,
  Sparkles,
  Camera,
  Music,
  Mic2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function SetupStreamingPage() {
  const { update } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    bio: '',
    website: '',
    instagram: '',
    payoutEmail: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/user/setup-streaming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      setSuccess(true)
      await update()
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 4000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#2d2d2a] selection:bg-[#f7e774]/30 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-[#f7e774]/20 to-transparent rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -50, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-[#d4a500]/10 to-transparent rounded-full blur-[120px]" 
        />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-24 lg:py-32">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl mx-auto"
            >
              {/* Header Navigation */}
              <div className="flex items-center justify-between mb-12">
                <Button 
                  variant="ghost" 
                  onClick={() => router.back()}
                  className="rounded-full hover:bg-gray-100 flex items-center gap-2 group text-gray-500"
                >
                  <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back
                </Button>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm">
                  <span className="w-2 h-2 bg-[#edcf31] rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Creator Hub Invitation</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Left Side: Inspiration & Benefits */}
                <div className="lg:col-span-5 space-y-12">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-[0.9] mb-6">
                        Unlock Your <br />
                        <span className="text-[#edcf31]">Creative Stage.</span>
                      </h1>
                      <p className="text-lg text-gray-500 max-w-sm leading-relaxed">
                        Join an elite circle of performers sharing their talent with a global audience on Jaamlist.
                      </p>
                    </motion.div>
                  </div>

                  <div className="grid gap-6">
                    <BenefitCard 
                      delay={0.3}
                      icon={<Music className="h-6 w-6" />}
                      title="Direct Monetization"
                      desc="80% revenue share on every ticket sold. No hidden fees."
                    />
                    <BenefitCard 
                      delay={0.4}
                      icon={<Mic2 className="h-6 w-6" />}
                      title="Global Platform"
                      desc="Stream in HD to thousands of fans across continents."
                    />
                    <BenefitCard 
                      delay={0.5}
                      icon={<Camera className="h-6 w-6" />}
                      title="Pro Tools"
                      desc="Access advanced analytics and fan engagement features."
                    />
                  </div>
                </div>

                {/* Right Side: The Glass Form */}
                <div className="lg:col-span-7">
                  <Card className="bg-white/40 backdrop-blur-3xl border-white/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden p-1">
                    <div className="bg-white/80 rounded-[38px] p-8 md:p-12 space-y-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold tracking-tight">Setup Profile</h2>
                          <p className="text-gray-400 text-sm">Tell us about your artistic journey.</p>
                        </div>
                        <div className="w-12 h-12 bg-[#edcf31]/20 rounded-2xl flex items-center justify-center text-[#edcf31]">
                          <Sparkles className="h-6 w-6" />
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-4 bg-red-50 text-red-500 rounded-2xl text-sm border border-red-100 font-medium"
                          >
                            {error}
                          </motion.div>
                        )}

                        <div className="space-y-6">
                          {/* Bio Input */}
                          <div className="space-y-3 group">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Professional Bio</label>
                            <div className="relative">
                              <Textarea 
                                required
                                placeholder="Tell your story... What drives your performances?"
                                className="min-h-[140px] w-full bg-gray-50/50 border-gray-100 rounded-3xl p-6 focus:ring-4 focus:ring-[#f7e774]/20 transition-all resize-none placeholder:text-gray-300 text-base"
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                              />
                            </div>
                          </div>

                          {/* Dual Row Socials */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Digital Home</label>
                              <div className="relative group">
                                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-[#edcf31] transition-colors" />
                                <Input 
                                  placeholder="yourwebsite.com"
                                  className="pl-14 h-16 bg-gray-50/50 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#f7e774]/20 transition-all border-none shadow-sm"
                                  value={formData.website}
                                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Instagram</label>
                              <div className="relative group">
                                <Instagram className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-[#edcf31] transition-colors" />
                                <Input 
                                  placeholder="@username"
                                  className="pl-14 h-16 bg-gray-50/50 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#f7e774]/20 transition-all border-none shadow-sm"
                                  value={formData.instagram}
                                  onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Payout Input */}
                          <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1 flex items-center gap-2">
                              Payout Gateway
                              <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 border border-green-200 text-[8px] font-black uppercase">Secure</div>
                            </label>
                            <div className="relative group">
                              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-[#edcf31] transition-colors" />
                              <Input 
                                required
                                type="email"
                                placeholder="Paypal / Stripe Email"
                                className="pl-14 h-16 bg-gray-50/50 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#f7e774]/20 transition-all border-none shadow-sm"
                                value={formData.payoutEmail}
                                onChange={(e) => setFormData({...formData, payoutEmail: e.target.value})}
                              />
                            </div>
                            <p className="text-[10px] text-gray-400 px-1">Earnings are disbursed every 14 days after event completion.</p>
                          </div>
                        </div>

                        <Button 
                          type="submit"
                          disabled={loading}
                          className="w-full h-20 rounded-3xl bg-gradient-to-r from-[#0f0f0f] to-[#2d2d2a] text-white hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group shadow-2xl"
                        >
                          <div className="absolute inset-0 bg-[#edcf31] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                          <div className="relative z-10 flex items-center justify-center gap-4 text-xl font-bold group-hover:text-[#0f0f0f] transition-colors">
                            {loading ? (
                              <>
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-6 h-6 border-3 border-current border-t-transparent rounded-full"
                                />
                                Submitting Stage...
                              </>
                            ) : (
                              <>
                                Apply for Creator Access
                                <ArrowRight className="h-6 w-6" />
                              </>
                            )}
                          </div>
                        </Button>

                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 text-center">
                          <Lock className="h-3 w-3" />
                          Encrypted transmission to jaamlist systems
                        </div>
                      </form>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="bg-white/80 backdrop-blur-3xl border-white rounded-[48px] p-1 shadow-2xl overflow-hidden aspect-video flex items-center justify-center relative">
                <div className="absolute inset-0 z-0">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#f7e774]/10 to-transparent" />
                   <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/80 to-transparent" />
                </div>
                
                <div className="relative z-10 text-center space-y-8 p-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-200"
                  >
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </motion.div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tight text-[#0f0f0f]">Lights, Camera, Pending!</h2>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
                      Your application is now on our director&apos;s desk. We&apos;ll verify your details and turn on your spotlight within 24 hours.
                    </p>
                  </div>

                  <div className="pt-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                       {['Hiring', 'Curating', 'Verifying'].map((step, i) => (
                         <div key={step} className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-gray-400">{step}</span>
                            {i < 2 && <div className="w-4 h-[1px] bg-gray-100" />}
                         </div>
                       ))}
                    </div>
                    <Button 
                      onClick={() => router.push('/dashboard')}
                      className="rounded-full px-8 bg-gray-50 text-gray-500 hover:bg-gray-100 font-bold"
                    >
                      Return to Dashboard
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function BenefitCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="flex gap-6 p-6 rounded-[32px] bg-white/50 border border-gray-100/50 backdrop-blur-sm group hover:bg-white hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 flex items-center justify-center text-[#edcf31] group-hover:scale-110 transition-transform shadow-sm">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-black text-sm tracking-tight">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </motion.div>
  )
}
