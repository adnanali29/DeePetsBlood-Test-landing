import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface WhyTrustSectionProps {
  onSuccess?: (title: string, msg: string) => void;
}

export const WhyTrustSection: React.FC<WhyTrustSectionProps> = ({ onSuccess }) => {

  const trustFeatures = [
    'NABL-Certified Labs',
    'Accurate & Reliable Reports',
    'Home Sample Collection',
    'Expert Veterinary Support',
    'Affordable & Transparent Pricing',
  ];

  return (
    <section className="py-12 lg:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP CARD: Why Pet Parents Trust DeePet */}
        <div className="bg-gradient-to-r from-purple-50/50 via-pink-50/30 to-indigo-50/50 rounded-[2.5rem] p-8 sm:p-12 lg:p-14 relative overflow-hidden border border-purple-100/60 shadow-sm">
          
          {/* Subtle Paw Background Pattern */}
          <div className="absolute right-10 top-10 opacity-[0.04] pointer-events-none select-none text-9xl text-purple-900">
            🐾 🐾
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Title & Features List */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                Why Pet Parents <br />
                Trust DeePet
              </h2>

              <ul className="space-y-4 pt-2">
                {trustFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#653bf7] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-slate-800 font-bold text-sm sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Aligned Pet Group Image */}
            <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[400px] lg:min-h-[440px] mt-6 lg:mt-0">
              
              {/* Single Group Image sitting at bottom of card */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 z-10 w-[95%] sm:w-[100%] max-w-[380px] sm:max-w-[500px] lg:max-w-[560px]">
                <img
                  src="/full-image.png"
                  alt="Happy Pets"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>

            </div>

          </div>
        </div>

        {/* MIDDLE BANNER: Purple Promise Banner */}
        <div className="bg-gradient-to-r from-[#653bf7] via-[#6d40f8] to-[#7c52f8] rounded-[2rem] p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          {/* Quote Text */}
          <div className="flex items-center gap-3 text-center lg:text-left">
            <span className="text-4xl lg:text-5xl font-serif text-purple-200/80 leading-none select-none">“</span>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold font-heading leading-relaxed">
              Healthy pets, happy families. That’s the <span className="underline decoration-purple-300 decoration-2 underline-offset-4">DeePet promise</span>.
            </p>
            <span className="text-4xl lg:text-5xl font-serif text-purple-200/80 leading-none select-none">”</span>
          </div>

          {/* Social Proof Avatars & Trust Text */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shrink-0">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-3 overflow-hidden">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="/madhu.webp"
                alt="Madhu - Indian Pet Parent"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="/nikhil.webp"
                alt="Nikhil - Indian Pet Parent"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="/ankita.webp"
                alt="Ankita - Indian Pet Parent"
              />
            </div>

            <div className="text-left text-xs sm:text-sm">
              <span className="font-extrabold block text-white font-heading">Join 10,000+ pet parents</span>
              <span className="text-purple-100 font-medium">who trust us</span>
            </div>
          </div>

        </div>

        {/* Newsletter Subscription Section Removed */}

      </div>
    </section>
  );
};
