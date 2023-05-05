import { Feed } from 'src/feed/models/feed.interface';
import { Role } from './role.enum';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
  feeds?: Feed[];
  createdAt?: Date;
  updatedAt?: Date;
}
