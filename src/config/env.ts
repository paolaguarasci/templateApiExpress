import * as dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  dbDatabase: process.env.dbDatabase,
  dbHost: process.env.dbHost,
  dbUser: process.env.dbUser,
  dbPassword: process.env.dbPassword,
  dbType: process.env.dbType,
  dbPort: parseInt(process.env.dbPort!)
};
