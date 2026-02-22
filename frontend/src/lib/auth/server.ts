'use server';

import { cookies } from 'next/headers';

export type ServerUser = { id: string; name: string; email: string } | null;

export async function getSession(): Promise<ServerUser> {
  const cookieStore = await cookies();
  const token = cookieStore.get('better-auth.session_token')?.value;
  if (!token) return null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/get-session`, {
    headers: { cookie: `better-auth.session_token=${token}` },
  });
  const data = await res.json();
  return data?.user ?? null;
}

export async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get('better-auth.session_token')?.value;
  const cookieHeader = token ? `better-auth.session_token=${token}` : '';
  return cookieHeader;
}
