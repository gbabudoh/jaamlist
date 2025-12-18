import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createCheckoutSession } from '@/lib/stripe'

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
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    if (event.type !== 'PAID' || !event.price) {
      return NextResponse.json(
        { error: 'This is not a paid event' },
        { status: 400 }
      )
    }

    // Check if user already has access
    const existingAccess = await prisma.accessCode.findFirst({
      where: {
        userId: session.user.id,
        eventId,
      },
    })

    if (existingAccess) {
      return NextResponse.json(
        { error: 'You already have access to this event' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const checkoutSession = await createCheckoutSession({
      eventId: event.id,
      eventTitle: event.title,
      price: event.price,
      userId: session.user.id,
      userEmail: session.user.email!,
    })

    // Create payment record
    await prisma.payment.create({
      data: {
        amount: event.price,
        stripeSessionId: checkoutSession.id,
        userId: session.user.id,
        eventId: event.id,
        status: 'pending',
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Create checkout session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}