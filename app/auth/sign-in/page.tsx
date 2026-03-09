import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md space-y-3">
        <h2 className="text-xl font-semibold">Sign in (Placeholder)</h2>
        <p className="text-sm text-slate-600">Mock single-user mode, no real auth yet.</p>
        <Button>Continue as Demo User</Button>
      </Card>
    </div>
  );
}
