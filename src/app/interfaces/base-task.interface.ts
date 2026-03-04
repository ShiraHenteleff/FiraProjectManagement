import { Priority } from './priority.type';

export interface BaseTask {
  title: string;
  description?: string;
  priority: Priority;
  assignee?: string;
}
