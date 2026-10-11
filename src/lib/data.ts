import data from "../../data/reports.json";
import type { SiteData, Report } from "../types";

const siteData = data as SiteData;

export function getAllReports(): Report[] {
  return siteData.reports.filter((r) => r.fullReportUrl !== null);
}

export function getReportById(id: string): Report | undefined {
  return siteData.reports.find((r) => r.id === id);
}

export function getSiteData(): SiteData {
  return siteData;
}
