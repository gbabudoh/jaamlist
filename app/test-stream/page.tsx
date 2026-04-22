'use client'

import React, { useState } from 'react'
import { 
  LiveKitRoom, 
  RoomAudioRenderer,
  useParticipants,
  useRemoteParticipants,
  useTracks,
  VideoTrack,
  useLocalParticipant,
} from '@livekit/components-react'
import '@livekit/components-styles'
import { Track } from 'livekit-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LIVEKIT_HOST } from '@/lib/livekit-client'
import { 
  Video, Users, Zap, ShieldCheck, Loader2, 
  Mic, MicOff, Camera, CameraOff, LogOut, 
  Radio, Eye, Hand
} from 'lucide-react'

/* ─────────────────────────────────────────────
   BROADCASTER VIEW
   ───────────────────────────────────────────── */
function BroadcasterView({ room, onLeave }: { room: string, onLeave: () => void }) {
  const participants = useParticipants()
  const { localParticipant } = useLocalParticipant()
  const [isCamOn, setIsCamOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)

  const tracks = useTracks([Track.Source.Camera], { onlySubscribed: false })
  const localTrack = tracks.find(t => t.participant.sid === localParticipant.sid)

  const toggleCamera = async () => {
    await localParticipant.setCameraEnabled(!isCamOn)
    setIsCamOn(!isCamOn)
  }

  const toggleMic = async () => {
    await localParticipant.setMicrophoneEnabled(!isMicOn)
    setIsMicOn(!isMicOn)
  }

  return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-red-400">LIVE</span>
          <span className="text-xs font-mono text-white/30 ml-2">{room}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <Eye className="h-3.5 w-3.5 text-[#d4a500]" />
          <span className="text-xs font-bold text-white/70">{Math.max(0, participants.length - 1)} viewers</span>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative flex items-center justify-center bg-[#0a0a0f] p-3 min-h-0">
        <div className="relative w-full h-full max-w-5xl rounded-2xl overflow-hidden bg-[#111118] border border-white/5 shadow-2xl">
          {localTrack ? (
            <VideoTrack trackRef={localTrack} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <CameraOff className="h-14 w-14 text-white/10 mx-auto" />
                <p className="text-white/30 text-sm font-bold">Camera is off</p>
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            <Radio className="h-3 w-3 text-[#d4a500]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Broadcasting</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 px-6 py-4 bg-[#0a0a0f] border-t border-white/5">
        <button
          onClick={toggleMic}
          className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isMicOn 
              ? 'bg-white/10 hover:bg-white/15 text-white border border-white/10' 
              : 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
          }`}
        >
          {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </button>
        <button
          onClick={toggleCamera}
          className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isCamOn 
              ? 'bg-white/10 hover:bg-white/15 text-white border border-white/10' 
              : 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
          }`}
        >
          {isCamOn ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
        </button>
        <button
          onClick={onLeave}
          className="h-12 px-6 rounded-xl bg-red-500 hover:bg-red-600 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          End Stream
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   VIEWER VIEW
   ───────────────────────────────────────────── */
function ViewerView({ room, onLeave }: { room: string, onLeave: () => void }) {
  const participants = useParticipants()
  const { localParticipant } = useLocalParticipant()
  const remoteParticipants = useRemoteParticipants()
  const remoteTracks = useTracks([Track.Source.Camera], { onlySubscribed: true })
    .filter(t => remoteParticipants.some(rp => rp.sid === t.participant.sid))
  const [voiceActive, setVoiceActive] = useState(false)

  const hasBroadcaster = remoteParticipants.length > 0
  const broadcasterTrack = remoteTracks.length > 0 ? remoteTracks[0] : null

  const toggleVoiceChat = async () => {
    await localParticipant.setMicrophoneEnabled(!voiceActive)
    setVoiceActive(!voiceActive)
  }

  return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          {hasBroadcaster ? (
            <>
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-red-400">LIVE</span>
            </>
          ) : (
            <>
              <div className="h-3 w-3 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">WAITING</span>
            </>
          )}
          <span className="text-xs font-mono text-white/30 ml-2">{room}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <Users className="h-3.5 w-3.5 text-[#d4a500]" />
          <span className="text-xs font-bold text-white/70">{participants.length} in room</span>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative flex items-center justify-center bg-[#0a0a0f] p-3 min-h-0">
        <div className="relative w-full h-full max-w-5xl rounded-2xl overflow-hidden bg-[#111118] border border-white/5 shadow-2xl">
          {broadcasterTrack ? (
            <VideoTrack trackRef={broadcasterTrack} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-xs px-6">
                <div className="mx-auto h-16 w-16 rounded-full bg-[#f7e774]/10 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-[#d4a500] animate-spin" />
                </div>
                <h3 className="text-lg font-black text-white">Waiting for Broadcaster</h3>
                <p className="text-slate-500 font-medium text-xs leading-relaxed">
                  The stream will appear automatically once the creator goes live.
                </p>
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            <Eye className="h-3 w-3 text-[#d4a500]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Watching</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 px-6 py-4 bg-[#0a0a0f] border-t border-white/5">
        <button
          onClick={toggleVoiceChat}
          className={`h-12 px-5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            voiceActive 
              ? 'bg-[#d4a500]/20 hover:bg-[#d4a500]/30 text-[#d4a500] border border-[#d4a500]/30' 
              : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
          }`}
        >
          {voiceActive ? <Mic className="h-4 w-4" /> : <Hand className="h-4 w-4" />}
          <span className="text-xs font-black uppercase tracking-widest">
            {voiceActive ? 'Speaking' : 'Voice Chat'}
          </span>
        </button>
        <button
          onClick={onLeave}
          className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all border border-white/10 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Leave
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   JOIN FORM — compact, single screen
   ───────────────────────────────────────────── */
export default function TestStreamPage() {
  const [token, setToken] = useState<string>('')
  const [room, setRoom] = useState<string>('test-room')
  const [isPublisher, setIsPublisher] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)

  const handleJoin = async () => {
    setError('')
    try {
      const res = await fetch(`/api/livekit/token?room=${room}&publisher=${isPublisher}`)
      const data = await res.json()
      if (data.token) {
        setToken(data.token)
        setIsConnected(true)
      } else {
        setError(data.error || 'Failed to get token')
      }
    } catch {
      setError('Connection failed')
    }
  }

  if (isConnected && token) {
    return (
      <LiveKitRoom
        video={isPublisher}
        audio={isPublisher}
        token={token}
        serverUrl={LIVEKIT_HOST}
        connect={true}
        onDisconnected={() => setIsConnected(false)}
      >
        {isPublisher 
          ? <BroadcasterView room={room} onLeave={() => setIsConnected(false)} />
          : <ViewerView room={room} onLeave={() => setIsConnected(false)} />
        }
        <RoomAudioRenderer />
      </LiveKitRoom>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="h-1.5 bg-[#f7e774]" />
        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#f7e774]/10 flex items-center justify-center">
              <Video className="h-5 w-5 text-[#d4a500]" />
            </div>
            <div>
              <h2 className="text-lg font-black">Live Stream Test</h2>
              <p className="text-[11px] text-slate-400 font-medium">wss://livekit.feendesk.com</p>
            </div>
          </div>

          {/* Room Name */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Room</Label>
            <Input 
              value={room} 
              onChange={(e) => setRoom(e.target.value)} 
              className="h-10 rounded-lg border-slate-200 text-sm"
            />
          </div>

          {/* Role Selector — compact buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsPublisher(true)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                isPublisher ? 'border-[#f7e774] bg-[#f7e774]/5' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <Zap className={`h-4 w-4 ${isPublisher ? 'text-[#d4a500]' : 'text-slate-400'}`} />
              <span className="font-black text-[10px] uppercase tracking-widest">Broadcaster</span>
            </button>
            <button
              onClick={() => setIsPublisher(false)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                !isPublisher ? 'border-[#f7e774] bg-[#f7e774]/5' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <Users className={`h-4 w-4 ${!isPublisher ? 'text-[#d4a500]' : 'text-slate-400'}`} />
              <span className="font-black text-[10px] uppercase tracking-widest">Viewer</span>
            </button>
          </div>

          {error && <p className="text-red-500 text-[11px] font-bold text-center bg-red-50 py-1.5 rounded-lg border border-red-100">{error}</p>}

          {/* Join Button */}
          <Button 
            onClick={handleJoin}
            className="w-full h-11 rounded-xl bg-[#0f172a] text-white hover:bg-[#d4a500] font-black shadow-lg transition-all text-xs uppercase tracking-widest cursor-pointer"
          >
            {isPublisher ? 'Initialize Spotlight' : 'Join Audience'}
          </Button>

          <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-slate-300">
            <ShieldCheck className="h-3 w-3" />
            <span>SECURE END-TO-END</span>
          </div>
        </div>
      </div>
    </div>
  )
}
