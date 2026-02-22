'use server';

import { getCookieHeader } from '@/lib/auth/server';

export async function markTaskAsDoneAction(taskId: string) {
  try {
    const cookieHeader = await getCookieHeader();
    const res = await fetch(`http://localhost:3000/api/tasks/${taskId}/done`, {
      method: 'POST',
      headers: {
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return { data: null, error: data?.message ?? 'Failed to mark task as done' };
    }
    return data;
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Failed to mark task as done';
    return { data: null, error };
  }
}
