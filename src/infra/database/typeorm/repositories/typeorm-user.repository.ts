import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository, NewUser } from '@domain/repositories/user.repository';
import { User } from '@domain/entities/user.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(user: NewUser): Promise<User> {
    const entity = this.repository.create(user);
    const saved = await this.repository.save(entity);
    return this.toUser(saved);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? this.toUser(entity) : null;
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toUser(entity) : null;
  }

  private toUser(entity: UserEntity): User {
    return {
      id: entity.id,
      email: entity.email,
      peso: Number(entity.peso),
      altura: Number(entity.altura),
      idade: entity.idade,
      sexo: entity.sexo,
      objetivo: entity.objetivo,
    };
  }
}
