'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Phone, Mail, MessageSquare, MapPin, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  onSuccess: (title: string, message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccess }) => {
  const { contactConfig, addLead } = useApp();
  const router = useRouter();
  const [selectedPetType, setSelectedPetType] = useState<'Dog' | 'Cat'>('Dog');
  const [formData, setFormData] = useState({
    userName: '',
    petName: '',
    phoneNumber: '',
    emailAddress: '',
    messageText: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userName || !formData.phoneNumber || !formData.petName) {
      alert('Please fill out your name, pet name, and phone number.');
      return;
    }

    // WhatsApp message — line by line with bullet points
    const lines = [
      'Hi Dee Pets, I want to get in touch:',
      `\u2022 Name: ${formData.userName}`,
      `\u2022 Pet Name: ${formData.petName} (${selectedPetType})`,
      `\u2022 Phone Number: ${formData.phoneNumber}`,
    ];
    if (formData.emailAddress) lines.push(`\u2022 Email: ${formData.emailAddress}`);
    if (formData.messageText)  lines.push(`\u2022 Message: ${formData.messageText}`);

    const messageText = lines.join('\n');
    const whatsappUrl = `https://wa.me/${contactConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(messageText)}`;

    const code = addLead({
      name: formData.userName,
      phone: formData.phoneNumber,
      petType: selectedPetType,
      category: 'Contact Us Consultation',
      subTest: `Inquiry: ${formData.petName}`,
      message: `Email: ${formData.emailAddress || 'N/A'}. Msg: ${formData.messageText}`,
    });

    sessionStorage.setItem(`deepet_wa_${code}`, whatsappUrl);
    router.push(`/thank-you/${code}`);

    onSuccess(
      'Thank You! 🐾',
      `Message received for ${formData.petName}. Consultation code: ${code}. Our DeePet team will call you within 15 minutes.`
    );

    setFormData({
      userName: '',
      petName: '',
      phoneNumber: '',
      emailAddress: '',
      messageText: '',
    });
    setSelectedPetType('Dog');
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-slate-50/70 relative overflow-hidden">
      
      {/* Decorative Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Headline & Subtext */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 text-deepblue-700 font-extrabold text-[11px] uppercase tracking-widest bg-deepblue-50/80 px-3.5 py-1 rounded-full border border-deepblue-100/60 mb-2.5">
            <span>🐾</span> Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            We’re Here for Your Pet’s Health
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
            Have questions about home sample collection or diagnostic packages? Reach out to our team anytime.
          </p>
        </div>

        {/* Unified Card Shell */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Side Sidebar — Electric Royal Blue Gradient Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0052FF] via-[#0043DB] to-[#002FA7] p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
              
              {/* Subtle background overlay circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white font-heading tracking-wide">
                    Direct Support
                  </h3>
                  <p className="text-blue-100/80 text-xs mt-1">
                    Connect with our veterinary diagnostics team.
                  </p>
                </div>

                {/* Contact List */}
                <div className="space-y-3">
                  
                  {/* Call Us */}
                  <a href="tel:+919591875232" className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all group backdrop-blur-sm">
                    <div className="w-9 h-9 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-100/70 block uppercase tracking-wider">Call Us</span>
                      <span className="text-xs font-extrabold text-white group-hover:text-blue-50 transition-colors">+91 95918 75232</span>
                    </div>
                  </a>

                  {/* Email Us */}
                  <a href="mailto:contact@deepetservices.com" className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all group backdrop-blur-sm">
                    <div className="w-9 h-9 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-blue-100/70 block uppercase tracking-wider">Email</span>
                      <span className="text-xs font-extrabold text-white group-hover:text-blue-50 transition-colors truncate block">contact@deepetservices.com</span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a href="https://wa.me/919591875232?text=Hi%20Deepet%20Services%0AI%20want%20to%20know%20more%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-emerald-400/15 hover:bg-emerald-400/25 border border-emerald-300/30 transition-all group backdrop-blur-sm">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-200 block uppercase tracking-wider">WhatsApp</span>
                      <span className="text-xs font-extrabold text-white group-hover:text-emerald-100 transition-colors">Chat with Support</span>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <div className="w-9 h-9 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-100/70 block uppercase tracking-wider">Locations</span>
                      <span className="text-xs font-semibold text-white">Bijwasan (Delhi) & Sector 23A (Gurugram)</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Assurance Card */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-white/30 shrink-0 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=200"
                      alt="Pets Together"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Fast Response Guarantee</p>
                    <p className="text-[10px] text-blue-100/70">Replies within 15 minutes during business hours.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side — Clean Form Panel */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
              
              <div className="mb-5">
                <h3 className="text-xl font-bold text-slate-900 font-heading">Send Us a Message</h3>
                <p className="text-xs text-slate-500 mt-1">Fill out your details below and we’ll be in touch shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Your Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 focus:bg-white focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20 outline-none text-xs sm:text-sm text-slate-800 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Pet's Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pet’s Name <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bruno / Milo"
                      value={formData.petName}
                      onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 focus:bg-white focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20 outline-none text-xs sm:text-sm text-slate-800 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 focus:bg-white focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20 outline-none text-xs sm:text-sm text-slate-800 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 focus:bg-white focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20 outline-none text-xs sm:text-sm text-slate-800 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Select Your Pet — Toggle Segmented Pills */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Your Pet <span className="text-pink-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => setSelectedPetType('Dog')}
                      className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedPetType === 'Dog'
                          ? 'bg-[#0052FF] text-white shadow-md shadow-blue-500/20'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>🐶 Dog</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPetType('Cat')}
                      className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedPetType === 'Cat'
                          ? 'bg-[#0052FF] text-white shadow-md shadow-blue-500/20'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>🐱 Cat</span>
                    </button>
                  </div>
                </div>

                {/* How can we help? */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    How can we help? <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Tell us about the required test or preferred collection slot..."
                    value={formData.messageText}
                    onChange={(e) => setFormData({ ...formData, messageText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 focus:bg-white focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20 outline-none text-xs sm:text-sm text-slate-800 transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Send Message Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0052FF] to-[#0038B8] hover:from-[#0047E0] hover:to-[#002DB3] shadow-md shadow-blue-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Micro Trust Text */}
                <p className="text-center text-[11px] font-medium text-slate-400 pt-1">
                  🔒 Your information is private & strictly confidential.
                </p>

              </form>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
