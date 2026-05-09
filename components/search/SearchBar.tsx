'use client'

import { useState } from 'react'

interface Props {
  onSearch: (value: string) => void
}

export default function SearchBar({
  onSearch,
}: Props) {
  const [query, setQuery] = useState('')

  return (
    <input
      type="text"
      placeholder="Search Surah..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value)
        onSearch(e.target.value)
      }}
      className="w-full border p-3 rounded-xl"
    />
  )
}