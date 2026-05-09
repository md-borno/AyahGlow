import ReadingLayout from '@/components/layout/ReadingLayout'

import SurahHeader from '@/components/quran/SurahHeader'

import ReadingClient from '@/components/quran/ReadingClient'

import { getSurah } from '@/services/quran.service'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function SurahPage({
  params,
}: Props) {
  const { id } = await params

  const surahId = Number(id)

  const data = await getSurah(surahId)

  return (
    <ReadingLayout>
      <SurahHeader
        englishName={
          data.arabic.englishName
        }
        arabicName={
          data.arabic.name
        }
        ayahs={
          data.arabic.numberOfAyahs
        }
      />

      <ReadingClient
        surahId={surahId}
        arabicAyahs={
          data.arabic.ayahs
        }
        translationAyahs={
          data.translation.ayahs
        }
      />
    </ReadingLayout>
  )
}