"use client";

import { usePlayer } from "@/lib/player";
import { formatDuration, formatPlays, COVER_GRADIENTS, type Song } from "@/lib/music-data";
import { Play, Pause, Heart } from "lucide-react";
import { useState } from "react";

export default function SongCard({ song, queue }: { song: Song; queue?: Song[] }) {
  const { current, isPlaying, play, toggle } = usePlayer();
  const [liked, setLiked] = useState(false);
  const isCurrent = current?.id === song.id;

  return (
    <div className="group rounded-xl border border-ink-800 bg-ink-900 p-3 hover:border-ink-600 transition-colors">
      <div
        className={`relative aspect-square rounded-lg bg-gradient-to-br ${
          COVER_GRADIENTS[song.genre] ?? "from-purple-500 to-pink-400"
        } flex items-center justify-center mb-3 overflow-hidden`}
      >
        <span className="text-4xl">{song.cover}</span>
        {/* Play button overlay */}
        <button
          onClick={() => (isCurrent ? toggle() : play(song, queue))}
          className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white text-ink-950 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-105"
          aria-label={isCurrent && isPlaying ? "pause" : "play"}
        >
          {isCurrent && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        {isCurrent && isPlaying && (
          <div className="absolute top-2 left-2 flex gap-0.5 items-end h-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-0.5 bg-white/90 rounded-full animate-pulse"
                style={{ height: `${40 + i * 20}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm text-white truncate">{song.title}</p>
          <p className="text-xs text-ink-500 truncate">{song.artist}</p>
        </div>
        <button
          onClick={() => setLiked((l) => !l)}
          className="shrink-0 mt-0.5"
          aria-label="like"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? "fill-pink-500 text-pink-500" : "text-ink-500 hover:text-pink-400"
            }`}
          />
        </button>
      </div>
      <div className="flex items-center justify-between mt-2 font-mono text-[10px] text-ink-500">
        <span>{formatPlays(song.plays)} 播放</span>
        <span>{formatDuration(song.duration)}</span>
      </div>
    </div>
  );
}
