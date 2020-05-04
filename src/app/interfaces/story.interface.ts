export interface Story {
  id: number;
  unique_by_project_count_id: number;
  project_id: number;
  name: string;
  text: string;
  business_value: number;
  priority: Priority;
  tests: any[];
  created_by: string;
  created: Date;
  updated: Date;
  time_complexity: number;
  realized: boolean;
  rejection_comment: string;
  all_tasks_finished: boolean;
  tasks; //TODO:
}

export interface ProductBacklog {
  assigned: Story[];
  realized: Story[];
  unassigned: Story[];
}

export interface Priority {
  id: number;
  name: string;
}
