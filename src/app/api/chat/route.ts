import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, model = 'gemini-2.0-flash', systemInstruction, grounding = 'none', location } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Enforce gemini-2.0-flash for Maps/Search Grounding if needed (2.0 and 2.5 support it)
    let activeModel = (grounding === 'maps' || grounding === 'search') ? 'gemini-2.5-flash' : model;

    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const config: Record<string, any> = {};
    if (systemInstruction) config.systemInstruction = systemInstruction;

    if (grounding === 'maps') {
      config.tools = [{ googleMaps: {} }];
      if (location?.latitude && location?.longitude) {
        config.toolConfig = {
          retrievalConfig: { latLng: { latitude: location.latitude, longitude: location.longitude } }
        };
      }
    } else if (grounding === 'search') {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: activeModel,
      contents,
      config,
    });

    const candidate = response.candidates?.[0];
    return NextResponse.json({
      text: response.text || '',
      model: activeModel,
      groundingMetadata: candidate?.groundingMetadata || null,
    });
  } catch (error: any) {
    console.error("Chat generation failed:", error);
    return NextResponse.json({ error: error.message || 'Generation failed' }, { status: 500 });
  }
}
