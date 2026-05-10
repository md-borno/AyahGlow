import { Surah } from '@/types/surah'

const BASE_URL = 'https://api.alquran.cloud/v1'

async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const res = await fetch(url, options)

    if (res.ok) {
      return res
    }

    if (attempt === retries) {
      throw new Error(`Failed to fetch ${url} after ${retries} attempts`)
    }

    await new Promise((resolve) => setTimeout(resolve, 500 * attempt))
  }

  throw new Error(`Failed to fetch ${url}`)
}

export async function getSurahs(): Promise<Surah[]> {
  const res = await fetchWithRetry(`${BASE_URL}/surah`, {
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
  const [arabicRes, translationRes] = await Promise.all([
    fetchWithRetry(`${BASE_URL}/surah/${id}/quran-uthmani`, {
      next: {
        revalidate: 3600,
      },
    }),
    fetchWithRetry(`${BASE_URL}/surah/${id}/en.asad`, {
      next: {
        revalidate: 3600,
      },
    }),
  ])

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

export async function getJuz(id: number) {
  const res = await fetch(`/api/juz/${id}`)

  if (!res.ok) throw new Error('Failed to fetch Juz')

  return res.json()
}