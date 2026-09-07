import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const w = searchParams.get('w') || '600';

  if (!name) {
    return NextResponse.json({ error: 'Photo name required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const url = `https://places.googleapis.com/v1/${name}/media?maxWidthPx=${w}&key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch photo' }, { status: response.status });
  }

  const blob = await response.blob();

  return new NextResponse(blob, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
