import { DataSource } from 'typeorm';
import { User } from './users/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'social-media-platform',
  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
