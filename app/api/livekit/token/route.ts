import { NextRequest, NextResponse } from 'next/server'
import { createLiveKitToken } from '@/lib/livekit'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const searchParams = req.nextUrl.searchParams
    const room = searchParams.get('room')
    const username = session?.user?.name || `user-${Math.floor(Math.random() * 1000)}`

    if (!room) {
      return NextResponse.json({ error: 'Missing room name' }, { status: 400 })
    }

    const token = await createLiveKitToken({
      roomName: room,
      participantName: username,
    })

    return NextResponse.json({ token })
  } catch (error) {
    console.error('LiveKit token error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
