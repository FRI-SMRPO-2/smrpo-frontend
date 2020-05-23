import { User } from './user.interface';
import { Post } from './post.interface';

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
  posts: Post[];
}

export interface ProjectRole {
  id: number;
  title: string;
}
