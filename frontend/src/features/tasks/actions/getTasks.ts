'use server';

import { getCookieHeader } from '@/lib/auth/server';

export async function getTasksAction() {
  try {
    const cookieHeader = await getCookieHeader();
    const res = await fetch('http://localhost:3000/api/tasks', {
      method: 'GET',
      headers: {
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await res.json();

    return data;
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Failed to load tasks';
    return error;
  }
}
