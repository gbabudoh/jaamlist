import { AccessToken } from 'livekit-server-sdk'



export async function createLiveKitToken({
  roomName,
  participantName,
}: {
  roomName: string
  participantName: string
}) {
  if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
    throw new Error('LIVEKIT_API_KEY or LIVEKIT_API_SECRET is not defined')
  }

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantName,
    }
  )

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  })

  return await at.toJwt()
}

export const LIVEKIT_HOST = process.env.NEXT_PUBLIC_LIVEKIT_URL || process.env.LIVEKIT_URL || 'wss://livekit.feendesk.com'
