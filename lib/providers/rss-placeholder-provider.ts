import { JobSourceProvider, SearchProfileInput } from './types';

export class RssPlaceholderProvider implements JobSourceProvider {
  key = 'rss-placeholder';
  displayName = 'RSS / Public API Placeholder';

  async searchJobs(_profile: SearchProfileInput) {
    return [];
  }
}
