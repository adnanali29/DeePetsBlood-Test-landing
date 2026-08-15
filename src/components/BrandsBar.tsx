'use client';

import React from 'react';

export const BrandsBar: React.FC = () => {
  const brands = ['ROYAL CANIN', 'Pedigree', 'PRO PLAN', "Hill's", 'drools', 'whiskas'];

  return (
    <section className="py-10 bg-white border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest font-bold text-brand-muted mb-6">
          Trusted by Pet Parents & Veterinary Nutrition Partners
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-serif font-bold text-xl sm:text-2xl tracking-wider text-gray-700 hover:text-brand-purple transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
