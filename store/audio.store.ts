import { create } from 'zustand'

interface AudioStore {
  currentAudio: HTMLAudioElement | null

  currentAyahId: string | null

  playlist: number[]

  currentIndex: number

  isPlaying: boolean

  setAudio: (
    audio: HTMLAudioElement | null,
    ayahId: string | null
  ) => void

  setPlaylist: (
    playlist: number[],
    index: number
  ) => void

  setPlaying: (playing: boolean) => void

  nextAyah: () => void
}

export const useAudioStore =
  create<AudioStore>((set, get) => ({
    currentAudio: null,

    currentAyahId: null,

    playlist: [],

    currentIndex: 0,

    isPlaying: false,

    setAudio: (audio, ayahId) =>
      set({
        currentAudio: audio,
        currentAyahId: ayahId,
      }),

    setPlaylist: (playlist, index) =>
      set({
        playlist,
        currentIndex: index,
      }),

    setPlaying: (playing) =>
      set({
        isPlaying: playing,
      }),

    nextAyah: () => {
      const {
        currentIndex,
        playlist,
      } = get()

      if (
        currentIndex <
        playlist.length - 1
      ) {
        set({
          currentIndex:
            currentIndex + 1,
        })
      } else {
        set({
          isPlaying: false,
        })
      }
    },
  }))