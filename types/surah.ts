export interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

export interface JuzSurah {
  number: number
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
  number: number
  surahs: JuzSurah[]
}