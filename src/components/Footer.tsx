'use client';

import React from 'react';
import { Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-deepblue-600 text-white flex items-center justify-center text-lg font-bold">
                🐾
              </div>
              <span className="text-xl font-black font-heading text-white">DeePet Services</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Doorstep veterinary care, blood diagnostics, vaccinations, and grooming across Delhi NCR with certified medical standards.
            </p>
            <div className="flex items-center space-x-3 text-slate-400">
              <a
                href="https://wa.me/917500367400"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-xs"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="tel:+917500367400"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-deepblue-600 hover:text-white flex items-center justify-center transition-colors text-xs"
                title="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Diagnostic Panels */}
          <div>
            <h4 className="text-white text-sm font-bold font-heading mb-4">Diagnostic Panels</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#packages" className="hover:text-white transition-colors">Complete Blood Count (CBC)</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Kidney Function Test (KFT)</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Liver Function Test (LFT)</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Full Body Master Profile</a></li>
            </ul>
          </div>

          {/* Locations Served */}
          <div>
            <h4 className="text-white text-sm font-bold font-heading mb-4">Locations Served</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-400">Bijwasan & South Delhi</span></li>
              <li><span className="text-slate-400">Gurugram (Sector 23A & DLF)</span></li>
              <li><span className="text-slate-400">Noida & Greater Noida</span></li>
              <li><span className="text-slate-400">Faridabad Region</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-bold font-heading mb-4">Contact Info</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-deepblue-400" /> +91 75003 67400</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-deepblue-400" /> +91 80765 63747</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-deepblue-400" /> contact@deepetservices.com</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-deepblue-400" /> Mon–Sat: 9:00 AM – 7:00 PM</li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DeePet Services. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
