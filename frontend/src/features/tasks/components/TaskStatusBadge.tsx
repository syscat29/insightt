import type { TaskStatus } from '@/lib/types/task';

const statusStyles: Record<TaskStatus, string> = {
  PENDING: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  IN_PROGRESS: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  DONE: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  ARCHIVED: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-medium tracking-wide border uppercase ${statusStyles[status]}`}
    >
      <span>{status.replace('_', ' ')}</span>
    </div>
  );
}
