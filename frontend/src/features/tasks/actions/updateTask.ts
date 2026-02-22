'use server';

import type { TaskStatus } from '@/lib/types/task';
import { getCookieHeader } from '@/lib/auth/server';

export type UpdateTaskInput = {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
};

export async function updateTaskAction(taskId: string, input: UpdateTaskInput) {
  try {
    const cookieHeader = await getCookieHeader();
    const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...(input.title !== undefined && { title: input.title.trim() }),
        ...(input.description !== undefined && {
          description: input.description?.trim() || null,
        }),
        ...(input.status !== undefined && { status: input.status }),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { data: null, error: data?.message ?? 'Failed to update task' };
    }
    return data;
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Failed to update task';
    return { data: null, error };
  }
}
