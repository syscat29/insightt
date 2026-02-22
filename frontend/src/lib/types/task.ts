export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
