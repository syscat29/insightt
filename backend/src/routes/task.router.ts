import { Hono } from 'hono';
import { AppBindings } from '@/lib/types';
import { taskController } from '@/controllers/task.controller';

class TaskRouter {
  private readonly router = new Hono<AppBindings>();

  getRoutes(): Hono<AppBindings> {
    this.router.get('/', (c) => taskController.getTasks(c));
    this.router.get('/:id', (c) => taskController.getTaskById(c));
    this.router.post('/', (c) => taskController.createTask(c));
    this.router.put('/:id', (c) => taskController.updateTask(c));
    this.router.delete('/:id', (c) => taskController.deleteTask(c));
    this.router.post('/:id/done', (c) => taskController.markTaskAsDone(c));

    return this.router;
  }
}

export const taskRouter = new TaskRouter();
