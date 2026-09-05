export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export type IndianState = (typeof INDIAN_STATES)[number];

// Popular destinations for fuzzy matching fallback
export const POPULAR_DESTINATIONS = [
  { name: "Varanasi", state: "Uttar Pradesh", aliases: ["banaras", "kashi", "benaras", "varnasi"] },
  { name: "Jaipur", state: "Rajasthan", aliases: ["pink city", "jeypore"] },
  { name: "Udaipur", state: "Rajasthan", aliases: ["city of lakes"] },
  { name: "Goa", state: "Goa", aliases: ["panaji", "north goa", "south goa"] },
  { name: "Manali", state: "Himachal Pradesh", aliases: ["kullu manali", "solang"] },
  { name: "Munnar", state: "Kerala", aliases: ["tea gardens"] },
  { name: "Rishikesh", state: "Uttarakhand", aliases: ["yoga capital", "haridwar"] },
  { name: "Leh Ladakh", state: "Ladakh", aliases: ["leh", "pangong", "nubra"] },
  { name: "Agra", state: "Uttar Pradesh", aliases: ["taj mahal city"] },
  { name: "Kolkata", state: "West Bengal", aliases: ["calcutta", "city of joy"] },
  { name: "Mumbai", state: "Maharashtra", aliases: ["bombay", "marine drive"] },
  { name: "Amritsar", state: "Punjab", aliases: ["golden temple city"] },
];

