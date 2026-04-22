import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || session.user.role !== 'CREATOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const events = await prisma.event.findMany({
      where: {
        creatorId: session.user.id
      },
      orderBy: {
        scheduledAt: 'desc'
      },
      include: {
        payments: {
          select: {
            amount: true
          }
        }
      }
    })

    // Map database events to the format expected by the dashboard
    const formattedEvents = events.map(event => {
      const totalRevenue = event.payments.reduce((sum, p) => sum + p.amount, 0)
      return {
        id: event.id,
        title: event.title,
        date: new Date(event.scheduledAt).toLocaleDateString(),
        viewers: event.totalViews.toString(),
        revenue: `$${totalRevenue.toFixed(2)}`
      }
    })

    return NextResponse.json({ events: formattedEvents })
  } catch (error) {
    console.error('Fetch creator events error:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}
