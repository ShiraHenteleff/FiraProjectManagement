export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
}
