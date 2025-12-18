import * as OneSignal from 'onesignal-node'

const client = new OneSignal.Client(
  process.env.ONESIGNAL_APP_ID!,
  process.env.ONESIGNAL_REST_API_KEY!
)

export async function sendNotification({
  title,
  message,
  userIds,
  data,
}: {
  title: string
  message: string
  userIds?: string[]
  data?: Record<string, any>
}) {
  const notification = {
    headings: { en: title },
    contents: { en: message },
    data: data || {},
    ...(userIds && { include_external_user_ids: userIds }),
    ...(!userIds && { included_segments: ['All'] }),
  }

  try {
    const response = await client.createNotification(notification)
    return response.body
  } catch (error) {
    console.error('Error sending notification:', error)
    throw error
  }
}

export async function notifyEventStart(eventId: string, eventTitle: string) {
  return sendNotification({
    title: '🎬 Event Starting Now!',
    message: `${eventTitle} is now live!`,
    data: { eventId, type: 'event_start' },
  })
}

export async function notifyEventApproved(userId: string, eventTitle: string) {
  return sendNotification({
    title: '✅ Event Approved',
    message: `Your event "${eventTitle}" has been approved!`,
    userIds: [userId],
    data: { type: 'event_approved' },
  })
}

export async function notifyAccessCodeIssued(
  userId: string,
  eventTitle: string,
  accessCode: string
) {
  return sendNotification({
    title: '🎫 Access Code Ready',
    message: `Your access code for "${eventTitle}" is: ${accessCode}`,
    userIds: [userId],
    data: { type: 'access_code', accessCode },
  })
}
