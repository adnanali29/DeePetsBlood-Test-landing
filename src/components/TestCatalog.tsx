'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Award } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PetPackage } from '@/data/testsData';

interface TestCatalogProps {
  onOpenBookingModal: (testTitle: string, price: number) => void;
  onExploreClick?: (petType: 'cat' | 'dog') => void;
}

export const TestCatalog: React.FC<TestCatalogProps> = ({ onOpenBookingModal, onExploreClick }) => {
  const { catPackages, dogPackages } = useApp();
  const [selectedPet, setSelectedPet] = useState<'dog' | 'cat'>('dog');

  const packages = selectedPet === 'dog' ? dogPackages : catPackages;

  const handleBook = (pkg: PetPackage) => {
    onOpenBookingModal(pkg.title, pkg.price);
  };

  return (
    <section id="packages" className="py-16 lg:py-24 bg-[#faf8fc] relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-purple-100/40 blur-3xl pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-pink-100/40 blur-3xl pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-[#653bf7] text-xs font-black uppercase tracking-wider mb-3">
            Preventive Diagnostics
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Doorstep Health Checkup Packages
          </h2>
          <p className="text-slate-500 mt-3 font-medium text-sm sm:text-base leading-relaxed">
            Select your pet to view affordable wellness tiers signed by certified veterinary pathologists.
          </p>

          {/* PET SELECTOR TOGGLE (Small face icons) */}
          <div className="inline-flex p-1.5 bg-white border border-slate-100 rounded-3xl mt-8 shadow-md shadow-purple-500/5 relative z-20">
            <button
              onClick={() => setSelectedPet('dog')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-extrabold transition-all cursor-pointer ${
                selectedPet === 'dog'
                  ? 'bg-[#653bf7] text-white shadow-lg shadow-purple-500/25 scale-105'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">🐶</span>
              <span>For Dogs</span>
            </button>
            <button
              onClick={() => setSelectedPet('cat')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-extrabold transition-all cursor-pointer ${
                selectedPet === 'cat'
                  ? 'bg-[#eb366d] text-white shadow-lg shadow-pink-500/25 scale-105'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">🐱</span>
              <span>For Cats</span>
            </button>
          </div>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {packages.map((pkg) => {
            const isPopular = pkg.isPopular;
            const themeColor = selectedPet === 'cat' ? 'text-[#eb366d]' : 'text-[#653bf7]';
            const themeBg = selectedPet === 'cat' ? 'bg-[#fceef3]' : 'bg-[#eee8fd]';
            
            return (
              <div
                key={pkg.name}
                className={`bg-white rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-[#653bf7] shadow-xl shadow-purple-500/10 md:-translate-y-4 scale-[1.02] md:scale-105 z-10 bg-gradient-to-b from-white to-purple-50/10'
                    : 'border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#653bf7] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Card Top: Package Info */}
                <div>
                  <span className={`inline-block px-3.5 py-1.5 rounded-2xl text-[10px] font-extrabold uppercase tracking-wide mb-4 ${
                    isPopular ? 'bg-[#653bf7] text-white' : `${themeBg} ${themeColor}`
                  }`}>
                    {pkg.name}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-tight mb-2">
                    {pkg.title}
                  </h3>

                  <p className="text-slate-500 text-xs font-semibold italic mb-6">
                    {pkg.idealFor}
                  </p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-slate-400 text-xs font-bold">starting</span>
                  </div>

                  {/* Included Tests Header */}
                  <div className="border-t border-slate-100 pt-6 mb-6">
                    <span className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Award className={`w-4 h-4 ${themeColor}`} /> {pkg.testsCount} Essential Diagnostics:
                    </span>
                    
                    {/* Tests Checklist */}
                    <ul className="space-y-2.5 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin">
                      {pkg.includedTests.map((test, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isPopular ? 'text-[#653bf7]' : 'text-emerald-500'
                          }`} />
                          <span className="text-slate-600 text-xs font-medium leading-relaxed">
                            {test}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Book Package CTA */}
                <button
                  onClick={() => handleBook(pkg)}
                  className={`w-full mt-6 font-extrabold text-xs py-4 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer ${
                    isPopular
                      ? 'bg-[#653bf7] hover:bg-[#5024f5] text-white shadow-purple-500/25'
                      : selectedPet === 'cat'
                        ? 'bg-[#eb366d] hover:bg-[#d4275b] text-white shadow-pink-500/10'
                        : 'bg-[#653bf7] hover:bg-[#5024f5] text-white shadow-purple-500/10'
                  }`}
                >
                  Book Package Now
                </button>
              </div>
            );
          })}
        </div>

        {/* View All Button linking to catalog modal */}
        <div className="mt-12 text-center relative z-20">
          <button
            onClick={() => onExploreClick?.(selectedPet)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-slate-300 hover:border-slate-800 text-slate-800 font-extrabold text-xs shadow-sm hover:shadow-md transition-all hover:scale-105 bg-white cursor-pointer"
          >
            <span>Explore Individual Diagnostic Tests</span>
            <span className="text-base">🐾</span>
          </button>
        </div>

      </div>
    </section>
  );
};
