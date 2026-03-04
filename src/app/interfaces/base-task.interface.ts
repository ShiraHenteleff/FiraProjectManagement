export interface BaseTask {
  title: string;
  description?: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee?: string
}
