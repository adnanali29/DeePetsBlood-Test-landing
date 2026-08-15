'use client';

import React from 'react';

export const TrustStatsBar: React.FC = () => {
  return (
    <section className="py-10 bg-white border-y border-deepblue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-deepblue-50/60 border border-deepblue-100">
            <span className="text-3xl sm:text-4xl font-black text-deepblue-600 font-heading block">15,000+</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1 block">Doorstep Vet Visits</span>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <span className="text-3xl sm:text-4xl font-black text-indigo-600 font-heading block">12,500+</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1 block">Successful Diagnostics</span>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
            <span className="text-3xl sm:text-4xl font-black text-brandpurple font-heading block">50+</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1 block">Expert Certified Vets</span>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600 font-heading block">4.9 / 5</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1 block">5,000+ Happy Parents</span>
          </div>
        </div>
      </div>
    </section>
  );
};
