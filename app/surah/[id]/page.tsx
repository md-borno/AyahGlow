"use client";

import { useEffect, useState } from "react";

export default function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      const resolvedParams = await params;
      const res = await fetch(`/api/surah/${resolvedParams.id}`);

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        if (!active) return;
        setError(
          json?.error || "Unable to load surah data."
        );
        return;
      }

      const json = await res.json();

      if (!active) return;
      if (!json || !Array.isArray(json.ayahs)) {
        setError(
          json?.error || "No ayahs found for this surah."
        );
        return;
      }

      setData(json);
    };

    load();
    return () => {
      active = false;
    };
  }, [params]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!data) return <p>Loading...</p>;

  const ayahs = Array.isArray(data.ayahs) ? data.ayahs : [];
  const filtered = ayahs.filter((a: any) => {
    const text = String(a.text || "").toLowerCase();
    const translation = String(a.translation || "").toLowerCase();
    const term = search.toLowerCase();

    return (
      text.includes(term) || translation.includes(term)
    );
  });

  return (
    <main className="p-5">
      <h1 className="text-3xl font-bold">
        {data.surah.englishName}
      </h1>

      <input
        className="border p-2 w-full my-4"
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="space-y-6">
        {filtered.map((a: any) => (
          <div
            key={a.number}
            className="border p-4"
          >
            <p className="text-right text-2xl">
              {a.text}
            </p>

            <p className="mt-2">
              {a.translation}
            </p>

            <audio
              controls
              src={a.audio}
              className="w-full mt-3"
            />
          </div>
        ))}
      </div>
    </main>
  );
}