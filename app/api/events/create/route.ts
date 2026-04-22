import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'

import { Prisma } from '@prisma/client'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || session.user.role !== 'CREATOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    interface EventCreateBody {
      title: string
      description: string
      type: 'FREE' | 'PAID'
      category?: string
      price: string
      scheduledAt: string
    }

    const body: EventCreateBody = await req.json()
    const { title, description, type, category, price, scheduledAt } = body

    if (!title || !description || !scheduledAt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Generate a unique stream key
    const streamKey = `live_${uuidv4().replace(/-/g, '')}`
    const rtmpUrl = 'rtmp://stream.jaamlist.com/live'

    interface ExtendedEventCreateInput {
      title: string
      description: string
      type: 'FREE' | 'PAID'
      category: string | null
      price: number | null
      scheduledAt: Date
      streamKey: string
      rtmpUrl: string
      creatorId: string
      status: 'PENDING'
    }

    const eventData: ExtendedEventCreateInput = {
      title,
      description,
      type: type || 'FREE',
      category: category || null,
      price: type === 'PAID' ? parseFloat(price) : null,
      scheduledAt: new Date(scheduledAt),
      streamKey,
      rtmpUrl,
      creatorId: session.user.id,
      status: 'PENDING',
    }

    const event = await prisma.event.create({
      data: eventData as unknown as Prisma.EventUncheckedCreateInput,
    })

    return NextResponse.json({ 
      message: 'Event scheduled successfully',
      event
    })
  } catch (error) {
    console.error('Create event error:', error)
    return NextResponse.json({ error: 'Failed to schedule event' }, { status: 500 })
  }
}
