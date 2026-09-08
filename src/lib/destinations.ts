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
  { name: "Hampi", state: "Karnataka", aliases: ["vijayanagara", "hampi ruins"] },
  { name: "Mysuru", state: "Karnataka", aliases: ["mysore", "palace city"] },
  { name: "Pushkar", state: "Rajasthan", aliases: ["pushkar lake", "brahma temple"] },
];

export interface FestivalInfo {
  id: string;
  name: string;
  destination: string;
  state: string;
  month: string;
  season: string;
  dates2026: string;
  description: string;
  highlights: string[];
  ritualTimings: string;
  crowdLevel: "Moderate" | "High" | "Peak Cultural Surge";
  insiderTip: string;
  category: "Spiritual" | "Cultural" | "Music & Arts" | "Heritage" | "Harvest";
}

export const INDIAN_FESTIVALS: FestivalInfo[] = [
  {
    id: "dev-deepawali",
    name: "Dev Deepawali",
    destination: "Varanasi",
    state: "Uttar Pradesh",
    month: "November",
    season: "Winter",
    dates2026: "Nov 23 - Nov 25, 2026",
    description: "The Festival of Gods where 1 million+ earthen diyas illuminate all 84 ghats along the sacred Ganges on Kartik Purnima.",
    highlights: ["Maha Aarti at Dashashwamedh Ghat", "Illumination of 84 Ghats with 10L+ lamps", "Laser sound & light show at Chet Singh Ghat", "Boat processions on the Ganges"],
    ritualTimings: "Diyas lit at 17:30, Maha Aarti at 18:30",
    crowdLevel: "Peak Cultural Surge",
    insiderTip: "Reserve a licensed hand-rowed heritage wooden boat 3 weeks in advance through Raahi certified boatmen guild.",
    category: "Spiritual"
  },
  {
    id: "pushkar-camel-fair",
    name: "Pushkar Camel & Heritage Fair",
    destination: "Pushkar",
    state: "Rajasthan",
    month: "November",
    season: "Winter",
    dates2026: "Nov 18 - Nov 26, 2026",
    description: "One of the world's largest camel and livestock fairs featuring folk dances, desert glamping, and sacred lake dips.",
    highlights: ["Camel decoration contests & races", "Matka phod & longest mustache contests", "Desert hot air ballooning", "Sacred Brahma Temple holy dip"],
    ritualTimings: "Sunrise animal trading, Evening folk dance performances at Mela Ground",
    crowdLevel: "Peak Cultural Surge",
    insiderTip: "Stay in heritage luxury desert tent colonies on the northern dunes for quiet sunsets.",
    category: "Heritage"
  },
  {
    id: "durga-puja",
    name: "Durga Puja & Carnival",
    destination: "Kolkata",
    state: "West Bengal",
    month: "October",
    season: "Autumn",
    dates2026: "Oct 16 - Oct 21, 2026",
    description: "UNESCO Intangible Cultural Heritage extravaganza transforming the entire metropolis into an open-air art gallery.",
    highlights: ["Pandal hopping across 3000+ artistic theme installations", "Dhunuchi dance performances with traditional Dhak drums", "Sindoor Khela on Bijoya Dashami", "Red Road grand immersion carnival"],
    ritualTimings: "Sandhi Puja midnight rituals, Maha Saptami morning prayers",
    crowdLevel: "Peak Cultural Surge",
    insiderTip: "Use Raahi VIP digital tourist pass for queue-free access to major heritage pandals between 1 AM and 6 AM.",
    category: "Cultural"
  },
  {
    id: "hemis-festival",
    name: "Hemis Monastery Masked Festival",
    destination: "Leh Ladakh",
    state: "Ladakh",
    month: "July",
    season: "Summer",
    dates2026: "Jul 4 - Jul 6, 2026",
    description: "Vibrant Tibetan Buddhist cham masked dances celebrating the birth anniversary of Guru Padmasambhava in ancient courtyard.",
    highlights: ["Sacred Cham mask dances with cymbals and horns", "Display of giant 2-story silk Thangka", "Traditional Ladakhi brass & copper craft stalls", "Butter sculpture exhibitions"],
    ritualTimings: "Morning horn call at 09:00, dances continue until 16:30",
    crowdLevel: "High",
    insiderTip: "Arrive at Hemis courtyard before 08:30 AM to claim upper roof viewing seats with clear mountain backdrops.",
    category: "Spiritual"
  },
  {
    id: "hampi-utsav",
    name: "Hampi Vijaya Utsav",
    destination: "Hampi",
    state: "Karnataka",
    month: "November",
    season: "Winter",
    dates2026: "Nov 5 - Nov 8, 2026",
    description: "Spectacular state festival illuminating the UNESCO ruins of the Vijayanagara Empire with classical music, dance, and fireworks.",
    highlights: ["Illumination of Virupaksha Temple & Stone Chariot", "Carnatic classical maestros on open-air riverfront stages", "Jumbo Savari elephant procession", "Tungabhadra heritage coracle regatta"],
    ritualTimings: "Evening stage performances start 18:00 onwards",
    crowdLevel: "High",
    insiderTip: "Climb Matanga Hill before sunset to watch the ruins light up in gold across the entire valley.",
    category: "Music & Arts"
  },
  {
    id: "hornbill-festival",
    name: "Hornbill Festival",
    destination: "Kohima",
    state: "Nagaland",
    month: "December",
    season: "Winter",
    dates2026: "Dec 1 - Dec 10, 2026",
    description: "The Festival of Festivals gathering all 17 indigenous tribes of Nagaland at Kisama Heritage Village for war dances, music, and food.",
    highlights: ["Tribal Morung architecture & warrior chants", "Naga chilli eating championship", "Hornbill International Rock Contest", "Indigenous archery & traditional wrestling"],
    ritualTimings: "Tribal performances 10:00 - 15:30, Night carnival 17:00 onwards",
    crowdLevel: "High",
    insiderTip: "Taste bamboo shoot pork delicacies and organic Naga honey at the Angami and Ao Morungs.",
    category: "Cultural"
  },
  {
    id: "teej-jaipur",
    name: "Teej & Royal Procession",
    destination: "Jaipur",
    state: "Rajasthan",
    month: "August",
    season: "Monsoon",
    dates2026: "Aug 14 - Aug 16, 2026",
    description: "Celebration of monsoon arrival with royal palanquin processions of Goddess Parvati through the Pink City old bazaars.",
    highlights: ["Gold and silver palanquin procession from City Palace", "Kalbelia and Ghoomar folk dancers accompanying", "Traditional Ghewar sweet tasting", "Women in vibrant leheriya attire"],
    ritualTimings: "Procession leaves City Palace Hindoli Darwaza at 16:30",
    crowdLevel: "High",
    insiderTip: "Pre-book rooftop seats along Tripoliya Bazaar through Raahi vendor partners for unobstructed photography.",
    category: "Cultural"
  },
  {
    id: "rann-utsav",
    name: "Rann Utsav & White Desert Carnival",
    destination: "Kutch",
    state: "Gujarat",
    month: "December",
    season: "Winter",
    dates2026: "Nov 15, 2026 - Feb 25, 2027",
    description: "Breathtaking festival on the world's largest salt marsh under full moon night skies with Kutchi handicraft guilds.",
    highlights: ["Full moon moonlight camel cart walks across salt desert", "Rogan art & Kutchi mirror embroidery workshops", "Sufi and Gujarati folk musicians around desert campfires", "Paramotoring over the white expanse"],
    ritualTimings: "Full moon desert excursions 20:00 - 23:00",
    crowdLevel: "Moderate",
    insiderTip: "Target dates overlapping the Shukla Paksha full moon for magical bioluminescent-like crystal reflections.",
    category: "Heritage"
  },
  {
    id: "mysuru-dasara",
    name: "Mysuru Dasara & Jumbo Savari",
    destination: "Mysuru",
    state: "Karnataka",
    month: "October",
    season: "Autumn",
    dates2026: "Oct 12 - Oct 21, 2026",
    description: "Royal 400-year-old state festival where Mysore Palace is illuminated with 100,000 light bulbs and decorated elephants carry the golden howdah.",
    highlights: ["Mysore Palace illumination nightly", "Jumbo Savari grand elephant parade", "Torchlight parade at Bannimantap Ground", "Traditional wrestling (Kusti) tournaments"],
    ritualTimings: "Palace illumination at 19:00, Jumbo Savari on Vijayadashami at 14:30",
    crowdLevel: "Peak Cultural Surge",
    insiderTip: "Book gold pass seats along the palace courtyard route to see the 750kg golden idol up close.",
    category: "Heritage"
  }
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
  coordinates: { lat: number; lng: number };
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
    description: "The spiritual capital of India where the sacred Ganges meets ancient rituals and silk weaving traditions.",
    coordinates: { lat: 25.3176, lng: 82.9739 }
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
    description: "The Pink City of Rajasthan with majestic hill forts, bustling bazaars, and royal dining experiences.",
    coordinates: { lat: 26.9124, lng: 75.7873 }
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
    description: "Tropical paradise with Portuguese heritage, pristine beaches, vibrant nightlife, and spicy seafood.",
    coordinates: { lat: 15.2993, lng: 74.124 }
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
    description: "High-altitude wonderland with turquoise lakes, dramatic mountain passes, and ancient monasteries.",
    coordinates: { lat: 34.1526, lng: 77.577 }
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
    description: "High-altitude wonderland with turquoise lakes, dramatic mountain passes, and ancient monasteries.",
    coordinates: { lat: 34.1526, lng: 77.577 }
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
    description: "The city of dreams with Bollywood glamour, colonial heritage, vibrant street food, and iconic coastal views.",
    coordinates: { lat: 19.076, lng: 72.8777 }
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
    description: "India's capital blending Mughal grandeur, colonial elegance, political power, and chaotic street energy.",
    coordinates: { lat: 28.6139, lng: 77.209 }
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
    description: "Spiritual heart of Sikhism with the radiant Golden Temple, Wagah patriotism, and legendary Punjabi hospitality.",
    coordinates: { lat: 31.634, lng: 74.8723 }
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
    description: "Home to the iconic Taj Mahal, Mughal architectural splendor, and centuries-old marble inlay craftsmanship.",
    coordinates: { lat: 27.1767, lng: 78.0081 }
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
    description: "City of joy with colonial architecture, intellectual legacy, artistic soul, and irresistible Bengali sweets.",
    coordinates: { lat: 22.5726, lng: 88.3639 }
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
    description: "Explore local culture, cuisine, and heritage with authentic experiences.",
    coordinates: { lat: 20.5937, lng: 78.9629 }
  }
};
