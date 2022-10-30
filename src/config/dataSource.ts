import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { User } from '../model/User.js';
import { envConfig } from './env.js';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: envConfig.dbHost,
  port: envConfig.dbPort,
  username: envConfig.dbUser,
  password: envConfig.dbPassword,
  database: envConfig.dbDatabase,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: []
});
