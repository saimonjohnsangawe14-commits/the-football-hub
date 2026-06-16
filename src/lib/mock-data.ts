// Facility-centric mock data for Football Hub 2.0
export const currentUser = {
  name: "Omar Hassan",
  handle: "@omar10",
  avatar: "OH",
  city: "Dubai",
};

export type Facility = {
  id: string;
  name: string;
  area: string;
  city: string;
  distanceKm: number;
  rating: number;
  reviews: number;
  priceFrom: number;
  pitchTypes: string[]; // "5v5", "7v7", "11v11", "Basketball", "Padel", "Volleyball"
  amenities: string[]; // floodlights, parking, changing_rooms, showers, food, cameras, referee
  cover: string; // emoji backdrop
  gradient: string; // tailwind gradient classes
  openNow: boolean;
  popular?: boolean;
  weekendDeal?: number; // % off
};

export const facilities: Facility[] = [
  {
    id: "f1", name: "Strikr Arena · Al Quoz", area: "Al Quoz", city: "Dubai",
    distanceKm: 2.4, rating: 4.9, reviews: 412, priceFrom: 180,
    pitchTypes: ["5v5", "7v7", "11v11"],
    amenities: ["floodlights", "parking", "changing_rooms", "showers", "food", "cameras", "referee"],
    cover: "⚽", gradient: "from-emerald-500 to-teal-600", openNow: true, popular: true,
  },
  {
    id: "f2", name: "The Cage · JLT", area: "JLT", city: "Dubai",
    distanceKm: 4.1, rating: 4.7, reviews: 286, priceFrom: 140,
    pitchTypes: ["5v5", "7v7"],
    amenities: ["floodlights", "parking", "changing_rooms", "cameras"],
    cover: "🥅", gradient: "from-indigo-500 to-purple-600", openNow: true, popular: true, weekendDeal: 20,
  },
  {
    id: "f3", name: "Marina Sports Hub", area: "Dubai Marina", city: "Dubai",
    distanceKm: 6.8, rating: 4.6, reviews: 198, priceFrom: 220,
    pitchTypes: ["7v7", "Padel", "Basketball"],
    amenities: ["floodlights", "parking", "showers", "food"],
    cover: "🏟️", gradient: "from-sky-500 to-cyan-600", openNow: true,
  },
  {
    id: "f4", name: "Desert Turf · Mirdif", area: "Mirdif", city: "Dubai",
    distanceKm: 12.2, rating: 4.4, reviews: 152, priceFrom: 120,
    pitchTypes: ["5v5", "11v11"],
    amenities: ["floodlights", "parking", "changing_rooms"],
    cover: "🌵", gradient: "from-amber-500 to-orange-600", openNow: false,
  },
  {
    id: "f5", name: "Coastal Courts · JBR", area: "JBR", city: "Dubai",
    distanceKm: 7.4, rating: 4.8, reviews: 341, priceFrom: 160,
    pitchTypes: ["5v5", "Padel", "Volleyball"],
    amenities: ["floodlights", "parking", "showers", "food", "cameras", "referee"],
    cover: "🏖️", gradient: "from-rose-500 to-pink-600", openNow: true, weekendDeal: 15,
  },
  {
    id: "f6", name: "Falcon Fields · Sharjah", area: "Al Majaz", city: "Sharjah",
    distanceKm: 22.5, rating: 4.5, reviews: 89, priceFrom: 110,
    pitchTypes: ["7v7", "11v11"],
    amenities: ["floodlights", "parking", "changing_rooms", "showers"],
    cover: "🦅", gradient: "from-violet-500 to-fuchsia-600", openNow: true,
  },
];

export const amenityLabels: Record<string, string> = {
  floodlights: "Floodlights",
  parking: "Parking",
  changing_rooms: "Changing rooms",
  showers: "Showers",
  food: "Food kiosk",
  cameras: "Camera coverage",
  referee: "Referee available",
  wifi: "WiFi",
};

export const pitchOptions = [
  { id: "5v5", label: "5v5" },
  { id: "7v7", label: "7v7" },
  { id: "11v11", label: "11v11" },
  { id: "Basketball", label: "Basketball" },
  { id: "Padel", label: "Padel" },
  { id: "Volleyball", label: "Volleyball" },
];

export const facilityById = (id: string) => facilities.find((f) => f.id === id);

export const pitchesFor = (facilityId: string) => [
  { id: `${facilityId}-p1`, name: "Pitch 1", type: "5v5", surface: "Turf", capacity: 10 },
  { id: `${facilityId}-p2`, name: "Pitch 2", type: "7v7", surface: "Grass", capacity: 14 },
  { id: `${facilityId}-p3`, name: "Pitch 3", type: "11v11", surface: "Grass", capacity: 22 },
];

export const generateSlots = (basePrice: number) => {
  const hours = [16, 17, 18, 19, 20, 21, 22];
  return hours.map((h, i) => ({
    id: `s${h}`,
    time: `${h}:00`,
    end: `${h + 1}:00`,
    price: basePrice + (h >= 19 && h <= 21 ? 60 : 0),
    available: i !== 2 && i !== 5,
  }));
};

export const extras = [
  { id: "ref", label: "Referee", price: 120, icon: "🟨" },
  { id: "photo", label: "Photographer", price: 250, icon: "📸" },
  { id: "video", label: "Videographer + highlights", price: 450, icon: "🎥" },
  { id: "drinks", label: "Drinks package (12)", price: 90, icon: "🥤" },
  { id: "jerseys", label: "Team jerseys (10)", price: 320, icon: "👕" },
  { id: "equip", label: "Ball + bibs", price: 40, icon: "⚽" },
];

