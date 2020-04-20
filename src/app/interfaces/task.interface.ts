export interface Task {
  id: number;
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
