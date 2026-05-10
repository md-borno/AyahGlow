'use client'

import {
  Bookmark,
  Share2,
  Copy,
  MoreHorizontal,
} from 'lucide-react'
import AyahButtonPlayer from '@/components/audio/AyahButtonPlayer'

interface Props {
  surahNumber: number
  ayahNumber: number
  totalAyahs: number
}

export default function AyahActions({
  surahNumber,
  ayahNumber,
  totalAyahs,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <AyahButtonPlayer
        surahNumber={surahNumber}
        ayahNumber={ayahNumber}
        totalAyahs={totalAyahs}
      />

      <button className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        <Bookmark size={16} />
      </button>

      <button className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        <Copy size={16} />
      </button>

      <button className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        <Share2 size={16} />
      </button>

      <button className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        <MoreHorizontal size={16} />
      </button>
    </div>
  )
}
