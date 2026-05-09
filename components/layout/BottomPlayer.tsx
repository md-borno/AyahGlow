'use client'

import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from 'lucide-react'

export default function BottomPlayer() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl rounded-3xl border bg-white/90 backdrop-blur-xl dark:bg-[#0f172a]/90 dark:border-gray-800 shadow-2xl px-6 py-4 z-50">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">
            Al-Fatihah
          </p>

          <p className="text-sm text-gray-500">
            Ayah 1
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full border flex items-center justify-center dark:border-gray-700">
            <SkipBack size={18} />
          </button>

          <button className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center">
            <Play size={22} />
          </button>

          <button className="w-10 h-10 rounded-full border flex items-center justify-center dark:border-gray-700">
            <SkipForward size={18} />
          </button>
        </div>

        <div className="w-32">
          <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div className="w-1/3 h-full bg-black dark:bg-white" />
          </div>
        </div>
      </div>
    </div>
  )
}