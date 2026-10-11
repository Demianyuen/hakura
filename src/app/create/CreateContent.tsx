"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, Music2, Loader2, Play, Download, RefreshCw, Wand2, Mic2, Smile } from "lucide-react";
import { GENRES, VOCAL_OPTIONS, MOODS, LYRIC_IDEAS, COVER_GRADIENTS, type Song } from "@/lib/music-data";
import { usePlayer } from "@/lib/player";

type Phase = "idle" | "generating" | "done";

const GEN_STEPS = ["分析提示詞", "構建旋律結構", "編排樂器", "合成人聲", "母帶處理"];

export default function CreateContent() {
  const searchParams = useSearchParams();
  const promptParam = searchParams.get("prompt") ?? "";
  const [desc, setDesc] = useState(promptParam);
  const [lyricsMode, setLyricsMode] = useState<"auto" | "custom">("auto");
  const [lyrics, setLyrics] = useState("");
  const [instrumental, setInstrumental] = useState(false);
  const [genre, setGenre] = useState("pop");
  const [vocal, setVocal] = useState("female-pop");
  const [mood, setMood] = useState("歡快");
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<Song[]>([]);
  const { play } = usePlayer();

  // Simulated generation sequence
  useEffect(() => {
    if (phase !== "generating") return;
    setStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    GEN_STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), (i + 1) * 900));
    });
    timers.push(
      setTimeout(() => {
        // Generate 2 mock songs based on selection
        const g = GENRES.find((x) => x.id === genre)!;
        setResults([
          {
            id: `gen-${Date.now()}-a`,
            title: desc.slice(0, 24) || `${g.name} 新作`,
            artist: "hakura_ai",
            duration: 150 + Math.floor(Math.random() * 90),
            cover: g.emoji,
            tags: [g.id, mood, "AI"],
            plays: 0,
            likes: 0,
            genre,
            mood,
          },
          {
            id: `gen-${Date.now()}-b`,
            title: `${g.name} 變奏`,
            artist: "hakura_ai",
            duration: 145 + Math.floor(Math.random() * 85),
            cover: "🎵",
            tags: [g.id, mood, "alt"],
            plays: 0,
            likes: 0,
            genre,
            mood,
          },
        ]);
        setPhase("done");
      }, GEN_STEPS.length * 900 + 600)
    );
    return () => timers.forEach(clearTimeout);
  }, [phase, genre, mood, desc]);

  function generate() {
    if (!desc.trim() && lyricsMode === "custom" && !lyrics.trim()) return;
    setPhase("generating");
    setResults([]);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-pink-400" /> 創作歌曲
        </h1>
        <p className="text-ink-500 text-sm mt-1">描述你的想法，Hakura 為你生成完整作品。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── 左：創作面板 ── */}
        <div className="lg:col-span-3 space-y-5">
          {/* Description */}
          <div className="rounded-2xl border border-ink-800 bg-ink-900 p-5">
            <label className="flex items-center gap-2 font-mono text-xs text-ink-500 mb-3">
              <Wand2 className="w-3.5 h-3.5" /> 歌曲描述
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              placeholder="例：一首關於夏日海邊的慵懶 lo-fi，適合傍晚聽"
              className="w-full rounded-xl border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-white placeholder-ink-500 focus:border-pink-500/60 focus:outline-none resize-none"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {LYRIC_IDEAS.slice(0, 3).map((idea) => (
                <button
                  key={idea}
                  onClick={() => setDesc(idea)}
                  className="rounded-full border border-ink-700 px-3 py-1 text-xs text-ink-500 hover:border-pink-500/50 hover:text-pink-300 transition-colors truncate max-w-[220px]"
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          {/* Lyrics */}
          <div className="rounded-2xl border border-ink-800 bg-ink-900 p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 font-mono text-xs text-ink-500">
                <Mic2 className="w-3.5 h-3.5" /> 歌詞
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-ink-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={instrumental}
                    onChange={(e) => setInstrumental(e.target.checked)}
                    className="accent-pink-500"
                  />
                  純音樂
                </label>
                <div className="flex rounded-lg border border-ink-700 overflow-hidden text-xs">
                  <button
                    onClick={() => setLyricsMode("auto")}
                    className={`px-3 py-1 ${lyricsMode === "auto" ? "bg-pink-500 text-white" : "text-ink-500"}`}
                  >
                    自動生成
                  </button>
                  <button
                    onClick={() => setLyricsMode("custom")}
                    className={`px-3 py-1 ${lyricsMode === "custom" ? "bg-pink-500 text-white" : "text-ink-500"}`}
                  >
                    自定義
                  </button>
                </div>
              </div>
            </div>
            {lyricsMode === "custom" && !instrumental && (
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                rows={5}
                placeholder={"[Verse]\n寫下你的歌詞…\n\n[Chorus]\n副歌部分"}
                className="w-full rounded-xl border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-white placeholder-ink-500 focus:border-pink-500/60 focus:outline-none resize-none font-mono"
              />
            )}
            {(lyricsMode === "auto" || instrumental) && (
              <p className="text-sm text-ink-500 py-4 text-center">
                {instrumental ? "🎹 將生成無人聲純音樂" : "✨ Hakura 會根據描述自動創作歌詞"}
              </p>
            )}
          </div>

          {/* Style selectors */}
          <div className="rounded-2xl border border-ink-800 bg-ink-900 p-5 space-y-4">
            <div>
              <label className="font-mono text-xs text-ink-500 mb-2 block">風格</label>
              <div className="flex flex-wrap gap-2">
                {GENRES.slice(0, 8).map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGenre(g.id)}
                    className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                      genre === g.id
                        ? "bg-pink-500 text-white"
                        : "border border-ink-700 text-ink-500 hover:border-pink-500/50"
                    }`}
                  >
                    {g.emoji} {g.name}
                  </button>
                ))}
              </div>
            </div>
            {!instrumental && (
              <div>
                <label className="font-mono text-xs text-ink-500 mb-2 block">人聲</label>
                <div className="flex flex-wrap gap-2">
                  {VOCAL_OPTIONS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVocal(v.id)}
                      className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                        vocal === v.id
                          ? "bg-purple-500 text-white"
                          : "border border-ink-700 text-ink-500 hover:border-purple-500/50"
                      }`}
                    >
                      {v.emoji} {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="flex items-center gap-2 font-mono text-xs text-ink-500 mb-2">
                <Smile className="w-3.5 h-3.5" /> 情緒
              </label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`rounded-full px-3 py-1 text-xs transition-colors ${
                      mood === m
                        ? "bg-orange-400 text-ink-950"
                        : "border border-ink-700 text-ink-500 hover:border-orange-400/50"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={phase === "generating" || (!desc.trim() && lyricsMode === "custom" && !lyrics.trim())}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 py-4 font-bold text-white text-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {phase === "generating" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> 生成中…
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> 生成歌曲（10 credits）
              </>
            )}
          </button>
        </div>

        {/* ── 右：生成狀態 / 結果 ── */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-ink-800 bg-ink-900 p-5 sticky top-20">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">
              <Music2 className="w-5 h-5 text-pink-400" /> 生成結果
            </h2>

            {phase === "idle" && (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-ink-800 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7 text-ink-500" />
                </div>
                <p className="text-sm text-ink-500">填寫描述，點擊生成</p>
                <p className="text-xs text-ink-500 mt-1">每次生成 2 個版本</p>
              </div>
            )}

            {phase === "generating" && (
              <div className="py-10">
                <div className="space-y-3">
                  {GEN_STEPS.map((s, i) => (
                    <div key={s} className="flex items-center gap-3 text-sm">
                      {i < step ? (
                        <span className="w-5 h-5 rounded-full bg-signal-500 text-ink-950 flex items-center justify-center text-xs">✓</span>
                      ) : i === step ? (
                        <Loader2 className="w-5 h-5 text-pink-400 animate-spin" />
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-ink-600" />
                      )}
                      <span className={i <= step ? "text-white" : "text-ink-500"}>{s}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-1.5 rounded-full bg-ink-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
                    style={{ width: `${(step / GEN_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {phase === "done" && (
              <div className="space-y-3">
                {results.map((r) => (
                  <div key={r.id} className="rounded-xl border border-ink-700 bg-ink-950 p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-lg bg-gradient-to-br ${
                          COVER_GRADIENTS[r.genre] ?? "from-purple-500 to-pink-400"
                        } flex items-center justify-center text-2xl shrink-0`}
                      >
                        {r.cover}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white text-sm truncate">{r.title}</p>
                        <p className="text-xs text-ink-500">
                          {GENRES.find((g) => g.id === r.genre)?.name} · {r.mood} · {Math.floor(r.duration / 60)}:
                          {(r.duration % 60).toString().padStart(2, "0")}
                        </p>
                      </div>
                      <button
                        onClick={() => play(r, results)}
                        className="w-9 h-9 rounded-full bg-white text-ink-950 flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                        aria-label="play"
                      >
                        <Play className="w-4 h-4 ml-0.5" />
                      </button>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 rounded-lg border border-ink-700 py-1.5 text-xs text-ink-500 hover:text-white transition-colors inline-flex items-center justify-center gap-1">
                        <Download className="w-3 h-3" /> 下載
                      </button>
                      <button
                        onClick={() => setPhase("idle")}
                        className="flex-1 rounded-lg border border-ink-700 py-1.5 text-xs text-ink-500 hover:text-white transition-colors inline-flex items-center justify-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> 重新生成
                      </button>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-ink-500 text-center pt-1">
                  ✨ Demo 模式：生成為模擬結果，接入開源音樂模型後可用真實音頻。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
