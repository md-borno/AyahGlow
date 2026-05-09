'use client'

import { useRef, useState } from 'react'

interface Props {
  audioUrl: string
}

export default function AudioPlayer({
  audioUrl,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [playing, setPlaying] = useState(false)

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setPlaying(!playing)
  }

  return (
    <div className="flex items-center gap-4">
      <audio
        ref={audioRef}
        src={audioUrl}
      />

      <button
        onClick={toggleAudio}
        className="px-4 py-2 rounded bg-black text-white"
      >
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}