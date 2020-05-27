export interface User {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  role?: string[];
  last_login?: Date;
  is_superuser?: boolean;
}
