import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { lat, lng, radius = 3000, includedTypes = ["tourist_attraction", "restaurant", "lodging", "museum"] } = await req.json();

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Lat/lng required' }, { status: 400 });
  }

  const url = 'https://places.googleapis.com/v1/places:searchNearby';
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.priceLevel,places.primaryType,places.photos,places.googleMapsUri',
    },
    body: JSON.stringify({
      maxResultCount: 20,
      includedTypes,
      locationRestriction: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius,
        },
      },
    }),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
