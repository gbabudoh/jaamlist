import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { bio, website, instagram, payoutEmail } = body

    if (!bio || !payoutEmail) {
      return NextResponse.json({ error: 'Bio and Payout Email are required' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        bio,
        website: website || null,
        instagram: instagram || null,
        payoutEmail,
        role: 'CREATOR',
        streamingStatus: 'APPROVED',
      },
    })

    return NextResponse.json({ 
      message: 'Application submitted successfully',
      user: {
        id: updatedUser.id,
        streamingStatus: updatedUser.streamingStatus
      }
    })
  } catch (error) {
    console.error('Setup streaming error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
