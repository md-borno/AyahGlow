'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { getAyahAudioUrl } from '@/services/audio.service'

interface Props {
  surahNumber: number
  totalAyahs: number
}

export default function AyahAudioPlayer({
  surahNumber,
  totalAyahs,
}: Props) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null)

  const [currentAyah, setCurrentAyah] =
    useState(1)

  const [playing, setPlaying] =
    useState(false)

  // Create audio only once
  useEffect(() => {
    const audio = new Audio()

    audio.preload = 'auto'

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Update source when ayah changes
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    audio.src = getAyahAudioUrl(
      surahNumber,
      currentAyah
    )

    if (playing) {
      audio
        .play()
        .catch(console.error)
    }
  }, [currentAyah, surahNumber])

  // Auto next ayah
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    const handleEnded = () => {
      if (currentAyah < totalAyahs) {
        setCurrentAyah((prev) => prev + 1)
      } else {
        setPlaying(false)
      }
    }

    audio.addEventListener(
      'ended',
      handleEnded
    )

    return () => {
      audio.removeEventListener(
        'ended',
        handleEnded
      )
    }
  }, [currentAyah, totalAyahs])

  const togglePlayback = async () => {
    if (!audioRef.current) return

    const audio = audioRef.current

    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        audio.src = getAyahAudioUrl(
          surahNumber,
          currentAyah
        )

        await audio.play()

        setPlaying(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={togglePlayback}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl"
      >
        {playing ? (
          <>
            <Pause size={18} />
            Pause
          </>
        ) : (
          <>
            <Play size={18} />
            Play
          </>
        )}
      </button>

      <div className="text-sm text-gray-500">
        Ayah {currentAyah} / {totalAyahs}
      </div>
    </div>
  )
}