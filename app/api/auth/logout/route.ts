import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_CONFIG } from '@/app/lib/auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONFIG.SESSION_COOKIE);
  
  return NextResponse.json({ success: true });
}
