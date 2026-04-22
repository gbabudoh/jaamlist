import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import Stripe from 'stripe'
import { notifyAccessCodeIssued } from '@/lib/notifications'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        const eventId = session.metadata?.eventId
        const userId = session.metadata?.userId

        if (!eventId || !userId) {
          console.error('Missing metadata in Stripe session:', session.id)
          break
        }

        // Check if payment already recorded (idempotency)
        const existingPayment = await prisma.payment.findUnique({
          where: { stripeSessionId: session.id },
        })

        if (existingPayment) {
          console.log('Payment already recorded, skipping:', session.id)
          break
        }

        // Create payment record
        const payment = await prisma.payment.create({
          data: {
            amount: (session.amount_total || 0) / 100,
            currency: session.currency || 'usd',
            stripeSessionId: session.id,
            stripePaymentId: session.payment_intent as string || null,
            status: 'completed',
            userId,
            eventId,
          },
        })

        // Generate access code for the paid event
        const accessCode = await prisma.accessCode.create({
          data: {
            code: `JAM-${uuidv4().slice(0, 8).toUpperCase()}`,
            userId,
            eventId,
          },
        })

        // Trigger notification
        try {
          const eventRecord = await prisma.event.findUnique({ where: { id: eventId } })
          await notifyAccessCodeIssued(userId, eventRecord?.title || 'Event', accessCode.code)
        } catch (notifyError) {
          console.error('Failed to send access code notification:', notifyError)
        }

        console.log(`Payment ${payment.id} confirmed. Access code ${accessCode.code} issued for event ${eventId}`)
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        const eventId = session.metadata?.eventId
        const userId = session.metadata?.userId

        if (eventId && userId) {
          // Mark any pending payment as expired
          await prisma.payment.updateMany({
            where: {
              stripeSessionId: session.id,
              status: 'pending',
            },
            data: { status: 'expired' },
          })
        }

        console.log('Checkout session expired:', session.id)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntentId = charge.payment_intent as string

        if (paymentIntentId) {
          // Mark payment as refunded
          const payment = await prisma.payment.findFirst({
            where: { stripePaymentId: paymentIntentId },
          })

          if (payment) {
            await prisma.payment.update({
              where: { id: payment.id },
              data: { status: 'refunded' },
            })

            // Revoke access code
            await prisma.accessCode.updateMany({
              where: {
                userId: payment.userId,
                eventId: payment.eventId,
              },
              data: { used: true },
            })

            console.log(`Refund processed for payment ${payment.id}`)
          }
        }
        break
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute
        const paymentIntentId = dispute.payment_intent as string

        if (paymentIntentId) {
          const payment = await prisma.payment.findFirst({
            where: { stripePaymentId: paymentIntentId },
          })

          if (payment) {
            await prisma.payment.update({
              where: { id: payment.id },
              data: { status: 'disputed' },
            })
            console.log(`Dispute created for payment ${payment.id}`)
          }
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (error) {
    console.error('Error processing webhook event:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
