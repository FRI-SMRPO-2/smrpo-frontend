export interface Story {
  id: number;
  project_id: number;
  name: string;
  text: string;
  business_value: number;
  priority: Priority;
  time_complexity: number;
  tests: any[];
  created_by: string;
  created: Date;
  updated: Date;
  tasks: any[];
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
