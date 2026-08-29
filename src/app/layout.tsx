import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

import { AppContextProvider } from '@/context/AppContext';

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
    `Delhi NCR's No.1 Doorstep Veterinary & Pet Diagnostics. Accurate blood testing and veterinary health checkups for cats & dogs in the comfort of your home.`,
  keywords: [
    'pet blood test Delhi NCR',
    'at home vet visit Gurugram',
    'doorstep pet diagnostics',
    'cat blood test',
    'dog blood test',
    'NABL pet lab',
  ],
  icons: {
    icon: [
      { url: '/Favicon.png?v=3', type: 'image/png' },
      { url: '/favicon.ico?v=3', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: '/apple-touch-icon.png?v=3',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Favicon Icons — explicit cache-busting v=3 */}
        <link rel="icon" href="/Favicon.png?v=3" type="image/png" sizes="any" />
        <link rel="icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />

        {/* Preload Hero Background Video for Instant Playback */}
        <link rel="preload" href="/dog2.mp4" as="video" type="video/mp4" />

        {/* Google Tag Manager — placed as high as possible in <head> */}
        <Script
          id="gtm-head"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TL4W8TKZ');`,
          }}
        />
      </head>
      <body className="antialiased text-slate-800 selection:bg-deepblue-200 selection:text-deepblue-900" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) — immediately after <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TL4W8TKZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
