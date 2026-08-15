'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '@/data/testsData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" /> Got Questions?
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-3">
            Frequently Asked <span className="text-brand-purple">Questions</span>
          </h2>
          <p className="text-brand-muted text-sm sm:text-base mt-1">
            Everything you need to know about pet sample collection, fasting, and reports.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-brand-border rounded-2xl overflow-hidden transition-all bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-semibold text-base sm:text-lg text-brand-dark hover:text-brand-purple transition-colors bg-brand-lavender/30"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-purple transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 text-sm text-brand-muted leading-relaxed border-t border-brand-border/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
