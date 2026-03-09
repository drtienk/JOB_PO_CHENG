import { JobSourceProvider } from './types';
import { MockProvider } from './mock-provider';
import { RssPlaceholderProvider } from './rss-placeholder-provider';

export const providers: Record<string, JobSourceProvider> = {
  mock: new MockProvider(),
  'rss-placeholder': new RssPlaceholderProvider()
};
