import crypto from 'node:crypto';
import { JobResult } from '@/lib/providers/types';

function normalizeUrl(url: string) {
  return url.trim().toLowerCase().replace(/\/$/, '');
}

export function buildDedupeHash(job: JobResult) {
  if (job.externalId) {
    return crypto.createHash('sha256').update(`${job.source}:${job.externalId}`).digest('hex');
  }

  const secondary = `${job.title}|${job.company}|${job.location ?? ''}|${normalizeUrl(job.sourceJobUrl)}`;
  return crypto.createHash('sha256').update(secondary.toLowerCase()).digest('hex');
}
