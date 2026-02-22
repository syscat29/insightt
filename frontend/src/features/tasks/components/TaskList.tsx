'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Task } from '@/lib/types/task';
import CreateTaskForm from '@/features/tasks/components/CreateTaskForm';
import TaskItem from '@/features/tasks/components/TaskItem';

type TaskListProps = {
  tasks: Task[];
  error: string | null;
};

export default function TaskList({ tasks, error }: TaskListProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const router = useRouter();

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    router.refresh();
  };

  return (
    <section>
      {!showCreateForm && (
        <button
          type='button'
          onClick={() => setShowCreateForm(true)}
          className='mb-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
        >
          Create task
        </button>
      )}
      {showCreateForm && (
        <CreateTaskForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreateForm(false)} />
      )}
      {error && (
        <p className='mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300'>
          {error}
        </p>
      )}
      {!error && tasks.length === 0 && (
        <p className='text-sm text-zinc-500 dark:text-zinc-400'>No tasks created.</p>
      )}
      {!error && tasks.length > 0 && (
        <ul className='space-y-3'>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onUpdate={() => router.refresh()} />
          ))}
        </ul>
      )}
    </section>
  );
}
