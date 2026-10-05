import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sendLeadNotificationEmail } from '@/lib/email';

// GET /api/leads — fetch all leads ordered by newest first
export async function GET() {
  try {
    if (!pool) {
      return NextResponse.json({ leads: [] });
    }
    const { rows } = await pool.query(
      `SELECT * FROM leads ORDER BY created_at DESC`
    );
    return NextResponse.json({ leads: rows });
  } catch (err) {
    console.error('GET /api/leads error:', err);
    return NextResponse.json({ leads: [] });
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

    const cleanId = id || 'lead-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const cleanCode = consultation_code || 'DEPE-00';
    const cleanName = (name && String(name).trim()) ? String(name).trim() : 'Guest User';
    const cleanPhone = (phone && String(phone).trim()) ? String(phone).trim() : 'Not Provided';

    let cleanPetType = (pet_type && String(pet_type).trim()) ? String(pet_type).trim() : 'Dog';
    if (cleanPetType !== 'Dog' && cleanPetType !== 'Cat') {
      cleanPetType = cleanPetType.toLowerCase().includes('cat') ? 'Cat' : 'Dog';
    }

    const cleanCategory = (category && String(category).trim()) ? String(category).trim() : 'General Inquiry';
    const cleanSubTest = (sub_test && String(sub_test).trim()) ? String(sub_test).trim() : 'Consultation';

    const parsedPrice = (price !== null && price !== undefined && price !== '' && !isNaN(Number(price)) && Number(price) <= 2147483647)
      ? parseInt(String(price), 10)
      : null;

    const cleanCity = (city && String(city).trim()) ? String(city).trim() : null;
    const cleanPincode = (pincode && String(pincode).trim()) ? String(pincode).trim() : null;
    const cleanDate = (schedule_date && String(schedule_date).trim()) ? String(schedule_date).trim() : null;
    const cleanMessage = (message && String(message).trim()) ? String(message).trim() : null;
    const cleanStatus = (status === 'completed' || status === 'cancelled') ? status : 'active';
    const cleanCreatedAt = (timestamp && String(timestamp).trim()) ? String(timestamp).trim() : new Date().toISOString();

    let createdLead = {
      id: cleanId,
      consultation_code: cleanCode,
      name: cleanName,
      phone: cleanPhone,
      pet_type: cleanPetType,
      category: cleanCategory,
      sub_test: cleanSubTest,
      price: parsedPrice,
      city: cleanCity,
      pincode: cleanPincode,
      schedule_date: cleanDate,
      message: cleanMessage,
      status: cleanStatus,
      created_at: cleanCreatedAt,
    };

    if (pool) {
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
           schedule_date = EXCLUDED.schedule_date,
           message = EXCLUDED.message,
           created_at = EXCLUDED.created_at
         RETURNING *`,
        [
          cleanId,
          cleanCode,
          cleanName,
          cleanPhone,
          cleanPetType,
          cleanCategory,
          cleanSubTest,
          parsedPrice,
          cleanCity,
          cleanPincode,
          cleanDate,
          cleanMessage,
          cleanStatus,
          cleanCreatedAt,
        ]
      );
      if (rows && rows[0]) createdLead = rows[0];
    }

    // Await email notification so serverless functions complete HTTP dispatch before returning response
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

