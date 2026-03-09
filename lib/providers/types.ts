import { EmploymentType, RemoteType } from '@prisma/client';

export type JobResult = {
  externalId?: string;
  source: string;
  sourceJobUrl: string;
  title: string;
  company: string;
  location?: string;
  remoteType?: RemoteType;
  employmentType?: EmploymentType;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  descriptionSnippet?: string;
  fullDescription?: string;
  postedAt?: Date;
  rawPayload?: Record<string, unknown>;
};

export type SearchProfileInput = {
  id: string;
  keywords: string[];
  titleKeywords: string[];
  locationKeywords: string[];
  targetCompanies: string[];
};

export interface JobSourceProvider {
  key: string;
  displayName: string;
  searchJobs(profile: SearchProfileInput): Promise<JobResult[]>;
}
