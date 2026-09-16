import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sendLeadNotificationEmail } from '@/lib/email';

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
       ON CONFLICT (consultation_code) DO UPDATE SET
         name = EXCLUDED.name,
         phone = EXCLUDED.phone,
         pet_type = EXCLUDED.pet_type,
         category = EXCLUDED.category,
         sub_test = EXCLUDED.sub_test,
         message = EXCLUDED.message,
         created_at = EXCLUDED.created_at
       RETURNING *`,
      [id, consultation_code, name, phone, pet_type, category, sub_test,
       price ?? null, city ?? null, pincode ?? null, schedule_date ?? null,
       message ?? null, status ?? 'active', timestamp ?? new Date().toISOString()]
    );

    const createdLead = rows[0] || body;

    // Await email notification so serverless functions (Vercel/Netlify) complete HTTP dispatch before returning response
    try {
      await sendLeadNotificationEmail(createdLead);
    } catch (emailErr) {
      console.error('Lead notification email error:', emailErr);
    }

    return NextResponse.json({ lead: createdLead }, { status: 201 });
  } catch (err) {
    console.error('POST /api/leads error:', err);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

