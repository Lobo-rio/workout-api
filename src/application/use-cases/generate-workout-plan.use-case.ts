import { Inject, Injectable } from '@nestjs/common';
import { WORKOUT_REPOSITORY } from '../tokens';
import type { WorkoutRepository } from '../../domain/repositories/workout.repository';
import { WorkoutPlan } from '../../domain/entities/workout-plan.entity';
import { GenerateWorkoutPlanDto } from '../dto/generate-workout-plan.dto';

@Injectable()
export class GenerateWorkoutPlanUseCase {
  constructor(
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: WorkoutRepository,
  ) {}

  async execute(input: GenerateWorkoutPlanDto): Promise<WorkoutPlan> {
    const semana = input.semana ?? 1;
    const plan: WorkoutPlan = {
      userId: input.userId,
      semana,
      exerciciosPorDia: {},
    };

    await this.workoutRepository.save(plan);
    return plan;
  }
}
