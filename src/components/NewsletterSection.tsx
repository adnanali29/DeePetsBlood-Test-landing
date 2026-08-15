'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';

interface NewsletterSectionProps {
  onSuccess: (title: string, message: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSuccess('Subscribed!', 'You will now receive pet health advisories & special offers.');
    setEmail('');
  };

  return (
    <section className="py-8 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FFF0F4] border border-pink-200/60 rounded-3xl p-4 sm:p-5 lg:px-8 lg:py-5 shadow-md shadow-pink-100/80">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8">

            {/* Left Content — Icon + Typography */}
            <div className="flex items-center gap-4 text-left w-full lg:w-auto">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-md shadow-pink-200/40 border border-pink-100 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-[#FF2A7A] stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading tracking-tight">
                  Stay Updated on Pet Health Tips
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Subscribe to get tips, offers, and important updates for your furry friends.
                </p>
              </div>
            </div>

            {/* Right Side — Input & Neon Purple Subscribe Button */}
            <form onSubmit={handleSubscribe} className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-64 px-4 py-2.5 rounded-full bg-white border border-pink-200/90 focus:bg-white focus:border-[#6336FF] focus:ring-2 focus:ring-[#6336FF]/20 outline-none text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#6336FF] hover:bg-[#5225EE] active:scale-[0.98] shadow-lg shadow-[#6336FF]/35 transition-all cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>

          </div>

        </div>
      </div>
    </section>
  );
};
