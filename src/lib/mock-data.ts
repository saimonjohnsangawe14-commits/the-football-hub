// Centralized mock data for the Strikr prototype.
export const currentUser = {
  name: "Omar Hassan",
  handle: "@omar10",
  position: "ST",
  rating: 87,
  level: 24,
  xp: 7820,
  nextLevelXp: 10000,
  avatar: "OH",
  team: "Desert Wolves",
};

export const pitchSlots = [
  { id: "1", pitch: "Pitch 1 · 5-a-side", time: "18:00", duration: 60, price: 180, available: true, surface: "Turf" },
  { id: "2", pitch: "Pitch 2 · 7-a-side", time: "18:30", duration: 90, price: 320, available: true, surface: "Grass" },
  { id: "3", pitch: "Pitch 1 · 5-a-side", time: "19:00", duration: 60, price: 200, available: false, surface: "Turf" },
  { id: "4", pitch: "Pitch 3 · 11-a-side", time: "20:00", duration: 90, price: 520, available: true, surface: "Grass" },
  { id: "5", pitch: "Pitch 2 · 7-a-side", time: "20:30", duration: 60, price: 280, available: true, surface: "Grass" },
  { id: "6", pitch: "Pitch 1 · 5-a-side", time: "21:00", duration: 60, price: 220, available: true, surface: "Turf" },
];

export const featuredMatches = [
  { id: "m1", home: "Desert Wolves", away: "Falcon FC", time: "Tonight · 20:00", pitch: "Pitch 3", status: "live", homeScore: 2, awayScore: 1 },
  { id: "m2", home: "Sandstorm United", away: "Coastal Kings", time: "Tomorrow · 19:30", pitch: "Pitch 2", status: "upcoming" },
  { id: "m3", home: "Velocity 11", away: "Atlas FC", time: "Sat · 17:00", pitch: "Pitch 1", status: "upcoming" },
];

export const tournaments = [
  { id: "t1", name: "Strikr Summer Cup", format: "7-a-side", teams: 32, prize: "AED 25,000", starts: "Jul 12", status: "Registering", logo: "🏆" },
  { id: "t2", name: "Corporate League", format: "5-a-side", teams: 16, prize: "AED 10,000", starts: "Jun 28", status: "Live", logo: "💼" },
  { id: "t3", name: "Youth Champions", format: "U14 · 9v9", teams: 24, prize: "Trophies + Gear", starts: "Aug 03", status: "Open", logo: "⚡" },
  { id: "t4", name: "Ramadan Nights", format: "5-a-side", teams: 24, prize: "AED 15,000", starts: "Mar 15", status: "Completed", logo: "🌙" },
];

export const playerLeaderboard = [
  { rank: 1, name: "Yousef Karim", team: "Falcon FC", goals: 34, assists: 12, rating: 92, avatar: "YK" },
  { rank: 2, name: "Omar Hassan", team: "Desert Wolves", goals: 28, assists: 19, rating: 87, avatar: "OH" },
  { rank: 3, name: "Rashid Al-Maktoum", team: "Sandstorm Utd", goals: 25, assists: 8, rating: 86, avatar: "RA" },
  { rank: 4, name: "Diego Silva", team: "Coastal Kings", goals: 22, assists: 14, rating: 85, avatar: "DS" },
  { rank: 5, name: "Marcus Chen", team: "Velocity 11", goals: 20, assists: 17, rating: 84, avatar: "MC" },
];

export const teamLeaderboard = [
  { rank: 1, name: "Falcon FC", played: 18, won: 15, drawn: 2, lost: 1, points: 47, logo: "🦅" },
  { rank: 2, name: "Desert Wolves", played: 18, won: 13, drawn: 3, lost: 2, points: 42, logo: "🐺" },
  { rank: 3, name: "Sandstorm United", played: 18, won: 12, drawn: 2, lost: 4, points: 38, logo: "🌪️" },
  { rank: 4, name: "Coastal Kings", played: 18, won: 10, drawn: 4, lost: 4, points: 34, logo: "👑" },
  { rank: 5, name: "Velocity 11", played: 18, won: 9, drawn: 3, lost: 6, points: 30, logo: "⚡" },
];

