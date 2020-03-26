import { User } from './user.interface';

export interface Project {
  id: number;
  username: string;
  documentation: string;
  users: User[];
  created: Date;
  updated: Date;
}
