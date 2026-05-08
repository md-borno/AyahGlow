import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.alquran.cloud/v1/surah"
  );

  const data = await res.json();

  return NextResponse.json(data.data);
}