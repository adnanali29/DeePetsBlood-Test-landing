import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_zOEtlm85nBdM@ep-restless-paper-ax1xqdxz-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false },
});

const sql = `
  CREATE TABLE IF NOT EXISTS leads (
    id                TEXT PRIMARY KEY,
    consultation_code TEXT UNIQUE,
    name              TEXT NOT NULL,
    phone             TEXT NOT NULL,
    pet_type          TEXT NOT NULL CHECK (pet_type IN ('Dog','Cat')),
    category          TEXT NOT NULL,
    sub_test          TEXT NOT NULL,
    price             INTEGER,
    city              TEXT,
    pincode           TEXT,
    schedule_date     TEXT,
    message           TEXT,
    remark            TEXT,
    follow_up         JSONB,
    status            TEXT NOT NULL DEFAULT 'active'
                        CHECK (status IN ('active','completed','cancelled')),
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS idx_leads_status      ON leads (status);
  CREATE INDEX IF NOT EXISTS idx_leads_created_at  ON leads (created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_leads_phone       ON leads (phone);
`;

async function main() {
  console.log('Connecting to Neon PostgreSQL...');
  const client = await pool.connect();
  try {
    console.log('Running migration...');
    await client.query(sql);
    console.log('Tables created successfully!');
    const { rows } = await client.query(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'leads' ORDER BY ordinal_position`
    );
    console.log('\nLeads table schema:');
    rows.forEach(r => console.log('  ' + r.column_name.padEnd(22) + r.data_type));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(e => { console.error('Migration failed:', e); process.exit(1); });
