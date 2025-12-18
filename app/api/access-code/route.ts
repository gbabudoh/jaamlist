import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateAccessCode } from '@/lib/utils'
import { notifyAccessCodeIssued } from '@/lib/onesignal'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { eventId } = await request.json()

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        creator: true,
      },
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    if (event.status !== 'APPROVED' && event.status !== 'LIVE') {
      return NextResponse.json(
        { error: 'Event is not available' },
        { status: 400 }
      )
    }

    // Check if user already has access code for this event
    const existingCode = await prisma.accessCode.findFirst({
      where: {
        userId: session.user.id,
        eventId,
      },
    })

    if (existingCode) {
      return NextResponse.json({ accessCode: existingCode })
    }

    // Generate new access code
    let code = generateAccessCode()
    
    // Ensure code is unique
    let existingWithCode = await prisma.accessCode.findUnique({
      where: { code },
    })
    
    while (existingWithCode) {
      code = generateAccessCode()
      existingWithCode = await prisma.accessCode.findUnique({
        where: { code },
      })
    }

    const accessCode = await prisma.accessCode.create({
      data: {
        code,
        userId: session.user.id,
        eventId,
      },
    })

    // Send notification
    try {
      await notifyAccessCodeIssued(
        session.user.id,
        event.title,
        code
      )
    } catch (error) {
      console.error('Failed to send notification:', error)
    }

    return NextResponse.json({ accessCode })
  } catch (error) {
    console.error('Generate access code error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}