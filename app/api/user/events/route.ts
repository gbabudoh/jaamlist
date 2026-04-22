import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch events where user has a payment or access code
    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            payments: {
              some: {
                userId: session.user.id,
                status: 'succeeded'
              }
            }
          },
          {
            accessCodes: {
              some: {
                userId: session.user.id
              }
            }
          }
        ]
      },
      include: {
        creator: {
          select: {
            name: true,
            avatar: true,
          }
        }
      },
      orderBy: {
        scheduledAt: 'asc'
      }
    })

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Failed to fetch user events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user events' },
      { status: 500 }
    )
  }
}
