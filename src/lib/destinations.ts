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
  "Varanasi": {
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
  "Jaipur": {
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
  "Goa": {
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
  "Leh Ladakh": {
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
  "Leh": {
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
  "Mumbai": {
    activities: [
      "Gateway of India & Colaba Causeway",
      "Marine Drive Sunset Walk",
      "Dharavi Artisan & Social Enterprise Tour",
      "Elephanta Caves Ferry & UNESCO Site",
      "Bollywood Studio Tour",
      "Street Food Trail (Chowpatty, Mohammad Ali Road)",
      "Dhobi Ghat & Local Markets",
      "Kanheri Caves & Sanjay Gandhi National Park",
    ],
    morningSpots: ["Gateway of India", "Colaba Fort", "Marine Drive"],
    foodSpots: ["Leopold Cafe", "Britannia & Co", "Swati Snacks", "Bademiya"],
    landmarks: ["Gateway of India", "Elephanta Caves", "Chhatrapati Shivaji Terminus", "Marine Drive"],
    themes: ["Urban Energy", "Bollywood Glamour", "Colonial Architecture", "Street Food Heaven"],
    timingSlots: {
      morning: ["07:00 Gateway Sunrise", "09:00 Ferry to Elephanta", "11:30 Colaba Markets"],
      afternoon: ["13:30 Lunch at Leopold", "15:00 Dhobi Ghat Visit"],
      evening: ["18:00 Marine Drive Sunset", "20:30 Mohammad Ali Food Trail"],
    },
    description: "The city of dreams with Bollywood glamour, colonial heritage, vibrant street food, and iconic coastal views."
  },
  "Delhi": {
    activities: [
      "Red Fort & Chandni Chowk Heritage Walk",
      "India Gate & Parliament Drive",
      "Humayun's Tomb & Lodhi Gardens",
      "Qutub Minar UNESCO Site",
      "Jama Masjid & Old Delhi Food Trail",
      "Lotus Temple & Akshardham Evening Show",
      "Hauz Khas Village Art & Cafes",
      "Dilli Haat Artisan Market",
    ],
    morningSpots: ["Red Fort", "India Gate", "Lotus Temple"],
    foodSpots: ["Karim's", "Paranthe Wali Gali", "Kuremal Mohan Lal", "Saravana Bhavan"],
    landmarks: ["Red Fort", "Qutub Minar", "India Gate", "Humayun's Tomb"],
    themes: ["Historic Capital", "Mughal Architecture", "Street Food Paradise", "Modern Meets Ancient"],
    timingSlots: {
      morning: ["07:00 Red Fort Tour", "09:30 Chandni Chowk Breakfast", "11:00 Qutub Minar"],
      afternoon: ["13:30 Lunch at Karim's", "15:00 Lodhi Gardens Walk"],
      evening: ["18:00 India Gate Visit", "20:00 Akshardham Show"],
    },
    description: "India's capital blending Mughal grandeur, colonial elegance, political power, and chaotic street energy."
  },
  "Amritsar": {
    activities: [
      "Golden Temple Dawn Prayer & Langar",
      "Jallianwala Bagh Memorial Visit",
      "Wagah Border Ceremony (Evening)",
      "Partition Museum Historical Tour",
      "Heritage Walking Tour of Old Amritsar",
      "Kulcha & Lassi Food Trail",
      "Gobindgarh Fort Light & Sound Show",
      "Ram Bagh Garden & Summer Palace",
    ],
    morningSpots: ["Golden Temple", "Jallianwala Bagh", "Ram Bagh"],
    foodSpots: ["Kesar Da Dhaba", "Brother's Dhaba", "Kulcha Land", "Gurdas Ram Jalebi Wale"],
    landmarks: ["Golden Temple", "Wagah Border", "Jallianwala Bagh", "Partition Museum"],
    themes: ["Sikh Heritage", "Spiritual Serenity", "Partition History", "Punjabi Cuisine"],
    timingSlots: {
      morning: ["05:00 Golden Temple Morning Prayer", "08:00 Langar Breakfast", "10:00 Museum Visit"],
      afternoon: ["13:00 Kulcha Lunch", "15:00 Heritage Walk"],
      evening: ["16:30 Wagah Border Ceremony", "20:00 Gobindgarh Fort Show"],
    },
    description: "Spiritual heart of Sikhism with the radiant Golden Temple, Wagah patriotism, and legendary Punjabi hospitality."
  },
  "Agra": {
    activities: [
      "Taj Mahal Sunrise Visit",
      "Agra Fort Heritage Tour",
      "Mehtab Bagh Sunset Taj View",
      "Fatehpur Sikri Day Trip",
      "Mughal Cuisine Food Trail",
      "Marble Inlay Artisan Workshop",
      "Itimad-ud-Daulah (Baby Taj) Visit",
      "Kinari Bazaar Shopping",
    ],
    morningSpots: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
    foodSpots: ["Pinch of Spice", "Joney's Place", "Deviram Sweets", "Shankara Vegis"],
    landmarks: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Itimad-ud-Daulah"],
    themes: ["Eternal Love Monument", "Mughal Grandeur", "Marble Artistry", "Royal Heritage"],
    timingSlots: {
      morning: ["05:30 Taj Sunrise Entry", "08:30 Breakfast", "10:00 Agra Fort Tour"],
      afternoon: ["13:30 Mughal Lunch", "15:00 Marble Workshop"],
      evening: ["17:30 Mehtab Bagh Sunset", "20:00 Kinari Bazaar Walk"],
    },
    description: "Home to the iconic Taj Mahal, Mughal architectural splendor, and centuries-old marble inlay craftsmanship."
  },
  "Kolkata": {
    activities: [
      "Victoria Memorial & Maidan Walk",
      "Howrah Bridge & Flower Market Dawn Visit",
      "Durga Puja Pandal Hopping (Seasonal)",
      "College Street Book Market",
      "Park Street Food & Cafe Culture",
      "Kalighat Temple & Bengali Thali",
      "Kumartuli Potter's Quarter Tour",
      "Prinsep Ghat Sunset Boat Ride",
    ],
    morningSpots: ["Victoria Memorial", "Howrah Bridge", "Prinsep Ghat"],
    foodSpots: ["Flurys", "Peter Cat", "Bhojohori Manna", "Arsalan"],
    landmarks: ["Victoria Memorial", "Howrah Bridge", "Kalighat Temple", "Indian Museum"],
    themes: ["Cultural Capital", "Colonial Grandeur", "Literary Heritage", "Bengali Cuisine"],
    timingSlots: {
      morning: ["06:00 Flower Market Visit", "08:30 Breakfast at Flurys", "10:00 Victoria Memorial"],
      afternoon: ["13:30 Bengali Thali Lunch", "15:00 College Street Walk"],
      evening: ["18:00 Prinsep Ghat Sunset", "20:00 Park Street Dinner"],
    },
    description: "City of joy with colonial architecture, intellectual legacy, artistic soul, and irresistible Bengali sweets."
  },
  // Default fallback for unknown destinations
  "default": {
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
