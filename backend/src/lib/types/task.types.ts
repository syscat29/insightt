export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED';

export interface CreateTaskInput {
  title: string;
  description?: string | null;
  status?: TaskStatus;
  ownerId: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
}
