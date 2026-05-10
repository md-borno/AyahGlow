export interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

export interface JuzSurah {
  surahs: any
  number: number | undefined
  surahNumber: number
  surahName: string
  ayahs: {
    ayahNumber: number
    text: string
    translation?: string
  }[]
}

export interface JuzResponse {
  juz: number
  surahs: JuzSurah[]
}