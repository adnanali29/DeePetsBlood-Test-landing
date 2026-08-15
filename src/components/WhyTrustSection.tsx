'use client';

import React, { useState } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';

interface WhyTrustSectionProps {
  onSuccess?: (title: string, msg: string) => void;
}

export const WhyTrustSection: React.FC<WhyTrustSectionProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (onSuccess) {
      onSuccess('Subscribed Successfully! 🎉', 'Thank you for joining the DeePet family. We sent a welcome guide to your inbox.');
    }
    setEmail('');
  };

  const trustFeatures = [
    'NABL-Certified Labs',
    'Accurate & Reliable Reports',
    'Home Sample Collection',
    'Expert Veterinary Support',
    'Affordable & Transparent Pricing',
  ];

  return (
    <section className="py-12 lg:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP CARD: Why Pet Parents Trust DeePet */}
        <div className="bg-gradient-to-r from-purple-50/50 via-pink-50/30 to-indigo-50/50 rounded-[2.5rem] p-8 sm:p-12 lg:p-14 relative overflow-hidden border border-purple-100/60 shadow-sm">
          
          {/* Subtle Paw Background Pattern */}
          <div className="absolute right-10 top-10 opacity-[0.04] pointer-events-none select-none text-9xl text-purple-900">
            🐾 🐾
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Title & Features List */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                Why Pet Parents <br />
                Trust DeePet
              </h2>

              <ul className="space-y-4 pt-2">
                {trustFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#653bf7] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-slate-800 font-bold text-sm sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Big Dog & Cat Cutout Images */}
            <div className="lg:col-span-6 flex items-end justify-center lg:justify-end relative min-h-[340px] sm:min-h-[400px] pt-6 lg:pt-0">
              
              {/* Prominent Big Pet Cutout Images Sitting Side by Side */}
              <div className="relative flex items-end justify-center gap-2 z-10">
                <img
                  src="/dog-image.png"
                  alt="Happy Dog"
                  className="w-60 sm:w-76 lg:w-92 h-auto object-contain drop-shadow-2xl translate-y-3"
                />
                <img
                  src="/cat-image.png"
                  alt="Happy Cat"
                  className="w-52 sm:w-68 lg:w-80 h-auto object-contain drop-shadow-2xl translate-y-5 -ml-8"
                />
              </div>

            </div>

          </div>
        </div>

        {/* MIDDLE BANNER: Purple Promise Banner */}
        <div className="bg-gradient-to-r from-[#653bf7] via-[#6d40f8] to-[#7c52f8] rounded-[2rem] p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          {/* Quote Text */}
          <div className="flex items-center gap-3 text-center lg:text-left">
            <span className="text-4xl lg:text-5xl font-serif text-purple-200/80 leading-none select-none">“</span>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold font-heading leading-relaxed">
              Healthy pets, happy families. That’s the <span className="underline decoration-purple-300 decoration-2 underline-offset-4">DeePet promise</span>.
            </p>
            <span className="text-4xl lg:text-5xl font-serif text-purple-200/80 leading-none select-none">”</span>
          </div>

          {/* Social Proof Avatars & Trust Text */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shrink-0">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-3 overflow-hidden">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                alt="Pet Parent 1"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                alt="Pet Parent 2"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                alt="Pet Parent 3"
              />
            </div>

            <div className="text-left text-xs sm:text-sm">
              <span className="font-extrabold block text-white font-heading">Join 10,000+ pet parents</span>
              <span className="text-purple-100 font-medium">who trust us</span>
            </div>
          </div>

        </div>

        {/* BOTTOM BANNER: Newsletter Subscription */}
        <div className="bg-[#fceef3] rounded-[2rem] p-6 sm:p-8 lg:p-10 border border-pink-100/80 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          
          {/* Envelope Icon & Title */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white border border-pink-200 text-[#eb366d] flex items-center justify-center shrink-0 shadow-md">
              <Mail className="w-7 h-7 text-[#eb366d]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                Stay Updated on Pet Health Tips
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
                Subscribe to get tips, offers, and important updates for your furry friends.
              </p>
            </div>
          </div>

          {/* Subscription Input Form */}
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 shrink-0">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-6 py-3.5 rounded-full bg-white text-slate-800 text-sm font-medium border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#eb366d] min-w-[260px] sm:min-w-[300px] shadow-inner"
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-[#653bf7] hover:bg-[#5024f5] text-white font-extrabold text-sm shadow-md hover:shadow-purple-500/25 transition-all hover:scale-105 cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
