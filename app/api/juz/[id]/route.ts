import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const arabicRes = await fetch(
      `https://api.alquran.cloud/v1/juz/${id}/quran-uthmani`
    )

    const translationRes = await fetch(
      `https://api.alquran.cloud/v1/juz/${id}/en.asad`
    )

    if (!arabicRes.ok || !translationRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch Juz' },
        { status: 500 }
      )
    }

    const arabicData = await arabicRes.json()
    const translationData = await translationRes.json()

    const ayahs = arabicData.data.ayahs.map((ayah: any, i: number) => ({
      surahNumber: ayah.surah.number,
      surahName: ayah.surah.englishName,
      ayahNumber: ayah.numberInSurah,
      text: ayah.text,
      translation: translationData.data.ayahs[i]?.text,
    }))

    const grouped = ayahs.reduce((acc: any, ayah: any) => {
      const key = ayah.surahNumber

      if (!acc[key]) {
        acc[key] = {
          surahNumber: ayah.surahNumber,
          surahName: ayah.surahName,
          ayahs: [],
        }
      }

      acc[key].ayahs.push(ayah)
      return acc
    }, {})

    return NextResponse.json({
      juz: Number(id),
      surahs: Object.values(grouped),
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}