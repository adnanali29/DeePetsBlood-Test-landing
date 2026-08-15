import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DeePet Services - At-Home Pet Diagnostics & Doorstep Veterinary Care',
  description:
    'Delhi NCR’s No.1 Doorstep Veterinary & Pet Diagnostics. Accurate blood testing and veterinary health checkups for cats & dogs in the comfort of your home.',
  keywords: [
    'pet blood test Delhi NCR',
    'at home vet visit Gurugram',
    'doorstep pet diagnostics',
    'cat blood test',
    'dog blood test',
    'NABL pet lab',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="antialiased text-slate-800 selection:bg-deepblue-200 selection:text-deepblue-900">
        {children}
      </body>
    </html>
  );
}
