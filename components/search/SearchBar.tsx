'use client'

import { useState } from 'react'

interface Props {
  onSearch: (value: string) => void
  placeholder?: string
}

export default function SearchBar({
  onSearch,
  placeholder = 'Search...',
}: Props) {
  const [query, setQuery] = useState('')

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={query}
      onChange={(e) => {
        setQuery(e.target.value)
        onSearch(e.target.value)
      }}
      className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:border-gray-700 dark:bg-[#111827] dark:text-gray-200 dark:focus:border-green-500 dark:focus:ring-green-900/30"
    />
  )
}