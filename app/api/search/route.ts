import { NextResponse } from "next/server";

async function getSurah(id: number) {
  const arabicRes = await fetch(
    `https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`
  );

  const translationRes = await fetch(
    `https://api.alquran.cloud/v1/surah/${id}/en.asad`
  );

  const a = await arabicRes.json();
  const t = await translationRes.json();

  if (!a.data?.ayahs || !t.data?.ayahs) {
    return {
      surah: {
        number: a.data?.number || id,
        englishName: a.data?.englishName || `Surah ${id}`,
      },
      ayahs: [],
    };
  }

  return {
    surah: {
      number: a.data.number,
      englishName: a.data.englishName,
    },
    ayahs: a.data.ayahs.map(
      (ayah: any, i: number) => ({
        text: ayah.text,
        translation: t.data.ayahs[i]?.text || "Translation not available",
        number: ayah.numberInSurah,
      })
    ),
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q =
    searchParams.get("q")?.toLowerCase() ||
    "";

  const results: unknown[] = [];

  for (let i = 1; i <= 114; i++) {
    const { surah, ayahs } = await getSurah(i);

    const filtered = ayahs.filter(
      (a: any) =>
        a.text
          .toLowerCase()
          .includes(q) ||
        a.translation
          .toLowerCase()
          .includes(q)
    );

    results.push(
      ...filtered.map((ayah: any) => ({
        ...ayah,
        surah,
      }))
    );
  }

  return NextResponse.json(results);
}