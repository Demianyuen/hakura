# hakura.intel

**Growth Intelligence Teardown** — evidence-backed competitive intelligence.

看見競品不想讓你看見的東西：增長棧、技術架構、商業模式 —— 每個結論附可驗證證據（sha256）。

## 服務

| 方案 | 價格 | 內容 |
|---|---|---|
| Recon | $99 / 份 | 快速競品指紋（增長棧逆向 + 團隊歸屬），24h 交付 |
| Teardown | $399 / 份 | 完整情報拆解（含技術架構 + 復刻評估），48h 交付 |
| Watchtower | $149 / 月 | 3–5 個競品持續監控 + 變化警報 |

委託：intel@hakura.dev

## 技術棧

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- Framer Motion + lucide-react
- Vercel 部署（GitHub push → auto-deploy）
- 逆向引擎：REA (rea-agents) + spa-web-teardown 工作流

## 本地開發

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 生產構建驗證
```

## 自動化

- **Vercel Cron**：每週一 09:00 HKT 調用 `/api/cron` 檢查報告庫健康（過期標記）
- **GitHub Actions**：每週站點存活檢查
- **報告更新**：修改 `data/reports.json` → commit → push → 自動部署

## 項目治理

見 [PROJECT_PLAN.md](PROJECT_PLAN.md) —— 北極星指標、DoD、維護節奏、暫停條件。

## 法律邊界

所有分析基於公開頁面與授權帳戶的靜態/被動觀察，不破解付費牆、不繞過安全機制、不批量爬取。

## License

MIT
