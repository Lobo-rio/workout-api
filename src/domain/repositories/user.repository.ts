import { User } from '../entities/user.entity';

export type NewUser = Omit<User, 'id'>;

export interface UserRepository {
  create(user: NewUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
