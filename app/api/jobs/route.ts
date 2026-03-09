import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const jobs = await prisma.jobPosting.findMany({ orderBy: { discoveredAt: 'desc' }, take: 100 });
  return NextResponse.json(jobs);
}
