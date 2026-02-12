import { UserRepository, NewUser } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { supabase } from './supabase-client';

export class SupabaseUserRepository implements UserRepository {
  async create(user: NewUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data as User | null;
  }

  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data as User | null;
  }
}
