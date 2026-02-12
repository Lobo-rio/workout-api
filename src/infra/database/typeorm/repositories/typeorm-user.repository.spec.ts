import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUserRepository } from './typeorm-user.repository';
import { UserEntity } from '../entities/user.entity';

describe('TypeOrmUserRepository', () => {
  let repository: TypeOrmUserRepository;
  let mockUserRepository: Partial<Repository<UserEntity>>;

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmUserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    repository = module.get<TypeOrmUserRepository>(TypeOrmUserRepository);
  });

  it('should create a user', async () => {
    const newUser = {
      email: 'test@example.com',
      peso: 80,
      altura: 1.75,
      idade: 30,
      sexo: 'masculino' as const,
      objetivo: 'ganhar_massa' as const,
    };

    const savedUser = {
      id: '123',
      ...newUser,
    };

    (mockUserRepository.create as jest.Mock).mockReturnValue(savedUser);
    (mockUserRepository.save as jest.Mock).mockResolvedValue(savedUser);

    const result = await repository.create(newUser);

    expect(result).toEqual(savedUser);
  });

  it('should find user by email', async () => {
    const user = {
      id: '123',
      email: 'test@example.com',
      peso: 80,
      altura: 1.75,
      idade: 30,
      sexo: 'masculino' as const,
      objetivo: 'ganhar_massa' as const,
    };

    (mockUserRepository.findOne as jest.Mock).mockResolvedValue(user);

    const result = await repository.findByEmail('test@example.com');

    expect(result).toEqual(user);
  });
});
