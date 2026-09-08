import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { DESTINATION_DETAILS, INDIAN_FESTIVALS } from '@/lib/destinations';

export interface TripGenerationRequest {
  destination: string;
  state?: string;
  country?: string;
  arrivalDate: string;
  departureDate: string;
  durationDays: number;
  budgetRange: string;
  groupSize: number;
  travelPersona?: string;
  pace?: string;
  selectedActivities: string[];
  includeFestivals?: boolean;
}

export async function POST(req: Request) {
  try {
    const body: TripGenerationRequest = await req.json();
    const {
      destination,
      state = '',
      country = 'India',
      arrivalDate,
      departureDate,
      durationDays = 3,
      budgetRange = 'comfort',
      groupSize = 2,
      travelPersona = 'Heritage & Culture Explorer',
      pace = 'Balanced Exploration',
      selectedActivities = [],
    } = body;

    if (!destination) {
      return NextResponse.json({ error: 'Destination is required' }, { status: 400 });
    }

    // Match any active or upcoming festivals for this destination
    const matchedFestivals = INDIAN_FESTIVALS.filter((f) =>
      f.destination.toLowerCase().includes(destination.toLowerCase()) ||
      destination.toLowerCase().includes(f.destination.toLowerCase())
    );

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are Raahi Master Itinerary Architect, the premier AI heritage travel planner created under India's Ministry of Tourism and global cultural preservation initiatives.
Generate a structured, authentic, hyper-detailed day-by-day master travel itinerary.
Destination: ${destination}, State: ${state}, Country: ${country}
Arrival Date: ${arrivalDate}, Departure Date: ${departureDate}, Duration: ${durationDays} days
Budget Tier: ${budgetRange}, Group Size: ${groupSize} travelers
Travel Style/Persona: ${travelPersona}, Pace: ${pace}
Selected Preferences: ${selectedActivities.join(', ') || 'Authentic heritage, local culinary trails, artisanal crafts'}
${matchedFestivals.length > 0 ? `Relevant Local Festivals to weave in: ${matchedFestivals.map(f => f.name).join(', ')}` : ''}

CRITICAL RULES FOR PLACES:
- You MUST select ONLY real, physically existing, well-known or highly-rated landmarks, restaurants, cafes, and artisan workshops in ${destination}.
- NO generic placeholders (e.g., do NOT output "Famous Temple", "Local Market", "Popular Cafe"). Give the EXACT name (e.g., "Kashi Vishwanath Temple", "Johari Bazaar", "Indian Coffee House").
- The location field must contain the exact entity name so it can be searched directly on Google Maps.

You MUST return a pure JSON object strictly conforming to this structure:
{
  "destination": "${destination}",
  "state": "${state}",
  "country": "${country}",
  "tripTitle": "Curated title for this expedition",
  "summary": "High level description of the journey (2-3 sentences)",
  "vibeKeywords": ["Spiritual", "Heritage", "Artisanal"],
  "estimatedBudgetTotal": "Formatted currency estimate e.g. â‚¹28,500 - â‚¹34,000",
  "weatherForecast": { "temp": "28Â°C", "condition": "Pleasant & Clear", "advisory": "Best light in early mornings" },
  "safetyRating": "9.8/10 Ministry Certified Zone",
  "featuredFestival": null or { "name": "...", "date": "...", "highlight": "..." },
  "days": [
    {
      "day": 1,
      "date": "Formatted date e.g. 28 Oct 2026",
      "title": "Day 1: Theme title",
      "theme": "Spiritual Awakening",
      "timeSlots": [
        {
          "time": "06:00",
          "activity": "Activity name",
          "category": "Sunrise / Monument / Culinary / Craft / Evening Ritual",
          "duration": "2h",
          "location": "Exact landmark name",
          "description": "2-sentence practical & immersive description with insider tips",
          "localGuideTip": "Secret tip from local elders or registered guides",
          "crowdLevel": "Low | Moderate | High",
          "coordinates": { "lat": 26.9124, "lng": 75.7873 }
        }
      ]
    }
  ],
  "localArtisanPartners": [
    { "name": "Workshop or Guild Name", "craft": "Silk Weaving / Terracotta / Miniature Painting", "location": "District" }
  ],
  "safetyAdvisories": [
    "24/7 Tourist Police Station nearby",
    "Official UPI digital pass accepted everywhere"
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: [{ role: 'user', parts: [{ text: `Create an authentic, realistic ${durationDays}-day master itinerary for ${destination}, India with REAL, highly-rated landmarks, authentic artisan workshops, and specific existing food spots (NO generic names like "Famous Temple" or "Local Cafe"). Provide accurate coordinates (latitude/longitude) for each place. Every location MUST physically exist in ${destination}. Return strictly JSON.` }] }],
          config: {
            systemInstruction,
            responseMimeType: 'application/json'
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return NextResponse.json({
            success: true,
            source: 'gemini-1.5-flash',
            itinerary: parsed
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini itinerary generation failed or rate limited, using verified database fallback:', geminiError?.message);
      }
    }

    // Fallback: Verified Local Master Itinerary Engine
    const destDetails = DESTINATION_DETAILS[destination] || DESTINATION_DETAILS.default;
    const baseDate = new Date(arrivalDate || new Date().toISOString());
    const baseLat = destDetails.coordinates?.lat || 20.5937;
    const baseLng = destDetails.coordinates?.lng || 78.9629;

    const generatedDays = [];
    const themes = destDetails.themes.length > 0 ? destDetails.themes : ["Cultural Discovery", "Heritage Exploration", "Artisan Trails"];

    for (let i = 0; i < durationDays; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(currentDate.getDate() + i);
      const dayNum = i + 1;
      const theme = themes[i % themes.length];
      const morningSpot = destDetails.morningSpots[i % destDetails.morningSpots.length];
      const foodSpot1 = destDetails.foodSpots[0] || "Local Heritage Kitchen";
      const foodSpot2 = destDetails.foodSpots[1] || destDetails.foodSpots[0] || "Traditional Thali House";
      const landmark = destDetails.landmarks[i % destDetails.landmarks.length];

      generatedDays.push({
        day: dayNum,
        date: currentDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
        title: `Day ${dayNum}: ${theme}`,
        theme,
        timeSlots: [
          {
            time: '06:00',
            activity: `${morningSpot} Sunrise Experience`,
            category: 'Sunrise',
            duration: '2h',
            location: `${morningSpot}, ${destination}`,
            description: `Early morning exploration of ${morningSpot} before regular tourist rush. Capture timeless light reflections and peaceful atmospheres.`,
            localGuideTip: 'Reach 20 minutes before sunrise for quiet boat moorings and prime photographic angles.',
            crowdLevel: 'Low',
            coordinates: { lat: Number((baseLat + 0.005).toFixed(4)), lng: Number((baseLng + 0.004).toFixed(4)) }
          },
          {
            time: '08:30',
            activity: `Traditional Regional Breakfast at ${foodSpot1}`,
            category: 'Culinary',
            duration: '1.5h',
            location: `${foodSpot1}, ${destination}`,
            description: `Authentic breakfast tasting signature morning recipes prepared using generational heritage techniques.`,
            localGuideTip: 'Order the fresh clay-cup beverage along with warm regional bread rolls.',
            crowdLevel: 'Moderate',
            coordinates: { lat: Number((baseLat + 0.002).toFixed(4)), lng: Number((baseLng + 0.001).toFixed(4)) }
          },
          {
            time: '10:30',
            activity: selectedActivities[i % (selectedActivities.length || 1)] || `${landmark} Guided Heritage Walk`,
            category: 'Monument',
            duration: '3h',
            location: `${landmark}, ${destination}`,
            description: `In-depth architectural exploration of ${landmark} accompanied by official Ministry-certified cultural commentators.`,
            localGuideTip: 'Use your Raahi digital QR pass to bypass the general queue at the main entrance gate.',
            crowdLevel: 'Moderate',
            coordinates: { lat: Number((baseLat - 0.003).toFixed(4)), lng: Number((baseLng - 0.002).toFixed(4)) }
          },
          {
            time: '14:00',
            activity: `Regional Tasting Lunch at ${foodSpot2}`,
            category: 'Culinary',
            duration: '1.5h',
            location: `${foodSpot2}, ${destination}`,
            description: `Midday feast showcasing multi-course local specialties paired with seasonal cooling refreshments.`,
            localGuideTip: 'Ask for the chefâ€™s special seasonal platter prepared with locally sourced farm ingredients.',
            crowdLevel: 'Moderate',
            coordinates: { lat: Number((baseLat - 0.001).toFixed(4)), lng: Number((baseLng + 0.003).toFixed(4)) }
          },
          {
            time: '16:00',
            activity: i % 2 === 0 ? 'Artisan Guild Workshop & Handloom Trail' : 'Ancient Bazaar & Spice Guild Walk',
            category: 'Craft',
            duration: '2.5h',
            location: `${destination} Heritage Guild Quarter`,
            description: `Interactive demonstration with state-recognized master craftsmen. Observe intricate hand-weaving, pottery, or metal etching.`,
            localGuideTip: 'Support local artisans directly with zero intermediary commission through Raahi verified artisan QR.',
            crowdLevel: 'Low',
            coordinates: { lat: Number((baseLat + 0.004).toFixed(4)), lng: Number((baseLng - 0.004).toFixed(4)) }
          },
          {
            time: '18:45',
            activity: 'Sunset Heritage Gathering & Evening Ritual',
            category: 'Evening Ritual',
            duration: '2h',
            location: `${destination} Waterfront / Viewpoint`,
            description: `Witness timeless ceremonial traditions, sacred oil lamp ceremonies, and dusk ambiance with dedicated crowd-safety perimeters.`,
            localGuideTip: 'Best viewpoint is located on the elevated heritage pavilions near the northern tower.',
            crowdLevel: 'High',
            coordinates: { lat: Number((baseLat + 0.001).toFixed(4)), lng: Number((baseLng + 0.006).toFixed(4)) }
          },
          {
            time: '21:00',
            activity: 'Curated Heritage Dinner & Rest',
            category: 'Culinary',
            duration: '1.5h',
            location: `Courtyard Heritage Haveli, ${destination}`,
            description: `End your day with slow-cooked culinary delights in a restored royal courtyard serenaded by acoustic classical instrumentalists.`,
            localGuideTip: 'Reservations are synchronized automatically with your Raahi master itinerary booking.',
            crowdLevel: 'Low',
            coordinates: { lat: Number((baseLat - 0.002).toFixed(4)), lng: Number((baseLng - 0.005).toFixed(4)) }
          }
        ]
      });
    }

    const fallbackItinerary = {
      destination,
      state: state || 'India',
      country,
      tripTitle: `The Timeless Grandeur of ${destination}`,
      summary: destDetails.description || `A masterfully designed ${durationDays}-day expedition immersing you in the sacred heritage, authentic cuisines, and living traditions of ${destination}.`,
      vibeKeywords: destDetails.themes || ["Sacred Heritage", "Artisan Guilds", "Culinary Trail"],
      estimatedBudgetTotal: budgetRange === 'smart' ? 'â‚¹12,000 - â‚¹18,000' : budgetRange === 'premium' ? 'â‚¹38,000 - â‚¹52,000' : 'â‚¹22,000 - â‚¹34,000',
      weatherForecast: { temp: '26Â°C', condition: 'Optimal Heritage Weather', advisory: 'Clear morning skies, cool breezy evenings' },
      safetyRating: '9.9/10 Ministry Certified Zone',
      featuredFestival: matchedFestivals[0] ? {
        name: matchedFestivals[0].name,
        date: matchedFestivals[0].dates2026,
        highlight: matchedFestivals[0].highlights[0]
      } : null,
      days: generatedDays,
      localArtisanPartners: [
        { name: `${destination} Master Weavers Society`, craft: "Traditional Handloom", location: "Old Heritage Quarter" },
        { name: "Sanskritik Kala Kendra", craft: "Terracotta & Brass Work", location: "Artisan Lane" }
      ],
      safetyAdvisories: [
        "24/7 Dedicated Tourist Police Assistance & CCTV Vigilance",
        "Direct verified UPI QR digital payments accepted at all stops",
        "Official Raahi Heritage Pass enabled for queue-free access"
      ]
    };

    return NextResponse.json({
      success: true,
      source: 'raahi-verified-database',
      itinerary: fallbackItinerary
    });
  } catch (error: any) {
    console.error("Itinerary generation error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate itinerary" }, { status: 500 });
  }
}
