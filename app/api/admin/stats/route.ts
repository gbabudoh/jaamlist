import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/stats - Dashboard statistics
export async function GET() {
  try {
    const [
      totalUsers,
      totalCreators,
      totalAdmins,
      totalEvents,
      liveEvents,
      pendingEvents,
      approvedEvents,
      totalPayments,
      completedPayments,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.user.count({ where: { role: 'CREATOR' } }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.event.count(),
      prisma.event.count({ where: { status: 'LIVE' } }),
      prisma.event.count({ where: { status: 'PENDING' } }),
      prisma.event.count({ where: { status: 'APPROVED' } }),
      prisma.payment.count(),
      prisma.payment.aggregate({
        where: { status: 'completed' },
        _sum: { amount: true },
      }),
    ])

    const totalViews = await prisma.event.aggregate({
      _sum: { totalViews: true },
    })

    return NextResponse.json({
      users: {
        total: totalUsers + totalCreators + totalAdmins,
        users: totalUsers,
        creators: totalCreators,
        admins: totalAdmins,
      },
      events: {
        total: totalEvents,
        live: liveEvents,
        pending: pendingEvents,
        approved: approvedEvents,
      },
      payments: {
        total: totalPayments,
        revenue: completedPayments._sum.amount || 0,
      },
      views: totalViews._sum.totalViews || 0,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
