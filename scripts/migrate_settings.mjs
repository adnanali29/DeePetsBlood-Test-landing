import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_zOEtlm85nBdM@ep-restless-paper-ax1xqdxz-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false },
});

const sql = `
  CREATE TABLE IF NOT EXISTS admin_settings (
    key         TEXT PRIMARY KEY,
    value       JSONB NOT NULL,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

async function main() {
  console.log('Connecting to Neon PostgreSQL to create admin_settings table...');
  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log('✅ admin_settings table created successfully!');

    const { rows } = await client.query(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'admin_settings' ORDER BY ordinal_position`
    );
    console.log('\nadmin_settings table schema:');
    rows.forEach(r => console.log('  ' + r.column_name.padEnd(20) + r.data_type));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(e => { console.error('Migration failed:', e); process.exit(1); });
