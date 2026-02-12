import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmWorkoutRepository } from './typeorm-workout.repository';
import { WorkoutPlanEntity } from '../entities/workout-plan.entity';

describe('TypeOrmWorkoutRepository', () => {
  let repository: TypeOrmWorkoutRepository;
  let mockWorkoutRepository: Partial<Repository<WorkoutPlanEntity>>;

  beforeEach(async () => {
    mockWorkoutRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmWorkoutRepository,
        {
          provide: getRepositoryToken(WorkoutPlanEntity),
          useValue: mockWorkoutRepository,
        },
      ],
    }).compile();

    repository = module.get<TypeOrmWorkoutRepository>(TypeOrmWorkoutRepository);
  });

  it('should save a workout plan', async () => {
    const plan = {
      userId: 'user-123',
      semana: 1,
      exerciciosPorDia: { segunda: [] },
    };

    (mockWorkoutRepository.create as jest.Mock).mockReturnValue(plan);
    (mockWorkoutRepository.save as jest.Mock).mockResolvedValue(plan);

    await repository.save(plan);

    expect(mockWorkoutRepository.save).toHaveBeenCalled();
  });

  it('should find workout by user and week', async () => {
    const plan = {
      userId: 'user-123',
      semana: 1,
      exerciciosPorDia: { segunda: [] },
      id: 'plan-123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (mockWorkoutRepository.findOne as jest.Mock).mockResolvedValue(plan);

    const result = await repository.findByUserAndWeek('user-123', 1);

    expect(result).toEqual({
      userId: plan.userId,
      semana: plan.semana,
      exerciciosPorDia: plan.exerciciosPorDia,
    });
  });

  it('should list workouts by user', async () => {
    const plans = [
      {
        userId: 'user-123',
        semana: 1,
        exerciciosPorDia: {},
        id: 'plan-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (mockWorkoutRepository.find as jest.Mock).mockResolvedValue(plans);

    const result = await repository.listByUser('user-123');

    expect(result).toHaveLength(1);
  });
});
