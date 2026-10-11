export default function Footer() {
  return (
    <footer className="border-t border-ink-700 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-mono font-bold text-white mb-2">
            hakura<span className="text-signal-400">.</span>intel
          </p>
          <p className="text-ink-500 leading-relaxed">
            增長情報逆向服務。
            <br />
            Growth Intelligence Teardown.
          </p>
        </div>
        <div>
          <p className="font-mono text-ink-500 mb-2">導航</p>
          <div className="flex flex-col gap-1.5">
            <a href="/reports" className="text-ink-500 hover:text-signal-400 transition-colors">報告庫</a>
            <a href="/methodology" className="text-ink-500 hover:text-signal-400 transition-colors">方法論</a>
            <a href="/pricing" className="text-ink-500 hover:text-signal-400 transition-colors">服務定價</a>
          </div>
        </div>
        <div>
          <p className="font-mono text-ink-500 mb-2">法律邊界</p>
          <p className="text-ink-500 leading-relaxed text-xs">
            所有分析基於公開頁面與授權帳戶的靜態/被動觀察，
            不破解、不繞過安全機制、不批量爬取。
            分析結論附可驗證證據（sha256）。
          </p>
        </div>
      </div>
      <div className="border-t border-ink-800 px-6 py-4 text-center text-xs text-ink-500 font-mono">
        © 2026 hakura.intel — evidence-backed competitive intelligence
      </div>
    </footer>
  );
}
