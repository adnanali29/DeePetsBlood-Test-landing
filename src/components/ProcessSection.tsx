'use client';

import React from 'react';
import { Calendar, Home as HomeIcon, FlaskConical, FileText } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'Book a Test',
      desc: 'Choose the test and schedule at your convenience.',
      color: 'pink',
      icon: <Calendar className="w-7 h-7 text-[#eb366d]" />,
      badgeBg: 'bg-[#eb366d]',
      circleBg: 'bg-pink-50 border-pink-100',
    },
    {
      num: 2,
      title: 'Home Collection',
      desc: 'Our expert collects the sample from your home hassle-free.',
      color: 'purple',
      icon: <HomeIcon className="w-7 h-7 text-[#653bf7]" />,
      badgeBg: 'bg-[#653bf7]',
      circleBg: 'bg-purple-50 border-purple-100',
    },
    {
      num: 3,
      title: 'Advanced Testing',
      desc: 'Samples are analyzed in NABL-certified labs using advanced technology.',
      color: 'pink',
      icon: <FlaskConical className="w-7 h-7 text-[#eb366d]" />,
      badgeBg: 'bg-[#eb366d]',
      circleBg: 'bg-pink-50 border-pink-100',
    },
    {
      num: 4,
      title: 'Get Reports',
      desc: 'Receive accurate reports within 24–48 hours on email/WhatsApp.',
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Simple Process, Stress-Free for You & Your Pet
          </h2>
        </div>

        {/* 4 Steps Timeline Container */}
        <div className="relative">
          
          {/* Dashed Horizontal Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-slate-300 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
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
