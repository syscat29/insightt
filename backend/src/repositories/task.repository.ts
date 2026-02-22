import { task } from '@/models/task.model';
import { db } from '../providers/drizzle.provider';
import { eq, desc } from 'drizzle-orm';
import { CreateTaskInput, UpdateTaskInput } from '@/lib/types/task.types';
import { isValidStatusTransition } from '@/lib/taskStatusValidation';

class TaskRepository {
  async getTasks(ownerId: string) {
    const result = await db
      .select()
      .from(task)
      .where(eq(task.ownerId, ownerId))
      .orderBy(desc(task.updatedAt));
    return result;
  }

  async getTaskbyId(taskId: string) {
    const [taskResult] = await db.select().from(task).where(eq(task.id, taskId));
    if (!taskResult) return null;
    return taskResult;
  }

  async createTask(input: CreateTaskInput) {
    const [result] = await db
      .insert(task)
      .values({
        id: crypto.randomUUID(),
        title: input.title,
        description: input.description ?? null,
        status: input.status ?? 'PENDING',
        ownerId: input.ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return result;
  }

  async updateTask(taskId: string, input: UpdateTaskInput, ownerId: string) {
    const [taskResult] = await db.select().from(task).where(eq(task.id, taskId));
    if (!taskResult) return null;

    // Check if the task is owned by the user
    if (taskResult.ownerId !== ownerId) return 'Only the task owner can update it';

    // If task is already done, return task
    if (taskResult.status === 'DONE' && input.status === 'DONE') {
      return taskResult;
    }

    // Validate status transition
    if (input.status !== undefined && input.status !== taskResult.status) {
      if (!isValidStatusTransition(taskResult.status, input.status)) {
        return `Invalid status transition from ${taskResult.status} to ${input.status}`;
      }
    }

    const [result] = await db
      .update(task)
      .set({
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && {
          description: input.description ?? null,
        }),
        ...(input.status !== undefined && { status: input.status }),
        updatedAt: new Date(),
      })
      .where(eq(task.id, taskResult.id))
      .returning();

    return result;
  }

  async deleteTask(taskId: string) {
    return await db.delete(task).where(eq(task.id, taskId));
  }

  async markTaskAsDone(taskId: string, ownerId: string) {
    const [taskResult] = await db.select().from(task).where(eq(task.id, taskId));
    if (!taskResult) return null;

    // If task is already done, return task
    if (taskResult.status === 'DONE') return taskResult;

    // Check if the task is owned by the user
    if (taskResult.ownerId !== ownerId) return 'Only the task owner can mark it as done';

    // Mark task as done and return
    const [result] = await db
      .update(task)
      .set({ status: 'DONE' })
      .where(eq(task.id, taskId))
      .returning();
    return result;
  }
}

export const taskRepository = new TaskRepository();
