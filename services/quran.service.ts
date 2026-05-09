import { Surah } from '@/types/surah'

const BASE_URL = 'https://api.alquran.cloud/v1'

export async function getSurahs(): Promise<Surah[]> {
  const res = await fetch(`${BASE_URL}/surah`, {
    next: {
      revalidate: 3600,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch surahs')
  }

  const data = await res.json()

  return data.data
}

export async function getSurah(id: number) {
  const arabicRes = await fetch(
    `${BASE_URL}/surah/${id}/quran-uthmani`,
    {
      next: {
        revalidate: 3600,
      },
    }
  )

  const translationRes = await fetch(
    `${BASE_URL}/surah/${id}/en.asad`,
    {
      next: {
        revalidate: 3600,
      },
    }
  )

  if (!arabicRes.ok || !translationRes.ok) {
    throw new Error('Failed to fetch surah')
  }

  const arabicData = await arabicRes.json()
  const translationData = await translationRes.json()

  return {
    arabic: arabicData.data,
    translation: translationData.data,
  }
}