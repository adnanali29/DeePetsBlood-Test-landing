'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ThankYouPage() {
  const params = useParams();
  const code = (params?.code as string) || '';
  const [waUrl, setWaUrl] = useState('');
  const [countdown, setCountdown] = useState(4);
  const openedRef = useRef(false);

  // Load WhatsApp URL from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(`deepet_wa_${code}`);
    if (stored) {
      setWaUrl(stored);

      // Open WhatsApp immediately on mount (closest to user gesture)
      if (!openedRef.current) {
        openedRef.current = true;
        window.open(stored, '_blank');
      }
    }
  }, [code]);

  // Countdown timer (shows UI progress, opens WA again if still not opened)
  useEffect(() => {
    if (!waUrl) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [waUrl]);

  const handleOpenWhatsApp = () => {
    if (waUrl) window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1f10] via-[#1a2e1b] to-[#0d1a0e] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#b2d650]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-green-500/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/deepetservices-logo.webp"
            alt="DeePet Services"
            width={160}
            height={60}
            className="object-contain brightness-0 invert"
            priority
          />
        </div>

        {/* Animated checkmark */}
        <div className="w-20 h-20 bg-[#b2d650]/15 border-2 border-[#b2d650]/40 rounded-full flex items-center justify-center mx-auto mb-6" style={{ animation: 'bounceOnce 0.6s ease-out 0.2s both' }}>
          <svg className="w-10 h-10 text-[#b2d650]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight">
          Booking Confirmed! 🐾
        </h1>
        <p className="text-white/60 text-sm sm:text-base font-medium mb-8">
          Thank you for trusting DeePet Services. Our team will reach out shortly.
        </p>

        {/* Consultation code card */}
        {code && (
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5 mb-8 inline-block">
            <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Your Consultation Code</span>
            <span className="text-[#b2d650] text-3xl font-black tracking-wider font-mono">{code}</span>
            <p className="text-white/40 text-[10px] mt-1.5 font-medium">Save this for your reference</p>
          </div>
        )}

        {/* WhatsApp redirect card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.026.505 3.927 1.395 5.594L0 24l6.604-1.732A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.039-1.38l-.361-.214-3.742.981.998-3.648-.235-.374A9.885 9.885 0 012.104 12c0-5.459 4.437-9.895 9.896-9.895 5.458 0 9.895 4.436 9.895 9.895 0 5.458-4.437 9.894-9.895 9.894z" />
            </svg>
            <span className="text-white text-sm font-bold">Redirecting to WhatsApp</span>
          </div>

          {/* Countdown ring */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle
                  cx="24" cy="24" r="20"
                  fill="none"
                  stroke="#b2d650"
                  strokeWidth="3"
                  strokeDasharray={`${(countdown / 4) * 125.6} 125.6`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 1s linear' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white font-black text-lg">{countdown}</span>
            </div>
            <span className="text-white/50 text-xs font-medium">seconds</span>
          </div>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full bg-green-500 hover:bg-green-400 text-white font-extrabold text-sm py-3 rounded-xl transition-all cursor-pointer"
          >
            Open WhatsApp Now →
          </button>
        </div>

        {/* Back to site */}
        <a
          href="/"
          className="text-white/40 hover:text-white/80 text-xs font-medium transition-colors underline underline-offset-2"
        >
          ← Back to DeePet Services
        </a>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounceOnce {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.15); }
          60% { transform: scale(0.95); }
        }
      `}} />
    </div>
  );
}