export const myBookings = [
  { id: "bk1", facilityId: "f1", facility: "Strikr Arena · Al Quoz", pitch: "Pitch 2 · 7v7", date: "Tomorrow · 20:00", price: 380, status: "Upcoming", qr: "STRK-A1B2" },
  { id: "bk2", facilityId: "f2", facility: "The Cage · JLT", pitch: "Pitch 1 · 5v5", date: "Sat · 19:00", price: 220, status: "Upcoming", qr: "STRK-C3D4" },
  { id: "bk3", facilityId: "f1", facility: "Strikr Arena · Al Quoz", pitch: "Pitch 1 · 5v5", date: "Jun 03 · 21:00", price: 240, status: "Completed", qr: "STRK-E5F6" },
  { id: "bk4", facilityId: "f5", facility: "Coastal Courts · JBR", pitch: "Padel court", date: "May 27 · 18:00", price: 180, status: "Completed", qr: "STRK-G7H8" },
  { id: "bk5", facilityId: "f3", facility: "Marina Sports Hub", pitch: "Pitch 1 · 7v7", date: "May 14 · 19:30", price: 320, status: "Cancelled", qr: "STRK-J9K0" },
];

export const upcomingTournaments = [
  { id: "t1", name: "Strikr Summer Cup", format: "7v7", teams: 32, prize: "AED 25,000", starts: "Jul 12", logo: "🏆" },
  { id: "t2", name: "Corporate League", format: "5v5", teams: 16, prize: "AED 10,000", starts: "Jun 28", logo: "💼" },
  { id: "t3", name: "Coastal Padel Open", format: "Padel · Doubles", teams: 24, prize: "AED 8,000", starts: "Jul 05", logo: "🎾" },
];

export const teamsLeaderboard = [
  { rank: 1, name: "Falcon FC", points: 47, logo: "🦅" },
  { rank: 2, name: "Desert Wolves", points: 42, logo: "🐺" },
  { rank: 3, name: "Sandstorm Utd", points: 38, logo: "🌪️" },
  { rank: 4, name: "Coastal Kings", points: 34, logo: "👑" },
  { rank: 5, name: "Velocity 11", points: 30, logo: "⚡" },
];

export const reviews = [
  { id: "r1", facilityId: "f1", author: "Rashid A.", rating: 5, text: "Best turf in the city. Floodlights are A+. Will be back every Thursday.", date: "2 days ago" },
  { id: "r2", facilityId: "f1", author: "Diego S.", rating: 4, text: "Great pitch, parking can get tight on weekends. Booking flow was instant.", date: "1 week ago" },
  { id: "r3", facilityId: "f1", author: "Yousef K.", rating: 5, text: "Cameras + highlights pack worth every dirham.", date: "2 weeks ago" },
];

// Owner-side mock data
export const ownerStats = {
  revenueToday: 8420,
  revenueWeek: 52340,
  revenueMonth: 198540,
  bookingsToday: 14,
  occupancy: 78,
  repeatRate: 64,
  pendingPayments: 3,
  upcomingMatches: 9,
};

export const ownerPeakHours = [
  { hour: "16", pct: 30 }, { hour: "17", pct: 55 }, { hour: "18", pct: 82 },
  { hour: "19", pct: 95 }, { hour: "20", pct: 100 }, { hour: "21", pct: 88 },
  { hour: "22", pct: 60 }, { hour: "23", pct: 25 },
];

export const ownerRevenueBreakdown = [
  { label: "Pitch 1 · 5v5", value: 18400 },
  { label: "Pitch 2 · 7v7", value: 22100 },
  { label: "Pitch 3 · 11v11", value: 9800 },
  { label: "Extras & rentals", value: 2040 },
];

export const ownerBookingsToday = [
  { id: "ob1", time: "16:00", pitch: "Pitch 1 · 5v5", customer: "Falcon FC", status: "confirmed" as const, price: 220 },
  { id: "ob2", time: "17:00", pitch: "Pitch 2 · 7v7", customer: "Walk-in · cash", status: "walkin" as const, price: 320 },
  { id: "ob3", time: "18:00", pitch: "Pitch 1 · 5v5", customer: "Desert Wolves", status: "confirmed" as const, price: 240 },
  { id: "ob4", time: "19:00", pitch: "Pitch 3 · 11v11", customer: "Coastal Kings", status: "pending" as const, price: 580 },
  { id: "ob5", time: "20:00", pitch: "Pitch 2 · 7v7", customer: "Omar Hassan", status: "confirmed" as const, price: 380 },
  { id: "ob6", time: "21:00", pitch: "Pitch 1 · 5v5", customer: "Recurring · Sami's group", status: "recurring" as const, price: 240 },
];

export const ownerStaff = [
  { name: "Mariam Saleh", role: "Venue Manager", shift: "12:00 – 22:00", status: "On shift" },
  { name: "Hassan Ibrahim", role: "Pitch Steward", shift: "16:00 – 00:00", status: "On shift" },
  { name: "Layla Karim", role: "F&B Lead", shift: "11:00 – 23:00", status: "On break" },
];

export const ownerPromotions = [
  { id: "pr1", name: "Weekend 20% off", code: "WEEKEND20", uses: 142, status: "active" },
  { id: "pr2", name: "Student deal", code: "STUDENT", uses: 87, status: "active" },
  { id: "pr3", name: "Corporate league", code: "CORP500", uses: 12, status: "active" },
  { id: "pr4", name: "Ramadan nights", code: "RAMADAN", uses: 312, status: "ended" },
];
