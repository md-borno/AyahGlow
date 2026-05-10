'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { Surah } from '@/types/surah'

interface Props {
  surahs: Surah[]
  selectedSurahId?: number
  onSelect?: (surahId: number) => void
}

export default function SurahList({
  surahs,
  selectedSurahId,
  onSelect,
}: Props) {
  return (
    <div className="space-y-3">
      {surahs.map((surah) => {
        const isActive = selectedSurahId === surah.number

        const itemClass = clsx(
          'block rounded-3xl border p-4 text-left transition-all duration-200 group',
          isActive
            ? 'border-green-500 bg-green-50 dark:bg-green-950/40'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800'
        )

        const content = (
          <div className="flex justify-between gap-4 items-center  w-[254px]">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
              {/* Diamond Number */}
              <div
                className={clsx(
                  'w-8 h-8 rotate-45 rounded-sm flex items-center justify-center transition-all duration-300',
                  isActive
                    ? 'bg-green-500 shadow-lg shadow-green-500/40 scale-110'
                    : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-green-500 group-hover:shadow-md group-hover:shadow-green-400/30'
                )}
              >
                <span className="-rotate-45 text-white text-sm font-semibold">
                  {surah.number}
                </span>
              </div>

              {/* Name */}
              <div>
                <h2 className="font-semibold">{surah.englishName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {surah.englishNameTranslation}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="text-right">
              <p className="text-lg">{surah.name}</p>
              {!onSelect && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {surah.numberOfAyahs} Ayahs
                </p>
              )}
            </div>
          </div>
        )

        return onSelect ? (
          <button
            key={surah.number}
            onClick={() => onSelect(surah.number)}
            className={itemClass}
          >
            {content}
          </button>
        ) : (
          <Link
            key={surah.number}
            href={`/surah/${surah.number}`}
            className={itemClass}
          >
            {content}
          </Link>
        )
      })}
    </div>
  )
}