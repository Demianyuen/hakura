"use client";

import { usePlayer } from "@/lib/player";
import { formatDuration, COVER_GRADIENTS } from "@/lib/music-data";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { useState } from "react";

export default function GlobalPlayer() {
  const { current, isPlaying, progress, volume, toggle, next, prev, setVolume, seek } = usePlayer();
  const [muted, setMuted] = useState(false);

  if (!current) return null;

  // Deterministic pseudo-waveform bars from song id
  const bars = Array.from({ length: 48 }, (_, i) => {
    const seed = (current.id.charCodeAt(i % current.id.length) * (i + 7)) % 100;
    return 20 + (seed % 80);
  });

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-ink-700 bg-ink-900/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        {/* Track info */}
        <div className="flex items-center gap-3 min-w-0 w-56 shrink-0">
          <div
            className={`w-11 h-11 rounded-lg bg-gradient-to-br ${COVER_GRADIENTS[current.genre] ?? "from-purple-500 to-pink-400"} flex items-center justify-center text-xl shrink-0`}
          >
            {current.cover}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm truncate">{current.title}</p>
            <p className="text-xs text-ink-500 truncate">{current.artist}</p>
          </div>
        </div>

        {/* Controls + waveform */}
        <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
          <div className="flex items-center gap-4">
            <button onClick={prev} className="text-ink-500 hover:text-white transition-colors" aria-label="previous">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full bg-white text-ink-950 flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="play/pause"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button onClick={next} className="text-ink-500 hover:text-white transition-colors" aria-label="next">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-xl">
            <span className="font-mono text-[10px] text-ink-500 w-8 text-right">
              {formatDuration(Math.floor((progress / 100) * current.duration))}
            </span>
            {/* Waveform seek bar */}
            <div
              className="flex-1 flex items-center gap-[2px] h-6 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                seek(((e.clientX - rect.left) / rect.width) * 100);
              }}
            >
              {bars.map((h, i) => {
                const played = (i / bars.length) * 100 <= progress;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-colors ${
                      played ? "bg-signal-400" : "bg-ink-600 hover:bg-ink-500"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                );
              })}
            </div>
            <span className="font-mono text-[10px] text-ink-500 w-8">{formatDuration(current.duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 w-32 shrink-0">
          <button
            onClick={() => setMuted((m) => !m)}
            className="text-ink-500 hover:text-white transition-colors"
            aria-label="mute"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : volume * 100}
            onChange={(e) => {
              setMuted(false);
              setVolume(Number(e.target.value) / 100);
            }}
            className="w-full accent-signal-400 h-1"
            aria-label="volume"
          />
        </div>
      </div>
    </div>
  );
}
