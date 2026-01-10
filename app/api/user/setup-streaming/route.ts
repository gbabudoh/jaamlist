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

    // Update user with creator application data
    // Casting to unknown first to bypass generation issues while dev server is running
    const updatedUser = await (prisma.user as unknown as { update: (args: unknown) => Promise<{id: string, streamingStatus: string}> }).update({
      where: { id: session.user.id },
      data: {
        bio,
        website: website || null,
        instagram: instagram || null,
        payoutEmail,
        streamingStatus: 'PENDING', // Will require admin approval
      },
    })

    return NextResponse.json({ 
      message: 'Application submitted successfully',
      user: {
        id: updatedUser.id,
        streamingStatus: (updatedUser as unknown as { streamingStatus: string }).streamingStatus
      }
    })
  } catch (error) {
    console.error('Setup streaming error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
