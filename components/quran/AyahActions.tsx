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
    <div className="flex flex-col items-start mb-1">
      
      {/* Audio Player */}
      <AyahButtonPlayer
        surahNumber={surahNumber}
        ayahNumber={ayahNumber}
        totalAyahs={totalAyahs}
      />

      {/* Bookmark */}
      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        <Bookmark size={16} />
      </button>

      {/* Copy */}
      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        <Copy size={16} />
      </button>

      {/* Share */}
      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        <Share2 size={16} />
      </button>

      {/* More */}
      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        <MoreHorizontal size={16} />
      </button>
    </div>
  )
}