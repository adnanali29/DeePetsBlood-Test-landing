export interface WhatsAppParams {
  testOrPackage?: string;
  petType?: string;
  price?: number | string;
  name?: string;
  phone?: string;
  date?: string;
}

export function buildWhatsAppMessage(params: WhatsAppParams): string {
  const lines: string[] = [
    'Hi Dee Pets, I want to book an appointment:',
  ];

  if (params.testOrPackage && params.testOrPackage.trim()) {
    lines.push(`• Test/Package: ${params.testOrPackage.trim()}`);
  }

  if (params.petType && params.petType.trim()) {
    lines.push(`• Pet: ${params.petType.trim()}`);
  }

  if (params.price !== undefined && params.price !== null && params.price !== '') {
    const rawPriceStr = String(params.price).trim();
    const numPrice = Number(rawPriceStr.replace(/[^0-9]/g, ''));
    const formattedPrice = !isNaN(numPrice) && numPrice > 0
      ? `₹${numPrice.toLocaleString('en-IN')}`
      : rawPriceStr;
    lines.push(`• Price: ${formattedPrice}`);
  }

  if (params.name && params.name.trim()) {
    lines.push(`• Name: ${params.name.trim()}`);
  }

  if (params.phone && params.phone.trim()) {
    lines.push(`• Phone Number: ${params.phone.trim()}`);
  }

  if (params.date && params.date.trim()) {
    lines.push(`• Preferred Collection Date: ${params.date.trim()}`);
  }

  // Join with CRLF (\r\n) for universal WhatsApp line-break compatibility across Web, Desktop, iOS & Android
  return lines.join('\r\n');
}

export function buildWhatsAppUrl(phoneNumber: string, params: WhatsAppParams): string {
  let cleanPhone = (phoneNumber || '+917238002900').replace(/[^0-9]/g, '');
  if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }
  const messageText = buildWhatsAppMessage(params);
  // Use api.whatsapp.com/send directly to prevent wa.me 302 redirect from stripping %0D%0A linebreaks
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(messageText)}`;
}
