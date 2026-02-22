import { taskRepository } from '@/repositories/task.repository';
import { taskService } from './task.service';

jest.mock('@/repositories/task.repository', () => ({
  taskRepository: {
    createTask: jest.fn(),
    updateTask: jest.fn(),
    getTaskbyId: jest.fn(),
  },
}));

const mockTaskRepository = taskRepository as jest.Mocked<typeof taskRepository>;

describe('TaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a task and return the created task', async () => {
      const input = {
        title: 'Test task',
        description: 'Test description',
        ownerId: 'user-123',
      };
      const createdTask = {
        id: 'task-1',
        title: input.title,
        description: input.description,
        status: 'PENDING' as const,
        ownerId: input.ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTaskRepository.createTask.mockResolvedValue(createdTask);

      const result = await taskService.createTask(input);

      expect(mockTaskRepository.createTask).toHaveBeenCalledWith(input);
      expect(result).toEqual(createdTask);
    });

    it('should create a task with optional status', async () => {
      const input = {
        title: 'In progress task',
        status: 'IN_PROGRESS' as const,
        ownerId: 'user-456',
      };
      const createdTask = {
        id: 'task-2',
        title: input.title,
        description: null,
        status: 'IN_PROGRESS' as const,
        ownerId: input.ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTaskRepository.createTask.mockResolvedValue(createdTask);

      const result = await taskService.createTask(input);

      expect(mockTaskRepository.createTask).toHaveBeenCalledWith(input);
      expect(result?.status).toBe('IN_PROGRESS');
    });

    it('should throw when repository throws', async () => {
      const input = { title: 'Fail', ownerId: 'user-1' };
      mockTaskRepository.createTask.mockRejectedValue(new Error('DB error'));

      await expect(taskService.createTask(input)).rejects.toThrow('DB error');
    });
  });

  describe('updateTask', () => {
    it('should update a task and return the updated task', async () => {
      const taskId = 'task-1';
      const ownerId = 'user-123';
      const input = { title: 'Updated title', status: 'IN_PROGRESS' as const };
      const updatedTask = {
        id: taskId,
        title: input.title,
        description: null,
        status: 'IN_PROGRESS' as const,
        ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTaskRepository.updateTask.mockResolvedValue(updatedTask);

      const result = await taskService.updateTask(taskId, input, ownerId);

      expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(taskId, input, ownerId);
      expect(result).toEqual(updatedTask);
    });

    it('should pass through repository result when update returns string (e.g. permission error)', async () => {
      const taskId = 'task-1';
      const ownerId = 'user-123';
      const input = { title: 'Updated' };
      mockTaskRepository.updateTask.mockResolvedValue(
        'Only the task owner can update it',
      );

      const result = await taskService.updateTask(taskId, input, 'other-user');

      expect(result).toBe('Only the task owner can update it');
    });

    it('should throw when repository throws', async () => {
      mockTaskRepository.updateTask.mockRejectedValue(new Error('DB error'));

      await expect(
        taskService.updateTask('task-1', { title: 'x' }, 'user-1'),
      ).rejects.toThrow('DB error');
    });
  });
});
