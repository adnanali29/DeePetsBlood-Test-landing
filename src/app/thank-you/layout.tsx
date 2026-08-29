import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking Confirmed | DeePet Services',
  description: 'Thank you for booking with DeePet Services. Your at-home pet diagnostic appointment has been confirmed. Our team will reach out to you shortly.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Booking Confirmed | DeePet Services',
    description: 'Your DeePet Services consultation has been successfully booked.',
    type: 'website',
  },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
