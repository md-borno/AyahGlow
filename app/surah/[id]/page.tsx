import ReadingLayout from '@/components/layout/ReadingLayout'
import SurahReaderClient from '@/components/quran/SurahReaderClient'
import { getSurah } from '@/services/quran.service'

interface Props {
  params: {
    id: string
  }
}

export const dynamic = 'force-dynamic'

export default async function SurahPage({ params }: Props) {
  const surahId = Number(params.id)
  const data = await getSurah(surahId)

  return (
    <ReadingLayout>
      <SurahReaderClient surahId={surahId} data={data} />
    </ReadingLayout>
  )
}
