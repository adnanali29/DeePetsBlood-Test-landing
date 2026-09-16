'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { useApp } from '@/context/AppContext';

interface PetCategoryCardsProps {
  onOpenBookingModal?: (testTitle: string, price: number) => void;
}

export const PetCategoryCards: React.FC<PetCategoryCardsProps> = ({ onOpenBookingModal }) => {
  const { preventiveWellnessPackages } = useApp();
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({
    'pkg-1': false,
    'pkg-2': false,
    'pkg-3': false,
    'pkg-4': false,
  });

  const toggleExpand = (id: string) => {
    setExpandedPackages(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBookPackage = (title: string, priceDisplay: string) => {
    const numericPrice = parseInt(priceDisplay.replace(/[^0-9]/g, ''), 10) || 2999;
    if (onOpenBookingModal) {
      onOpenBookingModal(title, numericPrice);
    }
  };

  return (
    <section id="wellness" className="py-12 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Preventive Wellness Packages
          </h2>
          <p className="text-slate-500 mt-2 font-medium text-sm sm:text-base leading-relaxed">
            For healthy pets — screening, vaccination, bloodwork, nutrition and parasite control.
          </p>
        </div>

        {/* 2 Banner Cards: Cat Banner & Dog Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-6 mb-12 sm:mb-16">
          
          {/* CATS CATEGORY CARD */}
          <div className="bg-[#fceef3] rounded-[2rem] p-5 sm:p-8 lg:p-10 relative flex flex-row items-center justify-between min-h-[180px] sm:min-h-[220px] shadow-sm border border-pink-100/80 group">
            
            {/* Cat Cutout Image: Anchored at left-0 bottom-0, head popping out top border */}
            <img
              src="/cat-image.png"
              alt="Blood Tests for Cats"
              className="absolute bottom-0 left-0 h-[115%] sm:h-[135%] w-auto max-w-[42%] object-contain object-bottom z-20 pointer-events-none drop-shadow-xl rounded-bl-[2rem]"
            />

            {/* Cat Text Info - Right Aligned inside card */}
            <div className="space-y-1.5 sm:space-y-3 text-right w-[58%] ml-auto relative z-30 flex flex-col items-end">
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#eb366d] font-heading leading-tight">
                Blood Tests for Cats
              </h3>
              <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm leading-relaxed font-medium">
                Detect early signs of illness and ensure a healthy, happy life for your feline friend.
              </p>
            </div>

          </div>

          {/* DOGS CATEGORY CARD */}
          <div className="bg-[#eee8fd] rounded-[2rem] p-5 sm:p-8 lg:p-10 relative flex flex-row items-center justify-between min-h-[180px] sm:min-h-[220px] shadow-sm border border-purple-100/80 group">
            
            {/* Dog Text Info - Left Aligned inside card */}
            <div className="space-y-1.5 sm:space-y-3 text-left w-[55%] mr-auto relative z-30 flex flex-col items-start">
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#653bf7] font-heading leading-tight">
                Blood Tests for Dogs
              </h3>
              <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm leading-relaxed font-medium">
                Monitor your dog’s health with accurate and reliable blood test panels.
              </p>
            </div>

            {/* Dog Cutout Image: Anchored at right-0 bottom-0, head popping out top border */}
            <img
              src="/dog-image.png"
              alt="Blood Tests for Dogs"
              className="absolute bottom-0 right-0 h-[125%] sm:h-[150%] lg:h-[160%] w-auto max-w-[42%] object-contain object-bottom z-20 pointer-events-none drop-shadow-xl rounded-br-[2rem]"
            />

          </div>

        </div>

        {/* 4 PREVENTIVE WELLNESS PACKAGES - 2x2 GRID DIRECTLY INSIDE THIS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {preventiveWellnessPackages.map((pkg) => {
            const isExpanded = expandedPackages[pkg.id] ?? false;

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-[2.25rem] p-6 sm:p-8 flex flex-col justify-between border border-slate-200/90 shadow-md shadow-slate-200/40 hover:shadow-xl transition-all duration-300 relative"
              >
                <div>
                  {/* Code Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-purple-50 text-[#653bf7] border border-purple-100">
                      {pkg.code}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-tight mb-1">
                    {pkg.title}
                  </h3>

                  {/* Tagline / Subtitle */}
                  {pkg.tagline && (
                    <p className="text-slate-500 text-xs font-semibold italic mb-2">
                      {pkg.tagline}
                    </p>
                  )}
                  {pkg.subtitle && (
                    <p className="text-slate-500 text-xs font-semibold mb-3">
                      {pkg.subtitle}
                    </p>
                  )}

                  {/* Highlight Box if present */}
                  {pkg.highlight && (
                    <div className="bg-slate-900 text-white text-xs font-medium p-3.5 rounded-2xl mb-4 leading-relaxed border border-slate-800 shadow-sm">
                      {pkg.highlight}
                    </div>
                  )}

                  {/* Checkmark Inclusions List */}
                  <ul className="space-y-2.5 mb-4">
                    {(pkg?.inclusions || []).map((inc, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-[#b2d650] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Collapsible Accordion Link */}
                  <button
                    onClick={() => toggleExpand(pkg.id)}
                    className="text-xs font-extrabold text-[#653bf7] hover:underline inline-flex items-center gap-1 mb-6 cursor-pointer"
                  >
                    <span>See everything included ({pkg?.totalItemsCount || (pkg?.allInclusions || []).length} items)</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Expanded Items */}
                  {isExpanded && (
                    <div className="bg-purple-50/60 p-4 rounded-2xl mb-6 text-xs text-slate-700 space-y-2 border border-purple-100 animate-fade-in">
                      {(pkg?.allInclusions || []).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-[#653bf7] font-bold">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price Line */}
                  <div className="border-t border-slate-100 pt-4 mb-2">
                    <p className="text-base sm:text-lg font-black text-slate-950 font-heading">
                      {pkg.priceDisplay}
                    </p>
                    {pkg.subnote && (
                      <p className="text-[11px] text-slate-500 font-normal mt-1 leading-normal">
                        {pkg.subnote}
                      </p>
                    )}
                  </div>
                </div>

                {/* Lime Green CTA Button */}
                <button
                  onClick={() => handleBookPackage(pkg.title, pkg.priceDisplay)}
                  className="w-full mt-6 py-3.5 rounded-full bg-[#b2d650] hover:bg-[#a1c83d] text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Book this package
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

