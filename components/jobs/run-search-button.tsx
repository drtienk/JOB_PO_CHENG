import { runSearchNowAction } from '@/lib/actions/search-actions';
import { Button } from '@/components/ui/button';

export function RunSearchButton() {
  return (
    <form action={runSearchNowAction}>
      <Button type="submit">Run Search Now</Button>
    </form>
  );
}
