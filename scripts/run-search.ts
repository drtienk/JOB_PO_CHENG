import { runAllActiveProfileSearches } from '@/lib/services/search-orchestrator';

async function main() {
  const summary = await runAllActiveProfileSearches();
  console.log('Search run completed:', summary);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
