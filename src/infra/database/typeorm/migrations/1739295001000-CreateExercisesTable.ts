import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExercisesTable1739295001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exercises',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'met',
            type: 'numeric',
            precision: 4,
            scale: 1,
            isNullable: false,
          },
          {
            name: 'duracaoMediaMinutos',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exercises');
  }
}
