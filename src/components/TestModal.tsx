'use client';

import React from 'react';
import { X, CheckCircle, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { BloodTest } from '@/data/testsData';

interface TestModalProps {
  test: BloodTest | null;
  onClose: () => void;
  onBookNow: (testName: string) => void;
}

export const TestModal: React.FC<TestModalProps> = ({ test, onClose, onBookNow }) => {
  if (!test) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-brand-border flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-[11px] font-bold uppercase rounded-full tracking-wider mb-2">
            {test.petType === 'both' ? 'Cats & Dogs 🐾' : test.petType === 'cat' ? 'Cats Only 🐱' : 'Dogs Only 🐶'}
          </span>
          <h3 className="font-display font-extrabold text-2xl pr-8">{test.name}</h3>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-2xl font-bold">₹{test.price}</span>
            {test.originalPrice && (
              <span className="text-sm line-through text-white/70">₹{test.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-brand-dark">
          <p className="text-brand-muted leading-relaxed">{test.description}</p>

          <div className="grid grid-cols-2 gap-3 bg-brand-lavender/60 p-4 rounded-2xl border border-brand-border">
            <div>
              <span className="block text-xs font-semibold text-brand-muted">Turnaround Time</span>
              <span className="font-bold flex items-center gap-1.5 text-brand-dark mt-0.5">
                <Clock className="w-4 h-4 text-brand-purple" /> {test.turnaroundHours}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-brand-muted">Sample Type</span>
              <span className="font-bold text-brand-dark mt-0.5 block">{test.sampleType}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-brand-muted">Fasting Required</span>
              <span className="font-bold text-brand-dark mt-0.5 block">
                {test.fastingRequired ? 'Yes (8-10 Hours)' : 'No Fasting Needed'}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-brand-muted">Total Parameters</span>
              <span className="font-bold text-brand-purple mt-0.5 block">{test.parametersCount} Tests Included</span>
            </div>
          </div>

          {/* Included Parameters */}
          <div>
            <h4 className="font-display font-bold text-base text-brand-dark mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-purple" /> Included Biomarkers & Diagnostics:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {test.includedParameters.map((param, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-medium text-brand-dark bg-white p-2 rounded-xl border border-brand-border">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{param}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-brand-lavender/40 border-t border-brand-border flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl border border-brand-border bg-white text-brand-dark font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onBookNow(test.name);
              onClose();
            }}
            className="flex-1 py-3 rounded-2xl bg-brand-purple text-white font-bold text-sm shadow hover:bg-brand-purple-dark transition-colors flex items-center justify-center gap-2"
          >
            <span>Book Test Now (₹{test.price})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
