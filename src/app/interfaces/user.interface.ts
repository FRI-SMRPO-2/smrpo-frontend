import { ProjectRoleType } from './project.interface';

export interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  role?: ProjectRoleType;
  last_login?: Date;
  is_superuser?: boolean;
}
