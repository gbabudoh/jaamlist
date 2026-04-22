import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notifyEventStart } from '@/lib/notifications'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id: eventId } = await params

    if (!session || !session.user || session.user.role !== 'CREATOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify ownership and status
    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        creatorId: session.user.id,
      },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found or unauthorized' }, { status: 404 })
    }

    if (event.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Event must be approved before going live' }, { status: 400 })
    }

    // Update status to LIVE
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        status: 'LIVE',
        startedAt: new Date(),
      },
    })

    // Trigger notifications
    try {
      // Notify all followers/attendees
      await notifyEventStart(eventId, event.title)
    } catch (notifyError) {
      console.error('Failed to send go-live notification:', notifyError)
    }

    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('Go Live error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
