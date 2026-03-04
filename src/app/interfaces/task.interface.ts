import { BaseTask } from './base-task.interface';

export interface Task extends BaseTask {
  id: string;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
}
