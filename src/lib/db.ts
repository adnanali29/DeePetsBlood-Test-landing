import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set. Add it to .env.local');
}

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

// Reuse pool across hot-reloads in dev to avoid exhausting connections
const pool = global._pgPool ?? new Pool({ connectionString, max: 5 });
if (process.env.NODE_ENV !== 'production') global._pgPool = pool;

export default pool;
