import { getSurahs } from '@/services/quran.service'
import SurahList from '@/components/quran/SurahList'

export default async function HomePage() {
  const surahs = await getSurahs()

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        AyahGlow
      </h1>

      <SurahList surahs={surahs} />
    </main>
  
  )
}

