import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1739295000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'peso',
            type: 'numeric',
            precision: 5,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'altura',
            type: 'numeric',
            precision: 3,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'idade',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'sexo',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'objetivo',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
