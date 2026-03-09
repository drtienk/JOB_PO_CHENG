'use client';

import Link from 'next/link';
import { useState } from 'react';
import { JobPosting } from '@prisma/client';
import { Badge } from '@/components/ui/badge';

export function JobTable({ jobs }: { jobs: JobPosting[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <div className="p-3 text-sm">Selected: {selected.length} (batch action placeholder)</div>
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-2">#</th><th className="p-2">Title</th><th className="p-2">Company</th><th className="p-2">Location</th><th className="p-2">Status</th><th className="p-2">Star</th><th className="p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t">
              <td className="p-2"><input type="checkbox" checked={selected.includes(job.id)} onChange={() => toggle(job.id)} /></td>
              <td className="p-2"><Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">{job.title}</Link></td>
              <td className="p-2">{job.company}</td>
              <td className="p-2">{job.location ?? '-'}</td>
              <td className="p-2"><Badge>{job.status}</Badge></td>
              <td className="p-2">{job.starred ? '⭐' : '☆'}</td>
              <td className="p-2">{job.notes?.slice(0, 30) ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
