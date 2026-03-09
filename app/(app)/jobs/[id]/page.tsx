import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await prisma.jobPosting.findUnique({ where: { id: params.id } });
  if (!job) return notFound();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{job.title}</h2>
      <Card>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Source:</strong> <a className="text-blue-600" href={job.sourceJobUrl} target="_blank">Open original</a></p>
      </Card>
      <Card>
        <h3 className="mb-2 font-medium">Description</h3>
        <p className="text-sm text-slate-700">{job.fullDescription ?? job.descriptionSnippet ?? 'No description'}</p>
      </Card>
    </div>
  );
}
