export interface LocalizedStay {
  id: string;
  name: string;
  category: "Heritage Haveli" | "Boutique Palace" | "Eco Retreat" | "Luxury Hotel" | "Riverside Homestay";
  address: string;
  rating: number;
  userRatingCount: number;
  contactNumber: string;
  websiteUri?: string;
  googleMapsUri: string;
  tagline: string;
  highlights: string[];
}

export interface CityCustomizationData {
  crafts: string[];
  culinary: string[];
  activities: string[];
  recommendedStays: LocalizedStay[];
}

export const CITY_CUSTOMIZATIONS: Record<string, CityCustomizationData> = {
  "Varanasi": {
    crafts: [
      "Banarasi Zardozi & Katan Silk Handloom Guilds",
      "Gulabi Meenakari (Pink Enamelling on Silver)",
      "Traditional Wooden Lacquerware & Toy Guilds",
      "Handcrafted Brass & Bell Metal Workshops",
      "Rare Miniature Heritage Canvas Painting",
      "Traditional Botanical Attar & Essential Oils",
    ],
    culinary: [
      "Historic Street Food Legends (Kashi Chaat & Tamatar Chaat)",
      "Traditional Malaiyo & Pomegranate Malai Lassi Trails",
      "Strict Satvik Thali & Ancient Temple Bhog",
      "Generational Banarasi Paan Artisans",
      "Morning Kachori-Jalebi & Matka Chai Circles",
    ],
    activities: [
      "Private Dawn Rowed Boat Procession along 84 Ghats",
      "Offbeat Kabir Chaura & Old Lane Mystic Walk",
      "VIP Reserved Evening Maha Aarti Pavilion Slot",
      "Master Artisan Silk Loom Interactive Workshop",
      "Chet Singh Fort Ghat Balcony Golden Hour View",
      "Sarnath Archaeological Sanctuary & Ancient Stupa Tour",
    ],
    recommendedStays: [
      {
        id: "brijrama-palace",
        name: "BrijRama Palace - A Heritage Hotel",
        category: "Boutique Palace",
        address: "Darbhanga Ghat, Dashashwamedh, Varanasi, UP 221001",
        rating: 4.8,
        userRatingCount: 3120,
        contactNumber: "+91 542 245 4222",
        googleMapsUri: "https://maps.google.com/?q=BrijRama+Palace+Varanasi",
        tagline: "210-year-old palace on Darbhanga Ghat accessible via private river boat",
        highlights: ["Ghat Frontage", "Heritage Architecture", "Live Classical Music", "Vegetarian Fine Dining"]
      },
      {
        id: "taj-ganges",
        name: "Taj Ganges, Varanasi",
        category: "Luxury Hotel",
        address: "Nadesar Palace Grounds, Raja Bazar Road, Varanasi, UP 221002",
        rating: 4.7,
        userRatingCount: 4890,
        contactNumber: "+91 542 666 0001",
        googleMapsUri: "https://maps.google.com/?q=Taj+Ganges+Varanasi",
        tagline: "Serene 12-acre verdant oasis in the historic Cantonment",
        highlights: ["Lush Gardens", "Swimming Pool", "Jiva Spa", "Award-Winning Restaurants"]
      },
      {
        id: "amritara-suryauday",
        name: "Suryauday Haveli by Amritara",
        category: "Heritage Haveli",
        address: "Shivala Ghat, Varanasi, Uttar Pradesh 221001",
        rating: 4.6,
        userRatingCount: 1640,
        contactNumber: "+91 11 4075 2200",
        googleMapsUri: "https://maps.google.com/?q=Suryauday+Haveli+Varanasi",
        tagline: "Exquisitely restored early 20th-century mansion directly on Shivala Ghat",
        highlights: ["Rooftop Ganga Views", "Direct Ghat Access", "Sunrise Yoga", "Satvik Cuisine"]
      },
      {
        id: "taj-nadesar-palace",
        name: "Taj Nadesar Palace",
        category: "Boutique Palace",
        address: "Nadesar Palace Grounds, Varanasi, UP 221002",
        rating: 4.9,
        userRatingCount: 820,
        contactNumber: "+91 542 666 0001",
        googleMapsUri: "https://maps.google.com/?q=Taj+Nadesar+Palace+Varanasi",
        tagline: "Royal sanctuary of the Maharaja of Benares surrounded by orchards",
        highlights: ["Horse Carriage Ride", "Butler Service", "Royal Heritage Suites", "Peacock Gardens"]
      }
    ]
  },
  "Jaipur": {
    crafts: [
      "Sanganeri & Bagru Botanical Hand-Block Printing",
      "Jaipur Blue Pottery Master Workshops",
      "Meenakari & Kundan Generational Jewelry",
      "Traditional Lac Bangle Making Guilds",
      "Handcrafted Mojari Leather Footwear",
      "Carved Sandstone & Marble Filigree Studios",
    ],
    culinary: [
      "Authentic Royal Rajasthani Thali (Dal Baati Churma)",
      "Iconic 70-Year Pyaaz Kachori & Saffron Ghewar Trails",
      "Masala Chai with Whole Spices at Tapri Central",
      "Royal Rajput Game-Style Smoked Curries (Laal Maas)",
      "Traditional Kulfi Falooda & Rabdi at Bapu Bazaar",
    ],
    activities: [
      "Private Early Morning Amer Fort Elephant Path Walk",
      "Hawa Mahal Rooftop Jharokha Framing at Sunrise",
      "Jantar Mantar Astronomical Sun-Dial Private Session",
      "Nahargarh Ramparts Sunset Panorama over Pink City",
      "Panna Meena Ka Kund Geometric Stepwell Photography",
      "City Palace Royal Enclosure & Chandra Mahal Access",
    ],
    recommendedStays: [
      {
        id: "rambagh-palace",
        name: "Rambagh Palace, Jaipur",
        category: "Boutique Palace",
        address: "Bhawani Singh Road, Jaipur, Rajasthan 302005",
        rating: 4.9,
        userRatingCount: 6540,
        contactNumber: "+91 141 238 5700",
        googleMapsUri: "https://maps.google.com/?q=Rambagh+Palace+Jaipur",
        tagline: "Former residence of the Maharaja of Jaipur, ranked among world's top heritage hotels",
        highlights: ["Royal Gardens", "Polo Lounge", "Peacock Courtyard", "Heritage Grandeur"]
      },
      {
        id: "samode-haveli",
        name: "Samode Haveli",
        category: "Heritage Haveli",
        address: "Ganga Pol, Near Jorawar Singh Gate, Jaipur, Rajasthan 302002",
        rating: 4.7,
        userRatingCount: 2190,
        contactNumber: "+91 141 263 2407",
        googleMapsUri: "https://maps.google.com/?q=Samode+Haveli+Jaipur",
        tagline: "175-year-old royal townhouse with painted frescoes inside the old walled city",
        highlights: ["Historic Frescoes", "Moorish Pool", "Courtyard Dining", "Old City Location"]
      },
      {
        id: "narain-niwas",
        name: "Hotel Narain Niwas Palace",
        category: "Heritage Haveli",
        address: "Kanota Bagh, Narayan Singh Circle, Jaipur, Rajasthan 302004",
        rating: 4.6,
        userRatingCount: 3410,
        contactNumber: "+91 141 256 1291",
        googleMapsUri: "https://maps.google.com/?q=Narain+Niwas+Palace+Jaipur",
        tagline: "Anglo-Indian palace built in 1928, home to boutique concept stores and Bar Palladio",
        highlights: ["Bar Palladio", "Peacock Grounds", "Vintage Architecture", "Boutique Shopping"]
      },
      {
        id: "jai-mahal-palace",
        name: "Jai Mahal Palace, Jaipur",
        category: "Boutique Palace",
        address: "Jacob Road, Civil Lines, Jaipur, Rajasthan 302006",
        rating: 4.8,
        userRatingCount: 4120,
        contactNumber: "+91 141 660 1111",
        googleMapsUri: "https://maps.google.com/?q=Jai+Mahal+Palace+Jaipur",
        tagline: "Stunning 1745 AD Indo-Saracenic masterpiece set in 18 acres of Mughal gardens",
        highlights: ["Mughal Gardens", "Royal Dining", "Life-Size Chess", "Spa by the Pool"]
      }
    ]
  },
  "Delhi": {
    crafts: [
      "Old Delhi Zardozi & Resham Embroidery Guilds",
      "Traditional Mughal Calligraphy & Hand-Marbled Paper",
      "Generational Attar & Ittar Distillation in Chandni Chowk",
      "Carved Bone, Horn & Teakwood Inlay Guilds",
      "Heritage Persian Carpet & Dari Weaving Guilds",
      "Vintage Miniature Painting & Islamic Geometric Art",
    ],
    culinary: [
      "100-Year Chandni Chowk Paranthe Wali Gali & Matar Kulcha",
      "Authentic Old Delhi Slow-Cooked Nihari & Haleem",
      "Royal Mughlai Kebabs at Jama Masjid Quarters",
      "Winter Daulat Ki Chaat (Frothy Milk Foam Infusion)",
      "Iconic Daryaganj Butter Chicken & Tandoori Originals",
    ],
    activities: [
      "Humayun's Tomb Mughal Garden Architecture Walk",
      "Early Morning Jama Masjid Courtyard & Minaret Ascent",
      "Old Delhi Heritage Cycle Rickshaw Spice Bazaar Circuit",
      "Qutub Minar Complex Inscribed Iron Pillar Deep History",
      "Lodhi Art District Open-Air Street Mural Exploration",
      "Sunder Nursery Restored 16th-Century Heritage Gardens",
    ],
    recommendedStays: [
      {
        id: "the-imperial-delhi",
        name: "The Imperial New Delhi",
        category: "Luxury Hotel",
        address: "Janpath, Connaught Place, New Delhi 110001",
        rating: 4.8,
        userRatingCount: 5670,
        contactNumber: "+91 11 2334 1234",
        googleMapsUri: "https://maps.google.com/?q=The+Imperial+New+Delhi",
        tagline: "Legendary 1930s Art Deco museum hotel with South Asia's largest private British art collection",
        highlights: ["Museum Art Collection", "1911 Bar", "Imperial Spa", "Prime Lutyens Location"]
      },
      {
        id: "haveli-dharampura",
        name: "Haveli Dharampura - UNESCO Awarded",
        category: "Heritage Haveli",
        address: "2293, Gali Guliyan, Dharampura, Chandni Chowk, Delhi 110006",
        rating: 4.6,
        userRatingCount: 2310,
        contactNumber: "+91 11 4909 1777",
        googleMapsUri: "https://maps.google.com/?q=Haveli+Dharampura+Old+Delhi",
        tagline: "UNESCO-awarded 19th-century Mughal haveli restored in the heart of Old Delhi",
        highlights: ["Kathak Dance Evenings", "Rooftop Jama Masjid View", "Mughal Dining", "Heritage Architecture"]
      },
      {
        id: "the-leela-palace-delhi",
        name: "The Leela Palace New Delhi",
        category: "Luxury Hotel",
        address: "Diplomatic Enclave, Chanakyapuri, New Delhi 110023",
        rating: 4.9,
        userRatingCount: 4890,
        contactNumber: "+91 11 3933 1234",
        googleMapsUri: "https://maps.google.com/?q=The+Leela+Palace+New+Delhi",
        tagline: "Grand palace hotel blending Lutyens architecture with royal Indian heritage",
        highlights: ["Rooftop Infinity Pool", "MEGU Japanese & Le Cirque", "Lavish Royal Suites", "Diplomatic Enclave"]
      },
      {
        id: "taj-mahal-hotel-delhi",
        name: "Taj Mahal Hotel, New Delhi",
        category: "Luxury Hotel",
        address: "Number One Mansingh Road, New Delhi 110011",
        rating: 4.7,
        userRatingCount: 4210,
        contactNumber: "+91 11 6656 6162",
        googleMapsUri: "https://maps.google.com/?q=Taj+Mahal+Hotel+Mansingh+Road+Delhi",
        tagline: "Iconic address of statesmen and cultural luminaries at No. 1 Mansingh Road",
        highlights: ["Machan Coffee House", "House of Ming", "Central Lutyens Delhi", "Timeless Hospitality"]
      }
    ]
  },
  "Mumbai": {
    crafts: [
      "Koli Fisherfolk Hand-Knotted Net & Shell Craft",
      "Dharavi Leather & Recycled Pottery Guilds",
      "Vintage Bollywood Hand-Painted Cinema Billboard Art",
      "Parsi Embroidered Gara Silk Work",
      "Maharashtrian Paithani Silk Handloom Weaving",
      "Traditional Brass Lamp & Dabba Metal Artisans",
    ],
    culinary: [
      "Generational Irani Chai & Bun Maska at Britannia & Co",
      "Historic Coastal Malvani & Mangalorean Seafood Feast",
      "Girgaon Chowpatty & Juhu Beach Bhelpuri & Sevpuri",
      "Midnight Bohri Mohalla Seekh Kebab & Malpua Trail",
      "Iconic South Mumbai Vada Pav & Misal Pav Legends",
    ],
    activities: [
      "Gateway of India to Elephanta UNESCO Rock-Cut Caves Ferry",
      "Heritage Art Deco & Victorian Gothic Walking Circuit",
      "Marine Drive 'Queen's Necklace' Golden Hour Stroll",
      "Kala Ghoda Art Galleries & Heritage Precinct Tour",
      "Early Morning Sassoon Docks Fishing Fleet Awakening",
      "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya Museum Tour",
    ],
    recommendedStays: [
      {
        id: "taj-mahal-palace-mumbai",
        name: "The Taj Mahal Palace, Mumbai",
        category: "Boutique Palace",
        address: "Apollo Bunder, Colaba, Mumbai, Maharashtra 400001",
        rating: 4.9,
        userRatingCount: 14200,
        contactNumber: "+91 22 6665 3366",
        googleMapsUri: "https://maps.google.com/?q=The+Taj+Mahal+Palace+Mumbai",
        tagline: "Legendary 1903 harbour landmark facing the Gateway of India and Arabian Sea",
        highlights: ["Gateway of India Views", "Harbour Grandeur", "Sea Lounge Afternoon High Tea", "Wasabi by Morimoto"]
      },
      {
        id: "the-oberoi-mumbai",
        name: "The Oberoi, Mumbai",
        category: "Luxury Hotel",
        address: "Nariman Point, Marine Drive, Mumbai, Maharashtra 400021",
        rating: 4.8,
        userRatingCount: 6800,
        contactNumber: "+91 22 6632 5757",
        googleMapsUri: "https://maps.google.com/?q=The+Oberoi+Mumbai+Marine+Drive",
        tagline: "Ultra-modern luxury with sweeping panoramic views of the Queen's Necklace",
        highlights: ["Marine Drive Views", "Ziya Contemporary Indian", "Oceanview Pool", "24hr Personal Butler"]
      },
      {
        id: "soho-house-mumbai",
        name: "Soho House Mumbai",
        category: "Boutique Palace",
        address: "16 Juhu Tara Rd, Santa Cruz West, Mumbai, Maharashtra 400049",
        rating: 4.7,
        userRatingCount: 1980,
        contactNumber: "+91 22 6210 7000",
        googleMapsUri: "https://maps.google.com/?q=Soho+House+Mumbai",
        tagline: "Creative beachfront townhouse adorned with indigenous Indian textiles and art",
        highlights: ["Juhu Beachfront", "Rooftop Pool", "Artisanal Interiors", "Screening Room"]
      },
      {
        id: "abode-bombay",
        name: "Abode Bombay Boutique Hotel",
        category: "Boutique Palace",
        address: "First Floor, Lansdowne House, MB Marg, Colaba, Mumbai 400001",
        rating: 4.6,
        userRatingCount: 1120,
        contactNumber: "+91 80802 34066",
        googleMapsUri: "https://maps.google.com/?q=Abode+Bombay+Colaba",
        tagline: "Mumbai's first luxury boutique hotel with reclaimed vintage Art Deco furnishings",
        highlights: ["Vintage Art Deco Decor", "Colaba Walkability", "Locally Sourced Breakfast", "Eco-Conscious"]
      }
    ]
  },
  "Hampi": {
    crafts: [
      "Sandur Lambani Tribal Mirrorwork & Embroidery Guild",
      "Vijayanagara Granite Stone Carving Guilds",
      "Traditional Handcrafted Banana Fiber Weaving",
      "Handcrafted Terracotta Pottery & Brick Sculptures",
      "Generational Brass Temple Bell Founders",
      "Anegundi Bamboo Basketry & Natural Fiber Crafts",
    ],
    culinary: [
      "Authentic South Indian Banana Leaf Thali with Ghee Podi",
      "Freshly Brewed Mysore Filter Kaapi with Steamed Idlis",
      "Tungabhadra River Fresh Fish Fry & Curry",
      "Traditional Jowar Roti with Yennegai (Stuffed Brinjal)",
      "Traditional Mysore Pak & Organic Palm Jaggery Sweets",
    ],
    activities: [
      "Matanga Hill Sunrise 360° Boulder Horizon Panorama",
      "Vittala Temple Stone Chariot & Musical Pillars Tour",
      "Ancient Coracle Boat Crossing on Tungabhadra River",
      "Achutaraya Temple & Courtesan Street Secluded Exploration",
      "Sunset over Hemakuta Hill Monolithic Ganesha Temples",
      "Anegundi Ancient Monkey Kingdom Heritage Walk",
    ],
    recommendedStays: [
      {
        id: "evolve-back-kamalapura",
        name: "Evolve Back, Kamalapura Palace, Hampi",
        category: "Boutique Palace",
        address: "Kamalapura, Hampi, Bellary District, Karnataka 583221",
        rating: 4.9,
        userRatingCount: 2890,
        contactNumber: "+91 80 4055 4055",
        googleMapsUri: "https://maps.google.com/?q=Evolve+Back+Kamalapura+Palace+Hampi",
        tagline: "Fortified palace inspired by 14th-century Vijayanagara imperial architecture",
        highlights: ["Vijayanagara Architecture", "Private Jacuzzis & Pools", "Ayurvedic Spa", "History Experts"]
      },
      {
        id: "heritage-resort-hampi",
        name: "Heritage Resort Hampi",
        category: "Eco Retreat",
        address: "Hosamalapanagudi, Hampi Road, Hospet, Karnataka 583201",
        rating: 4.6,
        userRatingCount: 1840,
        contactNumber: "+91 83942 41177",
        googleMapsUri: "https://maps.google.com/?q=Heritage+Resort+Hampi",
        tagline: "Eco-friendly retreat enveloped by 9 acres of mango and coconut groves",
        highlights: ["Organic Farm", "Ayurvedic Treatments", "Swimming Pool", "Bird Watching"]
      },
      {
        id: "kstdc-mayura-bhuvaneshwari",
        name: "KSTDC Hotel Mayura Bhuvaneshwari",
        category: "Heritage Haveli",
        address: "Kamalapur, Near Archeological Museum, Hampi 583221",
        rating: 4.2,
        userRatingCount: 2150,
        contactNumber: "+91 83942 41574",
        googleMapsUri: "https://maps.google.com/?q=Hotel+Mayura+Bhuvaneshwari+Hampi",
        tagline: "Prime location inside the historic zone within walking distance of ruins",
        highlights: ["Direct Monument Proximity", "Spacious Grounds", "Authentic Local Dining", "Official Tourism Lodge"]
      },
      {
        id: "hampi-boulders-resort",
        name: "Hampi's Boulders Resort",
        category: "Eco Retreat",
        address: "Near Bandi Harlapur, Tungabhadra River Bank, Hampi 583234",
        rating: 4.5,
        userRatingCount: 1220,
        contactNumber: "+91 83942 94000",
        googleMapsUri: "https://maps.google.com/?q=Hampis+Boulders+Resort",
        tagline: "Organic stone cottages integrated naturally into prehistoric granite boulder fields",
        highlights: ["Riverfront Rock Pools", "Natural Granite Landscape", "Organic Dining", "Bird Sanctuary"]
      }
    ]
  },
  "Udaipur": {
    crafts: [
      "Traditional Pichwai Sacred Temple Canvas Painting",
      "Miniature Mewar Court Painting on Marble & Silk",
      "Silver Enamelling & Tribal Jewelry Guilds",
      "Handcrafted Wooden Puppet Guilds (Kathputli)",
      "Traditional Mojari Leather Footwear with Silk Thread",
      "Bone Inlay & Teakwood Palace Furniture Workshops",
    ],
    culinary: [
      "Royal Mewari Thali with Gatta Curry & Ker Sangri",
      "Lake Pichola Sunset Dining with Dal Baati & Churma",
      "Historic 80-Year Mirchi Bada & Pyaaz Kachori Stalls",
      "Traditional Kulhad Rabdi & Mawa Kachori at Jagdish Chowk",
      "Royal Rajasthani Junglee Maas in Heritage Courtyard",
    ],
    activities: [
      "Private Dawn Boat Cruise around Jag Mandir Island Palace",
      "City Palace Complex & Crystal Gallery Curator Tour",
      "Bagore Ki Haveli Dharohar Evening Folk Dance & Puppet Show",
      "Monsoon Palace (Sajjangarh) Hilltop Sunset Panorama",
      "Saheliyon Ki Bari Royal Marble Fountains & Lotus Pools",
      "Ahar Royal Cenotaphs Archaeological Heritage Walk",
    ],
    recommendedStays: [
      {
        id: "taj-lake-palace-udaipur",
        name: "Taj Lake Palace, Udaipur",
        category: "Boutique Palace",
        address: "Pichola, Udaipur, Rajasthan 313001",
        rating: 4.9,
        userRatingCount: 8900,
        contactNumber: "+91 294 246 0101",
        googleMapsUri: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur",
        tagline: "Floating white marble palace built in 1746 in the middle of Lake Pichola",
        highlights: ["Island Lake Setting", "Private Boat Arrival", "Jharokha Dining", "Royal Butler Service"]
      },
      {
        id: "the-oberoi-udaivilas",
        name: "The Oberoi Udaivilas, Udaipur",
        category: "Luxury Hotel",
        address: "Badi-Gorela-Mulla Talai Rd, Haridas Ji Ki Magri, Udaipur 313001",
        rating: 4.9,
        userRatingCount: 9400,
        contactNumber: "+91 294 243 3300",
        googleMapsUri: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur",
        tagline: "Spectacular 50-acre palace estate with semi-private moated pools overlooking Lake Pichola",
        highlights: ["Moated Pool Access", "Peacock Gardens", "Lakefront Pavilions", "Mewar Architecture"]
      },
      {
        id: "fateh-prakash-palace",
        name: "Fateh Prakash Palace - Grand Heritage",
        category: "Boutique Palace",
        address: "The City Palace Complex, Udaipur, Rajasthan 313001",
        rating: 4.7,
        userRatingCount: 2750,
        contactNumber: "+91 294 252 8016",
        googleMapsUri: "https://maps.google.com/?q=Fateh+Prakash+Palace+Udaipur",
        tagline: "Directly inside the royal City Palace complex on the eastern shores of Lake Pichola",
        highlights: ["Inside City Palace", "Sunset Terrace Restaurant", "Crystal Gallery", "Royal Suite Antiques"]
      },
      {
        id: "jagat-niwas-palace",
        name: "Jagat Niwas Palace Hotel",
        category: "Heritage Haveli",
        address: "23-25, Lal Ghat, Behind Jagdish Temple, Udaipur 313001",
        rating: 4.6,
        userRatingCount: 3200,
        contactNumber: "+91 294 242 0133",
        googleMapsUri: "https://maps.google.com/?q=Jagat+Niwas+Palace+Udaipur",
        tagline: "Charming 17th-century haveli with jharokhas cantilevering directly over Lake Pichola",
        highlights: ["Jharokha Lake Seating", "Old City Location", "Candlelight Dining", "Rooftop Views"]
      }
    ]
  },
  "Kolkata": {
    crafts: [
      "Traditional Terracotta Bankura Horse & Pottery Guilds",
      "Jamdani & Baluchari Heritage Handloom Silk Weaving",
      "Dokra Metal Casting & Lost-Wax Bell Metal Crafts",
      "Kalighat Folk Watercolor Canvas Painting",
      "Handcrafted Sholapith (Pith Craft) Artisans",
      "Generational Clay Idol Sculptors of Kumartuli",
    ],
    culinary: [
      "Iconic 90-Year Puchka & Jhalmuri Street Food Trail",
      "Traditional Bengali Zamindari Bhoj with Shorshe Ilish & Kosha Mangsho",
      "Historic 130-Year Mishti Doi, Sandesh & Rasgulla at KC Das & Nobin Chandra",
      "Park Street Legendary British-Era Tearooms (Flurys)",
      "Kolkata Kathi Rolls at Nizam's & Kusum",
    ],
    activities: [
      "Early Morning Flower Market & Howrah Bridge Silhouette Walk",
      "Kumartuli Clay Idol Sculptor Enclave Immersion",
      "Victoria Memorial Marble Pavilions & Curated Archives",
      "Historic Kolkata Heritage Tram Ride through College Street",
      "Indian Museum Rare Gandhara Art & Mummy Gallery Tour",
      "Hooghly River Sunset Wooden Country Boat Ride",
    ],
    recommendedStays: [
      {
        id: "the-oberoi-grand-kolkata",
        name: "The Oberoi Grand, Kolkata",
        category: "Luxury Hotel",
        address: "15 Jawaharlal Nehru Rd, New Market Area, Kolkata, WB 700013",
        rating: 4.8,
        userRatingCount: 7800,
        contactNumber: "+91 33 2249 2323",
        googleMapsUri: "https://maps.google.com/?q=The+Oberoi+Grand+Kolkata",
        tagline: "The 'Grande Dame of Chowringhee', Victorian landmark hotel dating back to the 1880s",
        highlights: ["Victorian Architecture", "Palm-Fringed Pool", "Baan Thai Dining", "Heritage Grandeur"]
      },
      {
        id: "the-lalit-great-eastern",
        name: "The LaLiT Great Eastern Kolkata",
        category: "Heritage Haveli",
        address: "1, 2 & 3 Old Court House St, Dalhousie Square, Kolkata 700069",
        rating: 4.6,
        userRatingCount: 4600,
        contactNumber: "+91 33 4444 7777",
        googleMapsUri: "https://maps.google.com/?q=The+Lalit+Great+Eastern+Kolkata",
        tagline: "Asia's first luxury hotel opened in 1840, blending Victorian, Edwardian & Contemporary wings",
        highlights: ["Historic 1840 Heritage", "Dalhousie Heritage Precinct", "Rejuve Spa", "Maxim's Bakery"]
      },
      {
        id: "raajkutir-ihcl-seleqtions",
        name: "Raajkutir - IHCL SeleQtions",
        category: "Heritage Haveli",
        address: "Swabhumi, 89C, Narkeldanga Main Rd, Phool Bagan, Kolkata 700054",
        rating: 4.7,
        userRatingCount: 2300,
        contactNumber: "+91 33 4084 4848",
        googleMapsUri: "https://maps.google.com/?q=Raajkutir+Kolkata",
        tagline: "Boutique heritage stay replicating an opulent 19th-century Bengal Renaissance Zamindari estate",
        highlights: ["Bengal Zamindari Decor", "Courtyard Theatrics", "East India Room Dining", "Heritage Arcade"]
      }
    ]
  },
  "Amritsar": {
    crafts: [
      "UNESCO-Inscribed Thatheras of Jandiala Guru (Brass Utensil Craft)",
      "Traditional Phulkari Silk Thread Geometric Embroidery",
      "Handcrafted Amritsari Juttis (Leather Shoes with Zari)",
      "Traditional Woodcarving & Sikh Sacred Shastra Art",
      "Generational Shawl Weaving & Tweed Mills",
      "Kundan & Meenakari Traditional Bridal Goldsmiths",
    ],
    culinary: [
      "Golden Temple Guru Ka Langar (World's Largest Free Community Kitchen)",
      "Original Amritsari Kulcha with Chole & Tamarind Chutney",
      "Legendary Ahuja & Gian Di Lassi with Thick Malai Peda",
      "Makki Di Roti, Sarson Ka Saag & White Butter at Heritage Dhabas",
      "Kesar Da Dhaba 100-Year Slow-Simmered Dal Makhani",
    ],
    activities: [
      "Golden Temple Palki Sahib Midnight & Amrit Vela Dawn Ceremony",
      "Jallianwala Bagh Historic Memorial Walk with Audio Guide",
      "Wagah Border Sunset Flag Lowering Beating Retreat Ceremony",
      "Old City Heritage Haveli & Katra Street Walking Trail",
      "Gobindgarh Fort Live Sound & Light Martial Arts Show",
      "Partition Museum Archival Witness Audio Gallery",
    ],
    recommendedStays: [
      {
        id: "taj-swarna-amritsar",
        name: "Taj Swarna, Amritsar",
        category: "Luxury Hotel",
        address: "Majitha Verka Bypass, Circular Road, Amritsar, Punjab 143001",
        rating: 4.8,
        userRatingCount: 5400,
        contactNumber: "+91 183 665 8000",
        googleMapsUri: "https://maps.google.com/?q=Taj+Swarna+Amritsar",
        tagline: "Contemporary luxury infused with rich Punjabi cultural motifs and golden accents",
        highlights: ["Grand Ballroom", "Grand Trunk Restaurant", "Jiva Spa", "Heated Pool"]
      },
      {
        id: "welcomheritage-ranjitvilas",
        name: "WelcomHeritage Ranjitvilas",
        category: "Heritage Haveli",
        address: "Post Office Khasa, N.H. 1, Amritsar, Punjab 143107",
        rating: 4.7,
        userRatingCount: 1890,
        contactNumber: "+91 98889 00000",
        googleMapsUri: "https://maps.google.com/?q=WelcomHeritage+Ranjitvilas+Amritsar",
        tagline: "Rustic luxury boutique farmhouse surrounded by golden mustard and wheat fields",
        highlights: ["Punjabi Village Experience", "Tractor Rides", "Farm-to-Table Langar", "Courtyard Cottages"]
      },
      {
        id: "hyatt-regency-amritsar",
        name: "Hyatt Regency Amritsar",
        category: "Luxury Hotel",
        address: "MBM Farms, G.T. Road, Amritsar, Punjab 143001",
        rating: 4.6,
        userRatingCount: 6200,
        contactNumber: "+91 183 525 1234",
        googleMapsUri: "https://maps.google.com/?q=Hyatt+Regency+Amritsar",
        tagline: "Located 10 minutes from the Golden Temple with complimentary shuttle services",
        highlights: ["Temple Shuttle", "Outdoor Vitality Pool", "Punjabi Flavors at Punjab 1", "Soma Spa"]
      }
    ]
  },
  "Agra": {
    crafts: [
      "Parchin Kari (Mughal Pietra Dura Marble Inlay Art)",
      "Traditional Zardozi Silk & Gold Wire Embroidery",
      "Generational Handmade Leather Footwear & Saddle Guilds",
      "Carved Soapstone & Sandstone Mughal Lamps",
      "Brass Casting & Antique Metalwork Guilds",
      "Handmade Agra Carpet & Dari Weaving Collectives",
    ],
    culinary: [
      "Original Agra Petha Tasting at Panchhi Petha (15+ Flavors)",
      "Traditional Morning Bedai & Spiced Potato Jalebi Breakfast",
      "Authentic Slow-Simmered Mughlai Gosht & Shahi Tukda",
      "Sadar Bazaar Chaat Gali & Dalmoth Savory Mix Trail",
      "Tandoori Peshawari Naans & Mughlai Korma Feasts",
    ],
    activities: [
      "Taj Mahal Sunrise Private Guided Monument of Love Circuit",
      "Agra Fort Royal Diwan-i-Khas & Sheesh Mahal Exploration",
      "Mehtab Bagh Sunset Silhouette View across Yamuna River",
      "Fatehpur Sikri UNESCO Ghost Capital & Buland Darwaza Tour",
      "Kinari Bazaar Old City Spice & Marble Inlay Guild Walk",
      "Sheroes Hangout Empowered Artisan Cafe Immersion",
    ],
    recommendedStays: [
      {
        id: "the-oberoi-amarvilas-agra",
        name: "The Oberoi Amarvilas, Agra",
        category: "Boutique Palace",
        address: "Taj East Gate Road, Agra, Uttar Pradesh 282001",
        rating: 4.9,
        userRatingCount: 8100,
        contactNumber: "+91 562 223 1515",
        googleMapsUri: "https://maps.google.com/?q=The+Oberoi+Amarvilas+Agra",
        tagline: "Located just 600m from the Taj Mahal, with direct, unobstructed Taj views from every room",
        highlights: ["Taj Mahal Views from All Rooms", "Mughal Terraces", "Private Golf Buggy to Taj", "Royal Spa"]
      },
      {
        id: "itc-mughal-agra",
        name: "ITC Mughal, a Luxury Collection Hotel",
        category: "Luxury Hotel",
        address: "Fatehabad Road, Tajganj, Agra, UP 282001",
        rating: 4.7,
        userRatingCount: 7400,
        contactNumber: "+91 562 402 1111",
        googleMapsUri: "https://maps.google.com/?q=ITC+Mughal+Agra",
        tagline: "Aga Khan Award-winning resort sprawled across 23 acres of lush Mughal gardens",
        highlights: ["Aga Khan Award Architecture", "Kaya Kalp Spa", "Peshawri Dining", "Observation Lounge"]
      },
      {
        id: "tajview-agra-ihcl-seleqtions",
        name: "Tajview, Agra - IHCL SeleQtions",
        category: "Luxury Hotel",
        address: "Fatehabad Road, Tajganj, Agra, UP 282001",
        rating: 4.5,
        userRatingCount: 3900,
        contactNumber: "+91 562 660 2000",
        googleMapsUri: "https://maps.google.com/?q=Tajview+Agra",
        tagline: "Serene hotel offering panoramic views of the Taj Mahal from its rooftop dining deck",
        highlights: ["Rooftop Taj Views", "Lush Landscaped Gardens", "Saqui Bar", "Proximity to Monuments"]
      }
    ]
  },
  "Madurai": {
    crafts: [
      "Madurai Sungudi Traditional Tie-Dye Cotton Weaving",
      "Sacred Jasmine Garland Weaving (Madurai Malli)",
      "Traditional Brass Bell & Bronze Icon Casting Guilds",
      "Handcrafted Wooden Temple Vahanas (Chariots)",
      "Traditional Kolam Rice-Flour Floor Mandala Art",
      "Clay Terracotta Temple Horses (Aiyanar)",
    ],
    culinary: [
      "Iconic Madurai Jigarthanda with Almond Gum & Nannari",
      "Authentic Kari Dosa (Spiced Mutton Layered Dosa)",
      "Chettinad Banana Leaf Feast with 18 Royal Dishes",
      "Fluffy Madurai Idlis with 4 Chutneys at Murugan Idli Shop",
      "Evening Bun Parotta & Pepper Chicken Roast Trail",
    ],
    activities: [
      "Meenakshi Amman Temple Thousand Pillar Hall & Night Ceremony",
      "Thirumalai Nayakkar Mahal Baroque-Dravidian Palace Walk",
      "Early Morning Madurai Flower Market (Malli Bazaar) Awakening",
      "Gandhi Memorial Museum & Freedom Struggle Archives",
      "Vandiyur Mariamman Teppakulam Giant Water Tank Walk",
      "Traditional Puthu Mandapam Tailor & Brass Bazaar Tour",
    ],
    recommendedStays: [
      {
        id: "heritage-madurai",
        name: "Heritage Madurai",
        category: "Heritage Haveli",
        address: "11, Melakkal Main Rd, Kochadai, Madurai, Tamil Nadu 625016",
        rating: 4.7,
        userRatingCount: 3800,
        contactNumber: "+91 452 238 5455",
        googleMapsUri: "https://maps.google.com/?q=Heritage+Madurai",
        tagline: "Designed by legendary architect Geoffrey Bawa amidst 17 acres of ancient banyans",
        highlights: ["Geoffrey Bawa Architecture", "Olympic Size Temple Pool", "Banyan Courtyard", "Ayurvedic Spa"]
      },
      {
        id: "the-gateway-hotel-pasumalai",
        name: "The Gateway Hotel Pasumalai Madurai",
        category: "Boutique Palace",
        address: "Pasumalai, No 40, T.P.K. Road, Madurai, Tamil Nadu 625004",
        rating: 4.6,
        userRatingCount: 3100,
        contactNumber: "+91 452 663 3000",
        googleMapsUri: "https://maps.google.com/?q=The+Gateway+Hotel+Pasumalai+Madurai",
        tagline: "Colonial-era hilltop property surrounded by peacocks with panoramic views of the temple city",
        highlights: ["Hilltop Views of Meenakshi Temple", "Peacock Gardens", "Colonial Charm", "Vista Dining"]
      }
    ]
  },
  "Kochi": {
    crafts: [
      "Kasavu Gold-Zari Kerala Cotton Handloom Weaving",
      "Kathakali Wooden Mask Carving & Natural Pigments",
      "Coir & Coconut Shell Sustainable Artisanal Guilds",
      "Traditional Bell Metal Aranmula Kannadi Bronze Mirrors",
      "Spices Packaging & Essential Oil Distilleries",
      "Teakwood Snake Boat Building Guilds",
    ],
    culinary: [
      "Authentic Kerala Sadhya on Banana Leaf (24 Delicacies)",
      "Fresh Karimeen Pollichathu (Pearl Spot Wrapped in Banana Leaf)",
      "Fort Kochi Fresh Catch Prepared by Chinese Net Fishermen",
      "Soft Appam with Coconut Milk Vegetable Stew",
      "Mattancherry Spice Market Kahwa & Ginger Tea Trails",
    ],
    activities: [
      "Historic Fort Kochi Chinese Fishing Nets Golden Hour Walk",
      "Mattancherry Dutch Palace & Jewish Synagogue Heritage Tour",
      "Kathakali Live Makeup & Classical Dance Theatre Performance",
      "Cochin Backwaters Private Solar-Powered Wooden Boat Cruise",
      "Kochi-Muziris Biennale Contemporary Art Precinct Walk",
      "Kerala Folklore Museum Master Tribal Artifacts Tour",
    ],
    recommendedStays: [
      {
        id: "brunton-boatyard-kochi",
        name: "Brunton Boatyard - CGH Earth",
        category: "Boutique Palace",
        address: "1/498, Calvathy Road, Fort Kochi, Kochi, Kerala 682001",
        rating: 4.8,
        userRatingCount: 2100,
        contactNumber: "+91 484 221 5461",
        googleMapsUri: "https://maps.google.com/?q=Brunton+Boatyard+Fort+Kochi",
        tagline: "Restored Victorian shipyard hotel directly on Kochi harbour with views of dolphins",
        highlights: ["Harbour Views", "Historic Shipyard Heritage", "History Fine Dining", "Eco-Heritage Luxury"]
      },
      {
        id: "old-harbour-hotel",
        name: "Old Harbour Hotel",
        category: "Heritage Haveli",
        address: "1/328 Tower Road, Fort Kochi, Kochi, Kerala 682001",
        rating: 4.7,
        userRatingCount: 1650,
        contactNumber: "+91 484 221 8006",
        googleMapsUri: "https://maps.google.com/?q=Old+Harbour+Hotel+Fort+Kochi",
        tagline: "300-year-old Portuguese-Dutch heritage mansion opposite the ancient Chinese Fishing Nets",
        highlights: ["300-Year Portuguese Heritage", "Garden Restaurant", "Chamber Rooms", "Chinese Nets Proximity"]
      },
      {
        id: "malabar-house",
        name: "The Malabar House - Relais & Châteaux",
        category: "Boutique Palace",
        address: "1/268, Parade Ground, Fort Kochi, Kochi, Kerala 682001",
        rating: 4.7,
        userRatingCount: 980,
        contactNumber: "+91 484 221 6666",
        googleMapsUri: "https://maps.google.com/?q=The+Malabar+House+Fort+Kochi",
        tagline: "Fort Kochi's first boutique heritage art hotel, member of prestigious Relais & Châteaux",
        highlights: ["Relais & Chateaux", "Contemporary Art Collection", "Malabar Junction Dining", "Wine Lounge"]
      }
    ]
  },
  "Goa": {
    crafts: [
      "Hand-Painted Portuguese Azulejos Ceramic Tiles",
      "Traditional Kunbi Saree Handloom Weaving",
      "Coconut Shell & Terracotta Clay Craft Guilds",
      "Brass Metal Bell & Lamp Artistry",
      "Handcrafted Macrame & Sea Glass Jewelry",
      "Wood Inlay & Vintage Portuguese Furniture Restoration",
    ],
    culinary: [
      "Authentic Goan Fish Curry Thali with Fresh Kingfish & Solkadhi",
      "Wood-Fired Goan Poi Bread with Pork/Mushroom Vindaloo",
      "Traditional Multi-Layered Bebinca & Dodol Dessert Trails",
      "Fresh Coconut Feni Tasting with Local Spice Master",
      "Heritage Saraswat Konkani Vegetarian Delicacies",
    ],
    activities: [
      "Fontainhas Latin Quarter Portuguese Heritage Walk",
      "Basilica of Bom Jesus & Se Cathedral UNESCO Heritage Tour",
      "Sahakari Spice Plantation Guided Walk with Traditional Lunch",
      "Dudhsagar Waterfalls Jungle Train Route Exploration",
      "Cabo de Rama Fort Coastal Cliff Sunset Panorama",
      "Divar Island Tranquil Backwater Cycle Trail",
    ],
    recommendedStays: [
      {
        id: "taj-fort-aguada-goa",
        name: "Taj Fort Aguada Resort & Spa, Goa",
        category: "Boutique Palace",
        address: "Sinquerim, Candolim, Goa 403515",
        rating: 4.8,
        userRatingCount: 7800,
        contactNumber: "+91 832 664 5858",
        googleMapsUri: "https://maps.google.com/?q=Taj+Fort+Aguada+Goa",
        tagline: "Historic 16th-century Portuguese fortress transformed into Goa's first 5-star luxury resort",
        highlights: ["16th Century Fort Setting", "Beachfront Cottages", "Jiva Spa", "Morisco Seafood"]
      },
      {
        id: "the-postcard-velha",
        name: "The Postcard Velha, Old Goa",
        category: "Heritage Haveli",
        address: "D-69/4-5, Before Gandhi Circle, Old Goa 403402",
        rating: 4.9,
        userRatingCount: 650,
        contactNumber: "+91 79995 55222",
        googleMapsUri: "https://maps.google.com/?q=The+Postcard+Velha+Goa",
        tagline: "Intimate modernist boutique retreat surrounded by 300 acres of protected coconut plantations",
        highlights: ["Intimate 6-Key Retreat", "Forest Views", "Personalised Goan Menus", "Unwinding Serenity"]
      },
      {
        id: "panjim-inn-heritage",
        name: "WelcomHeritage Panjim Inn",
        category: "Heritage Haveli",
        address: "E-212, 31st January Road, Fontainhas, Panaji, Goa 403001",
        rating: 4.5,
        userRatingCount: 1450,
        contactNumber: "+91 832 222 6523",
        googleMapsUri: "https://maps.google.com/?q=Panjim+Inn+Fontainhas+Goa",
        tagline: "Pioneering heritage hotel in Fontainhas Latin Quarter with antique rosewood 4-poster beds",
        highlights: ["Heart of Fontainhas", "Antiques & Art Gallery", "Verandah Restaurant", "Colonial History"]
      }
    ]
  },
  "Rishikesh": {
    crafts: [
      "Handcrafted Rudraksha Bead & Sacred Yantra Malas",
      "Hand-Hammered Tibetan & Himalayan Singing Bowls",
      "Pure Botanical Ayurvedic Herbal Oils & Incense Distillation",
      "Garhwal Mountain Wool Handloom Shawls & Stoles",
      "Handmade River Stone Sculptures & Gemstones",
      "Handcrafted Himalayan Cedar & Pine Wood Souvenirs",
    ],
    culinary: [
      "Strict Satvik Organic Ayurvedic Thalis with Ghee & Herbs",
      "Authentic Garhwali Feast (Kafuli, Chainsoo, Jhangora Kheer)",
      "Rooftop Masala Chai & Herbal Infusions with Ganges Panorama",
      "Chotiwala Historic 60-Year Vegetarian Dining Legend",
      "Raw Vegan Superfood Bowls & Mountain Honey Elixirs",
    ],
    activities: [
      "Triveni Ghat Evening Maha Ganga Aarti with Chanting",
      "Beatles Ashram (Chaurasi Kutia) Meditation & Graffiti Tour",
      "Sunrise Himalayan Viewpoint Hike at Kunjapuri Temple",
      "Sacred Vashishta Gufa Ancient Cave Meditation",
      "Ram Jhula & Laxman Jhula Iconic Suspension Bridges Walk",
      "Neer Garh Pristine Mountain Waterfall Nature Trail",
    ],
    recommendedStays: [
      {
        id: "ananda-in-the-himalayas",
        name: "Ananda in the Himalayas",
        category: "Boutique Palace",
        address: "The Palace Estate, Narendra Nagar, Tehri Garhwal, Uttarakhand 249175",
        rating: 4.9,
        userRatingCount: 2450,
        contactNumber: "+91 1378 227 500",
        googleMapsUri: "https://maps.google.com/?q=Ananda+in+the+Himalayas",
        tagline: "World-renowned holistic wellness retreat set in the 100-acre Maharaja's Palace Estate",
        highlights: ["Maharaja Palace Grounds", "Ayurvedic Wellness Spa", "Ganga Valley Views", "Hydrotherapy"]
      },
      {
        id: "taj-rishikesh",
        name: "Taj Rishikesh Resort & Spa, Uttarakhand",
        category: "Luxury Hotel",
        address: "Singthali, Post Byasi, Rishikesh, Uttarakhand 249192",
        rating: 4.8,
        userRatingCount: 3100,
        contactNumber: "+91 1378 262 626",
        googleMapsUri: "https://maps.google.com/?q=Taj+Rishikesh+Resort",
        tagline: "Majestic riverfront eco-resort on a private bend of the emerald Ganges with private pebble beach",
        highlights: ["Private Ganga Beach", "Riverside Aarti", "Jiva Spa", "Panoramic Mountain Architecture"]
      },
      {
        id: "aloha-on-the-ganges",
        name: "Aloha On The Ganges, Rishikesh",
        category: "Riverside Homestay",
        address: "National Highway 58, Tapovan, Rishikesh, Uttarakhand 249192",
        rating: 4.6,
        userRatingCount: 5200,
        contactNumber: "+91 135 244 2801",
        googleMapsUri: "https://maps.google.com/?q=Aloha+On+The+Ganges+Rishikesh",
        tagline: "Premier riverside resort in Tapovan with infinity pool overlooking the fast-flowing Ganges",
        highlights: ["Infinity Pool on Ganges", "Tapovan Proximity", "Daily Yoga Classes", "Riverside Gardens"]
      }
    ]
  }
};

