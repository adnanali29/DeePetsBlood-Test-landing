'use client';

import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface BookingModalProps {
  isOpen: boolean;
  testTitle: string;
  testPrice: number;
  onClose: () => void;
  onConfirm: (title: string, msg: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  testTitle,
  testPrice,
  onClose,
  onConfirm,
}) => {
  const { addLead, contactConfig } = useApp();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalName = name.trim() || 'Guest User';
    const finalPhone = phone.trim() || 'Not Provided';
    const finalDate = date.trim() || undefined;

    const deducedPetType: 'Dog' | 'Cat' = (
      testTitle.toLowerCase().includes('cat') ||
      testTitle.toLowerCase().includes('feline')
    ) ? 'Cat' : 'Dog';

    const code = addLead({
      name: finalName,
      phone: finalPhone,
      petType: deducedPetType,
      category: 'Direct Test Booking',
      subTest: testTitle,
      price: testPrice,
      date: finalDate,
      message: finalDate ? `Preferred date: ${finalDate}` : `Direct booking for ${testTitle}`,
    });

    const whatsappUrl = buildWhatsAppUrl(contactConfig.whatsappNumber, {
      testOrPackage: testTitle,
      petType: deducedPetType,
      price: testPrice,
      name: finalName,
      phone: finalPhone,
      date: finalDate,
    });

    sessionStorage.setItem(`deepet_wa_${code}`, whatsappUrl);
    router.push(`/thank-you/${code}?wa=${encodeURIComponent(whatsappUrl)}`);
    onClose();
    onConfirm(
      'Booking Confirmed! 🐾',
      `Your consultation code is ${code}. Our phlebotomist will call ${finalPhone} to confirm your slot.`
    );

    setName('');
    setPhone('');
    setDate('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-deepblue-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-deepblue-100 text-deepblue-600 mx-auto flex items-center justify-center text-xl mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-heading">{testTitle}</h3>
          <p className="text-deepblue-600 font-black text-xl mt-1">₹{testPrice.toLocaleString('en-IN')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ananya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-deepblue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-deepblue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Preferred Collection Date</span>
              <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-deepblue-500 cursor-pointer pr-10"
              />
              <Calendar className="w-4 h-4 text-deepblue-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <button
            type="submit"
            className="btn-electric text-white w-full py-3.5 rounded-xl font-bold text-sm mt-2 cursor-pointer"
          >
            Confirm & Schedule Home Visit
          </button>
        </form>
      </div>
    </div>
  );
};
