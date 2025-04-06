import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'taskmanager',
  password: 'sua_senha',
  port: 5432, // PostgreSQL default port
});
