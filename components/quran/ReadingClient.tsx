'use client'

import AyahCard from './AyahCard'

interface Props {
  surahId: number

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arabicAyahs: any[]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translationAyahs: any[]
}

export default function ReadingClient({
  surahId,
  arabicAyahs,
  translationAyahs,
}: Props) {
  const handlePlay = (
    ayahNumber: number
  ) => {
    console.log(
      'Play ayah:',
      ayahNumber
    )
  }

  return (
    <>
      {arabicAyahs.map(
        (ayah, index) => (
          <AyahCard
            key={ayah.number}
            ayahNumber={
              ayah.numberInSurah
            }
            arabic={ayah.text}
            translation={
              translationAyahs[index]
                .text
            }
            onPlay={() =>
              handlePlay(
                ayah.numberInSurah
              )
            }
          />
        )
      )}
    </>
  )
}