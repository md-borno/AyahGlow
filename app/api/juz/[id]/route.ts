import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const url = req.url.startsWith('http')
      ? new URL(req.url)
      : new URL(req.url, 'http://localhost')
    const lang = url.searchParams.get('lang')
    const translationEdition = lang === 'bangla' ? 'bn.bengali' : 'en.asad'

    // Validate juz number is between 1-30
    const juzNumber = parseInt(id)
    if (isNaN(juzNumber) || juzNumber < 1 || juzNumber > 30) {
      return NextResponse.json(
        { error: 'Juz must be between 1 and 30' },
        { status: 400 }
      )
    }

    const arabicRes = await fetch(
      `https://api.alquran.cloud/v1/juz/${id}/quran-uthmani`
    )

    const translationRes = await fetch(
      `https://api.alquran.cloud/v1/juz/${id}/${translationEdition}`
    )

    if (!arabicRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch Juz arabic data' },
        { status: 500 }
      )
    }

    const arabicData = await arabicRes.json()
    const translationData = translationRes.ok
      ? await translationRes.json()
      : null

    const ayahs = arabicData.data.ayahs.map((ayah: any, i: number) => ({
      surahNumber: ayah.surah.number,
      surahName: ayah.surah.englishName,
      ayahNumber: ayah.numberInSurah,
      text: ayah.text,
      translation: translationData?.data?.ayahs?.[i]?.text ?? '',
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
      juz: juzNumber,
      number: juzNumber,
      surahs: Object.values(grouped),
    })
  } catch (err) {
    console.error('Juz API error:', err)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}