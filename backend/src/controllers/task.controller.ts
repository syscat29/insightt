import { CreateTaskInput, TaskStatus } from '@/lib/types/task.types';
import { taskService } from '@/services/task.service';
import { User } from 'better-auth';
import { Context } from 'hono';

class TaskController {
  async getTasks(c: Context) {
    try {
      const user = c.get('user') as User;
      if (!user) return c.json({ success: false, data: [] }, 401);

      const result = await taskService.getTasks(user.id);
      if (!result) return c.json({ success: false, data: [] }, 404);

      return c.json({ success: true, data: result }, 201);
    } catch (error) {
      return c.json({ success: false, message: error }, 500);
    }
  }

  async getTaskById(c: Context) {
    try {
      const user = c.get('user') as User;
      if (!user) return c.json({ success: false, data: [] }, 401);

      const taskId = c.req.param('id');
      if (!taskId) return c.json({ success: false, data: [] }, 400);

      const result = await taskService.getTaskById(taskId);
      if (!result) return c.json({ success: false, data: null }, 404);

      return c.json({ success: true, data: result }, 201);
    } catch (error) {
      return c.json({ success: false, message: error }, 500);
    }
  }

  async createTask(c: Context) {
    const input = await c.req.json<{
      title: string;
      description?: string | null;
      status?: TaskStatus | 'PENDING';
    }>();

    try {
      const user = c.get('user') as User;
      if (!user) return c.json({ success: false, data: null });

      const result = await taskService.createTask({ ...input, ownerId: user.id });
      return c.json({ success: true, data: result }, 201);
    } catch (error) {
      return c.json(
        { success: false, data: null, message: 'Failed to create task' },
        500,
      );
    }
  }

  async deleteTask(c: Context) {
    try {
      const user = c.get('user') as User;
      if (!user) return c.json({ success: false }, 401);

      const taskId = c.req.param('id');
      if (!taskId) return c.json({ success: false }, 400);

      const result = await taskService.deleteTask(taskId);
      if (!result) return c.json({ success: false }, 404);

      return c.json({ success: true }, 200);
    } catch (error) {
      return c.json({ success: false, message: error }, 500);
    }
  }

  async updateTask(c: Context) {
    const input = await c.req.json<Omit<CreateTaskInput, 'ownerId'>>();

    try {
      const user = c.get('user') as User;
      if (!user) return c.json({ success: false, data: null }, 401);

      const taskId = c.req.param('id');
      if (!taskId) return c.json({ success: false, data: null }, 400);

      const result = await taskService.updateTask(taskId, input, user.id);
      if (!result) return c.json({ success: false, data: null }, 404);

      return c.json({ success: true, data: result }, 200);
    } catch (error) {
      return c.json(
        { success: false, data: null, message: 'Failed to update task' },
        500,
      );
    }
  }

  async markTaskAsDone(c: Context) {
    try {
      const user = c.get('user') as User;
      if (!user) return c.json({ success: false, data: null }, 401);

      const taskId = c.req.param('id');
      if (!taskId) return c.json({ success: false, data: null }, 400);

      const result = await taskService.markTaskAsDone(taskId, user.id);
      // if (typeof result === 'string') return c.json({ success: false, data: null, message: result }, 400);
      if (!result) return c.json({ success: false, data: null }, 404);

      return c.json({ success: true, data: result }, 200);
    } catch (error) {
      return c.json(
        { success: false, data: null, message: 'Failed to mark task as done' },
        500,
      );
    }
  }
}

export const taskController = new TaskController();
