import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | null | undefined;
}

// Reuse pool across hot-reloads in dev if DATABASE_URL is configured
let pool: Pool | null = null;

if (connectionString) {
  try {
    pool = global._pgPool ?? new Pool({ connectionString, max: 5 });
    if (process.env.NODE_ENV !== 'production') global._pgPool = pool;
  } catch (e) {
    console.warn('PostgreSQL pool initialization failed:', e);
    pool = null;
  }
}

export default pool;
