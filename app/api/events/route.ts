import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma, EventStatus } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where: Prisma.EventWhereInput = {}
    if (status && status !== 'all') {
      where.status = status as EventStatus
    }
    // Note: Database schema might not have country/category on Event yet
    // but we can add them to where if they exist

    const events = await prisma.event.findMany({
      where,
      include: {
        creator: {
          select: {
            name: true,
            avatar: true,
          }
        },
        sponsors: true,
      },
      orderBy: {
        scheduledAt: 'desc'
      }
    })

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
