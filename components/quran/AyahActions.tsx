'use client'

import {
  Play,
  Bookmark,
  Share2,
  Copy,
  MoreHorizontal,
} from 'lucide-react'

interface Props {
  onPlay: () => void
}

export default function AyahActions({
  onPlay,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPlay}
        className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <Play size={16} />
      </button>

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