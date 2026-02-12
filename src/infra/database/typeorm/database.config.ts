import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ExerciseEntity } from './entities/exercise.entity';
import { WorkoutPlanEntity } from './entities/workout-plan.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_URL || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  database: process.env.DATABASE_NAME || 'postgres',
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  entities: [UserEntity, ExerciseEntity, WorkoutPlanEntity],
  migrations: ['dist/infra/database/typeorm/migrations/*.js'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
