'use client'

import SurahHeader from './SurahHeader'
import ReadingClient from './ReadingClient'
import { useSettings } from '@/providers/settings-provider'

interface Props {
  surahId: number
  data: {
    arabic: {
      englishName: string
      name: string
      numberOfAyahs: number
      revelationType: string
      englishNameTranslation?: string
      ayahs: any[]
    }
    translation: {
      ayahs: any[]
    }
  }
}

export default function SurahReaderClient({
  surahId,
  data,
}: Props) {
  const {
    arabicFontFamily,
    arabicFontSize,
    translationFontSize,
    translationLanguage,
  } = useSettings()

  const arabicFontClass =
    arabicFontFamily === 'Scheherazade New'
      ? 'font-arabic-scheherazade'
      : 'font-arabic-amiri'

  const translationFontClass =
    translationLanguage === 'bangla'
      ? 'font-translation-bn'
      : 'font-translation-en'

  return (
    <>
      <SurahHeader 
        englishName={data.arabic.englishName}
        arabicName={data.arabic.name}
        ayahs={data.arabic.numberOfAyahs}
        revelationType={data.arabic.revelationType}
        englishNameTranslation={data.arabic.englishNameTranslation}
      />
      <ReadingClient
        surahId={surahId}
        arabicAyahs={data.arabic.ayahs}
        translationAyahs={data.translation.ayahs}
        arabicFontSize={arabicFontSize}
        translationFontSize={translationFontSize}
        translationLanguage={translationLanguage}
        arabicFontClass={arabicFontClass}
        translationFontClass={translationFontClass}
      />
    </>
  )
}
