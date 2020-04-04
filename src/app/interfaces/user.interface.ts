export interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  role?: string;
  last_login?: Date;
  is_superuser?: boolean;
}
