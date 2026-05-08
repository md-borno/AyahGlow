export const fetchSurahs = async () => {
  const res = await fetch("/api/surahs");
  return res.json();
};

export const fetchSurah = async (
  id: string
) => {
  const res = await fetch(
    `/api/surah/${id}`
  );
  return res.json();
};

export const searchAyahs = async (
  q: string
) => {
  const res = await fetch(
    `/api/search?q=${q}`
  );
  return res.json();
};