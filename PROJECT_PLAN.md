# Hakura 專案憲法（PROJECT_PLAN）

**項目名稱**：Hakura（hakura.intel）
**定位**：Growth Intelligence Teardown — 證據驅動的競品情報逆向服務
**創建日期**：2026-10-11
**狀態**：🟢 已上線（hakura-intel.vercel.app）

---

## 1. 北極星指標

**每週新增 1 份樣本報告，直到獲得第一個付費客戶。**
- 過程指標：報告庫規模、網站流量、lead 提交數
- 結果指標：付費轉化（第一單 $99 Recon 起步）

## 2. 定義完成（DoD）

### v1.0「上線」— 2026-10-11 ✅
- [x] Next.js 16 站點（暗色情報風，Tailwind + Framer Motion）
- [x] 5 個頁面：首頁 / 報告庫 / 報告詳情 / 方法論 / 定價
- [x] 2 個 API：/api/lead（委託接收）/ /api/cron（健康檢查）
- [x] 數據層 data/reports.json（Mureka 首樣本，附 evidence IDs）
- [x] 三檔定價：Recon $99 / Teardown $399 / Watchtower $149/月
- [x] 自動化：Vercel cron（每週一 09:00 HKT 健康檢查）+ GitHub Actions 每週站點存活檢查
- [x] 本機 build 通過（11 路由全靜態生成）
- [x] GitHub repo + Vercel 部署上線

### v1.1「市場驗證」— 目標 2026-11-11（4 週）
- [ ] 3 份免費公開案例（Suno / Udio / ElevenLabs）
- [ ] V2EX / 即刻 / Twitter 發文測試市場水溫
- [ ] lead 表單接入 KV 持久化（目前 console.log）
- [ ] 至少 1 次付費意願對話（私信/郵件）

### v1.2「自動化管線」— 目標 2026-12-11（8 週）
- [ ] Watchtower 自動化：Hermes cron 每週重跑既有報告的逆向管線
- [ ] 變化警報：新廣告帳號 / 定價變更 / 新功能組件 → Telegram 推送
- [ ] 報告庫靜態生成（md → 頁面）半自動化

### v2.0「對話式情報」— 目標 2027-Q1
- [ ] Ask 功能：對話式查詢競品情報
- [ ] 行業數據庫（同業多競品交叉對比）
- [ ] 月報 / 季報自動彙編

## 3. 維護節奏（完工後）

| 週期 | 動作 | 負責 |
|---|---|---|
| 每週一 09:00 HKT | Vercel cron 健康檢查（報告過期標記） | 自動 |
| 每週 | GitHub Actions 站點存活檢查 + 依賴過期通知 | 自動 |
| 每週 | 新增 1 份樣本報告（或受委託） | 念念 + 小磨 |
| 每月 | 路線圖進度回顧 + 定價調整決策 | 小磨 |

## 4. 暫停條件（出現任一即停下來重新評估）

1. **4 週內 3 份免費案例零市場反應**（無私信、無轉發、無 lead）→ 重新定位
2. **法律風險出現**（任何客戶要求違法用途）→ 立即停止該委託
3. **自動化管線維護成本 > 手動產出成本** → 退回半自動模式
4. **3 個月內零付費** → 將 Hakura 降級為個人作品集，不再投入

## 5. 技術架構（固定不變的部分）

- **框架**：Next.js 16 App Router + TypeScript + Tailwind v4
- **動畫**：Framer Motion（client components，metadata 分離 server/client）
- **圖標**：lucide-react
- **部署**：Vercel（GitHub push → auto-deploy，main 分支）
- **數據**：data/reports.json（靜態，構建時讀取）
- **逆向引擎**：REA (rea-agents) 本地 CLI + 自研 spa-web-teardown skill 工作流
- **設計語言**：暗色情報風（ink-950 底、signal-400 綠、mono 字體、grid 背景）

## 6. 工作流約定

- **推報告**：更新 data/reports.json → commit → push → auto-deploy（Vercel 即時生效）
- **新頁面**：Client 組件（動畫）與 Server page（metadata）分離，避免 build 錯誤
- **域名**：hakura.dev（郵件 intel@hakura.dev；待購買，目前 mailto 已埋點）
- **品牌名詞**：Hakura = 探測/掃描（雷達意象），.intel = intelligence

## 7. 已知債務

- lead 表單目前 console.log，未接 KV（v1.1 處理）
- 報告全文 markdown 渲染為靜態結構化數據，非 md 直渲（可接受）
- chrome_profile 暫存檔因 Windows 檔鎖未清理（無害）
- 未買 hakura.dev 域名（用 vercel.app 子域名運作中）
