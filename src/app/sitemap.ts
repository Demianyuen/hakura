import type { MetadataRoute } from "next";
import { getAllReports } from "@/lib/data";

const SITE_URL = "https://hakura-intel.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const reports = getAllReports();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/reports`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/compare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/methodology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const reportPages: MetadataRoute.Sitemap = reports.map((r) => ({
    url: r.fullReportUrl ? `${SITE_URL}${r.fullReportUrl}` : `${SITE_URL}/reports/${r.id}`,
    lastModified: new Date(r.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...reportPages];
}
