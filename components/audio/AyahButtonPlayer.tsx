'use client'

import {
  Play,
  Pause,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import { getAyahAudioUrl } from '@/services/audio.service'

interface Props {
  surahNumber: number
  ayahNumber: number
  totalAyahs: number
}

/*
 GLOBAL AUDIO ENGINE
*/
let globalAudio: HTMLAudioElement | null =
  null

let currentAyahGlobal:
  | string
  | null = null

let playlist: number[] = []

let currentIndex = 0

export default function AyahButtonPlayer({
  surahNumber,
  ayahNumber,
  totalAyahs,
}: Props) {
  const ayahId = `${surahNumber}-${ayahNumber}`

  const [playing, setPlaying] =
    useState(false)

  // Sync UI
  useEffect(() => {
    const interval = setInterval(() => {
      return setPlaying(
            currentAyahGlobal === ayahId &&
            !!globalAudio &&
            !globalAudio.paused
        )
    }, 200)

    return () =>
      clearInterval(interval)
  }, [ayahId])

  const buildPlaylist = () => {
    return Array.from(
      {
        length:
          totalAyahs -
          ayahNumber +
          1,
      },
      (_, i) => ayahNumber + i
    )
  }

  const playAyah = async (
    ayah: number
  ) => {
    try {
      // Create only once
      if (!globalAudio) {
        globalAudio = new Audio()
      }

      // IMPORTANT:
      // Wait for pause fully
      globalAudio.pause()

      const newSrc =
        getAyahAudioUrl(
          surahNumber,
          ayah
        )

      // Prevent unnecessary reload
      if (
        globalAudio.src !== newSrc
      ) {
        globalAudio.src = newSrc
      }

      currentAyahGlobal = ayahId

      await globalAudio.play()

      globalAudio.onended = async () => {
        currentIndex++

        if (
          currentIndex <
          playlist.length
        ) {
          await playAyah(
            playlist[currentIndex]
          )
        } else {
          currentAyahGlobal =
            null

          setPlaying(false)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const togglePlay = async () => {
    try {
      if (!globalAudio) {
        globalAudio = new Audio()
      }

      // SAME AYAH
      if (
        currentAyahGlobal === ayahId
      ) {
        if (globalAudio.paused) {
          await globalAudio.play()

          setPlaying(true)
        } else {
          globalAudio.pause()

          setPlaying(false)
        }

        return
      }

      // DIFFERENT AYAH
      globalAudio.pause()

      playlist = buildPlaylist()

      currentIndex = 0

      await playAyah(ayahNumber)

      setPlaying(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <button
      onClick={togglePlay}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black text-white"
    >
      {playing ? (
        <>
          <Pause size={16} />
          Pause
        </>
      ) : (
        <>
          <Play size={16} />
          Play
        </>
      )}
    </button>
  )
}