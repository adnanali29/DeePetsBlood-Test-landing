'use client';

import React from 'react';

interface TestCatalogProps {
  onOpenBookingModal: (testTitle: string, price: number) => void;
}

export const TestCatalog: React.FC<TestCatalogProps> = ({ onOpenBookingModal }) => {
  const popularTests = [
    {
      id: 'cbc',
      name: 'Complete Blood Count (CBC)',
      desc: 'Detects anemia, infections, and overall health status.',
      price: 899,
      iconBg: 'bg-red-50 text-red-500',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="20" fill="#FF4D6D" opacity="0.9" />
          <circle cx="32" cy="32" r="14" fill="#C70039" opacity="0.3" />
          <circle cx="18" cy="18" r="4" fill="#FF85A1" />
          <circle cx="48" cy="22" r="3" fill="#FF85A1" />
          <path d="M12 40C12 40 24 32 38 42" stroke="#FF4D6D" strokeWidth="4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'kft',
      name: 'Kidney Function Test (KFT)',
      desc: 'Evaluates kidney health and function.',
      price: 1299,
      iconBg: 'bg-orange-50 text-amber-600',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16C16 16 12 22 12 32C12 42 16 48 24 48C30 48 32 40 30 32C28 24 28 16 22 16Z" fill="#E05638" />
          <path d="M42 16C48 16 52 22 52 32C52 42 48 48 40 48C34 48 32 40 34 32C36 24 36 16 42 16Z" fill="#D14324" />
          <path d="M24 32H16" stroke="#FFA07A" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 32H48" stroke="#FFA07A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'lft',
      name: 'Liver Function Test (LFT)',
      desc: 'Monitors liver enzymes and overall liver health.',
      price: 1299,
      iconBg: 'bg-rose-50 text-rose-600',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 26C14 18 24 14 36 14C48 14 54 22 54 32C54 44 42 50 28 50C16 50 14 38 14 26Z" fill="#E63946" />
          <path d="M24 22C32 20 44 26 48 34" stroke="#FF85A1" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'thyroid',
      name: 'Thyroid Profile (T4)',
      desc: 'Checks thyroid levels and metabolic function.',
      price: 1199,
      iconBg: 'bg-pink-50 text-pink-600',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 20C12 26 14 42 26 44C28 36 26 26 18 20Z" fill="#FF6B8B" />
          <path d="M46 20C52 26 50 42 38 44C36 36 38 26 46 20Z" fill="#FF4D6D" />
          <path d="M26 32H38" stroke="#FFE6E8" strokeWidth="4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'fullbody',
      name: 'Full Body Profile (Advanced)',
      desc: 'Comprehensive analysis for a complete health overview.',
      price: 2499,
      iconBg: 'bg-purple-50 text-purple-600',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="24" width="10" height="28" rx="5" fill="#8B5CF6" />
          <rect x="36" y="16" width="10" height="36" rx="5" fill="#653BF7" />
          <path d="M18 16H28" stroke="#653BF7" strokeWidth="3" strokeLinecap="round" />
          <path d="M36 10H46" stroke="#653BF7" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 40H26" stroke="#DDD6FE" strokeWidth="3" />
          <path d="M38 34H44" stroke="#DDD6FE" strokeWidth="3" />
        </svg>
      ),
    },
  ];

  return (
    <section id="packages" className="py-16 lg:py-20 bg-[#faf8fc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title matching screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Most Popular Blood Tests
          </h2>
        </div>

        {/* 5 Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {popularTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-md shadow-purple-500/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center text-center group min-h-[340px]"
            >
              {/* Illustrated Icon Container */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 mt-1 transition-transform group-hover:scale-110">
                {test.icon}
              </div>

              {/* Title & Description */}
              <div className="flex-1 flex flex-col items-center justify-center my-2">
                <h3 className="text-base font-extrabold text-slate-900 font-heading leading-snug">
                  {test.name}
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed font-medium">
                  {test.desc}
                </p>
              </div>

              {/* Price & Tag */}
              <div className="mt-4 pt-3 border-t border-slate-100/80 w-full flex items-center justify-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold text-[#653bf7] font-heading">
                  ₹{test.price}
                </span>
                <span className="text-slate-400 text-xs font-semibold">
                  • Cats & Dogs
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onOpenBookingModal(test.name, test.price)}
                className="w-full mt-4 bg-[#653bf7] hover:bg-[#5024f5] text-white font-extrabold text-xs py-3 rounded-full shadow-md hover:shadow-purple-500/25 transition-all hover:scale-105 cursor-pointer"
              >
                Book Now
              </button>

            </div>
          ))}
        </div>

        {/* Bottom Outline Pill Button matching screenshot */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#653bf7]/40 hover:border-[#653bf7] text-[#653bf7] font-extrabold text-sm shadow-sm hover:shadow-md transition-all hover:scale-105 bg-white cursor-pointer"
          >
            <span>View All Tests</span>
            <span className="text-base">›</span>
          </a>
        </div>

      </div>
    </section>
  );
};
