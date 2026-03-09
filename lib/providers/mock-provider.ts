import { EmploymentType, RemoteType } from '@prisma/client';
import { JobSourceProvider, SearchProfileInput } from './types';

export class MockProvider implements JobSourceProvider {
  key = 'mock';
  displayName = 'Mock Feed';

  async searchJobs(profile: SearchProfileInput) {
    const keyword = profile.keywords[0] ?? 'Software Engineer';
    return [
      {
        externalId: `${profile.id}-1`,
        source: this.key,
        sourceJobUrl: 'https://example.com/job/1',
        title: `${keyword} - Frontend`,
        company: 'Acme Tech',
        location: 'Taipei',
        remoteType: RemoteType.HYBRID,
        employmentType: EmploymentType.FULL_TIME,
        salaryMin: 90000,
        salaryMax: 130000,
        currency: 'TWD',
        descriptionSnippet: 'Build productivity dashboard features.',
        postedAt: new Date(),
        rawPayload: { provider: 'mock', rank: 1 }
      },
      {
        externalId: `${profile.id}-2`,
        source: this.key,
        sourceJobUrl: 'https://example.com/job/2',
        title: `${keyword} - Backend`,
        company: 'NextWave',
        location: 'Remote',
        remoteType: RemoteType.REMOTE,
        employmentType: EmploymentType.CONTRACT,
        descriptionSnippet: 'API platform and data pipelines.',
        postedAt: new Date(),
        rawPayload: { provider: 'mock', rank: 2 }
      }
    ];
  }
}
