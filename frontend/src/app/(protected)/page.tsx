import TaskList from '@/features/tasks/components/TaskList';
import { getTasksAction } from '@/features/tasks/actions/getTasks';

export default async function TasksPage() {
  const { data, error } = await getTasksAction();

  return (
    <div className='mx-auto max-w-3xl px-4 py-8'>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-foreground'>Tasks</h1>
        </div>
      </div>
      <TaskList tasks={data || []} error={error || null} />
    </div>
  );
}
