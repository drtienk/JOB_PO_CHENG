import { SearchProfile } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { providers } from '@/lib/providers';
import { logger } from '@/lib/logger';
import { buildDedupeHash } from './dedupe';

export async function runSearchForProfile(profile: SearchProfile) {
  let totalDiscovered = 0;
  let totalInserted = 0;
  let totalDeduped = 0;

  for (const sourceKey of profile.sourceWebsites) {
    const provider = providers[sourceKey];
    if (!provider) continue;

    const source = await prisma.jobSource.upsert({
      where: { key: sourceKey },
      update: {},
      create: { key: sourceKey, displayName: provider.displayName, type: 'provider' }
    });

    const run = await prisma.searchRun.create({
      data: { profileId: profile.id, sourceId: source.id, status: 'running' }
    });

    try {
      const results = await provider.searchJobs({
        id: profile.id,
        keywords: profile.keywords,
        titleKeywords: profile.titleKeywords,
        locationKeywords: profile.locationKeywords,
        targetCompanies: profile.targetCompanies
      });

      totalDiscovered += results.length;

      for (const result of results) {
        const dedupeHash = buildDedupeHash(result);

        const exists = await prisma.jobPosting.findFirst({
          where: {
            OR: [
              result.externalId
                ? { source: result.source, externalId: result.externalId }
                : { id: '__never__' },
              { dedupeHash }
            ]
          }
        });

        if (exists) {
          totalDeduped += 1;
          continue;
        }

        await prisma.jobPosting.create({
          data: {
            externalId: result.externalId,
            source: result.source,
            sourceJobUrl: result.sourceJobUrl,
            title: result.title,
            company: result.company,
            location: result.location,
            remoteType: result.remoteType,
            employmentType: result.employmentType,
            salaryMin: result.salaryMin,
            salaryMax: result.salaryMax,
            currency: result.currency,
            descriptionSnippet: result.descriptionSnippet,
            fullDescription: result.fullDescription,
            postedAt: result.postedAt,
            profileId: profile.id,
            dedupeHash,
            rawPayload: result.rawPayload as object
          }
        });
        totalInserted += 1;
      }

      await prisma.searchRun.update({
        where: { id: run.id },
        data: {
          status: 'success',
          finishedAt: new Date(),
          discovered: results.length,
          inserted: results.length - totalDeduped,
          deduped: totalDeduped
        }
      });
    } catch (error) {
      logger.error('search provider failed', { sourceKey, error });
      await prisma.searchRun.update({
        where: { id: run.id },
        data: { status: 'failed', finishedAt: new Date(), errorMessage: 'Provider run failed' }
      });
    }
  }

  return { totalDiscovered, totalInserted, totalDeduped };
}

export async function runAllActiveProfileSearches() {
  const profiles = await prisma.searchProfile.findMany({ where: { isActive: true } });
  const summaries = await Promise.all(profiles.map(runSearchForProfile));
  return summaries;
}
