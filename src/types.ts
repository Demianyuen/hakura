export interface ReportSection {
  techStack?: string;
  apiEndpoints?: number;
  components?: number;
  adAccounts?: number;
  pixels?: string[];
  payments?: string[];
  evidenceIds?: string[];
  models?: number;
  plans?: string[];
  analytics?: string[];
  status?: string;
}

export interface Report {
  id: string;
  target: string;
  title: string;
  category: string;
  date: string;
  tldr: string;
  keyFindings: string[];
  sections: ReportSection;
  fullReportUrl: string | null;
}

export interface MethodologyPhase {
  phase: number;
  name: string;
  tools: string;
  output: string;
}

export interface ServiceTier {
  tier: string;
  price: string;
  unit: string;
  tagline: string;
  includes: string[];
  cta: string;
}

export interface RoadmapItem {
  quarter: string;
  milestone: string;
}

export interface SiteData {
  reports: Report[];
  methodology: {
    name: string;
    phases: MethodologyPhase[];
    evidenceStandard: string;
    legalBoundary: string;
  };
  services: ServiceTier[];
  roadmap: RoadmapItem[];
}
