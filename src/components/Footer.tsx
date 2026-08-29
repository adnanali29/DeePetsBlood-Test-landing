'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, Facebook, Instagram, Linkedin, MapPin, ChevronUp } from 'lucide-react';

import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { contactConfig } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#031525] text-slate-300 py-16 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6 lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src="/deepetservices-logo-whiet.webp"
                alt="DeePet Services"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Professional veterinary care at your doorstep. We bring the clinic to your home for a stress-free experience for you and your beloved pets.
            </p>
            <div className="flex items-center space-x-3.5 pt-1">
              <a
                href="https://www.facebook.com/deepetservices/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-[#b2d650] text-slate-300 hover:text-slate-900 hover:bg-[#b2d650] flex items-center justify-center transition-all text-sm"
                title="Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.instagram.com/deepetservices"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-[#b2d650] text-slate-300 hover:text-slate-900 hover:bg-[#b2d650] flex items-center justify-center transition-all text-sm"
                title="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://in.linkedin.com/company/deepet-services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-[#b2d650] text-slate-300 hover:text-slate-900 hover:bg-[#b2d650] flex items-center justify-center transition-all text-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-extrabold text-lg text-[#b2d650]">Quick Links</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
              <li>
                <a href="#about" className="text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#categories" className="text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">
                  Services
                </a>
              </li>
              <li>
                <a href="#process" className="text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#why-trust" className="text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-heading font-extrabold text-lg text-[#b2d650]">Contact Us</h4>
            <div className="space-y-4">
              
              {/* WhatsApp chat box styling exactly matching reference image */}
              <a
                href={`https://wa.me/${contactConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi DeePet Services, I want to book an appointment.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#b2d650]/30 rounded-2xl p-4 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366]/20 flex items-center justify-center shrink-0 transition-colors">
                  <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">CHAT WITH US</span>
                  <span className="text-white font-extrabold text-sm sm:text-base group-hover:text-[#b2d650] transition-colors">{contactConfig.whatsappNumber}</span>
                </div>
              </a>

              {/* Email line */}
              <a
                href={`mailto:${contactConfig.email}`}
                className="flex items-center gap-3 group text-slate-300 hover:text-white transition-colors"
              >
                <div className="w-9 h-9 rounded-full border border-white/10 group-hover:border-[#b2d650]/30 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-[#b2d650] transition-colors" />
                </div>
                <span className="text-xs sm:text-sm font-medium">{contactConfig.email}</span>
              </a>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400">Mon - Fri</span>
                    <span className="font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400">Sat - Sun</span>
                    <span className="font-medium">9:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Column 4: Our Locations timeline style */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-extrabold text-lg text-[#b2d650]">Our Locations</h4>
            
            <div className="relative space-y-6 pt-1">
              {/* Vertical timeline connector line */}
              <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-white/10" />

              {/* Gurugram Location */}
              <div className="flex gap-3 relative">
                <div className="w-9 h-9 rounded-full bg-[#031525] border border-white/10 text-[#b2d650] flex items-center justify-center z-10 shrink-0 shadow-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h5 className="text-white font-bold text-sm">Gurugram</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Hno. 1295-P, First floor, Sector 23A, Cartarpuri Alias Daulatpur Nas Gurugram 122017
                  </p>
                </div>
              </div>

              {/* Delhi Location */}
              <div className="flex gap-3 relative">
                <div className="w-9 h-9 rounded-full bg-[#031525] border border-white/10 text-[#b2d650] flex items-center justify-center z-10 shrink-0 shadow-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h5 className="text-white font-bold text-sm">Delhi</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    188/8 Behind New Bloom Nursery, Carterpuri Road, Bijwasan Delhi 110061
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 mt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 DeePet Services. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top button matching the reference design */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#04213d] hover:bg-[#b2d650] text-white hover:text-slate-900 border border-white/10 flex items-center justify-center transition-all hover:scale-105 shadow-xl cursor-pointer"
          title="Back to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};
