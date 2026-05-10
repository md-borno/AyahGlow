'use client'

import { useMemo, useState, useEffect } from 'react'
import AyahCard from './AyahCard'

interface Props {
  surahId: number

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arabicAyahs: any[]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translationAyahs: any[]

  arabicFontSize?: number
  translationFontSize?: number
  translationLanguage?: string
  arabicFontClass?: string
  translationFontClass?: string
  onSettingsChange?: (settings: { arabicFontSize: number; translationFontSize: number; translationLanguage: string }) => void
}

export default function ReadingClient({
  surahId,
  arabicAyahs,
  translationAyahs,
  arabicFontSize: propArabicFontSize,
  translationFontSize: propTranslationFontSize,
  translationLanguage: propTranslationLanguage,
  arabicFontClass,
  translationFontClass,
  onSettingsChange,
}: Props) {
  const [arabicFontSize, setArabicFontSize] = useState(propArabicFontSize ?? 48)
  const [translationFontSize, setTranslationFontSize] = useState(propTranslationFontSize ?? 18)
  const [translationLanguage, setTranslationLanguage] = useState(propTranslationLanguage ?? 'english')

  useEffect(() => {
    if (propArabicFontSize !== undefined) {
      setArabicFontSize(propArabicFontSize)
    }
  }, [propArabicFontSize])

  useEffect(() => {
    if (propTranslationFontSize !== undefined) {
      setTranslationFontSize(propTranslationFontSize)
    }
  }, [propTranslationFontSize])

  useEffect(() => {
    if (propTranslationLanguage !== undefined) {
      setTranslationLanguage(propTranslationLanguage)
    }
  }, [propTranslationLanguage])

  const handleArabicFontSizeChange = (value: number) => {
    setArabicFontSize(value)
    onSettingsChange?.({ arabicFontSize: value, translationFontSize, translationLanguage })
  }

  const handleTranslationFontSizeChange = (value: number) => {
    setTranslationFontSize(value)
    onSettingsChange?.({ arabicFontSize, translationFontSize: value, translationLanguage })
  }

  const handleTranslationLanguageChange = (value: string) => {
    setTranslationLanguage(value)
    onSettingsChange?.({ arabicFontSize, translationFontSize, translationLanguage: value })
  }

  const totalAyahs = arabicAyahs.length

  const translationClass = translationFontClass ??
    (translationLanguage === 'bangla'
      ? 'font-translation-bn'
      : 'font-translation-en')

  return (
    <>
      {arabicAyahs.map((ayah, index) => (
        <AyahCard
          key={ayah.number}
          surahId={surahId}
          ayahNumber={ayah.numberInSurah}
          arabic={ayah.text}
          translation={translationAyahs[index]?.text ?? ''}
          totalAyahs={totalAyahs}
          arabicFontSize={arabicFontSize}
          translationFontSize={translationFontSize}
          arabicFontClass={arabicFontClass}
          translationFontClass={translationClass}
          active={false}
        />
      ))}
    </>
  )
}
