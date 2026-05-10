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
  const toArabicNumber = (num: number) => {
    return num.toString().replace(/\d/g, (d) =>
      '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]
    )
  }
  return (
    <div
  className={clsx(
    'flex  justify-between bg-white dark:bg-[#0D0D0D] p-3 transition-all border-b border-gray-200',
    active && 'shadow-lg shadow-green-500/10'
  )}
>
  {/* Left side (Actions + number) */}
  <div className="flex flex-col items-start gap-3">
    <div className="w-10 h-10 text-green-400 flex items-center justify-center font-semibold">
      {ayahNumber}:{surahId}
    </div>

    <AyahActions
      surahNumber={surahId}
      ayahNumber={ayahNumber}
      totalAyahs={totalAyahs}
    />
  </div>

  {/* Right side content */}
  <div className="flex-1">
    {/* Arabic (RTL) */}
    <p
      dir="rtl"
      className={`flex items-center gap-2 mb-5 text-right leading-[110px] dark:text-gray-300 ${
        arabicFontClass ?? 'font-arabic-amiri'
      }`}
      style={{ fontSize: arabicFontSize }}
    >
      {arabic}

      <span className="w-12 h-12 rounded-full flex items-center justify-center font-arabic-amiri text-lg font-bold text-black dark:text-green-400">
        ۝{toArabicNumber(ayahNumber)}
      </span>
    </p>

    {/* Translation (LTR) */}
    <p
      dir="ltr"
      className={`${translationFontClass} text-left leading-8 text-gray-700 dark:text-gray-300`}
      style={{ fontSize: translationFontSize }}
    >
      {translation}
    </p>
  </div>
</div>
  )
}