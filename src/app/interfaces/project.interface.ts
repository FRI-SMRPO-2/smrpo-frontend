import { User } from './user.interface';

export interface Project {
  id: number;
  name: string;
  documentation: string;
  scrum_master: User;
  produc_owner: User;
  developers: User[];
  users;
  created_by: string;
  created: Date;
  updated: Date;
}

export interface ProjectRole {
  id: number;
  title: string;
}
