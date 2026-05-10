'use client'

import { useMemo, useState, useEffect } from 'react'
import AyahCard from './AyahCard'

interface Props {
  surahId: number
  arabicAyahs: any[]
  translationAyahs: any[]

  onNextSurah?: () => void
  onPrevSurah?: () => void

  arabicFontSize?: number
  translationFontSize?: number
  translationLanguage?: string
  arabicFontClass?: string
  translationFontClass?: string
  onSettingsChange?: (settings: {
    arabicFontSize: number
    translationFontSize: number
    translationLanguage: string
  }) => void
}

export default function ReadingClient({
  surahId,
  arabicAyahs,
  translationAyahs,

  onNextSurah,
  onPrevSurah,

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
    < div className='w-full overflow-visible'>
      {arabicAyahs.map((ayah, index) => (
        <AyahCard
          key={`${surahId}-${ayah.numberInSurah ?? ayah.number ?? index}-${index}`}
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
      <div className="mt-10 flex justify-center">
  <div className="flex items-center gap-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-4 shadow-sm backdrop-blur-md">
    
    {/* Previous */}
    <button
      onClick={() => onPrevSurah?.()}
      className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
    >
      <span className="text-lg">←</span>
      Previous
    </button>

    {/* Divider / center info */}
    {/* Next */}
    <button
      onClick={() => onNextSurah?.()}
      className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
    >
      Next
      <span className="text-lg">→</span>
    </button>
  </div>
</div>
    </div>
  )
}
