export interface Project {
  id: number;
  name: string;
  documentation: string;
  users;
  created_by: string;
  created: Date;
  updated: Date;
}

export interface ProjectRole {
  id: number;
  title: string;
}
