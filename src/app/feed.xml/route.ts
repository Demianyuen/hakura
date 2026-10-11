import { getAllReports, getSiteData } from "@/lib/data";

const SITE_URL = "https://hakura-intel.vercel.app";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const reports = getAllReports().sort((a, b) => b.date.localeCompare(a.date));
  const { services } = getSiteData();
  const now = new Date().toUTCString();

  const items = reports
    .map(
      (r) => `    <item>
      <title>${escapeXml(r.title)}</title>
      <link>${SITE_URL}${r.fullReportUrl ?? `/reports/${r.id}`}</link>
      <guid isPermaLink="true">${SITE_URL}${r.fullReportUrl ?? `/reports/${r.id}`}</guid>
      <pubDate>${new Date(r.date).toUTCString()}</pubDate>
      <category>${escapeXml(r.category)}</category>
      <description>${escapeXml(r.tldr)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>hakura.intel — Growth Intelligence Teardown</title>
    <link>${SITE_URL}</link>
    <description>證據驅動的競品情報逆向服務：增長棧、技術架構、商業模式拆解，每個結論附可驗證證據。</description>
    <language>zh-Hant</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>hakura.intel</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
