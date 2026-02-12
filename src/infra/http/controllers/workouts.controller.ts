import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GenerateWorkoutPlanUseCase } from '../../../application/use-cases/generate-workout-plan.use-case';
import { generateWorkoutPlanSchema } from '../../../application/dto/generate-workout-plan.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('workouts')
@UseGuards(JwtAuthGuard)
export class WorkoutsController {
  constructor(
    private readonly generateWorkoutPlan: GenerateWorkoutPlanUseCase,
  ) {}

  @Post('generate')
  async generate(@Body() body: unknown) {
    const input = generateWorkoutPlanSchema.parse(body);
    return this.generateWorkoutPlan.execute(input);
  }
}
