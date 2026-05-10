import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lang = req.nextUrl.searchParams.get('lang')
    const translationEdition = lang === 'bangla' ? 'bn.bengali' : 'en.asad'

    const arabicRes = await fetch(
      `https://api.alquran.cloud/v1/page/${id}/quran-uthmani`
    )

    const translationRes = await fetch(
      `https://api.alquran.cloud/v1/page/${id}/${translationEdition}`
    )

    if (!arabicRes.ok || !translationRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
    }

    const arabicData = await arabicRes.json()
    const translationData = await translationRes.json()

    const ayahs = arabicData.data.ayahs.map((ayah: any, i: number) => ({
      ...ayah,
      translation: translationData.data.ayahs[i]?.text || '',
    }))

    return NextResponse.json({
      page: Number(id),
      ayahs,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
