import { Card } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <Card>
        <h3 className="font-medium">Notification</h3>
        <p className="text-sm text-slate-600">In-app summary is available on dashboard. Email summary integration is a stub architecture for now.</p>
      </Card>
    </div>
  );
}
