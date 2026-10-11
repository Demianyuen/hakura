// Mock data layer for Hakura music platform.
// Songs are generated mock tracks (Web Audio synth-based, no real MP3s needed for demo).

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // seconds
  cover: string;    // emoji or gradient key
  tags: string[];
  plays: number;
  likes: number;
  genre: string;
  mood: string;
}

export interface Genre {
  id: string;
  name: string;
  emoji: string;
}

export const GENRES: Genre[] = [
  { id: "pop", name: "Pop", emoji: "🎤" },
  { id: "rock", name: "Rock", emoji: "🎸" },
  { id: "electronic", name: "Electronic", emoji: "🎛️" },
  { id: "hiphop", name: "Hip-Hop", emoji: "🎧" },
  { id: "jazz", name: "Jazz", emoji: "🎷" },
  { id: "classical", name: "Classical", emoji: "🎻" },
  { id: "lofi", name: "Lo-fi", emoji: "🌙" },
  { id: "cinematic", name: "Cinematic", emoji: "🎬" },
  { id: "rnb", name: "R&B", emoji: "💫" },
  { id: "folk", name: "Folk", emoji: "🪕" },
  { id: "metal", name: "Metal", emoji: "🤘" },
  { id: "country", name: "Country", emoji: "🤠" },
];

export const VOCAL_OPTIONS = [
  { id: "female-pop", name: "女聲 · 流行", emoji: "👩‍🎤" },
  { id: "male-pop", name: "男聲 · 流行", emoji: "👨‍🎤" },
  { id: "female-soft", name: "女聲 · 溫柔", emoji: "🌸" },
  { id: "male-deep", name: "男聲 · 低沉", emoji: "🌊" },
  { id: "duet", name: "合唱", emoji: "👫" },
  { id: "instrumental", name: "純音樂", emoji: "🎹" },
];

export const MOODS = [
  "歡快", "憂鬱", "熱血", "慵懶", "夢幻", "史詩", "甜蜜", "神秘", "悲壯", "治癒",
];

export const LYRIC_IDEAS = [
  "寫一首關於深夜獨自開車穿過城市燈火的歌",
  "盛夏、海邊、冰鎮西瓜和你的白裙",
  "一個程序員深夜改 bug 的奇幻漂流",
  "送給十年後自己的一封信",
  "雨天的咖啡館，陌生人與陌生人",
  "賽博朋克城市裡最後一個人類詩人",
];

export const SONGS: Song[] = [
  {
    id: "s1",
    title: "Neon Rain",
    artist: "hakura_ai",
    duration: 184,
    cover: "🌧️",
    tags: ["synthwave", "night", "city"],
    plays: 128400,
    likes: 9820,
    genre: "electronic",
    mood: "夢幻",
  },
  {
    id: "s2",
    title: "Sunset Diner",
    artist: "echo_maker",
    duration: 162,
    cover: "🍔",
    tags: ["lofi", "chill", "summer"],
    plays: 87200,
    likes: 6410,
    genre: "lofi",
    mood: "慵懶",
  },
  {
    id: "s3",
    title: "Gravity Falls",
    artist: "synthwave_kid",
    duration: 221,
    cover: "🌌",
    tags: ["cinematic", "space", "ambient"],
    plays: 205600,
    likes: 15230,
    genre: "cinematic",
    mood: "史詩",
  },
  {
    id: "s4",
    title: "Paper Cranes",
    artist: "mika.gen",
    duration: 148,
    cover: "🕊️",
    tags: ["folk", "acoustic", "hopeful"],
    plays: 64300,
    likes: 5180,
    genre: "folk",
    mood: "治癒",
  },
  {
    id: "s5",
    title: "Bass Cathedral",
    artist: "404beat",
    duration: 203,
    cover: "⛪",
    tags: ["dubstep", "heavy", "drop"],
    plays: 342100,
    likes: 28400,
    genre: "electronic",
    mood: "熱血",
  },
  {
    id: "s6",
    title: "Slow Dance in Tokyo",
    artist: "yuki_ai",
    duration: 176,
    cover: "🏮",
    tags: ["rnb", "smooth", "night"],
    plays: 156800,
    likes: 12760,
    genre: "rnb",
    mood: "甜蜜",
  },
  {
    id: "s7",
    title: "Dust and Diesel",
    artist: "roadwolf",
    duration: 195,
    cover: "🚗",
    tags: ["rock", "gritty", "highway"],
    plays: 91200,
    likes: 7340,
    genre: "rock",
    mood: "熱血",
  },
  {
    id: "s8",
    title: "Midnight Circuit",
    artist: "hakura_ai",
    duration: 168,
    cover: "🎛️",
    tags: ["techno", "club", "pulse"],
    plays: 178500,
    likes: 13420,
    genre: "electronic",
    mood: "熱血",
  },
  {
    id: "s9",
    title: "Porchlight Hymn",
    artist: "grandpa_blues",
    duration: 212,
    cover: "🪕",
    tags: ["blues", "soul", "americana"],
    plays: 47600,
    likes: 3890,
    genre: "folk",
    mood: "憂鬱",
  },
  {
    id: "s10",
    title: "Chromatic Bloom",
    artist: "aria.gen",
    duration: 158,
    cover: "🌸",
    tags: ["classical", "piano", "elegant"],
    plays: 112900,
    likes: 9650,
    genre: "classical",
    mood: "夢幻",
  },
  {
    id: "s11",
    title: "Rooftop Freestyle",
    artist: "mc_nanobot",
    duration: 142,
    cover: "🏙️",
    tags: ["hiphop", "rap", "city"],
    plays: 267300,
    likes: 21800,
    genre: "hiphop",
    mood: "熱血",
  },
  {
    id: "s12",
    title: "Winter Window",
    artist: "snowbyte",
    duration: 189,
    cover: "❄️",
    tags: ["ambient", "piano", "cold"],
    plays: 58400,
    likes: 4520,
    genre: "classical",
    mood: "憂鬱",
  },
];

// Gradient palettes for cover placeholders (per genre)
export const COVER_GRADIENTS: Record<string, string> = {
  electronic: "from-purple-600 via-pink-500 to-orange-400",
  lofi: "from-indigo-400 via-purple-400 to-pink-300",
  cinematic: "from-slate-700 via-purple-800 to-indigo-900",
  folk: "from-amber-300 via-orange-300 to-rose-300",
  rock: "from-red-500 via-orange-500 to-yellow-400",
  rnb: "from-violet-500 via-fuchsia-500 to-pink-400",
  hiphop: "from-emerald-500 via-teal-500 to-cyan-400",
  classical: "from-rose-200 via-violet-200 to-indigo-200",
};

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatPlays(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}
