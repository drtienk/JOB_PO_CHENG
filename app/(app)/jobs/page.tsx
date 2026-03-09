import { prisma } from '@/lib/prisma';
import { JobTable } from '@/components/jobs/job-table';
import { Input } from '@/components/ui/input';

export default async function JobsPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q;
  const jobs = await prisma.jobPosting.findMany({
    where: query
      ? {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { company: { contains: query, mode: 'insensitive' } }
          ]
        }
      : undefined,
    orderBy: { discoveredAt: 'desc' },
    take: 100
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Job Listings</h2>
      <form className="max-w-sm"><Input name="q" placeholder="Search title/company..." defaultValue={query} /></form>
      <JobTable jobs={jobs} />
    </div>
  );
}
