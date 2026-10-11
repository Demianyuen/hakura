"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import type { Song } from "./music-data";

interface PlayerState {
  current: Song | null;
  isPlaying: boolean;
  progress: number; // 0-100
  volume: number;
  queue: Song[];
  play: (song: Song, queue?: Song[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (v: number) => void;
  seek: (pct: number) => void;
}

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [queue, setQueue] = useState<Song[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulated playback progress (demo — no real audio decoding)
  useEffect(() => {
    if (!isPlaying || !current) return;
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        const nextP = p + 100 / (current.duration / 0.5); // 0.5s ticks
        if (nextP >= 100) {
          // auto next
          const idx = queue.findIndex((s) => s.id === current.id);
          const nextSong = queue[idx + 1] ?? queue[0];
          if (nextSong) {
            setCurrent(nextSong);
            return 0;
          }
          setIsPlaying(false);
          return 0;
        }
        return nextP;
      });
    }, 500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, current, queue]);

  const play = useCallback((song: Song, newQueue?: Song[]) => {
    if (newQueue) setQueue(newQueue);
    setCurrent(song);
    setProgress(0);
    setIsPlaying(true);
  }, []);

  const toggle = useCallback(() => setIsPlaying((p) => !p), []);

  const next = useCallback(() => {
    if (!current || queue.length === 0) return;
    const idx = queue.findIndex((s) => s.id === current.id);
    setCurrent(queue[(idx + 1) % queue.length]);
    setProgress(0);
  }, [current, queue]);

  const prev = useCallback(() => {
    if (!current || queue.length === 0) return;
    const idx = queue.findIndex((s) => s.id === current.id);
    setCurrent(queue[(idx - 1 + queue.length) % queue.length]);
    setProgress(0);
  }, [current, queue]);

  const seek = useCallback((pct: number) => setProgress(Math.max(0, Math.min(100, pct))), []);

  return (
    <PlayerContext.Provider
      value={{ current, isPlaying, progress, volume, queue, play, toggle, next, prev, setVolume, seek }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
