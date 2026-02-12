import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_URL || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  database: process.env.DATABASE_NAME || 'postgres',
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  entities: ['dist/src/infra/database/typeorm/entities/*.js'],
  migrations: ['dist/src/infra/database/typeorm/migrations/*.js'],
  synchronize: false,
  logging: true,
});
