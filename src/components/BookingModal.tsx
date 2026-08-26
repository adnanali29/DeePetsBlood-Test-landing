'use client';

import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) return;

    // WhatsApp message formatting for modal bookings
    const messageText = `Hi Dee Pets, I want to book an appointment:
- Test: ${testTitle}
- Price: ₹${testPrice.toLocaleString('en-IN')}
- Name: ${name}
- Phone Number: ${phone}
- Preferred Collection Date: ${date}`.trim();

    const whatsappUrl = `https://wa.me/919591875232?text=${encodeURIComponent(messageText)}`;
    
    // Open immediately to guarantee user gesture stack is preserved
    window.open(whatsappUrl, '_blank');

    onClose();
    onConfirm(
      'Booking Confirmed! 🐾',
      `Our phlebotomist will call ${phone} to confirm your doorstep visit slot for ${testTitle}.`
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
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
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
            <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
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
            <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Collection Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-deepblue-500"
            />
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
