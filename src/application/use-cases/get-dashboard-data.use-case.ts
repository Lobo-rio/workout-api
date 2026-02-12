import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, WORKOUT_REPOSITORY } from '../tokens';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { WorkoutRepository } from '../../domain/repositories/workout.repository';
import { GetDashboardDataDto } from '../dto/get-dashboard-data.dto';

@Injectable()
export class GetDashboardDataUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: WorkoutRepository,
  ) {}

  async execute(input: GetDashboardDataDto) {
    const user = await this.userRepository.findById(input.userId);
    const plans = await this.workoutRepository.listByUser(input.userId);
    return { user, plans };
  }
}
