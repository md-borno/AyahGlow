interface Props {
  englishName: string
  arabicName: string
  ayahs: number
}

export default function SurahHeader({
  englishName,
  arabicName,
  ayahs,
}: Props) {
  return (
    <div className="text-center mb-14">
      <p className="text-gray-500 mb-2">
        {ayahs} Ayahs
      </p>

      <h1 className="text-5xl font-bold mb-4">
        {englishName}
      </h1>

      <p className="text-4xl font-arabic">
        {arabicName}
      </p>
    </div>
  )
}