'use client'

import { motion } from 'framer-motion'
import { 
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Key,
  Mail,
  Save,
  Moon,
  Sun
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAdminTheme } from '@/components/admin/theme-provider'

export default function SettingsPage() {
  const { theme, setTheme } = useAdminTheme()

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Settings" 
        description="Manage your admin preferences and platform settings" 
      />

      <div className="p-6 space-y-6 max-w-4xl">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-[#f7e774]" />
                Profile Settings
              </CardTitle>
              <CardDescription className="text-white/50">
                Update your admin account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Name</label>
                  <Input 
                    defaultValue="Admin User"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Email</label>
                  <Input 
                    defaultValue="admin@jaamlist.com"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              <Button className="bg-[#f7e774] text-[#0f0f0f] hover:bg-[#d4a500]">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Security
              </CardTitle>
              <CardDescription className="text-white/50">
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Current Password</label>
                  <Input 
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">New Password</label>
                  <Input 
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              <Button variant="outline" className="border-white/10 text-white/70 hover:text-white hover:bg-white/5">
                <Key className="h-4 w-4 mr-2" />
                Update Password
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-400" />
                Notifications
              </CardTitle>
              <CardDescription className="text-white/50">
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-white/50" />
                  <div>
                    <p className="font-medium text-white">Email Notifications</p>
                    <p className="text-sm text-white/50">Receive updates via email</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                >
                  Enabled
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-white/50" />
                  <div>
                    <p className="font-medium text-white">Push Notifications</p>
                    <p className="text-sm text-white/50">Browser push notifications</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/10 text-white/50 hover:bg-white/5"
                >
                  Disabled
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-400" />
                Appearance
              </CardTitle>
              <CardDescription className="text-white/50">
                Customize the admin dashboard look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setTheme('dark')}
                  className={`flex-1 h-20 flex-col gap-2 ${
                    theme === 'dark' 
                      ? 'border-[#f7e774]/50 bg-[#f7e774]/10 text-[#f7e774]' 
                      : 'border-white/10 text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Moon className="h-6 w-6" />
                  <span className="text-sm font-medium">Dark Mode</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTheme('light')}
                  className={`flex-1 h-20 flex-col gap-2 ${
                    theme === 'light' 
                      ? 'border-[#f7e774]/50 bg-[#f7e774]/10 text-[#f7e774]' 
                      : 'border-white/10 text-white/50 hover:bg-white/5'
                  }`}
                >
                  <Sun className="h-6 w-6" />
                  <span className="text-sm font-medium">Light Mode</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Platform Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#f7e774]" />
                Platform Settings
              </CardTitle>
              <CardDescription className="text-white/50">
                Global application settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Platform Name</label>
                  <Input 
                    defaultValue="Jaamlist"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Support Email</label>
                  <Input 
                    defaultValue="support@jaamlist.com"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Default Commission Rate (%)</label>
                <Input 
                  type="number"
                  defaultValue="5"
                  className="bg-white/5 border-white/10 text-white max-w-[200px]"
                />
              </div>
              <Button className="bg-[#f7e774] text-[#0f0f0f] hover:bg-[#d4a500]">
                <Save className="h-4 w-4 mr-2" />
                Save Platform Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
