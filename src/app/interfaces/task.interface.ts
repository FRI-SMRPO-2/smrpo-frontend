export interface Task {
  id: number;
  project_id: number;
  story_name: string;
  story_id: number;
  title: string;
  description: string;
  active: boolean;
  estimated_time: number;
  assignee?: string;
  assignee_awaiting?: string;
  created_by: string;
  created: Date;
  finished_by?: string;
  finished: boolean;
}

export interface UserTasks {
  assigned_tasks: Task[];
  assignee_awaiting_tasks: Task[];
}

export interface WorkSession {
  date: Date | string;
  hours: number;
  estimated_hours: number;
}
