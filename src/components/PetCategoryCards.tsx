'use client';

import React from 'react';

export const PetCategoryCards: React.FC = () => {
  return (
    <section id="categories" className="py-10 lg:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Complete Blood Testing Solutions for Your Pets
          </h2>
          <p className="text-slate-500 mt-2 font-medium text-sm sm:text-base leading-relaxed">
            From routine checkups to advanced diagnostics, we help you stay ahead in your pet’s health journey.
          </p>
        </div>

        {/* 2 Cards: Pet heads pop OUT above card top border */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-6">
          
          {/* CATS CATEGORY CARD */}
          <div className="bg-[#fceef3] rounded-[2rem] p-6 sm:p-8 lg:p-10 relative flex flex-col sm:flex-row items-center justify-between min-h-[260px] sm:min-h-[280px] shadow-sm border border-pink-100/80 group">
            
            {/* Cat Cutout Image: Anchored at left-0 bottom-0, head popping out top border */}
            <img
              src="/cat-image.png"
              alt="Cat Blood Testing"
              className="absolute bottom-0 left-0 h-[120%] sm:h-[135%] w-auto max-w-[45%] sm:max-w-[40%] object-contain object-bottom z-20 pointer-events-none drop-shadow-xl rounded-bl-[2rem]"
            />

            {/* Layout Spacer */}
            <div className="w-full sm:w-[44%] h-44 sm:h-full shrink-0" />

            {/* Cat Text Info & CTA - Right Aligned inside card */}
            <div className="space-y-3 text-center sm:text-right sm:w-[56%] relative z-30 pt-2 sm:pt-0 flex flex-col items-center sm:items-end">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#eb366d] font-heading leading-tight">
                Blood Tests for Cats
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                Detect early signs of illness and ensure a healthy, happy life for your feline friend.
              </p>
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#eb366d] hover:bg-[#d4275b] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-500/20 transition-all hover:scale-105 cursor-pointer mt-3"
              >
                <span>Explore Cat Tests</span>
                <span>🐾</span>
              </a>
            </div>

          </div>

          {/* DOGS CATEGORY CARD */}
          <div className="bg-[#eee8fd] rounded-[2rem] p-6 sm:p-8 lg:p-10 relative flex flex-col sm:flex-row items-center justify-between min-h-[260px] sm:min-h-[280px] shadow-sm border border-purple-100/80 group">
            
            {/* Dog Text Info & CTA - Left Aligned inside card */}
            <div className="space-y-3 text-center sm:text-left sm:w-[55%] relative z-30 order-2 sm:order-1 pt-2 sm:pt-0 flex flex-col items-center sm:items-start">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#653bf7] font-heading leading-tight">
                Blood Tests for Dogs
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                Monitor your dog’s health with accurate and reliable blood test panels.
              </p>
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#653bf7] hover:bg-[#5024f5] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-purple-500/20 transition-all hover:scale-105 cursor-pointer mt-3"
              >
                <span>Explore Dog Tests</span>
                <span>🐾</span>
              </a>
            </div>

            {/* Layout Spacer for Right Image */}
            <div className="w-full sm:w-[45%] h-44 sm:h-full shrink-0 order-1 sm:order-2" />

            {/* Dog Cutout Image: Anchored at right-0 bottom-0, head popping out top border */}
            <img
              src="/dog-image.png"
              alt="Dog Blood Testing"
              className="absolute bottom-0 right-0 h-[135%] sm:h-[150%] lg:h-[160%] w-auto max-w-[50%] sm:max-w-[46%] object-contain object-bottom z-20 pointer-events-none drop-shadow-xl rounded-br-[2rem]"
            />

          </div>

        </div>
      </div>
    </section>
  );
};
