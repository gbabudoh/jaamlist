import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

export async function createCheckoutSession({
  eventId,
  eventTitle,
  price,
  userId,
  userEmail,
}: {
  eventId: string
  eventTitle: string
  price: number
  userId: string
  userEmail: string
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Access to ${eventTitle}`,
            description: 'Live streaming event access',
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/events/${eventId}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/events/${eventId}`,
    customer_email: userEmail,
    metadata: {
      eventId,
      userId,
    },
  })

  return session
}

export async function verifyPayment(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return session.payment_status === 'paid'
}