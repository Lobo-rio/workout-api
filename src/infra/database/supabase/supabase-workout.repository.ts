import { WorkoutRepository } from '../../../domain/repositories/workout.repository';
import { WorkoutPlan } from '../../../domain/entities/workout-plan.entity';
import { getSupabaseAdminClient } from './supabase-client';

export class SupabaseWorkoutRepository implements WorkoutRepository {
  async save(plan: WorkoutPlan): Promise<void> {
    const { error } = await getSupabaseAdminClient()
      .from('workouts')
      .insert(plan);
    if (error) {
      throw new Error(error.message);
    }
  }

  async findByUserAndWeek(
    userId: string,
    semana: number,
  ): Promise<WorkoutPlan | null> {
    const { data, error } = await getSupabaseAdminClient()
      .from('workouts')
      .select('*')
      .eq('userId', userId)
      .eq('semana', semana)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data as WorkoutPlan | null;
  }

  async listByUser(userId: string): Promise<WorkoutPlan[]> {
    const { data, error } = await getSupabaseAdminClient()
      .from('workouts')
      .select('*')
      .eq('userId', userId);

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as WorkoutPlan[];
  }
}
