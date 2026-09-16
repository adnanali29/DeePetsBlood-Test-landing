'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Activity } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface RecoveryRehabSectionProps {
  onOpenBookingModal: (testTitle: string, price: number) => void;
}

export const RecoveryRehabSection: React.FC<RecoveryRehabSectionProps> = ({ onOpenBookingModal }) => {
  const { rehabConfig } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const inclusions = rehabConfig?.inclusions || [];
  const allItems = rehabConfig?.allItems || [];

  const handleBook = () => {
    onOpenBookingModal(rehabConfig?.packageTitle || 'Joint Rehabilitation Programme — 45 Days', rehabConfig?.price || 49999);
  };

  return (
    <section id="rehab" className="py-14 lg:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-emerald-900/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-900/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-wider mb-3 border border-emerald-500/20">
            {rehabConfig?.tag || 'Residential Care'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-3">
            {rehabConfig?.title || 'Recovery & Rehabilitation'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-2xl mx-auto leading-relaxed">
            {rehabConfig?.subtitle || "Structured, residential recovery at DeePet's farm boarding facility — for pets who need more than a home visit and less than a hospital stay."}
          </p>
        </div>

        {/* SINGLE DARK CARD MATCHING IMAGE 2 EXACTLY */}
        <div className="bg-slate-900/90 rounded-[2.25rem] p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative">
          
          {/* Top Row: Icon Badge + Package 6 Code + Title */}
          <div className="flex items-start gap-3.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
              <Activity className="w-5 h-5 text-[#b2d650]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">
                PACKAGE 5
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-heading leading-tight">
                Joint Rehabilitation Programme — 45 Days
              </h3>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-[#b2d650] font-semibold text-xs sm:text-sm italic mb-4 pl-0 sm:pl-[52px]">
            Real recovery needs a real environment, not just a cage-rest order.
          </p>

          {/* Description */}
          <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed mb-5">
            For pets recovering from orthopedic/ligament surgery (TPLO, fracture repair, patellar luxation), chronic arthritis, hip/elbow dysplasia, spinal or soft-tissue mobility injuries, or seniors with progressive joint decline. Farm boarding facility · pickup &amp; drop included.
          </p>

          {/* Highlight Box */}
          <div className="bg-slate-800/80 text-slate-200 text-xs sm:text-sm font-medium p-4 rounded-2xl mb-6 leading-relaxed border border-slate-700/80">
            ★ Why pet parents pick this: physiotherapy, hydrotherapy, diet and medication combined under one roof at a farm setting — no repeated clinic trips with a mobility-limited pet.
          </div>

          {/* Checklist (1-column list) */}
          <ul className="space-y-2.5 mb-5">
            {inclusions.map((inc, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                <Check className="w-4 h-4 text-[#b2d650] shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>

          {/* Underlined Collapsible Link */}
          <div className="mb-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs sm:text-sm font-bold text-[#b2d650] underline hover:text-[#a1c83d] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>See everything included ({allItems.length} items)</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Expanded items */}
            {isExpanded && (
              <div className="mt-3 bg-slate-800/60 p-4 rounded-2xl text-xs sm:text-sm text-slate-300 space-y-2 border border-slate-700/60 animate-fade-in">
                {allItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#b2d650] font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price & Subnote */}
          <div className="border-t border-slate-800 pt-5 mb-6">
            <p className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#b2d650] font-heading">
              From ₹49,999 / 45-day residential programme
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 font-normal mt-1.5 leading-relaxed">
              Covers boarding, physiotherapy, hydrotherapy, diet, standard medication and vet monitoring for a small/medium pet; large-breed and post-major-orthopedic cases priced slightly higher. Optional weekly maintenance extension available.
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleBook}
            className="w-full py-3.5 sm:py-4 rounded-full bg-[#b2d650] hover:bg-[#a1c83d] text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
          >
            Book this package
          </button>

        </div>

      </div>
    </section>
  );
};
