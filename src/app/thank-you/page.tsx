'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const rawCode = searchParams.get('code') || '';
  const code = decodeURIComponent(rawCode);

  const [waUrl, setWaUrl] = useState<string>('');
  const [redirected, setRedirected] = useState<boolean>(false);
  const redirectedRef = useRef(false);

  useEffect(() => {
    // 1. Check URL query param ?wa=
    const queryWa = searchParams.get('wa');
    if (queryWa) {
      const decoded = decodeURIComponent(queryWa);
      setWaUrl(decoded);
      return;
    }

    // 2. Check SessionStorage
    if (code) {
      const stored = sessionStorage.getItem(`deepet_wa_${code}`);
      if (stored) {
        setWaUrl(stored);
        return;
      }
    }

    // 3. Fallback Universal WhatsApp Link
    const defaultMsg = `Hi DeePet Services, I have submitted a consultation request (${code || 'DeePet'}). Please connect with me.`;
    const fallbackUrl = `https://api.whatsapp.com/send?phone=918178468130&text=${encodeURIComponent(defaultMsg)}`;
    setWaUrl(fallbackUrl);
  }, [code, searchParams]);

  // Automatic redirect after 1.5 seconds
  useEffect(() => {
    if (!waUrl) return;
    const timer = setTimeout(() => {
      if (!redirectedRef.current) {
        redirectedRef.current = true;
        setRedirected(true);
        window.open(waUrl, '_blank');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [waUrl]);

  const handleOpenWhatsApp = () => {
    if (waUrl) {
      redirectedRef.current = true;
      setRedirected(true);
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: '24px 16px',
        backgroundColor: '#060e0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#0d1c16',
          border: '1px solid #1a3628',
          borderRadius: '24px',
          padding: '32px 24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/deepetservices-logo.webp"
            alt="DeePet Services"
            width={150}
            height={48}
            style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            priority
          />
        </div>

        {/* Checkmark Circle */}
        <div
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'rgba(178, 214, 80, 0.15)',
            border: '2px solid #b2d650',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 0 20px rgba(178, 214, 80, 0.2)',
          }}
        >
          <svg
            style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="#b2d650"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading & Subtitle */}
        <h1
          style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#ffffff',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px',
          }}
        >
          Request Received! 🐾
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: '#94a3b8',
            margin: '0 0 24px 0',
            lineHeight: '1.5',
          }}
        >
          Thank you for choosing DeePet Services. Our veterinary team has received your request and will call you shortly.
        </p>

        {/* Consultation Code Badge */}
        {code && (
          <div
            style={{
              backgroundColor: '#040907',
              border: '1px solid #1e3a2b',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              Consultation Reference Code
            </span>
            <span
              style={{
                fontSize: '28px',
                fontWeight: '900',
                color: '#b2d650',
                fontFamily: 'monospace',
                letterSpacing: '2px',
                display: 'block',
              }}
            >
              {code}
            </span>
            <span
              style={{
                fontSize: '10px',
                color: '#475569',
                marginTop: '4px',
                display: 'block',
              }}
            >
              Save this code for your reference
            </span>
          </div>
        )}

        {/* WhatsApp Card */}
        <div
          style={{
            backgroundColor: 'rgba(6, 78, 59, 0.35)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '20px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#34d399',
              fontSize: '13px',
              fontWeight: '700',
              marginBottom: '6px',
            }}
          >
            <svg style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px' }} viewBox="0 0 24 24" fill="#34d399">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.026.505 3.927 1.395 5.594L0 24l6.604-1.732A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.039-1.38l-.361-.214-3.742.981.998-3.648-.235-.374A9.885 9.885 0 012.104 12c0-5.459 4.437-9.895 9.896-9.895 5.458 0 9.895 4.436 9.895 9.895 0 5.458-4.437 9.894-9.895 9.894z" />
            </svg>
            <span>Connecting to WhatsApp...</span>
          </div>

          <p style={{ fontSize: '11px', color: '#cbd5e1', margin: '0 0 12px 0', lineHeight: '1.4' }}>
            Opening WhatsApp to complete your consultation details with our veterinary care assistant.
          </p>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            style={{
              width: '100%',
              padding: '13px',
              backgroundColor: '#10b981',
              color: '#022c22',
              fontWeight: '800',
              fontSize: '13px',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            }}
          >
            <span>{redirected ? 'Opening WhatsApp App...' : 'Open WhatsApp Now →'}</span>
          </button>
        </div>

        {/* Back Link */}
        <a
          href="/"
          style={{
            color: '#64748b',
            fontSize: '12px',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          ← Return to DeePet Services Home
        </a>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', backgroundColor: '#060e0a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading confirmation...
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
