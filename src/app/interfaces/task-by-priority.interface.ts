import { Priority } from './priority.type';

export type TaskCountByPriority = {
  [key in Priority]: number;
};
