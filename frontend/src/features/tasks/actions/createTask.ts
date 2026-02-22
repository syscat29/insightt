'use server';

import { getCookieHeader } from '@/lib/auth/server';
import type { TaskStatus } from '@/lib/types/task';

export type CreateTaskInput = {
  title: string;
  description?: string | null;
  status?: TaskStatus;
};

export async function createTaskAction(input: CreateTaskInput) {
  try {
    const cookieHeader = await getCookieHeader();
    const res = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: input.title.trim(),
        description: input.description?.trim() || null,
        status: input.status ?? 'PENDING',
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { data: null, error: data?.message ?? 'Failed to create task' };
    }
    return data;
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Failed to create task';
    return { data: null, error };
  }
}
