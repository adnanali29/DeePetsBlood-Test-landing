'use client';

import React, { useState } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

import { useApp } from '@/context/AppContext';

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const { contactConfig } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Blood Check', href: '#blood-health-check' },
    { name: 'Rehab', href: '#rehab' },
    { name: 'Surgery Care', href: '#surgery-care' },
    { name: 'Why Trust Us', href: '#why-trust' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Main Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <img
                src="/deepetservices-logo.webp"
                alt="DeePet Services"
                className="h-12 w-auto object-contain group-hover:scale-102 transition-transform"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-7 text-sm font-bold text-slate-700">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#653bf7] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href={`tel:${(contactConfig.headerPhone || contactConfig.primaryPhone || '+918178468130').replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 font-extrabold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{contactConfig.headerPhone || contactConfig.primaryPhone || '+91 81784 68130'}</span>
              </a>
              <button
                onClick={onBookClick}
                className="bg-[#a3e635] hover:bg-[#92d029] text-slate-950 px-6 py-3 rounded-full text-sm font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book a Home Visit</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-800 hover:text-deepblue-600 p-2 rounded-xl focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-deepblue-100 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-slate-800 font-bold hover:text-deepblue-600"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="btn-electric text-white text-center py-3.5 rounded-2xl font-extrabold block w-full"
              >
                Book Home Visit Now
              </button>
              <a
                href={`tel:${(contactConfig.headerPhone || contactConfig.primaryPhone || '+918178468130').replace(/[^0-9+]/g, '')}`}
                className="text-center py-2.5 rounded-2xl bg-deepblue-50 text-deepblue-700 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call {contactConfig.headerPhone || contactConfig.primaryPhone || '+91 81784 68130'}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
