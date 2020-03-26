export enum USER_ROLE {
  ADMIN = "ADMIN",
  USER = "USER"
}

export interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  role: USER_ROLE;
  lastLoginTime?: Date;
}
