interface Props {
  englishName: string
  arabicName: string
  ayahs: number
  revelationType: string
  englishNameTranslation?: string
}

export default function SurahHeader({
  englishName,
  arabicName,
  ayahs,
  revelationType,
  englishNameTranslation,
}: Props) {
  return (
    <div className=" bg-white dark:bg-[#0f172a]">
      
      <div className="flex items-center justify-between gap-4">
        
        {/* Left fixed image */}
        <div className="flex-shrink-0">
          <img
            src="/mosque.png"  
            alt="Surah Icon"
            className="w-36 object-contain"
          />
        </div>

        {/* Middle / English info */}
        <div className="text-center flex-1">
          <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400 mb-1">
            {revelationType} • {ayahs} Ayahs
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold">
            {englishName}
          </h1>

          {englishNameTranslation ? (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {englishNameTranslation}
            </p>
          ) : null}
        </div>

        {/* Right Arabic name */}
        <div className="flex-shrink-0 text-right">
          <p className="text-3xl sm:text-5xl font-arabic-amiri leading-tight">
            {arabicName}
          </p>
        </div>
      </div>
    </div>
  )
}