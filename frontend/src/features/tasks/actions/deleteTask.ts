'use server';

import { getCookieHeader } from '@/lib/auth/server';

export type DeleteTaskInput = {
  taskId: string;
};

export async function deleteTaskAction(input: DeleteTaskInput) {
  try {
    const cookieHeader = await getCookieHeader();
    const res = await fetch(`http://localhost:3000/api/tasks/${input.taskId}`, {
      method: 'DELETE',
      headers: {
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return { data: null, error: data?.message ?? 'Failed to delete task' };
    }
    return data;
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Failed to delete task';
    return { data: null, error };
  }
}
