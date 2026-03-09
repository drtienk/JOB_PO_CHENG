'use server';

import { revalidatePath } from 'next/cache';
import { runAllActiveProfileSearches } from '@/lib/services/search-orchestrator';

export async function runSearchNowAction() {
  await runAllActiveProfileSearches();
  revalidatePath('/dashboard');
  revalidatePath('/jobs');
  revalidatePath('/runs');
}
