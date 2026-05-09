'use client'

import {
  Moon,
  Sun,
} from 'lucide-react'

export default function Topbar() {
  return (
    <header className="h-16 border-b bg-white dark:bg-[#0f172a] dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-50">
      <div>
        <h2 className="font-semibold text-lg">
          Quran Reading
        </h2>
      </div>

      <button className="w-10 h-10 rounded-xl border flex items-center justify-center dark:border-gray-700">
        <Moon size={18} />
      </button>
    </header>
  )
}