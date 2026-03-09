import { EmploymentType, RemoteType } from '@prisma/client';
import { prisma } from '@/lib/prisma';

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: { email: 'demo@example.com', name: 'Demo User' }
  });

  const profile = await prisma.searchProfile.upsert({
    where: { id: 'demo-profile-id' },
    update: {},
    create: {
      id: 'demo-profile-id',
      userId: user.id,
      name: 'Frontend Taiwan Remote',
      keywords: ['React', 'TypeScript'],
      excludeKeywords: ['Senior Staff'],
      titleKeywords: ['Frontend Engineer', 'Fullstack Engineer'],
      locationKeywords: ['Taipei', 'Remote'],
      remoteType: RemoteType.HYBRID,
      salaryMin: 80000,
      employmentType: EmploymentType.FULL_TIME,
      experienceLevel: 'Mid',
      targetCompanies: ['Acme Tech', 'NextWave'],
      excludeCompanies: ['Spam Corp'],
      sourceWebsites: ['mock', 'rss-placeholder'],
      searchFrequency: 'daily'
    }
  });

  await prisma.jobPosting.createMany({
    data: [
      {
        source: 'mock',
        externalId: 'seed-1',
        sourceJobUrl: 'https://example.com/jobs/seed-1',
        title: 'Frontend Engineer',
        company: 'Acme Tech',
        location: 'Taipei',
        remoteType: RemoteType.HYBRID,
        employmentType: EmploymentType.FULL_TIME,
        salaryMin: 90000,
        salaryMax: 120000,
        currency: 'TWD',
        descriptionSnippet: 'Build dashboard UI and data workflows',
        profileId: profile.id,
        dedupeHash: 'seed-hash-1'
      }
    ],
    skipDuplicates: true
  });

  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id, timezone: 'Asia/Taipei', summaryEmail: 'demo@example.com' }
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
