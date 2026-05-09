import { create } from 'zustand'
import { Surah } from '@/types/surah'

interface QuranStore {
  surahs: Surah[]
  setSurahs: (surahs: Surah[]) => void
}

export const useQuranStore = create<QuranStore>((set) => ({
  surahs: [],

  setSurahs: (surahs) => set({ surahs }),
}))