export function getCityCustomization(cityName: string): CityCustomizationData {
  const normalized = Object.keys(CITY_CUSTOMIZATIONS).find(
    c => c.toLowerCase() === cityName.toLowerCase() || cityName.toLowerCase().includes(c.toLowerCase())
  );

  if (normalized && CITY_CUSTOMIZATIONS[normalized]) {
    return CITY_CUSTOMIZATIONS[normalized];
  }

  // Generative Fallback for any other Indian city
  return {
    crafts: [
      `${cityName} Traditional Handloom & Textile Guilds`,
      `${cityName} Handcrafted Terracotta & Pottery Works`,
      `${cityName} Generational Metal & Brass Crafts`,
      `${cityName} Regional Folk Painting & Wall Murals`,
      `${cityName} Heritage Woodcarving & Stone Sculpting`,
      `${cityName} Natural Botanical Extracts & Attar`,
    ],
    culinary: [
      `Strict Pure Vegetarian (Satvik) Delicacies of ${cityName}`,
      `Historic Street Food Icons (50+ Yrs) in ${cityName}`,
      `Authentic Regional Feast & Traditional Thali`,
      `Signature Local Sweets, Desserts & Spiced Tea Trails`,
      `Sacred Temple Prasad & Community Feasts`,
    ],
    activities: [
      `Private Dawn Heritage & Historical Walk in ${cityName}`,
      `Signature Monument & Archaeological Sanctuary Tour`,
      `Interactive Master Artisan Workshop & Studio Visit`,
      `VIP Evening Cultural Gathering or Sunset Viewpoint`,
      `Historic Old Bazaar & Secret Spice Alley Exploration`,
      `Sacred Shrine or Waterway Heritage Excursion`,
    ],
    recommendedStays: [
      {
        id: "heritage-palace-stay",
        name: `${cityName} Heritage Grand Haveli`,
        category: "Heritage Haveli",
        address: `Heritage Quarter, ${cityName}`,
        rating: 4.7,
        userRatingCount: 1250,
        contactNumber: "+91 1800 11 2233",
        googleMapsUri: `https://maps.google.com/?q=${encodeURIComponent(`${cityName} Heritage Hotel`)}`,
        tagline: `Authentic restored heritage residence showcasing regional architecture`,
        highlights: ["Heritage Architecture", "Central Location", "Verified Guides", "Authentic Cuisine"]
      },
      {
        id: "boutique-retreat-stay",
        name: `The Royal Sanctuary ${cityName}`,
        category: "Luxury Hotel",
        address: `Civil Lines, ${cityName}`,
        rating: 4.8,
        userRatingCount: 2400,
        contactNumber: "+91 1800 22 3344",
        googleMapsUri: `https://maps.google.com/?q=${encodeURIComponent(`${cityName} Luxury Hotel`)}`,
        tagline: `Contemporary luxury with curated cultural excursions`,
        highlights: ["Concierge Tours", "Fine Dining", "Wellness Spa", "Verified Green Stay"]
      }
    ]
  };
}
