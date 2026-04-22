/**
 * Client-safe LiveKit configuration.
 * This file contains ONLY public constants that can be safely imported by client components.
 * Do NOT import livekit-server-sdk here — it is server-only.
 */
export const LIVEKIT_HOST = process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://livekit.feendesk.com'
