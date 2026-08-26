'use client';

import React, { useState } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Pet Tests', href: '#categories' },
    { name: 'How It Works', href: '#process' },
    { name: 'Packages', href: '#packages' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Main Header Navigation (Top Announcement Banner Removed as requested) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-deepblue-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-deepblue-600 to-indigo-500 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-deepblue-200 group-hover:scale-105 transition-transform">
                🐾
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight font-heading text-slate-900 leading-none">
                  DeePet<span className="text-deepblue-600">Services</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-deepblue-600 mt-1">
                  Doorstep Pet Diagnostics
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-7 text-sm font-bold text-slate-600">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-deepblue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={onBookClick}
                className="btn-electric text-white px-6 py-3 rounded-full text-sm font-extrabold flex items-center gap-2"
              >
                <span>Book Home Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                href="tel:+919591875232"
                className="text-center py-2.5 rounded-2xl bg-deepblue-50 text-deepblue-700 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call +91 95918 75232
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
