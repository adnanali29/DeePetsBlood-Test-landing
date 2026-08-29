'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageSquare, Check } from 'lucide-react';
import { BookingForm } from './BookingForm';

interface HeroSectionProps {
  onBookNowClick?: () => void;
  onFormSuccess: (title: string, msg: string) => void;
}

interface LocalPetVideo {
  id: string;
  name: string;
  videoUrl: string;
}

// User specified order: Dog 2 -> cat -> Dog 5
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

import { useApp } from '@/context/AppContext';

export const HeroSection: React.FC<HeroSectionProps> = ({ onFormSuccess }) => {
  const { heroConfig, contactConfig } = useApp();
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-advance video carousel smoothly every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVideoIdx((prev) => (prev + 1) % LOCAL_PET_VIDEOS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Ensure active video is playing smoothly
  useEffect(() => {
    const activeVideo = videoRefs.current[activeVideoIdx];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {});
    }
  }, [activeVideoIdx]);

  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden py-10 lg:py-14 text-white">
      
      {/* INSTANT PRELOADED FULL-COVER BACKGROUND VIDEO CAROUSEL WITH ZERO FLICKER CROSSFADE */}
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
        
        {/* Soft Ambient Overlay so background video is clearly visible while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/35 z-20" />
        <div className="absolute inset-0 bg-black/15 z-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT SIDE CONTENT OVERLAY — CENTER-ALIGNED ON PHONE / MOBILE, LEFT-ALIGNED ON DESKTOP */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
            
            {/* Happy Parents Badge */}
            <div className="flex justify-center lg:justify-start w-full">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md shadow-lg">
                
                {/* 3 Overlapping Avatars */}
                <div className="flex -space-x-2.5">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-800 object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                    alt="Happy pet parent avatar 1"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-800 object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                    alt="Happy pet parent avatar 2"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-800 object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
                    alt="Happy pet parent avatar 3"
                  />
                </div>

                {/* 5 Stars */}
                <div className="flex items-center gap-0.5">
                  <span className="text-yellow-400 text-xs sm:text-sm">★</span>
                  <span className="text-yellow-400 text-xs sm:text-sm">★</span>
                  <span className="text-yellow-400 text-xs sm:text-sm">★</span>
                  <span className="text-yellow-400 text-xs sm:text-sm">★</span>
                  <span className="text-yellow-400 text-xs sm:text-sm">★</span>
                </div>

                {/* Text Description */}
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wide text-white/95">
                  5000+ Happy Pet Parents
                </span>

              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-heading drop-shadow-md text-center lg:text-left w-full whitespace-pre-line">
              {heroConfig.headline.includes('Pet Care') ? (
                <>
                  {heroConfig.headline.split('Pet Care')[0]}
                  <span className="text-[#b2d650]">Pet Care</span>
                  {heroConfig.headline.split('Pet Care')[1]}
                </>
              ) : (
                heroConfig.headline
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-200 font-medium max-w-xl text-center lg:text-left mx-auto lg:mx-0 drop-shadow">
              {heroConfig.subtitle}
            </p>

            {/* Highlight Banner Pill */}
            <div className="inline-block bg-black/65 border border-white/20 backdrop-blur-md rounded-2xl px-5 py-2.5 text-sm sm:text-base font-extrabold text-white shadow-md mx-auto lg:mx-0">
              <span>{heroConfig.badgeText}</span>
              <span className="text-slate-300 font-normal ml-2 text-xs sm:text-sm">{heroConfig.badgeSubtext}</span>
            </div>

            {/* Checkmarks Line */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-1 text-sm sm:text-base font-bold text-white drop-shadow-sm w-full">
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#b2d650] text-slate-900 flex items-center justify-center text-xs font-black">
                  <Check className="w-3.5 h-3.5" />
                </div>
                Licensed Vets
              </span>
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#b2d650] text-slate-900 flex items-center justify-center text-xs font-black">
                  <Check className="w-3.5 h-3.5" />
                </div>
                Insured
              </span>
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#b2d650] text-slate-900 flex items-center justify-center text-xs font-black">
                  <Check className="w-3.5 h-3.5" />
                </div>
                Same-Day Visits
              </span>
            </div>

            {/* Action Buttons: Call Now & WhatsApp */}
            <div className="hidden lg:flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 w-full">
              <a
                href={`tel:${contactConfig.primaryPhone}`}
                className="bg-[#b2d650] hover:bg-[#a1c83d] text-slate-900 px-8 py-3.5 rounded-full text-base font-extrabold transition-all shadow-lg hover:scale-105 flex items-center gap-2.5"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${contactConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi DeePet Services, I want to know more about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#b2d650] hover:bg-[#a1c83d] text-slate-900 px-8 py-3.5 rounded-full text-base font-extrabold transition-all shadow-lg hover:scale-105 flex items-center gap-2.5"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* RIGHT SIDE FORM CENTER-ALIGNED */}
          <div className="lg:col-span-5 relative z-20 flex items-center justify-center w-full">
            <BookingForm onSuccess={onFormSuccess} />
          </div>

        </div>
      </div>
    </section>
  );
};
