export interface Task {
  id: number;
  project_id: number;
  story_name: string;
  title: string;
  description: string;
  active: boolean;
  estimated_time: number;
  assignee?: string;
  assignee_awaiting?: string;
  created_by: string;
  finished_by?: string;
  finished: boolean;
}

export interface UserTasks {
  assigned_tasks: Task[];
  assignee_awaiting_tasks: Task[];
}
