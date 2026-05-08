"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [surahs, setSurahs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetch("/api/surahs")
      .then((res) => res.json())
      .then(setSurahs);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((results) => {
        setSearchResults(results);
        setIsSearching(false);
      })
      .catch(() => {
        setSearchResults([]);
        setIsSearching(false);
      });
  }, [searchQuery]);

  return (
    <main className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        AyahGlow - Quran App
      </h1>

      <input
        type="text"
        placeholder="Search across all 114 Surahs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-3 w-full mb-6 rounded-lg text-lg"
      />

      {isSearching && (
        <p className="text-center mb-4">Searching...</p>
      )}

      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Search Results ({searchResults.length} ayahs found)
          </h2>
          <div className="space-y-4">
            {searchResults.slice(0, 20).map((result: any, index: number) => (
              <div key={index} className="border p-4 rounded-lg">
                <Link
                  href={`/surah/${result.surah.number}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {result.surah.englishName} - Ayah {result.number}
                </Link>
                <p className="text-right text-xl mt-2">{result.text}</p>
                <p className="mt-2 text-gray-700">{result.translation}</p>
              </div>
            ))}
          </div>
          {searchResults.length > 20 && (
            <p className="text-center mt-4 text-gray-600">
              Showing first 20 results. Refine your search for more specific results.
            </p>
          )}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">All Surahs</h2>
      <div className="grid gap-4">
        {surahs.map((s: any) => (
          <Link
            key={s.number}
            href={`/surah/${s.number}`}
            className="border p-4 rounded hover:bg-gray-50"
          >
            <h3 className="font-bold">
              {s.number}. {s.englishName}
            </h3>
            <p>{s.englishNameTranslation}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}