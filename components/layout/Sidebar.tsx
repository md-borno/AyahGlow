'use client'

import Link from 'next/link'
import {
  Book,
  Bookmark,
  Search,
  Settings,
} from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 border-r bg-white dark:bg-[#0f172a] dark:border-gray-800 flex-col">
      <div className="p-6 border-b dark:border-gray-800">
        <h1 className="text-2xl font-bold">
          AyahGlow
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Book size={20} />
          Surahs
        </Link>

        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
          <Search size={20} />
          Search
        </button>

        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bookmark size={20} />
          Bookmarks
        </button>

        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
          <Settings size={20} />
          Settings
        </button>
      </nav>
    </aside>
  )
}