'use client';

import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface BookingFormProps {
  initialTestName?: string;
  onSuccess: (title: string, message: string) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ initialTestName, onSuccess }) => {
  const router = useRouter();
  const { contactConfig, addLead, contactCategories, rehabConfig, surgeryPackages, bloodCheckCards } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [petType, setPetType] = useState<'Dog' | 'Cat'>('Dog');
  const [selectedPackage, setSelectedPackage] = useState<string>(
    initialTestName || 'Wellness 360° — Adult Pet'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price lookup helper
  const getPackagePrice = (pkgName: string): number | string | undefined => {
    if (pkgName === rehabConfig.packageTitle) return rehabConfig.price;
    const surg = surgeryPackages.find(s => s.title === pkgName);
    if (surg) return surg.priceDisplay;
    const card = bloodCheckCards.find(c => c.title === pkgName);
    if (card) return card.price;
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const priceVal = getPackagePrice(selectedPackage);
    const numericPrice = typeof priceVal === 'number' ? priceVal : undefined;

    const code = addLead({
      name: name.trim() || 'Guest User',
      phone: phone.trim() || 'Not Provided',
      petType,
      category: 'Package Request',
      subTest: selectedPackage,
      date: date.trim() || undefined,
      price: numericPrice,
      message: `Requested callback for ${selectedPackage}${date ? `. Preferred date: ${date}` : ''}`,
    });

    const whatsappUrl = buildWhatsAppUrl(contactConfig.whatsappNumber, {
      testOrPackage: selectedPackage,
      petType,
      price: priceVal,
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
      date: date.trim() || undefined,
    });

    sessionStorage.setItem(`deepet_wa_${code}`, whatsappUrl);
    router.push(`/thank-you/${code}?wa=${encodeURIComponent(whatsappUrl)}`);

    onSuccess(
      'Request Received! 🐾',
      `Thank you ${name || 'for reaching out'}! Your reference code is ${code}. Our veterinary team will call ${phone || 'you'} shortly.`
    );

    setName('');
    setPhone('');
    setDate('');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#0b1411]/90 backdrop-blur-md rounded-[1.75rem] p-6 sm:p-7 shadow-2xl border border-[#1e342a] text-white relative overflow-hidden ring-1 ring-white/10 w-full max-w-xl lg:max-w-md mx-auto">
      
      {/* Form Title */}
      <div className="mb-5">
        <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight">
          Book a home visit
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* YOUR NAME */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Your name <span className="text-lime-400">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#050b09] border border-[#1e342a] rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#b2d650] font-medium transition-all"
          />
        </div>

        {/* PHONE / WHATSAPP */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone / WhatsApp <span className="text-lime-400">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#050b09] border border-[#1e342a] rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#b2d650] font-medium transition-all"
          />
        </div>

        {/* PET DROPDOWN */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Pet <span className="text-lime-400">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={petType}
              onChange={(e) => setPetType(e.target.value as 'Dog' | 'Cat')}
              className="w-full bg-[#050b09] border border-[#1e342a] rounded-xl py-3 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-[#b2d650] pr-10"
            >
              <option value="Dog" className="bg-[#050b09] text-white">Dog</option>
              <option value="Cat" className="bg-[#050b09] text-white">Cat</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* PACKAGE OF INTEREST GROUPED DROPDOWN */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Package of interest <span className="text-lime-400">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full bg-[#050b09] border border-[#1e342a] rounded-xl py-3 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-[#b2d650] pr-10"
            >
              {(contactCategories || []).map((cat) => (
                <optgroup
                  key={cat.id || cat.categoryName}
                  label={cat.categoryName}
                  className="bg-[#0b1411] text-[#b2d650] font-bold"
                >
                  {(cat.options || []).map((opt, idx) => (
                    <option
                      key={idx}
                      value={opt}
                      className="bg-[#050b09] text-white font-medium"
                    >
                      {opt}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* PREFERRED COLLECTION DATE */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Preferred Collection Date</span>
            <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#050b09] border border-[#1e342a] rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#b2d650] font-medium transition-all cursor-pointer pr-11 [color-scheme:dark]"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#b2d650] flex items-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* LIME GREEN SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-[#b2d650] hover:bg-[#a1c83d] text-slate-950 font-extrabold text-sm sm:text-base shadow-lg hover:shadow-lime-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-75"
        >
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <span>Request callback</span>
          )}
        </button>

        {/* SUBTEXT */}
        <div className="text-center pt-1">
          <span className="text-xs text-slate-400 font-medium">
            Free consultation call · No obligation
          </span>
        </div>

      </form>
    </div>
  );
};
