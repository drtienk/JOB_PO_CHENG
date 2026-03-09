import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';

export default async function RunsPage() {
  const runs = await prisma.searchRun.findMany({
    include: { profile: true, source: true },
    orderBy: { startedAt: 'desc' },
    take: 50
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Search Runs</h2>
      {runs.map((run) => (
        <Card key={run.id} className="flex justify-between text-sm">
          <span>{run.profile.name} / {run.source.displayName}</span>
          <span>{run.status} | found {run.discovered} | inserted {run.inserted} | deduped {run.deduped}</span>
        </Card>
      ))}
    </div>
  );
}
