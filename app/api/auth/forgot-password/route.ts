import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { triggerNotification } from '@/lib/novu'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    // For security, don't reveal if a user exists or not
    if (!user) {
      return NextResponse.json({ message: 'If an account exists, a reset link has been sent' })
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 3600000) // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    })

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

    // Trigger Novu notification (Password Reset workflow)
    try {
      await triggerNotification({
        workflowId: 'password-reset',
        to: { 
          subscriberId: user.id,
          email: user.email,
        },
        payload: {
          name: user.name,
          reset_url: resetUrl,
        }
      })
    } catch (novuError) {
      console.error('Novu trigger failed:', novuError)
      // Fallback: log to console in dev
      console.log(`[DEV] Password Reset URL for ${email}: ${resetUrl}`)
    }

    return NextResponse.json({ message: 'If an account exists, a reset link has been sent' })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
