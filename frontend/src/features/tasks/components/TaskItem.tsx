'use client';

import { useState } from 'react';
import type { Task, TaskStatus } from '@/lib/types/task';
import { updateTaskAction } from '@/features/tasks/actions/updateTask';
import { deleteTaskAction } from '@/features/tasks/actions/deleteTask';
import { TaskStatusBadge } from '@/features/tasks/components/TaskStatusBadge';
import { markTaskAsDoneAction } from '../actions/markTaskAsDone';
import TaskCard from './TaskCard';
import { Pencil, Trash2, Check } from 'lucide-react';
import { isValidStatusTransition, taskStatuses } from '@/lib/taskStatusValidation';

const STATUS_OPTIONS: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'DONE', 'ARCHIVED'];

type TaskItemProps = {
  task: Task;
  onUpdate?: () => void;
};

export default function TaskItem({ task, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetToTask = () => {
    setTitle(task.title);
    setDescription(task.description ?? '');
    setStatus(task.status);
    setError(null);
  };

  const handleCancel = () => {
    resetToTask();
    setIsEditing(false);
  };

  const handleSave = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!isValidStatusTransition(task.status, status)) {
      setError('Invalid status transition');
      return;
    }

    setIsSubmitting(true);
    const result = await updateTaskAction(task.id, {
      title: title.trim(),
      description: description.trim() || null,
      status,
    });
    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    setIsEditing(false);
    onUpdate?.();
  };

  const handleDelete = async () => {
    const result = await deleteTaskAction({ taskId: task.id });
    setIsSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    onUpdate?.();
  };

  const handleMarkAsDone = async () => {
    const result = await markTaskAsDoneAction(task.id);
    if (result.error) {
      setError(result.error);
      return;
    }
    onUpdate?.();
  };

  if (isEditing) {
    return (
      <TaskCard>
        <form onSubmit={handleSave} className='space-y-3'>
          {error && <p className='rounded-lg px-3 py-2 text-sm bg-red-950 text-red-300'>{error}</p>}
          <div>
            <label
              htmlFor={`task-title-${task.id}`}
              className='mb-1 block text-sm font-medium text-foreground'
            >
              Title
            </label>
            <input
              id={`task-title-${task.id}`}
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full rounded-lg border px-3 py-2 text-foreground focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 border-zinc-700 bg-zinc-800'
              disabled={isSubmitting}
              autoFocus
            />
          </div>
          {task.status !== 'DONE' && (
            <div>
              <label
                htmlFor={`task-desc-${task.id}`}
                className='mb-1 block text-sm font-medium text-foreground'
              >
                Description
              </label>

              <textarea
                id={`task-desc-${task.id}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className='h-40 w-full resize-y rounded-lg border px-3 py-2 text-foreground focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 border-zinc-700 bg-zinc-800'
                disabled={isSubmitting}
              />
            </div>
          )}
          <div>
            <label
              htmlFor={`task-status-${task.id}`}
              className='mb-1 block text-sm font-medium text-foreground'
            >
              Status
            </label>
            <select
              id={`task-status-${task.id}`}
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className='w-full rounded-lg border px-3 py-2 text-foreground focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 border-zinc-700 bg-zinc-800'
              disabled={isSubmitting}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div className='flex gap-2 pt-1'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50 bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
            >
              {isSubmitting ? 'Saving…' : 'Save'}
            </button>
            <button
              type='button'
              onClick={handleCancel}
              disabled={isSubmitting}
              className='rounded-lg border px-4 py-2 text-sm font-medium text-foreground  disabled:opacity-50 border-zinc-700 bg-zinc-800 hover:bg-zinc-700'
            >
              Cancel
            </button>
          </div>
        </form>
      </TaskCard>
    );
  }

  return (
    <TaskCard>
      <div className='min-w-0 flex-1'>
        {/* Top Row */}
        <div className='flex items-center justify-between mb-4'>
          <TaskStatusBadge status={task.status} />
          <div className='flex items-center gap-1'>
            {task.status == 'IN_PROGRESS' && (
              <button
                type='button'
                onClick={handleMarkAsDone}
                disabled={isSubmitting}
                className='rounded-lg p-2 text-zinc-500 hover:bg-emerald-800 hover:text-emerald-200 transition-colors cursor-pointer'
              >
                <Check size={16} strokeWidth={2} />
              </button>
            )}
            {task.status !== 'ARCHIVED' && (
              <button
                type='button'
                onClick={() => setIsEditing(true)}
                className='rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer'
              >
                <Pencil size={16} strokeWidth={2} />
              </button>
            )}
            <button
              type='button'
              onClick={handleDelete}
              className='rounded-lg p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer'
            >
              <Trash2 size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
        <h2 className='font-semibold text-foreground'>{task.title}</h2>
        {task.description && <p className='mt-1 text-sm text-gray-400'>{task.description}</p>}
      </div>
    </TaskCard>
  );
}
