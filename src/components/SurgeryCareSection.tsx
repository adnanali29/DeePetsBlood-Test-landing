'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Stethoscope } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface SurgeryCareSectionProps {
  onOpenBookingModal: (testTitle: string, price: number) => void;
}

export const SurgeryCareSection: React.FC<SurgeryCareSectionProps> = ({ onOpenBookingModal }) => {
  const { surgeryPackages: packages } = useApp();
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedPackages(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBook = (title: string, priceDisplay: string) => {
    const numericPrice = parseInt(priceDisplay.replace(/[^0-9]/g, ''), 10) || 6999;
    onOpenBookingModal(title, numericPrice);
  };
  return (
    <section id="surgery-care" className="py-14 lg:py-24 bg-[#faf8fc] text-slate-800 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 right-5 w-96 h-96 rounded-full bg-purple-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-5 w-96 h-96 rounded-full bg-pink-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-[#653bf7] text-xs font-black uppercase tracking-wider mb-3 border border-purple-100 shadow-sm">
            Surgical Procedures
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight mb-3">
            Surgery Care Packages
          </h2>
          <p className="text-slate-500 mt-2 font-medium text-sm sm:text-base leading-relaxed">
            One complete price, from pre-operative testing through surgery, medicines, home monitoring and follow-up.
          </p>
        </div>

        {/* 3-Column Aligned Grid (3x3 = 9 cards, perfectly balanced) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {packages.map((pkg, index) => {
            const isExpanded = expandedPackages[pkg.id] ?? false;
            const isLastOdd = index === packages.length - 1 && packages.length % 2 !== 0;

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-[2.25rem] p-6 sm:p-8 flex flex-col justify-between border border-slate-200/90 shadow-md shadow-slate-200/40 hover:shadow-xl transition-all duration-300 relative ${
                  isLastOdd ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Top Badge & Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                      <Stethoscope className="w-4 h-4 text-[#653bf7]" />
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-50 text-[#653bf7] border border-purple-100">
                        {pkg.code}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-tight mb-2">
                    {pkg.title}
                  </h3>

                  {/* Tagline */}
                  {pkg.tagline && (
                    <p className="text-slate-500 text-xs font-semibold italic mb-2">
                      {pkg.tagline}
                    </p>
                  )}

                  {/* Description */}
                  {pkg.description && (
                    <p className="text-slate-600 text-xs leading-relaxed font-medium mb-4">
                      {pkg.description}
                    </p>
                  )}

                  {/* Checkmarks Inclusions */}
                  <ul className="space-y-2.5 mb-4">
                    {pkg.inclusions.map((inc, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-[#b2d650] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Collapsible Accordion Link */}
                  <button
                    onClick={() => toggleExpand(pkg.id)}
                    className="text-xs font-extrabold text-[#653bf7] hover:underline inline-flex items-center gap-1 mb-5 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide full details' : `See everything included (${pkg.totalItemsCount} items)`}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Expanded Full Details */}
                  {isExpanded && (
                    <div className="bg-purple-50/60 p-4 rounded-2xl mb-5 text-xs text-slate-700 space-y-4 border border-purple-100 animate-fade-in">
                      {pkg.sections?.map((sec, sIdx) => (
                        <div key={sIdx} className="border-t border-purple-100 pt-2.5 first:border-0 first:pt-0">
                          <h4 className="font-extrabold text-[#653bf7] mb-1">
                            {sec.title}
                          </h4>
                          {sec.note && (
                            <p className="text-[11px] text-slate-500 italic mb-2 leading-relaxed">
                              {sec.note}
                            </p>
                          )}
                          <ul className="space-y-1.5 pl-1">
                            {sec.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 text-slate-700">
                                <span className="text-[#653bf7] font-bold">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
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

                {/* Lime Green Button */}
                <button
                  onClick={() => handleBook(pkg.title, pkg.priceDisplay)}
                  className="w-full mt-5 py-3.5 rounded-full bg-[#b2d650] hover:bg-[#a1c83d] text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
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
