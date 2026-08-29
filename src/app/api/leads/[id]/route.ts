import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// PATCH /api/leads/[id] — update status or details
export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const body = await req.json();
    const { status, remark, follow_up } = body;

    const { rows } = await pool.query(
      `UPDATE leads
       SET status = COALESCE($1, status),
           remark = COALESCE($2, remark),
           follow_up = COALESCE($3, follow_up),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [status ?? null, remark ?? null, follow_up ? JSON.stringify(follow_up) : null, params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ lead: rows[0] });
  } catch (err) {
    console.error('PATCH /api/leads/[id] error:', err);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

// DELETE /api/leads/[id]
export async function DELETE(_req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    await pool.query(`DELETE FROM leads WHERE id = $1`, [params.id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/leads/[id] error:', err);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
