import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, model = 'gemini-1.5-flash', systemInstruction, grounding = 'none', location } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if API Key is not set or invalid
    if (!apiKey || apiKey.length < 10) {
      console.warn("GEMINI_API_KEY is missing or invalid in environment variables. Providing fallback response.");
      return NextResponse.json({
        text: "Namaste! I am the Raahi Concierge. I can help you plan amazing itineraries across India. (Note: Live AI responses are currently operating in offline/demo mode, but you can still use our trip generation module in the Trip Planner!)",
        model: 'raahi-fallback',
        groundingMetadata: null,
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    let activeModel = model;
    const validModels = ['gemini-1.5-flash'];
    if (!validModels.includes(activeModel)) {
      activeModel = 'gemini-1.5-flash';
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
    // Provide a graceful fallback response if the API key fails (e.g. invalid key, quota exceeded)
    return NextResponse.json({
      text: "Namaste! I am the Raahi Concierge. It looks like our AI connection is experiencing a temporary issue. I can still help you build an incredible trip using our verified database if you head over to the Trip Planner!",
      model: 'raahi-fallback',
      groundingMetadata: null,
    });
  }
}
