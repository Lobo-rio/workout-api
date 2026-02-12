import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutRepository } from '@domain/repositories/workout.repository';
import { WorkoutPlan } from '@domain/entities/workout-plan.entity';
import { WorkoutPlanEntity } from '../entities/workout-plan.entity';

@Injectable()
export class TypeOrmWorkoutRepository implements WorkoutRepository {
  constructor(
    @InjectRepository(WorkoutPlanEntity)
    private readonly repository: Repository<WorkoutPlanEntity>,
  ) {}

  async save(plan: WorkoutPlan): Promise<void> {
    const entity = this.repository.create(plan);
    await this.repository.save(entity);
  }

  async findByUserAndWeek(
    userId: string,
    semana: number,
  ): Promise<WorkoutPlan | null> {
    const entity = await this.repository.findOne({
      where: { userId, semana },
    });
    return entity ? this.toWorkoutPlan(entity) : null;
  }

  async listByUser(userId: string): Promise<WorkoutPlan[]> {
    const entities = await this.repository.find({ where: { userId } });
    return entities.map((e) => this.toWorkoutPlan(e));
  }

  private toWorkoutPlan(entity: WorkoutPlanEntity): WorkoutPlan {
    return {
      userId: entity.userId,
      semana: entity.semana,
      exerciciosPorDia: (entity.exerciciosPorDia || {}) as Record<string, []>,
    };
  }
}
