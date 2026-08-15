'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageSquare, Check, MapPin } from 'lucide-react';
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

export const HeroSection: React.FC<HeroSectionProps> = ({ onFormSuccess }) => {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = LOCAL_PET_VIDEOS[activeVideoIdx];

  // Auto-advance video carousel smoothly every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVideoIdx((prev) => (prev + 1) % LOCAL_PET_VIDEOS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // When activeVideoIdx changes, play the next video cleanly
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeVideoIdx]);

  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden py-10 lg:py-14 text-white">
      
      {/* PURE AUTOMATIC FULL-COVER BACKGROUND VIDEO CAROUSEL (Dog 2 -> cat -> Dog 5) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        <video
          ref={videoRef}
          key={currentVideo.id}
          src={currentVideo.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.32] object-center transition-opacity duration-1000"
        />
        
        {/* Soft Ambient Overlay so background video is clearly visible while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/35 z-10" />
        <div className="absolute inset-0 bg-black/15 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT SIDE CONTENT OVERLAY — CENTER-ALIGNED ON PHONE / MOBILE, LEFT-ALIGNED ON DESKTOP */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
            
            {/* Location Badge */}
            <div className="flex justify-center lg:justify-start w-full">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 border border-amber-400/60 text-amber-300 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-lg">
                <MapPin className="w-4 h-4 text-amber-400" />
                SERVICES AVAILABLE ONLY IN DELHI NCR
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-heading drop-shadow-md text-center lg:text-left w-full">
              Professional Vet & <br />
              <span className="text-[#b2d650]">Pet Care at Your</span> <br />
              Home
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-200 font-medium max-w-xl text-center lg:text-left mx-auto lg:mx-0 drop-shadow">
              No travel. No waiting. No stress for your pet.
            </p>

            {/* Highlight Banner Pill */}
            <div className="inline-block bg-black/65 border border-white/20 backdrop-blur-md rounded-2xl px-5 py-2.5 text-sm sm:text-base font-extrabold text-white shadow-md mx-auto lg:mx-0">
              <span>Professional Home Consultation</span>
              <span className="text-slate-300 font-normal ml-2 text-xs sm:text-sm">(All travel included)</span>
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
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 w-full">
              <a
                href="tel:+917500367400"
                className="bg-[#b2d650] hover:bg-[#a1c83d] text-slate-900 px-8 py-3.5 rounded-full text-base font-extrabold transition-all shadow-lg hover:scale-105 flex items-center gap-2.5"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>

              <a
                href="https://wa.me/917500367400"
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
