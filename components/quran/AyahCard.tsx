'use client'

import clsx from 'clsx'

import AyahActions from './AyahActions'

interface Props {
  surahId: number
  ayahNumber: number
  arabic: string
  translation: string
  totalAyahs: number
  arabicFontSize: number
  translationFontSize: number
  translationFontClass: string
  arabicFontClass?: string
  active?: boolean
}

export default function AyahCard({
  surahId,
  ayahNumber,
  arabic,
  translation,
  totalAyahs,
  arabicFontSize,
  translationFontSize,
  translationFontClass,
  arabicFontClass,
  active,
}: Props) {
  return (
    <div
      className={clsx(
        'flex justify-between bg-white dark:bg-[#0f172a] p-3 transition-all border-b border-gray-200',
        active && 'shadow-lg shadow-green-500/10'
      )}
    >
      {/* Header */}
      <div className="grid items-start justify-between ">
        {/* SIDE: Ayah number */}
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-semibold">
          {ayahNumber}:{surahId}
        </div>
        {/* LEFT SIDE: Actions (now vertical) */}
        <div className="flex flex-col items-start gap-3">
          <AyahActions
            surahNumber={surahId}
            ayahNumber={ayahNumber}
            totalAyahs={totalAyahs}
          />
        </div>
      </div>


      <div>
        {/* Arabic Text */}
        <p
          className={`mb-5 text-right leading-[110px] dark:text-gray-300 ${arabicFontClass ?? 'font-arabic-amiri '
            }`}
          style={{ fontSize: arabicFontSize }}
        >
          {arabic}
        </p>

        {/* Translation */}
        <p
          className={`${translationFontClass} leading-8 text-gray-700 dark:text-gray-300`}
          style={{ fontSize: translationFontSize }}
        >
          {translation}
        </p>
      </div>
    </div>
  )
}