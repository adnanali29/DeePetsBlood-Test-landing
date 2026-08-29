import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/settings — fetch all admin settings
export async function GET() {
  try {
    const { rows } = await pool.query(`SELECT key, value FROM admin_settings`);
    const settings: Record<string, any> = {};
    rows.forEach(r => {
      settings[r.key] = r.value;
    });
    return NextResponse.json({ settings });
  } catch (err) {
    console.error('GET /api/settings error:', err);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// POST /api/settings — save a setting (key + JSON value)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    const { rows } = await pool.query(
      `INSERT INTO admin_settings (key, value, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
       RETURNING *`,
      [key, JSON.stringify(value)]
    );

    return NextResponse.json({ setting: rows[0] });
  } catch (err) {
    console.error('POST /api/settings error:', err);
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 });
  }
}
