'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Calendar
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Mock payments data
const payments = [
  { id: '1', user: 'John Doe', email: 'john@example.com', event: 'Jazz Night Live', amount: 15, status: 'completed', date: 'Jan 9, 2026 8:15 PM' },
  { id: '2', user: 'Emma Brown', email: 'emma@example.com', event: 'Comedy Hour Special', amount: 10, status: 'pending', date: 'Jan 9, 2026 7:45 PM' },
  { id: '3', user: 'Alex Chen', email: 'alex@example.com', event: 'Classical Orchestra', amount: 25, status: 'completed', date: 'Jan 9, 2026 6:30 PM' },
  { id: '4', user: 'Lisa Park', email: 'lisa@example.com', event: 'Jazz Night Live', amount: 15, status: 'completed', date: 'Jan 9, 2026 5:20 PM' },
  { id: '5', user: 'Mike Wilson', email: 'mike@example.com', event: 'Rock Concert', amount: 20, status: 'failed', date: 'Jan 9, 2026 4:10 PM' },
  { id: '6', user: 'Sarah Jenkins', email: 'sarah@example.com', event: 'Dance Performance', amount: 12, status: 'completed', date: 'Jan 9, 2026 3:00 PM' },
  { id: '7', user: 'David Kim', email: 'david@example.com', event: 'Jazz Night Live', amount: 15, status: 'completed', date: 'Jan 9, 2026 2:45 PM' },
  { id: '8', user: 'Jane Smith', email: 'jane@example.com', event: 'Stand-up Comedy Night', amount: 12, status: 'refunded', date: 'Jan 9, 2026 1:30 PM' },
]

const statusColors = {
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  failed: 'bg-red-500/20 text-red-400 border-red-500/30',
  refunded: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

const statusIcons = {
  completed: CheckCircle2,
  pending: Clock,
  failed: XCircle,
  refunded: CreditCard,
}

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.event.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !selectedStatus || payment.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Payment Dashboard" 
        description="Track all platform transactions and revenue" 
      />

      <div className="p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">${totalRevenue}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Total Revenue</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">${pendingAmount}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Pending</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#f7e774]/10 to-[#f7e774]/5 border border-[#f7e774]/20">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-[#f7e774]" />
              <div>
                <p className="text-2xl font-bold text-white">{payments.length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Transactions</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">+23%</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Growth</p>
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
                    placeholder="Search by user or event..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {['completed', 'pending', 'failed', 'refunded'].map((status) => (
                    <Button
                      key={status}
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                      className={`rounded-full text-xs font-medium capitalize ${
                        selectedStatus === status 
                          ? statusColors[status as keyof typeof statusColors]
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {status}
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
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">User</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Event</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Amount</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPayments.map((payment, index) => {
                  const StatusIcon = statusIcons[payment.status as keyof typeof statusIcons]
                  return (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f7e774] to-[#d4a500] flex items-center justify-center text-[#0f0f0f] font-bold text-sm">
                            {payment.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-white">{payment.user}</p>
                            <p className="text-sm text-white/50">{payment.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/70">{payment.event}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-white font-semibold">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          {payment.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${statusColors[payment.status as keyof typeof statusColors]}`}>
                          <StatusIcon className="h-3 w-3" />
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-white/50 text-sm">
                          <Calendar className="h-3 w-3" />
                          {payment.date}
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
              Showing <span className="text-white font-medium">{filteredPayments.length}</span> of <span className="text-white font-medium">{payments.length}</span> transactions
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
