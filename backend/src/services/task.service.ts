import { LoggerMiddleware } from '@/middlewares/logger.middleware';
import { CreateTaskInput, UpdateTaskInput } from '@/lib/types/task.types';
import { taskRepository } from '@/repositories/task.repository';

class TaskService {
  private readonly logger = new LoggerMiddleware('TaskService');

  async getTasks(ownerId: string) {
    try {
      this.logger.info(`Getting tasks for owner ${ownerId}`);
      const result = await taskRepository.getTasks(ownerId);
      this.logger.info(`Tasks fetched successfully for owner ${ownerId}`);
      return result;
    } catch (error) {
      this.logger.error('Failed to get tasks', error as Error);
      throw error;
    }
  }

  async getTaskById(taskId: string) {
    try {
      this.logger.info(`Getting task by id ${taskId}`);
      const result = await taskRepository.getTaskbyId(taskId);
      this.logger.info(`Task fetched successfully by id ${taskId}`);
      return result;
    } catch (error) {
      this.logger.error('Failed to get task by id', error as Error);
      throw error;
    }
  }

  async createTask(input: CreateTaskInput) {
    try {
      this.logger.info(`Creating task ${input.title}`);
      const result = await taskRepository.createTask(input);
      this.logger.info(`Task created successfully ${input.title}`);
      return result;
    } catch (error) {
      this.logger.error('Failed to create task', error as Error);
      throw error;
    }
  }

  async deleteTask(taskId: string) {
    try {
      this.logger.info(`Deleting task ${taskId}`);
      const result = await taskRepository.deleteTask(taskId);
      this.logger.info(`Task deleted successfully ${taskId}`);
      return result;
    } catch (error) {
      this.logger.error('Failed to delete task', error as Error);
      throw error;
    }
  }

  async updateTask(taskId: string, input: UpdateTaskInput, ownerId: string) {
    try {
      this.logger.info(`Updating task ${taskId}`);
      const result = await taskRepository.updateTask(taskId, input, ownerId);
      this.logger.info(`Task updated successfully ${taskId}`);
      return result;
    } catch (error) {
      this.logger.error('Failed to update task', error as Error);
      throw error;
    }
  }

  async markTaskAsDone(taskId: string, ownerId: string) {
    try {
      this.logger.info(`Marking task as done ${taskId}`);
      const result = await taskRepository.markTaskAsDone(taskId, ownerId);
      this.logger.info(`Task marked as done successfully ${taskId}`);
      return result;
    } catch (error) {
      this.logger.error('Failed to mark task as done', error as Error);
      throw error;
    }
  }
}

export const taskService = new TaskService();
