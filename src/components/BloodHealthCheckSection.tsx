'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface BloodHealthCheckSectionProps {
  onOpenBookingModal: (testTitle: string, price: number) => void;
}

export const BloodHealthCheckSection: React.FC<BloodHealthCheckSectionProps> = ({ onOpenBookingModal }) => {
  const { bloodCheckCards } = useApp();

  return (
    <section id="blood-health-check" className="py-14 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-pink-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-xs font-black uppercase tracking-wider mb-3 border border-purple-500/20">
            Diagnostics Panel
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-3">
            Complete Blood Health Check
          </h2>
          <p className="text-lg sm:text-xl font-bold text-slate-300 font-heading mb-2">
            Know what&apos;s happening inside.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-2xl mx-auto leading-relaxed">
            Useful as a pre-surgery, senior-pet or annual screening product. Includes at-home sample collection; add-ons priced per item.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {bloodCheckCards.map((card) => (
            <div
              key={card.id}
              className={`rounded-[2.25rem] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                card.isPopular
                  ? 'bg-slate-950/90 border-2 border-[#b2d650] shadow-[0_0_35px_rgba(178,214,80,0.15)] ring-1 ring-[#b2d650]/40 scale-[1.02] md:-translate-y-2'
                  : 'bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 shadow-xl'
              }`}
            >
              <div>
                {/* Popular Badge */}
                {card.isPopular && (
                  <div className="mb-4">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-[#b2d650] text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {card.popularBadge}
                    </span>
                  </div>
                )}

                {/* Card Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2">
                  {card.title}
                </h3>

                {/* Price Display */}
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#b2d650] font-heading">
                    {card.priceDisplay}
                  </span>
                </div>

                {/* Card Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal mb-6 min-h-[50px]">
                  {card.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {card.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 font-medium">
                      <Check className="w-4 h-4 text-[#b2d650] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Button */}
              <button
                onClick={() => onOpenBookingModal(card.title + ' Blood Health Check', card.price)}
                className="w-full py-4 rounded-full font-extrabold text-xs sm:text-sm shadow-lg transition-all cursor-pointer bg-[#b2d650] hover:bg-[#a1c83d] text-slate-950 hover:scale-[1.02]"
              >
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons Block */}
        <div className="mt-14 sm:mt-16 border-t border-slate-800/80 pt-10 text-left">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2">
            Add-ons
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed mb-6 max-w-3xl">
            Imaging and urine tests complete the picture when bloodwork alone doesn&apos;t explain a symptom.
          </p>

          {/* Pill tags */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { name: 'Urine routine', icon: '🧪' },
              { name: 'Stool examination', icon: '🔬' },
              { name: 'ECG', icon: '🫀' },
              { name: 'Ultrasound', icon: '📡' },
              { name: 'X-ray', icon: '🦴' },
            ].map((addon, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800/80 border border-slate-700/80 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                <span className="text-sm">{addon.icon}</span>
                <span>{addon.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
