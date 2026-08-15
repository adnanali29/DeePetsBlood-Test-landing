'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Side with Cute Dog */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-b from-indigo-100 to-deepblue-100 rounded-3xl p-6 overflow-hidden shadow-xl border border-deepblue-200 text-center">
              <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600"
                  alt="Veterinary Diagnostics"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-around text-slate-800">
                <div>
                  <span className="text-2xl font-black text-deepblue-600 font-heading">24/7</span>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Support</p>
                </div>
                <div className="border-x border-slate-200 px-4">
                  <span className="text-2xl font-black text-deepblue-600 font-heading">15+</span>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Years Experience</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-deepblue-600 font-heading">100%</span>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Safe Care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-deepblue-600 font-extrabold text-xs uppercase tracking-widest bg-deepblue-100 px-4 py-1.5 rounded-full">
              About DeePet Services
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-heading">
              Innovative tech meets deep expertise. <br />
              <span className="text-deepblue-600">Advanced diagnostics</span> for pets.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
              At DeePet Services, we aim to transform pet healthcare by making blood diagnostics and veterinary checkups stress-free. No long clinic queues or anxious car rides. Licensed veterinarians and skilled phlebotomists visit your home equipped with NABL-certified collection standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-softbg border border-deepblue-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-deepblue-100 text-deepblue-600 flex items-center justify-center shrink-0 text-sm font-bold">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">NABL Certified Labs</h4>
                  <p className="text-[11px] text-slate-500">Processed using automated analyzers.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-softbg border border-deepblue-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-deepblue-100 text-deepblue-600 flex items-center justify-center shrink-0 text-sm font-bold">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Zero Travel Stress</h4>
                  <p className="text-[11px] text-slate-500">Sample collection in comfortable home setting.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
