import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  const url = `https://places.googleapis.com/v1/places/${id}`;
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const response = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'id,displayName,formattedAddress,internationalPhoneNumber,rating,userRatingCount,priceLevel,currentOpeningHours,photos,reviews,googleMapsUri,editorialSummary',
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
