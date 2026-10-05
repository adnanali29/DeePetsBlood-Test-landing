import { Resend } from 'resend';
import pool from '@/lib/db';

export interface EmailSettings {
  recipientEmail: string;
  enabled: boolean;
  senderName: string;
}

const DEFAULT_SETTINGS: EmailSettings = {
  recipientEmail: process.env.NOTIFICATION_RECIPIENT_EMAIL || 'Sayedadnanali905@gmail.com',
  enabled: true,
  senderName: 'DeePets Notifications',
};

export async function getEmailSettings(): Promise<EmailSettings> {
  const defaultRecipient = process.env.NOTIFICATION_RECIPIENT_EMAIL || 'Sayedadnanali905@gmail.com';
  const defaultSettings: EmailSettings = {
    ...DEFAULT_SETTINGS,
    recipientEmail: defaultRecipient,
  };
  try {
    if (pool) {
      const { rows } = await pool.query(
        `SELECT value FROM admin_settings WHERE key = 'email_settings'`
      );
      if (rows.length > 0) {
        const val = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : rows[0].value;
        return {
          ...defaultSettings,
          ...val,
          recipientEmail: (val && val.recipientEmail && val.recipientEmail.trim()) || defaultRecipient,
        };
      }
    }
  } catch (err) {
    console.error('Error reading email_settings from db:', err);
  }
  return defaultSettings;
}

export async function sendLeadNotificationEmail(lead: any) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not configured in environment.');
    return { success: false, error: 'RESEND_API_KEY missing' };
  }

  const settings = await getEmailSettings();
  if (!settings.enabled) {
    console.log('Email notifications are disabled in settings.');
    return { success: false, reason: 'Notifications disabled' };
  }

  if (!settings.recipientEmail || !settings.recipientEmail.trim()) {
    console.warn('No recipient email configured in Email Settings.');
    return { success: false, error: 'Recipient email missing' };
  }

  const resend = new Resend(apiKey);
  const recipient = settings.recipientEmail.trim();

  const formattedDate = lead.schedule_date
    ? new Date(lead.schedule_date).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Not Scheduled';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background: #0f172a; padding: 24px; text-align: center; color: #ffffff; }
          .header h2 { margin: 0; font-size: 20px; letter-spacing: -0.5px; }
          .badge { display: inline-block; background-color: #84cc16; color: #0f172a; font-weight: 800; font-size: 11px; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; margin-top: 8px; }
          .content { padding: 24px; }
          .info-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          .info-table td { padding: 12px 8px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .info-table td.label { font-weight: 700; color: #64748b; width: 35%; }
          .info-table td.val { font-weight: 600; color: #0f172a; }
          .message-box { background: #f1f5f9; border-left: 4px solid #84cc16; padding: 12px 16px; margin-top: 16px; border-radius: 0 8px 8px 0; font-style: italic; font-size: 14px; }
          .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2>🐾 New Pet Consultation Request</h2>
            <div class="badge">Code: ${lead.consultation_code || lead.id || 'N/A'}</div>
          </div>
          <div class="content">
            <p style="font-size: 15px; margin-top:0;">You have received a new consultation inquiry from your website landing page.</p>
            <table class="info-table">
              <tr>
                <td class="label">Customer Name</td>
                <td class="val">${lead.name || 'N/A'}</td>
              </tr>
              <tr>
                <td class="label">Phone Number</td>
                <td class="val"><a href="tel:${lead.phone}" style="color:#2563eb; text-decoration:none; font-weight:bold;">${lead.phone || 'N/A'}</a></td>
              </tr>
              <tr>
                <td class="label">Pet Type</td>
                <td class="val">${lead.pet_type || 'N/A'}</td>
              </tr>
              <tr>
                <td class="label">Category / Test</td>
                <td class="val">${lead.category || ''} ${lead.sub_test ? `(${lead.sub_test})` : ''}</td>
              </tr>
              ${lead.price ? `<tr><td class="label">Quoted Price</td><td class="val">₹${lead.price}</td></tr>` : ''}
              ${lead.city ? `<tr><td class="label">Location</td><td class="val">${lead.city}${lead.pincode ? ` - ${lead.pincode}` : ''}</td></tr>` : ''}
              <tr>
                <td class="label">Preferred Date</td>
                <td class="val">${formattedDate}</td>
              </tr>
            </table>

            ${lead.message ? `
              <div class="message-box">
                <strong>Customer Note:</strong><br>
                "${lead.message}"
              </div>
            ` : ''}
          </div>
          <div class="footer">
            DeePets Blood-Test Landing Page Notification System • Sent via Resend
          </div>
        </div>
      </body>
    </html>
  `;

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    const { data, error } = await resend.emails.send({
      from: `${settings.senderName || 'DeePets Notifications'} <${fromEmail}>`,
      to: [recipient],
      subject: `🐾 New Lead: ${lead.name || 'Customer'} (${lead.pet_type || 'Pet'}) - ${lead.consultation_code || ''}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Failed to send lead email:', err);
    return { success: false, error: err.message || 'Email delivery failed' };
  }
}

export async function sendTestEmail(toEmail: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set in environment variables.');
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const { data, error } = await resend.emails.send({
    from: `DeePets Notifications <${fromEmail}>`,
    to: [toEmail],
    subject: '🐾 DeePets Email Notification Test',
    html: `
      <div style="font-family: sans-serif; padding: 20px; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #84cc16; margin-top: 0;">✓ Email Notifications Working!</h2>
        <p>This is a test email sent from your <strong>DeePets Admin Portal</strong> via <strong>Resend</strong>.</p>
        <p>New consultation leads and bookings submitted by pet parents will be delivered to this email address automatically.</p>
        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 16px 0;" />
        <small style="color: #64748b;">Timestamp: ${new Date().toLocaleString()}</small>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
