'use client'

import { useState } from 'react'
import { JuzResponse } from '../../types/surah'

interface Props {
  juzs: JuzResponse[]
  selectedJuzId?: number
  onSelect?: (id: number) => void
}

export default function JuzList({
  juzs,
  selectedJuzId,
  onSelect,
}: Props) {
  const [expandedJuzId, setExpandedJuzId] = useState<number | null>(null)

  if (!juzs.length) {
    return (
      <div className="py-10 text-sm text-gray-500 dark:text-gray-400">
        Loading Juz list…
      </div>
    )
  }

  const handleJuzClick = (juzNumber: number) => {
    setExpandedJuzId(expandedJuzId === juzNumber ? null : juzNumber)
    onSelect?.(juzNumber)
  }

  return (
    <div className="space-y-3">
      {juzs.map((juz) => {
        const juzNumber = juz.number ?? juz.juz ?? 0
        const isExpanded = expandedJuzId === juzNumber

        const itemClass = `block w-full rounded-3xl border p-4 text-left transition ${isExpanded
          ? 'border-green-500 bg-green-50 dark:bg-green-950/40'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800'
          }`

        return (
          <div key={juzNumber}>
            <button
              onClick={() => juzNumber && handleJuzClick(juzNumber)}
              className={itemClass}
            >
              <div className="flex justify-between items-center">
                <div className='flex items-center justify-between gap-36'>
                  <h2 className="font-semibold text-lg text-green-400">Juz {juzNumber}</h2>
                  <p className=" text-xs text-gray-500">
                    {juz.surahs.length} Surahs
                  </p>
                </div>

                <svg
                  className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </button>

            {isExpanded && (
              <div className="mt-2 ml-4 space-y-2 border-l-2 border-green-200 dark:border-green-800 pl-4">
                {juz.surahs.map((surah, index) => (
                  <div
                    key={`${juzNumber}-${surah.surahNumber}`}
                    className="py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rotate-45 bg-green-600 rounded-sm flex items-center justify-center">
                        <span className="-rotate-45 text-white text-sm font-semibold">
                          {surah.surahNumber ?? surah.number}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {surah.surahName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {surah.ayahs.length} Ayahs
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}