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
  active,
}: Props) {
  return (
    <div
      className={clsx(
        'rounded-3xl border bg-white dark:bg-[#0f172a] dark:border-gray-800 p-8 mb-6 transition-all',
        active &&
          'border-green-500 shadow-lg shadow-green-500/10'
      )}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-semibold">
          {ayahNumber}
        </div>

        <AyahActions
          surahNumber={surahId}
          ayahNumber={ayahNumber}
          totalAyahs={totalAyahs}
        />
      </div>

      <p
        className="text-right leading-[110px] mb-10 font-arabic"
        style={{ fontSize: arabicFontSize }}
      >
        {arabic}
      </p>

      <p
        className={`${translationFontClass} leading-8 text-gray-700 dark:text-gray-300`}
        style={{ fontSize: translationFontSize }}
      >
        {translation}
      </p>
    </div>
  )
}