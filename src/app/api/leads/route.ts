import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/leads — fetch all leads ordered by newest first
export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM leads ORDER BY created_at DESC`
    );
    return NextResponse.json({ leads: rows });
  } catch (err) {
    console.error('GET /api/leads error:', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// POST /api/leads — create a new lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id, consultation_code, name, phone, pet_type, category, sub_test,
      price, city, pincode, schedule_date, message, status, timestamp
    } = body;

    const { rows } = await pool.query(
      `INSERT INTO leads
        (id, consultation_code, name, phone, pet_type, category, sub_test,
         price, city, pincode, schedule_date, message, status, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       ON CONFLICT (id) DO NOTHING
       RETURNING *`,
      [id, consultation_code, name, phone, pet_type, category, sub_test,
       price ?? null, city ?? null, pincode ?? null, schedule_date ?? null,
       message ?? null, status ?? 'active', timestamp ?? new Date().toISOString()]
    );
    return NextResponse.json({ lead: rows[0] }, { status: 201 });
  } catch (err) {
    console.error('POST /api/leads error:', err);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
