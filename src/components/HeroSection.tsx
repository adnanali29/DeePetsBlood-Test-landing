'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Home as HomeIcon, ShieldCheck, FileText, Star, Phone, MessageCircle } from 'lucide-react';
import { BookingForm } from './BookingForm';
import { useApp } from '@/context/AppContext';

interface HeroSectionProps {
  onBookNowClick?: () => void;
  onFormSuccess: (title: string, msg: string) => void;
}

interface LocalPetVideo {
  id: string;
  name: string;
  videoUrl: string;
}

const LOCAL_PET_VIDEOS: LocalPetVideo[] = [
  {
    id: 'dog2',
    name: 'Dog 2 Video',
    videoUrl: '/dog2.mp4',
  },
  {
    id: 'cat',
    name: 'Cat Video',
    videoUrl: '/cat.mp4',
  },
  {
    id: 'dog5',
    name: 'Dog 5 Video',
    videoUrl: '/dog5.mp4',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onFormSuccess }) => {
  const { contactConfig } = useApp();
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVideoIdx((prev) => (prev + 1) % LOCAL_PET_VIDEOS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const activeVideo = videoRefs.current[activeVideoIdx];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {});
    }
  }, [activeVideoIdx]);

  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden py-10 lg:py-16 text-white">
      
      {/* INSTANT PRELOADED FULL-COVER BACKGROUND VIDEO CAROUSEL */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        {LOCAL_PET_VIDEOS.map((vid, idx) => (
          <video
            key={vid.id}
            ref={(el) => { videoRefs.current[idx] = el; }}
            src={vid.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover scale-[1.32] object-center transition-opacity duration-1000 ease-in-out ${
              idx === activeVideoIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          />
        ))}
        
        {/* Soft Ambient Overlay for clear text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45 z-20" />
        <div className="absolute inset-0 bg-black/20 z-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE CONTENT — MATCHING REFERENCE IMAGES */}
          <div className="lg:col-span-7 space-y-5 text-left flex flex-col items-start justify-center">
            
            {/* 5000+ HAPPY PET PARENTS BADGE (Matching Image 1) */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-slate-700/80 shadow-xl">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-slate-900 object-cover" src="/ankita.webp" alt="Pet Parent" />
                <img className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-slate-900 object-cover" src="/jyoti.webp" alt="Pet Parent" />
                <img className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-slate-900 object-cover" src="/madhu.webp" alt="Pet Parent" />
              </div>
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide uppercase">
                5000+ HAPPY PET PARENTS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-heading">
              Pet Health Care <br />
              Packages
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-medium max-w-xl leading-relaxed">
              One complete price — from home check-ups and bloodwork to surgery, medicines, home monitoring and follow-up — instead of itemised quotes.
            </p>

            {/* 3 Bullet Features List with Neon Green Icons */}
            <div className="space-y-3 pt-1 text-sm sm:text-base font-semibold text-white">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black/50 border border-[#a3e635]/40 text-[#a3e635] flex items-center justify-center shrink-0 shadow-sm">
                  <HomeIcon className="w-4 h-4 text-[#a3e635]" />
                </div>
                <span>Vet visits at your home</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black/50 border border-[#a3e635]/40 text-[#a3e635] flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#a3e635]" />
                </div>
                <span>Pre-anaesthetic bloodwork as standard</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black/50 border border-[#a3e635]/40 text-[#a3e635] flex items-center justify-center shrink-0 shadow-sm">
                  <FileText className="w-4 h-4 text-[#a3e635]" />
                </div>
                <span>One transparent package price</span>
              </div>

            </div>

            {/* CTA BUTTONS BELOW "One transparent package price" (Image 2 Neon Green CTAs) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href={`tel:${contactConfig.primaryPhone || '+917238002900'}`}
                className="bg-[#a3e635] hover:bg-[#92d029] text-slate-950 px-6 py-3 rounded-full text-sm sm:text-base font-extrabold flex items-center gap-2.5 shadow-lg shadow-[#a3e635]/25 transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-slate-950 stroke-slate-950" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${(contactConfig.whatsappNumber || '+917238002900').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#a3e635] hover:bg-[#92d029] text-slate-950 px-6 py-3 rounded-full text-sm sm:text-base font-extrabold flex items-center gap-2.5 shadow-lg shadow-[#a3e635]/25 transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* RIGHT SIDE FORM — MATCHING REFERENCE IMAGE 1 & 2 */}
          <div id="booking-form" className="lg:col-span-5 relative z-20 flex items-center justify-center w-full scroll-mt-24">
            <BookingForm onSuccess={onFormSuccess} />
          </div>

        </div>
      </div>
    </section>
  );
};
