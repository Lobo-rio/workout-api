import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exercises')
export class ExerciseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ type: 'decimal', precision: 4, scale: 1 })
  met: number;

  @Column({ type: 'int' })
  duracaoMediaMinutos: number;
}
