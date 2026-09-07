import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, model = 'gemini-3.5-flash-lite', systemInstruction, grounding = 'none', location } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    let activeModel = model;
    if (
      activeModel.includes('2.0') ||
      activeModel.includes('2.5') ||
      activeModel.includes('1.5') ||
      activeModel === 'gemini-3.6-flash'
    ) {
      activeModel = 'gemini-3.5-flash-lite';
    }

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

    let response;
    try {
      response = await ai.models.generateContent({
        model: activeModel,
        contents,
        config,
      });
    } catch (groundingError: any) {
      // If grounded generation failed due to quota/unavailability, fallback to ungrounded generation seamlessly
      if (config.tools) {
        console.warn("Grounded generation failed, falling back to standard generation:", groundingError.message);
        delete config.tools;
        delete config.toolConfig;
        response = await ai.models.generateContent({
          model: activeModel,
          contents,
          config,
        });
      } else {
        throw groundingError;
      }
    }

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
