export function getAyahAudioUrl(
  surah: number,
  ayah: number
) {
  const surahStr = surah
    .toString()
    .padStart(3, '0')

  const ayahStr = ayah
    .toString()
    .padStart(3, '0')

  return `https://everyayah.com/data/Alafasy_128kbps/${surahStr}${ayahStr}.mp3`
}