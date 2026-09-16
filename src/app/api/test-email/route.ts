import { NextRequest, NextResponse } from 'next/server';
import { sendTestEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toEmail } = body;

    if (!toEmail || !toEmail.trim()) {
      return NextResponse.json({ error: 'Recipient email is required' }, { status: 400 });
    }

    const data = await sendTestEmail(toEmail.trim());
    return NextResponse.json({ success: true, message: `Test email sent to ${toEmail.trim()}!`, data });
  } catch (err: any) {
    console.error('POST /api/test-email error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send test email' }, { status: 500 });
  }
}
