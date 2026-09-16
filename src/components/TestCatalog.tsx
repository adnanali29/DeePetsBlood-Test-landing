'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Activity, Stethoscope, HeartPulse, Sparkles, Award } from 'lucide-react';
import { DETAILED_PACKAGES, DetailedPackage } from '@/data/testsData';

interface TestCatalogProps {
  onOpenBookingModal: (testTitle: string, price: number) => void;
  onExploreClick?: (petType: 'cat' | 'dog') => void;
}

export const TestCatalog: React.FC<TestCatalogProps> = ({ onOpenBookingModal, onExploreClick }) => {
  const [activeTab, setActiveTab] = useState<'wellness' | 'blood' | 'rehab' | 'surgery'>('wellness');
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({
    'pkg-1': false,
    'pkg-2': false,
    'pkg-3': false,
    'pkg-4': false,
    'pkg-b2': false,
    'pkg-6': false,
    'pkg-7': false,
  });

  const toggleExpand = (id: string) => {
    setExpandedPackages(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBookDetailed = (title: string, priceDisplay: string) => {
    const numericPrice = parseInt(priceDisplay.replace(/[^0-9]/g, ''), 10) || 2999;
    onOpenBookingModal(title, numericPrice);
  };

  // 4 Preventive Wellness Packages matching Images 2 & 3
  const preventiveWellnessPackages = [
    {
      id: 'pkg-1',
      code: 'PACKAGE 1',
      title: 'Puppy / Kitten First Year',
      tagline: 'Everything they need in their first year.',
      inclusions: [
        'Home vet examinations × 3–4',
        'Weight & growth monitoring',
        'Body-condition assessment',
        'Nutrition consultation',
      ],
      totalItemsCount: 19,
      allInclusions: [
        'Visit 1: Home vet exam, Core vaccine #1 (DHPPi/FVRCP), Deworming, Growth log',
        'Visit 2: Home vet exam, Core booster #2, Deworming check & repeat',
        'Visit 3: Home vet exam, Rabies vaccine, Core booster #3, Microchip guidance',
        'First-year wellness certificate & WhatsApp vet Q&A'
      ],
      priceDisplay: 'From ₹9,999 (dog) / ₹6,999 (cat)',
      subnote: 'Includes vaccine doses',
    },
    {
      id: 'pkg-2',
      code: 'PACKAGE 2',
      title: 'Wellness 360° — Adult Pet',
      tagline: 'Comprehensive annual health assessment.',
      inclusions: [
        'Comprehensive physical examination',
        'Weight + BCS',
        'Temperature',
        'Heart & respiratory assessment',
      ],
      totalItemsCount: 23,
      allInclusions: [
        'Full physical exam, ear/eye & oral screening',
        'CBC (Complete Blood Count), Blood Glucose',
        'LFT & KFT biochemical organ profiles',
        'Deworming, flea/tick recommendation & wellness summary'
      ],
      priceDisplay: 'Essential ₹2,999 · Comprehensive ₹4,999 · Complete ₹6,999',
      subnote: 'Tier depends on the panel of blood/urine tests included; vaccination/deworming billed separately at standard rates if added.',
    },
    {
      id: 'pkg-3',
      code: 'PACKAGE 3',
      title: 'Senior Pet — Age Well',
      tagline: 'Senior screening before symptoms become serious.',
      subtitle: 'For dogs 7+ / cats 8+',
      highlight: '★ Why pet parents pick this: structured senior plan with SDMA/thyroid screening',
      inclusions: [
        'Comprehensive vet examination × 2',
        'Blood pressure',
        'Weight + muscle condition',
        'Orthopedic examination',
      ],
      totalItemsCount: 23,
      allInclusions: [
        'Extended blood panel (CBC, LFT, KFT)',
        'Blood glucose & Thyroid (T4) screening',
        'SDMA kidney marker (early-stage detection)',
        'Urine routine & microscopy',
        'Mobility, joint & pain scoring',
        'Senior nutrition & supplement plan'
      ],
      priceDisplay: 'Essential ₹5,999 · Comprehensive ₹9,999 · Complete ₹15,999',
      subnote: '',
    },
    {
      id: 'pkg-4',
      code: 'PACKAGE 4',
      title: 'Pet Fit — Weight Loss Program (45 Days)',
      subtitle: 'At farm boarding facility · includes pet pickup & drop',
      highlight: '★ Why pet parents pick this: turns weight loss into a trackable program with vet-measured checkpoints, not just a one-time “feed less” instruction.',
      inclusions: [
        'Continuous veterinary assessment',
        'Weight + BCS + muscle condition',
        'Exercise assessment',
        'Mobility assessment',
      ],
      totalItemsCount: 12,
      allInclusions: [
        '45-day farm boarding stay',
        'Customised calorie-controlled weight loss diet',
        'Daily supervised exercise & hydrotherapy sessions',
        'Weekly vet weight logs & gait video updates'
      ],
      priceDisplay: '₹30,000 / 45-day program',
      subnote: '',
    },
  ];

  const filteredDetailedPackages = DETAILED_PACKAGES.filter(p => p.category === activeTab);

  return (
    <section id="packages" className="py-16 lg:py-24 bg-[#faf8fc] relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-purple-100/40 blur-3xl pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-pink-100/40 blur-3xl pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-[#653bf7] text-xs font-black uppercase tracking-wider mb-3 shadow-sm border border-purple-100">
            Comprehensive Care Panels
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Specialised Veterinary Care Packages
          </h2>
          <p className="text-slate-500 mt-3 font-medium text-sm sm:text-base leading-relaxed">
            Detailed health panels, blood testing, rehabilitation, and surgical care tailored for your pet.
          </p>
        </div>

        {/* CATEGORY TABS SELECTOR */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => setActiveTab('wellness')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-sm ${
              activeTab === 'wellness'
                ? 'bg-[#653bf7] text-white shadow-lg shadow-purple-500/25 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Preventive Wellness</span>
          </button>

          <button
            onClick={() => setActiveTab('blood')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-sm ${
              activeTab === 'blood'
                ? 'bg-[#653bf7] text-white shadow-lg shadow-purple-500/25 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Blood Check & Diagnostics</span>
          </button>

          <button
            onClick={() => setActiveTab('rehab')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-sm ${
              activeTab === 'rehab'
                ? 'bg-[#653bf7] text-white shadow-lg shadow-purple-500/25 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Residential Rehab (45-Day)</span>
          </button>

          <button
            onClick={() => setActiveTab('surgery')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-sm ${
              activeTab === 'surgery'
                ? 'bg-[#653bf7] text-white shadow-lg shadow-purple-500/25 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Surgery Care Packages</span>
          </button>
        </div>

        {/* TAB 1: PREVENTIVE WELLNESS — 2x2 GRID MATCHING REFERENCE IMAGES 2 & 3 */}
        {activeTab === 'wellness' && (
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
                      className="text-xs font-extrabold text-[#653bf7] hover:underline inline-flex items-center gap-1 mb-6 cursor-pointer"
                    >
                      <span>See everything included ({pkg.totalItemsCount} items)</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Expanded Items */}
                    {isExpanded && (
                      <div className="bg-purple-50/60 p-4 rounded-2xl mb-6 text-xs text-slate-700 space-y-2 border border-purple-100 animate-fade-in">
                        {pkg.allInclusions.map((item, idx) => (
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

                  {/* Lime Green CTA Button matching Reference Image 2 & 3 */}
                  <button
                    onClick={() => handleBookDetailed(pkg.title, pkg.priceDisplay)}
                    className="w-full mt-6 py-3.5 rounded-full bg-[#b2d650] hover:bg-[#a1c83d] text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    Book this package
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* OTHER TABS: BLOOD CHECK, REHAB, SURGERY */}
        {activeTab !== 'wellness' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {filteredDetailedPackages.map((pkg) => {
              const isExpanded = expandedPackages[pkg.id] ?? false;

              return (
                <div
                  key={pkg.id}
                  className="bg-white rounded-[2.25rem] p-6 sm:p-7 flex flex-col justify-between border border-slate-200 shadow-md shadow-slate-200/50 hover:shadow-xl transition-all duration-300 relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-purple-50 text-[#653bf7] border border-purple-100">
                        {pkg.code}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 font-heading leading-tight mb-1">
                      {pkg.title}
                    </h3>

                    {pkg.subtitle && (
                      <p className="text-slate-500 text-xs font-semibold mb-3">
                        {pkg.subtitle}
                      </p>
                    )}

                    <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 mb-4">
                      <span className="text-xl sm:text-2xl font-black text-slate-950 font-heading">
                        {pkg.priceDisplay}
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4">
                      {pkg.overview}
                    </p>

                    <button
                      onClick={() => toggleExpand(pkg.id)}
                      className="w-full flex items-center justify-between py-2 px-3 bg-purple-50/60 hover:bg-purple-100/60 text-[#653bf7] rounded-xl text-xs font-extrabold transition-all cursor-pointer mb-4"
                    >
                      <span>{isExpanded ? 'Hide Included Details' : 'See Everything Included'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="space-y-3 pt-1 pb-3 max-h-[300px] overflow-y-auto pr-1">
                        {pkg.inclusions.map((sec, sIdx) => (
                          <div key={sIdx} className="border-t border-slate-100 pt-2">
                            {sec.title && (
                              <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
                                {sec.title}
                              </h4>
                            )}
                            <ul className="space-y-1.5">
                              {sec.items.map((item, iIdx) => (
                                <li key={iIdx} className="flex items-start gap-2 text-xs text-slate-600">
                                  <Check className="w-3.5 h-3.5 text-[#b2d650] shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleBookDetailed(pkg.title, pkg.priceDisplay)}
                    className="w-full mt-4 font-extrabold text-xs py-3.5 rounded-full shadow-md transition-all hover:scale-[1.02] bg-[#b2d650] hover:bg-[#a1c83d] text-slate-950 cursor-pointer"
                  >
                    Book this package
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
