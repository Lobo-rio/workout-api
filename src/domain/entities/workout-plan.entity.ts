import { Exercise } from './exercise.entity';

export interface WorkoutPlan {
  userId: string;
  semana: number;
  exerciciosPorDia: Record<string, Exercise[]>;
}
