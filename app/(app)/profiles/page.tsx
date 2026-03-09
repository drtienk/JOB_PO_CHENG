import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';

export default async function ProfilesPage() {
  const profiles = await prisma.searchProfile.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Search Profiles</h2>
      {profiles.map((profile) => (
        <Card key={profile.id} className="space-y-1">
          <h3 className="font-medium">{profile.name}</h3>
          <p className="text-sm text-slate-600">Keywords: {profile.keywords.join(', ')}</p>
          <p className="text-sm text-slate-600">Sources: {profile.sourceWebsites.join(', ')}</p>
        </Card>
      ))}
    </div>
  );
}
