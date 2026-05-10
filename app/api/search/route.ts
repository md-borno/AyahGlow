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
        name: a.data?.name || '',
        englishName: a.data?.englishName || `Surah ${id}`,
        englishNameTranslation: a.data?.englishNameTranslation || '',
        numberOfAyahs: a.data?.numberOfAyahs || 0,
      },
      ayahs: [],
    };
  }

  return {
    surah: {
      number: a.data.number,
      name: a.data.name,
      englishName: a.data.englishName,
      englishNameTranslation: a.data.englishNameTranslation,
      numberOfAyahs: a.data.numberOfAyahs,
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