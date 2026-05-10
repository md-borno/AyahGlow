'use client'

import Link from 'next/link'
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
    <div className="space-y-3 ">
      {surahs.map((surah) => {
        const isActive = selectedSurahId === surah.number

        const itemClass = `block rounded-3xl border p-4 text-left transition ${
          isActive
            ? 'border-green-500 bg-green-50 dark:bg-green-950/40'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800'
        }`

        return onSelect ? (
          <button
            key={surah.number}
            onClick={() => onSelect(surah.number)}
            className={itemClass}
          >
            <div className="flex justify-between gap-4 w-52">
              <div>
                <h2 className="font-semibold">
                  {surah.number}. {surah.englishName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {surah.englishNameTranslation}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg">{surah.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {surah.numberOfAyahs} Ayahs
                </p>
              </div>
            </div>
          </button>
        ) : (
          <Link
            key={surah.number}
            href={`/surah/${surah.number}`}
            className={itemClass}
          >
            <div className="flex justify-between gap-4">
              <div>
                <h2 className="font-semibold">
                  {surah.number}. {surah.englishName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {surah.englishNameTranslation}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg">{surah.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {surah.numberOfAyahs} Ayahs
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}