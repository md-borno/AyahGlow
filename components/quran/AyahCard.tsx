'use client'

import clsx from 'clsx'

import AyahActions from './AyahActions'

interface Props {
  ayahNumber: number
  arabic: string
  translation: string
  active?: boolean
  onPlay: () => void
}

export default function AyahCard({
  ayahNumber,
  arabic,
  translation,
  active,
  onPlay,
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

        <AyahActions onPlay={onPlay} />
      </div>

      <p className="text-right text-5xl leading-[110px] mb-10 font-arabic">
        {arabic}
      </p>

      <p className="text-lg leading-10 text-gray-700 dark:text-gray-300">
        {translation}
      </p>
    </div>
  )
}