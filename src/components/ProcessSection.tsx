'use client';

import React from 'react';
import { Calendar, Home as HomeIcon, FlaskConical, FileText } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'Book',
      desc: 'Request a callback or select your required pet health care package online.',
      color: 'pink',
      icon: <Calendar className="w-7 h-7 text-[#eb366d]" />,
      badgeBg: 'bg-[#eb366d]',
      circleBg: 'bg-pink-50 border-pink-100',
    },
    {
      num: 2,
      title: 'Home Visit',
      desc: 'A certified veterinary doctor visits your home to examine your pet and collect samples.',
      color: 'purple',
      icon: <HomeIcon className="w-7 h-7 text-[#653bf7]" />,
      badgeBg: 'bg-[#653bf7]',
      circleBg: 'bg-purple-50 border-purple-100',
    },
    {
      num: 3,
      title: 'Treatment & Recovery',
      desc: 'Diagnostics, surgical procedures, or rehabilitation care performed with full medical oversight.',
      color: 'pink',
      icon: <FlaskConical className="w-7 h-7 text-[#eb366d]" />,
      badgeBg: 'bg-[#eb366d]',
      circleBg: 'bg-pink-50 border-pink-100',
    },
    {
      num: 4,
      title: 'Follow-up',
      desc: 'Continuous recovery monitoring, home checks, and post-operative progress evaluations.',
      color: 'purple',
      icon: <FileText className="w-7 h-7 text-[#653bf7]" />,
      badgeBg: 'bg-[#653bf7]',
      circleBg: 'bg-purple-50 border-purple-100',
    },
  ];

  return (
    <section id="process" className="py-8 lg:py-12 bg-[#faf7fc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Container with compact bottom margin */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-[#653bf7] text-xs font-black uppercase tracking-wider mb-2 border border-purple-100">
            Doorstep Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Care That Comes To You
          </h2>
          <p className="text-slate-500 mt-2 font-medium text-xs sm:text-sm">
            Simple, transparent 4-step doorstep veterinary care process
          </p>
        </div>

        {/* 4 Steps Timeline Container */}
        <div className="relative">
          
          {/* Dashed Horizontal Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-slate-300 z-0" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                
                {/* Compact Circle Icon */}
                <div className={`w-20 h-20 rounded-full ${step.circleBg} border-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 relative bg-white`}>
                  {step.icon}
                </div>

                {/* Step Title with Numbered Badge */}
                <div className="flex items-center gap-2 mt-4 mb-1.5">
                  <span className={`w-5 h-5 rounded-full ${step.badgeBg} text-white font-bold text-[11px] flex items-center justify-center shadow-sm`}>
                    {step.num}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-xs font-medium leading-relaxed max-w-xs">
                  {step.desc}
                </p>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
