import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;

  if (apiKey) {
    // Try Google Places Text Search
    const url = 'https://places.googleapis.com/v1/places:searchText';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.types',
      },
      body: JSON.stringify({ textQuery: query }),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }
  }

  // Fallback to Photon API
  console.log("Falling back to Photon search for:", query);
  const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=10`;
  const photonResponse = await fetch(photonUrl);
  const photonData = await photonResponse.json();

  const results = photonData.features.map((f: any) => ({
    id: f.properties.osm_id.toString(),
    displayName: { text: f.properties.name || f.properties.city || f.properties.country },
    formattedAddress: [f.properties.name, f.properties.city, f.properties.state, f.properties.country].filter(Boolean).join(", "),
    location: { latitude: f.geometry.coordinates[1], longitude: f.geometry.coordinates[0] },
    types: [f.properties.type]
  }));

  return NextResponse.json({ places: results });
}