export const myTeam = {
  id: "wolves",
  name: "Desert Wolves",
  logo: "🐺",
  founded: "2022",
  captain: "Omar Hassan",
  record: { won: 13, drawn: 3, lost: 2 },
  rank: 2,
  players: [
    { name: "Omar Hassan", role: "Captain · ST", rating: 87, avatar: "OH" },
    { name: "Khalid Nasser", role: "GK", rating: 84, avatar: "KN" },
    { name: "Tarek Ali", role: "CB", rating: 82, avatar: "TA" },
    { name: "Sami Reza", role: "CM", rating: 85, avatar: "SR" },
    { name: "Bilal Hadi", role: "LW", rating: 83, avatar: "BH" },
    { name: "Faris Omar", role: "RW", rating: 81, avatar: "FO" },
    { name: "Jad Khoury", role: "RB", rating: 80, avatar: "JK" },
  ],
};

export const playerStats = {
  matches: 87,
  goals: 64,
  assists: 41,
  mvp: 12,
  cleanSheets: 0,
  passAccuracy: 84,
  shotAccuracy: 67,
  formLast5: ["W", "W", "D", "W", "L"],
};

export const badges = [
  { id: "b1", name: "Hat-trick Hero", icon: "⚽", desc: "Score 3 in a match", unlocked: true },
  { id: "b2", name: "Playmaker", icon: "🎯", desc: "10 assists in a season", unlocked: true },
  { id: "b3", name: "MVP Streak", icon: "🔥", desc: "3 MVPs in a row", unlocked: true },
  { id: "b4", name: "Iron Man", icon: "💪", desc: "Play 50 matches", unlocked: true },
  { id: "b5", name: "Top Scorer", icon: "👑", desc: "Lead the season", unlocked: false },
  { id: "b6", name: "Centurion", icon: "💯", desc: "100 career goals", unlocked: false },
];

export const recordings = [
  { id: "r1", match: "Desert Wolves vs Falcon FC", date: "Jun 8", duration: "12:34", views: 1240, thumb: "🎬", status: "ready" },
  { id: "r2", match: "Desert Wolves vs Coastal Kings", date: "May 30", duration: "08:12", views: 890, thumb: "🎥", status: "ready" },
  { id: "r3", match: "Friendly vs Velocity 11", date: "May 22", duration: "—", views: 0, thumb: "⏳", status: "processing" },
];

export const academyPrograms = [
  { id: "a1", name: "Lions Cubs · U8", schedule: "Mon & Wed · 16:30", coach: "Coach Diego", spots: 4, price: 600, color: "primary" },
  { id: "a2", name: "Eagles · U12", schedule: "Tue & Thu · 17:00", coach: "Coach Marcus", spots: 2, price: 750, color: "accent" },
  { id: "a3", name: "Hawks · U14", schedule: "Mon, Wed, Fri · 18:00", coach: "Coach Yousef", spots: 0, price: 900, color: "primary" },
  { id: "a4", name: "Goalkeeper Clinic", schedule: "Sat · 09:00", coach: "Coach Rashid", spots: 6, price: 500, color: "accent" },
];

export const childProfile = {
  name: "Ali Hassan",
  age: 11,
  program: "Eagles · U12",
  attendance: 92,
  nextSession: "Thursday · 17:00",
  recentNote: "Great work on positioning this week. Keep practicing weak-foot passing.",
};

export const corporatePackages = [
  { id: "c1", name: "Team Day Out", desc: "Half-day venue access, refs, catering for 30", price: "AED 4,500", icon: "🏢" },
  { id: "c2", name: "Tournament Day", desc: "Full venue, brackets, branded jerseys, MC", price: "AED 12,000", icon: "🏆" },
  { id: "c3", name: "Annual League", desc: "12-week corporate league, weekly fixtures", price: "AED 38,000", icon: "📅" },
];

