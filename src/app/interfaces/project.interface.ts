export type ProjectRoleType =
  | "Project manager"
  | "Methodology master"
  | "Developer";

export interface Project {
  id: number;
  name: string;
  documentation: string;
  users;
  created: Date;
  updated: Date;
}

export interface ProjectRole {
  id: number;
  title: ProjectRoleType;
}
