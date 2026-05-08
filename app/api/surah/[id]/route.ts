import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const arabicRes = await fetch(
      `https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`
    );

    const translationRes = await fetch(
      `https://api.alquran.cloud/v1/surah/${id}/en.asad`
    );

    if (!arabicRes.ok || !translationRes.ok) {
      return NextResponse.json(
        { error: "Failed API fetch" },
        { status: 500 }
      );
    }

    const arabicData =
      await arabicRes.json();

    const translationData =
      await translationRes.json();

    if (!arabicData?.data) {
      return NextResponse.json(
        { error: "No data found" },
        { status: 404 }
      );
    }

    const ayahs =
      arabicData.data.ayahs.map(
        (ayah: any, i: number) => ({
          number: ayah.numberInSurah,
          text: ayah.text,
          audio: ayah.audio,
          translation:
            translationData.data.ayahs[i]
              .text,
        })
      );

    return NextResponse.json({
      surah: {
        name: arabicData.data.name,
        englishName:
          arabicData.data.englishName,
        numberOfAyahs:
          arabicData.data.numberOfAyahs,
      },
      ayahs,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}