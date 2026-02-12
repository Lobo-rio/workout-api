import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  peso: number;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  altura: number;

  @Column({ type: 'int' })
  idade: number;

  @Column({ type: 'varchar', length: 20 })
  sexo: 'masculino' | 'feminino' | 'outro';

  @Column({ type: 'varchar', length: 20 })
  objetivo: 'perder_peso' | 'ganhar_massa';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
