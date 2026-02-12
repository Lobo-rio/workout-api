import { WorkoutPlan } from '../entities/workout-plan.entity';

export interface WorkoutRepository {
  save(plan: WorkoutPlan): Promise<void>;
  findByUserAndWeek(userId: string, semana: number): Promise<WorkoutPlan | null>;
  listByUser(userId: string): Promise<WorkoutPlan[]>;
}
