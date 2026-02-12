import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GenerateWorkoutPlanUseCase } from './application/use-cases/generate-workout-plan.use-case';
import { CalculateDailyCaloriesUseCase } from './application/use-cases/calculate-daily-calories.use-case';
import { GetDashboardDataUseCase } from './application/use-cases/get-dashboard-data.use-case';
import { USER_REPOSITORY, WORKOUT_REPOSITORY } from './application/tokens';
import { CalorieCalculator } from './domain/services/calorie-calculator';
import { WorkoutsController } from './infra/http/controllers/workouts.controller';
import { DashboardController } from './infra/http/controllers/dashboard.controller';
import { ProfileController } from './infra/http/controllers/profile.controller';
import { AuthController } from './infra/http/controllers/auth.controller';
import { AuthService } from './infra/auth/auth.service';
import { JwtStrategy } from './infra/auth/jwt.strategy';
import { UserEntity } from './infra/database/typeorm/entities/user.entity';
import { ExerciseEntity } from './infra/database/typeorm/entities/exercise.entity';
import { WorkoutPlanEntity } from './infra/database/typeorm/entities/workout-plan.entity';
import { TypeOrmUserRepository } from './infra/database/typeorm/repositories/typeorm-user.repository';
import { TypeOrmWorkoutRepository } from './infra/database/typeorm/repositories/typeorm-workout.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_URL || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      database: process.env.DATABASE_NAME || 'postgres',
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      entities: [UserEntity, ExerciseEntity, WorkoutPlanEntity],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forFeature([UserEntity, ExerciseEntity, WorkoutPlanEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AppController,
    WorkoutsController,
    DashboardController,
    ProfileController,
    AuthController,
  ],
  providers: [
    AppService,
    CalorieCalculator,
    CreateUserUseCase,
    GenerateWorkoutPlanUseCase,
    CalculateDailyCaloriesUseCase,
    GetDashboardDataUseCase,
    AuthService,
    JwtStrategy,
    { provide: USER_REPOSITORY, useClass: TypeOrmUserRepository },
    { provide: WORKOUT_REPOSITORY, useClass: TypeOrmWorkoutRepository },
  ],
})
export class AppModule {}
