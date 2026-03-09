import { NextResponse } from 'next/server';
import { runAllActiveProfileSearches } from '@/lib/services/search-orchestrator';

export async function POST() {
  const result = await runAllActiveProfileSearches();
  return NextResponse.json({ ok: true, result });
}