// Comprehensive destination data with activities, locations, and itinerary details
export const DESTINATION_DETAILS: Record<string, {
  activities: string[];
  morningSpots: string[];
  foodSpots: string[];
  landmarks: string[];
  themes: string[];
  timingSlots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
  description: string;
}> = {
  Varanasi: {
    activities: [
      "Sunrise Boat Ride at Assi Ghat",
      "Evening Ganga Aarti at Dashashwamedh Ghat",
      "Kashi Vishwanath Temple Corridor Walk",
      "Godowlia Street Food & Malaiyo Trail",
      "Bunkar Colony Handloom Silk Tour",
      "Sarnath Buddhist Stupas & Museum",
      "Ramnagar Fort & Museum Visit",
      "Bharat Mata Temple & Evening Walk",
    ],
    morningSpots: ["Assi Ghat", "Tulsi Ghat", "Dashashwamedh Ghat"],
    foodSpots: ["Blue Lassi Shop", "Kachori Gali", "Thandai Corner", "Buddha Cafe"],
    landmarks: ["Kashi Vishwanath Temple", "Sarnath Stupas", "Ramnagar Fort", "Ganga Ghats"],
    themes: ["Spiritual Awakening", "Cultural Heritage", "Food & Traditions", "Ancient Architecture"],
    timingSlots: {
      morning: ["06:00 Sunrise Boat", "08:30 Breakfast at Blue Lassi", "10:00 Temple Tour"],
      afternoon: ["13:30 Lunch at Thandai Corner", "15:30 Handloom Workshop"],
      evening: ["18:30 Evening Aarti", "20:30 Dinner at Godowlia"],
    },
    description: "The spiritual capital of India where the sacred Ganges meets ancient rituals and silk weaving traditions."
  },
  Jaipur: {
    activities: [
      "Amber Fort Heritage Morning Tour",
      "Hawa Mahal & Old City Street Bazaar",
      "Chokhi Dhani Cultural Dinner Experience",
      "Nahargarh Fort Sunset Viewpoint",
      "Jantar Mantar Astronomical Walk",
      "City Palace & Museum Exploration",
      "Gemstone & Jewelry Artisan Tour",
      "Traditional Rajasthani Block Printing Demo",
    ],
    morningSpots: ["Amber Fort", "Hawa Mahal", "City Palace"],
    foodSpots: ["LMB Restaurant", "Tapri Tea House", "Samode Haveli"],
    landmarks: ["Amer Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"],
    themes: ["Royal Architecture", "Cultural Heritage", "Artisan Crafts", "Desert Cuisine"],
    timingSlots: {
      morning: ["07:00 Amer Fort Tour", "09:30 Breakfast at LMB", "11:00 Hawa Mahal Visit"],
      afternoon: ["13:30 Lunch at Traditional Haveli", "15:00 Jewelry Workshop"],
      evening: ["18:00 Nahargarh Sunset", "20:00 Chokhi Dhani Dinner"],
    },
    description: "The Pink City of Rajasthan with majestic hill forts, bustling bazaars, and royal dining experiences."
  },
  Goa: {
    activities: [
      "Beach Hopping (Baga, Calangute, Anjuna)",
      "Fort Aguada Sunset Visit",
      "Portuguese Quarter Heritage Walk",
      "Spice Plantation Tour with Lunch",
      "Dolphin Spotting Cruise",
      "Local Fish Market & Cooking Demo",
      "Night Market & Live Music",
      "Water Sports & Scuba Diving",
    ],
    morningSpots: ["Baga Beach", "Fort Aguada", "Anjuna Flea Market"],
    foodSpots: ["Martin's Corner", "Vinayak Family Restaurant", "Fisherman's Wharf"],
    landmarks: ["Basilica of Bom Jesus", "Fort Aguada", "Dudhsagar Falls", "Anjuna Beach"],
    themes: ["Beach Relaxation", "Portuguese Heritage", "Water Sports", "Nightlife"],
    timingSlots: {
      morning: ["08:00 Beach Yoga", "10:00 Heritage Walk", "12:00 Spice Plantation"],
      afternoon: ["14:00 Seafood Lunch", "16:00 Dolphin Cruise"],
      evening: ["18:30 Sunset at Fort", "20:30 Night Market"],
    },
    description: "Tropical paradise with Portuguese heritage, pristine beaches, vibrant nightlife, and spicy seafood."
  },
  Leh: {
    activities: [
      "Pangong Tso Lake Visit",
      "Nubra Valley Desert Ride",
      "Thiksey Monastery Exploration",
      "Magnetic Hill & Sangam Confluence",
      "Khardung La Pass Adventure",
      "Local Apricot Orchard Visit",
      "Stargazing at Pangong",
      "Traditional Ladakhi Homestay",
    ],
    morningSpots: ["Thiksey Monastery", "Shey Palace", "Pangong Lake"],
    foodSpots: ["Gesmo Restaurant", "Tibetan Kitchen", "Alchi Kitchen"],
    landmarks: ["Pangong Lake", "Nubra Valley", "Magnetic Hill", "Thiksey Monastery"],
    themes: ["High-Altitude Adventure", "Buddhist Monasteries", "Desert Lakes", "Starry Nights"],
    timingSlots: {
      morning: ["07:00 Monastery Prayer", "09:30 Breakfast with Views", "11:00 Valley Drive"],
      afternoon: ["13:30 Traditional Lunch", "15:00 Lake Photography"],
      evening: ["18:00 Sunset at Lake", "20:00 Stargazing Session"],
    },
    description: "High-altitude wonderland with turquoise lakes, dramatic mountain passes, and ancient monasteries."
  },
  // Default fallback for unknown destinations
  default: {
    activities: [
      "Heritage Walking Tour",
      "Local Street Food Trail",
      "Sunset Viewpoint Visit",
      "Artisan & Craft Market",
      "Cultural Monument Tour",
      "Traditional Workshop",
      "Nature & Scenic Walk",
      "Evening Cultural Show",
    ],
    morningSpots: ["Main Square", "Heritage Zone", "Local Market"],
    foodSpots: ["Traditional Restaurant", "Street Food Alley", "Local Cafe"],
    landmarks: ["Main Monument", "Historic Site", "Scenic Spot"],
    themes: ["Cultural Discovery", "Local Cuisine", "Nature & Heritage", "Art & Crafts"],
    timingSlots: {
      morning: ["08:00 Heritage Walk", "10:00 Local Breakfast", "11:30 Monument Tour"],
      afternoon: ["13:30 Traditional Lunch", "15:00 Artisan Visit"],
      evening: ["18:00 Sunset Views", "20:00 Cultural Dinner"],
    },
    description: "Explore local culture, cuisine, and heritage with authentic experiences."
  }
};
