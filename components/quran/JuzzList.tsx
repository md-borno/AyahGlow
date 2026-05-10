'use client'

import { JuzSurah } from '../../types/surah'

interface Props {
  juzs: JuzSurah[]
  selectedJuzId?: number
  onSelect?: (id: number) => void
}

export default function JuzList({
  juzs,
  selectedJuzId,
  onSelect,
}: Props) {
  return (
    <div className="space-y-3">
      {juzs.map((juz) => {
        const isActive = selectedJuzId === juz.number

        const itemClass = `block rounded-3xl border p-4 text-left transition ${
          isActive
            ? 'border-green-500 bg-green-50 dark:bg-green-950/40'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800'
        }`

        return (
          <button
            key={juz.number}
            // onClick={() => onSelect?.(juz.number)}
            className={itemClass}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">Juz {juz.number}</h2>
                <p className="text-sm text-gray-500">
                  {juz.surahs.length} Surahs
                </p>
              </div>

              <div className="text-right text-sm text-gray-600 dark:text-gray-300">
                {juz.surahs[0]?.surahName} → {juz.surahs.at(-1)?.surahName}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}