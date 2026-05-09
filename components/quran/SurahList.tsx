'use client'

import Link from 'next/link'
import { Surah } from '@/types/surah'

interface Props {
  surahs: Surah[]
}

export default function SurahList({ surahs }: Props) {
  return (
    <div className="space-y-3">
      {surahs.map((surah) => (
        <Link
          key={surah.number}
          href={`/surah/${surah.number}`}
          className="block border rounded-xl p-4 hover:bg-gray-100"
        >
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold">
                {surah.number}. {surah.englishName}
              </h2>

              <p className="text-sm text-gray-500">
                {surah.englishNameTranslation}
              </p>
            </div>

            <div className="text-right">
              <p>{surah.name}</p>

              <p className="text-sm">
                {surah.numberOfAyahs} Ayahs
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}