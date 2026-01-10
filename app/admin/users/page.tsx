'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Shield, 
  UserCheck,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Mock users data
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'USER', events: 0, payments: 2, createdAt: 'Jan 5, 2026' },
  { id: '2', name: 'Sarah Jenkins', email: 'sarah@example.com', role: 'CREATOR', events: 12, payments: 45, createdAt: 'Dec 20, 2025' },
  { id: '3', name: 'Mike Wilson', email: 'mike@example.com', role: 'CREATOR', events: 5, payments: 18, createdAt: 'Jan 2, 2026' },
  { id: '4', name: 'Emma Brown', email: 'emma@example.com', role: 'USER', events: 0, payments: 8, createdAt: 'Jan 8, 2026' },
  { id: '5', name: 'Admin User', email: 'admin@jaamlist.com', role: 'ADMIN', events: 0, payments: 0, createdAt: 'Nov 1, 2025' },
  { id: '6', name: 'Alex Chen', email: 'alex@example.com', role: 'CREATOR', events: 25, payments: 120, createdAt: 'Oct 15, 2025' },
  { id: '7', name: 'Lisa Park', email: 'lisa@example.com', role: 'USER', events: 0, payments: 5, createdAt: 'Jan 9, 2026' },
  { id: '8', name: 'David Kim', email: 'david@example.com', role: 'CREATOR', events: 8, payments: 32, createdAt: 'Dec 28, 2025' },
]

const roleColors = {
  USER: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  CREATOR: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  ADMIN: 'bg-[#f7e774]/20 text-[#f7e774] border-[#f7e774]/30',
}

const roleIcons = {
  USER: UserCheck,
  CREATOR: Users,
  ADMIN: Shield,
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = !selectedRole || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="User Management" 
        description="Manage all registered users on the platform" 
      />

      <div className="p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <UserCheck className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.role === 'USER').length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Users</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.role === 'CREATOR').length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Creators</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#f7e774]/10 to-[#f7e774]/5 border border-[#f7e774]/20">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-[#f7e774]" />
              <div>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.role === 'ADMIN').length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Admins</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{users.length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {['USER', 'CREATOR', 'ADMIN'].map((role) => (
                    <Button
                      key={role}
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRole(selectedRole === role ? null : role)}
                      className={`rounded-full text-xs font-medium ${
                        selectedRole === role 
                          ? roleColors[role as keyof typeof roleColors]
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white/90 border-white/50 text-[#0f0f0f] hover:bg-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm" className="bg-white/90 border-white/50 text-[#0f0f0f] hover:bg-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">User</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Role</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Events</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Payments</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Joined</th>
                  <th className="text-right text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user, index) => {
                  const RoleIcon = roleIcons[user.role as keyof typeof roleIcons]
                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f7e774] to-[#d4a500] flex items-center justify-center text-[#0f0f0f] font-bold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-sm text-white/50 flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${roleColors[user.role as keyof typeof roleColors]}`}>
                          <RoleIcon className="h-3 w-3" />
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/70">{user.events}</td>
                      <td className="px-6 py-4 text-white/70">{user.payments}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-white/50 text-sm">
                          <Calendar className="h-3 w-3" />
                          {user.createdAt}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-red-400 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-sm text-white/50">
              Showing <span className="text-white font-medium">{filteredUsers.length}</span> of <span className="text-white font-medium">{users.length}</span> users
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-white/70">Page 1 of 1</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
