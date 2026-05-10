'use client'

import { useMemo, useState } from 'react'
import AyahCard from './AyahCard'

interface Props {
  surahId: number

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arabicAyahs: any[]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translationAyahs: any[]
}

export default function ReadingClient({
  surahId,
  arabicAyahs,
  translationAyahs,
}: Props) {
  const [arabicFontSize, setArabicFontSize] = useState(48)
  const [translationFontSize, setTranslationFontSize] = useState(18)
  const [translationLanguage, setTranslationLanguage] = useState(
    'english'
  )

  const totalAyahs = arabicAyahs.length

  const translationFontClass = useMemo(
    () =>
      translationLanguage === 'bangla'
        ? 'font-translation-bn'
        : 'font-translation-en',
    [translationLanguage]
  )

  return (
    <>
      <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#0f172a]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Reading settings
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Adjust Arabic and translation text sizes and font style.
            </p>
          </div>

          <div className="grid w-full gap-4 md:max-w-2xl md:grid-cols-3">
            <div>
              <div className="range-label text-sm text-gray-700 dark:text-gray-300">
                <span>Arabic size</span>
                <span>{arabicFontSize}px</span>
              </div>
              <input
                className="range-slider"
                type="range"
                min={28}
                max={80}
                step={2}
                value={arabicFontSize}
                onChange={(e) =>
                  setArabicFontSize(Number(e.target.value))
                }
              />
            </div>

            <div>
              <div className="range-label text-sm text-gray-700 dark:text-gray-300">
                <span>Translation size</span>
                <span>{translationFontSize}px</span>
              </div>
              <input
                className="range-slider"
                type="range"
                min={14}
                max={32}
                step={1}
                value={translationFontSize}
                onChange={(e) =>
                  setTranslationFontSize(Number(e.target.value))
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Translation font
              </label>
              <select
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition dark:border-gray-700 dark:bg-[#111827] dark:text-gray-200"
                value={translationLanguage}
                onChange={(e) =>
                  setTranslationLanguage(e.target.value)
                }
              >
                <option value="english">English</option>
                <option value="bangla">Bangla</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {arabicAyahs.map((ayah, index) => (
        <AyahCard
          key={ayah.number}
          surahId={surahId}
          ayahNumber={ayah.numberInSurah}
          arabic={ayah.text}
          translation={translationAyahs[index].text}
          totalAyahs={totalAyahs}
          arabicFontSize={arabicFontSize}
          translationFontSize={translationFontSize}
          translationFontClass={translationFontClass}
        />
      ))}
    </>
  )
}