export const marketplaceItems = [
  { id: "p1", name: "Nike Phantom GX Elite", brand: "Nike", price: 899, oldPrice: 1099, category: "Boots", rating: 4.8, badge: "Pro" },
  { id: "p2", name: "Adidas Predator Edge", brand: "Adidas", price: 749, category: "Boots", rating: 4.7 },
  { id: "p3", name: "Strikr Home Jersey", brand: "Strikr", price: 249, category: "Jerseys", rating: 4.9, badge: "New" },
  { id: "p4", name: "Pro Training Ball", brand: "Mitre", price: 129, category: "Gear", rating: 4.6 },
  { id: "p5", name: "Compression Shorts", brand: "Under Armour", price: 189, category: "Gear", rating: 4.5 },
  { id: "p6", name: "Goalkeeper Gloves Pro", brand: "Reusch", price: 299, category: "Gear", rating: 4.8 },
];

export const menuItems = [
  { id: "f1", name: "Striker Burger", desc: "Wagyu, cheddar, smoked aioli", price: 48, category: "Mains", emoji: "🍔" },
  { id: "f2", name: "Chicken Shawarma Wrap", desc: "Garlic, pickles, fries inside", price: 32, category: "Mains", emoji: "🌯" },
  { id: "f3", name: "Margherita Pizza", desc: "Stone-baked, fresh basil", price: 42, category: "Mains", emoji: "🍕" },
  { id: "f4", name: "Loaded Fries", desc: "Cheese, jalapeños, beef", price: 28, category: "Sides", emoji: "🍟" },
  { id: "f5", name: "Recovery Smoothie", desc: "Banana, whey, peanut butter", price: 24, category: "Drinks", emoji: "🥤" },
  { id: "f6", name: "Fresh Coconut", desc: "Whole, chilled", price: 18, category: "Drinks", emoji: "🥥" },
];

export const adminMetrics = {
  revenueToday: 8420,
  revenueWeek: 52340,
  occupancy: 78,
  retention: 64,
  peakHours: [
    { hour: "16:00", pct: 30 }, { hour: "17:00", pct: 55 }, { hour: "18:00", pct: 82 },
    { hour: "19:00", pct: 95 }, { hour: "20:00", pct: 100 }, { hour: "21:00", pct: 88 },
    { hour: "22:00", pct: 60 }, { hour: "23:00", pct: 25 },
  ],
  revenueBreakdown: [
    { label: "Pitch bookings", value: 32100, color: "primary" },
    { label: "Food & beverage", value: 9800, color: "accent" },
    { label: "Academy fees", value: 7200, color: "primary" },
    { label: "Marketplace", value: 3240, color: "accent" },
  ],
  staff: [
    { name: "Mariam Saleh", role: "Venue Manager", shift: "12:00 – 22:00", status: "On shift" },
    { name: "Hassan Ibrahim", role: "Pitch Steward", shift: "16:00 – 00:00", status: "On shift" },
    { name: "Layla Karim", role: "F&B Lead", shift: "11:00 – 23:00", status: "On break" },
    { name: "Coach Diego", role: "Head Coach", shift: "15:00 – 21:00", status: "On shift" },
  ],
};

export const fixtures = [
  { round: "Group A · MD1", home: "Falcon FC", away: "Desert Wolves", time: "Jul 12 · 18:00", homeScore: null, awayScore: null },
  { round: "Group A · MD1", home: "Coastal Kings", away: "Velocity 11", time: "Jul 12 · 19:30", homeScore: null, awayScore: null },
  { round: "Group B · MD1", home: "Sandstorm Utd", away: "Atlas FC", time: "Jul 13 · 18:00", homeScore: null, awayScore: null },
  { round: "Group B · MD1", home: "Eagles 11", away: "Tigers FC", time: "Jul 13 · 19:30", homeScore: null, awayScore: null },
];

export const bookingHistory = [
  { id: "bk1", pitch: "Pitch 2 · 7v7", date: "Jun 10 · 20:00", price: 320, status: "Upcoming", qr: "STRK-A1B2" },
  { id: "bk2", pitch: "Pitch 1 · 5v5", date: "Jun 03 · 21:00", price: 220, status: "Completed", qr: "STRK-C3D4" },
  { id: "bk3", pitch: "Pitch 3 · 11v11", date: "May 27 · 19:00", price: 520, status: "Completed", qr: "STRK-E5F6" },
];
