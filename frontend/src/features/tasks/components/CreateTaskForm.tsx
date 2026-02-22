'use client';

import { useState } from 'react';
import { createTaskAction } from '@/features/tasks/actions/createTask';

type CreateTaskFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export default function CreateTaskForm({ onSuccess, onCancel }: CreateTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setError(null);
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setIsSubmitting(true);
    const result = await createTaskAction({
      title: title.trim(),
      description: description.trim() || null,
    });
    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    resetForm();
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mb-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900'
    >
      {error && (
        <p className='mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300'>
          {error}
        </p>
      )}
      <div className='space-y-3'>
        <div>
          <label htmlFor='task-title' className='mb-1 block text-sm font-medium text-foreground'>
            Title
          </label>
          <input
            id='task-title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Task title'
            className='w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-foreground placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:placeholder:text-zinc-500'
            autoFocus
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label
            htmlFor='task-description'
            className='mb-1 block text-sm font-medium text-foreground'
          >
            Description (optional)
          </label>
          <textarea
            id='task-description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Add a description'
            rows={2}
            className='w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-foreground placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:placeholder:text-zinc-500'
            disabled={isSubmitting}
          />
        </div>
        <div className='flex gap-2 pt-1'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
          >
            {isSubmitting ? 'Creating…' : 'Create'}
          </button>
          <button
            type='button'
            onClick={handleCancel}
            disabled={isSubmitting}
            className='rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700'
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
