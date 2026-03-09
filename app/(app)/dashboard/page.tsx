import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';
import { RunSearchButton } from '@/components/jobs/run-search-button';

export default async function DashboardPage() {
  const [todayNew, profiles, runs, recentJobs] = await Promise.all([
    prisma.jobPosting.count({ where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
    prisma.searchProfile.findMany({ include: { _count: { select: { jobPostings: true } } } }),
    prisma.searchRun.findMany({ orderBy: { startedAt: 'desc' }, take: 5, include: { profile: true, source: true } }),
    prisma.jobPosting.findMany({ orderBy: { discoveredAt: 'desc' }, take: 8 })
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <RunSearchButton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-slate-500">Today New</p><p className="text-2xl font-bold">{todayNew}</p></Card>
        <Card><p className="text-sm text-slate-500">Profiles</p><p className="text-2xl font-bold">{profiles.length}</p></Card>
        <Card><p className="text-sm text-slate-500">Need Review</p><p className="text-2xl font-bold">{recentJobs.filter((j) => j.status === 'NEW').length}</p></Card>
        <Card><p className="text-sm text-slate-500">Deduped Remaining</p><p className="text-2xl font-bold">{recentJobs.length}</p></Card>
      </div>
      <Card>
        <h3 className="mb-3 font-medium">Profile Summary</h3>
        <div className="space-y-2 text-sm">
          {profiles.map((p) => (
            <div key={p.id} className="flex justify-between border-b pb-2">
              <span>{p.name}</span>
              <span>{p._count.jobPostings} jobs</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="mb-3 font-medium">Recent Runs</h3>
        <div className="space-y-2 text-sm">
          {runs.map((r) => (
            <div key={r.id} className="flex justify-between border-b pb-2">
              <span>{r.profile.name} / {r.source.displayName}</span>
              <span>{r.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
