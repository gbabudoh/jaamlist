import { Novu } from '@novu/node'

if (!process.env.NOVU_API_KEY) {
  console.warn('NOVU_API_KEY is not defined. Novu integration will be disabled.')
}

export const novu = process.env.NOVU_API_KEY 
  ? new Novu(process.env.NOVU_API_KEY, {
      backendUrl: process.env.NOVU_BACKEND_URL || 'https://novu.feendesk.com/api'
    })
  : null

export const NOVU_APP_ID = process.env.NOVU_APP_IDENTIFIER

/**
 * Triggers a Novu notification workflow
 */
export async function triggerNotification({
  workflowId,
  to,
  payload,
}: {
  workflowId: string
  to: { subscriberId: string; email?: string; phone?: string }
  payload?: Record<string, string | number | boolean | Record<string, unknown> | string[] | undefined>
}) {
  if (!novu) return null

  try {
    const result = await novu.trigger(workflowId, {
      to,
      payload: payload || {},
    })
    return result.data
  } catch (error) {
    console.error('Error triggering Novu notification:', error)
    return null
  }
}
