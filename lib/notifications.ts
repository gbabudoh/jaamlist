import * as OneSignal from 'onesignal-node'
import { triggerNotification } from './novu'

const client = new OneSignal.Client(
  process.env.ONESIGNAL_APP_ID!,
  process.env.ONESIGNAL_REST_API_KEY!
)

interface SendNotificationOptions {
  title: string
  message: string
  userIds?: string[]
  data?: Record<string, string | number | boolean | Record<string, unknown> | string[] | undefined>
  workflowId?: string
}

interface NotificationResults {
  onesignal: unknown
  novu: unknown[] | null
}

export async function sendNotification({
  title,
  message,
  userIds,
  data,
  workflowId,
}: SendNotificationOptions) {
  // 1. Trigger OneSignal (Push)
  const notification = {
    headings: { en: title },
    contents: { en: message },
    data: data || {},
    ...(userIds && { include_external_user_ids: userIds }),
    ...(!userIds && { included_segments: ['All'] }),
  }

  const results: NotificationResults = { onesignal: null, novu: null }

  try {
    const response = await client.createNotification(notification)
    results.onesignal = response.body
  } catch (error) {
    console.error('Error sending OneSignal notification:', error)
  }

  // 2. Trigger Novu (Multi-channel)
  if (workflowId && userIds && userIds.length > 0) {
    try {
      // Assuming userIds are the subscriberIds in Novu
      const novuPromises = userIds.map(id => 
        triggerNotification({
          workflowId,
          to: { subscriberId: id },
          payload: { title, message, ...data }
        })
      )
      results.novu = await Promise.all(novuPromises)
    } catch (error) {
      console.error('Error sending Novu notification:', error)
    }
  }

  return results
}

export async function notifyEventStart(eventId: string, eventTitle: string) {
  return sendNotification({
    title: '🎬 Event Starting Now!',
    message: `${eventTitle} is now live!`,
    data: { eventId, type: 'event_start' },
    workflowId: 'event-start-notification' // Example Novu workflow ID
  })
}

export async function notifyEventApproved(userId: string, eventTitle: string) {
  return sendNotification({
    title: '✅ Event Approved',
    message: `Your event "${eventTitle}" has been approved!`,
    userIds: [userId],
    data: { type: 'event_approved' },
    workflowId: 'event-approved'
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
    workflowId: 'access-code-issued'
  })
}
