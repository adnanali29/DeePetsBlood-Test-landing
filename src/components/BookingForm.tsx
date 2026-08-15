'use client';

import React, { useState } from 'react';
import { ChevronDown, Lock, CheckCircle2 } from 'lucide-react';
import { DOG_BLOOD_TESTS, CAT_BLOOD_TESTS } from '@/data/testsData';

interface BookingFormProps {
  initialTestName?: string;
  onSuccess: (title: string, message: string) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ initialTestName, onSuccess }) => {
  const [petType, setPetType] = useState<'Dog' | 'Cat'>('Dog');
  const [selectedService, setSelectedService] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active tests based on Pet Type
  const currentTests = petType === 'Dog' ? DOG_BLOOD_TESTS : CAT_BLOOD_TESTS;
  
  // Default selected service if none selected
  const activeServiceValue = selectedService || currentTests[0]?.name || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(
        'Appointment Booked! 🐾',
        `Thank you ${name}! Your request for ${petType} - ${activeServiceValue} has been submitted. Our phlebotomist will contact ${phone} shortly.`
      );
      setName('');
      setPhone('');
      setCity('');
      setPincode('');
      setMessage('');
      setSelectedService('');
    }, 800);
  };

  return (
    <div className="bg-black/35 backdrop-blur-md rounded-[1.75rem] p-5 sm:p-6 shadow-2xl border border-white/20 text-white relative overflow-hidden ring-1 ring-white/10 max-w-md mx-auto">
      
      {/* Compact Form Header */}
      <div className="text-center mb-3.5">
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight drop-shadow">
          Book Appointment
        </h3>
        <p className="text-[11px] sm:text-xs text-white/80 font-medium mt-0.5 drop-shadow-sm">
          Professional Home Visits • Offers on Treatments
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        
        {/* SELECT PET TYPE */}
        <div>
          <label className="block text-[9.5px] font-bold uppercase tracking-wider text-white/80 mb-1 drop-shadow-sm">
            SELECT PET TYPE
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setPetType('Dog');
                setSelectedService('');
              }}
              className={`py-2 px-3 rounded-lg border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm ${
                petType === 'Dog'
                  ? 'border-2 border-cyan-400 bg-white/20 text-white shadow-md'
                  : 'border-white/20 bg-black/25 text-white/80 hover:bg-white/10'
              }`}
            >
              <span className="text-sm">🐶</span>
              <span>Dog</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPetType('Cat');
                setSelectedService('');
              }}
              className={`py-2 px-3 rounded-lg border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm ${
                petType === 'Cat'
                  ? 'border-2 border-cyan-400 bg-white/20 text-white shadow-md'
                  : 'border-white/20 bg-black/25 text-white/80 hover:bg-white/10'
              }`}
            >
              <span className="text-sm">🐱</span>
              <span>Cat</span>
            </button>
          </div>
        </div>

        {/* TEST SERVICE */}
        <div>
          <label className="block text-[9.5px] font-bold uppercase tracking-wider text-white/80 mb-1 drop-shadow-sm">
            TEST SERVICE
          </label>
          <div className="relative">
            <select
              value={activeServiceValue}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-xs sm:text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-400 pr-9 backdrop-blur-sm"
            >
              {currentTests.map((test) => (
                <option key={test.id} value={test.name} className="bg-slate-950 text-white py-1.5">
                  {test.name} (₹{test.price})
                </option>
              ))}
              <option value="General Consultation" className="bg-slate-950 text-white py-1.5">
                General Consultation (₹499)
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* NAME & PHONE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[9.5px] font-bold uppercase tracking-wider text-white/80 mb-0.5 drop-shadow-sm">
              NAME
            </label>
            <input
              type="text"
              required
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 font-medium backdrop-blur-sm"
            />
          </div>

          <div>
            <label className="block text-[9.5px] font-bold uppercase tracking-wider text-white/80 mb-0.5 drop-shadow-sm">
              PHONE
            </label>
            <input
              type="tel"
              required
              placeholder="Mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 font-medium backdrop-blur-sm"
            />
          </div>
        </div>

        {/* CITY & PINCODE* */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[9.5px] font-bold uppercase tracking-wider text-white/80 mb-0.5 drop-shadow-sm">
              CITY
            </label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-xs sm:text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-400 pr-8 backdrop-blur-sm"
              >
                <option value="" className="bg-slate-950 text-white/60">Select City</option>
                <option value="Delhi NCR" className="bg-slate-950 text-white">Delhi NCR</option>
                <option value="Gurgaon" className="bg-slate-950 text-white">Gurgaon</option>
                <option value="Noida" className="bg-slate-950 text-white">Noida</option>
                <option value="Ghaziabad" className="bg-slate-950 text-white">Ghaziabad</option>
                <option value="Faridabad" className="bg-slate-950 text-white">Faridabad</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[9.5px] font-bold uppercase tracking-wider text-white/80 mb-0.5 drop-shadow-sm">
              PINCODE*
            </label>
            <div className="relative">
              <select
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-xs sm:text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-400 pr-8 backdrop-blur-sm"
              >
                <option value="" className="bg-slate-950 text-white/60">Pincode</option>
                <option value="110001" className="bg-slate-950 text-white">110001 (Central Delhi)</option>
                <option value="122001" className="bg-slate-950 text-white">122001 (Gurugram)</option>
                <option value="201301" className="bg-slate-950 text-white">201301 (Noida)</option>
                <option value="201001" className="bg-slate-950 text-white">201001 (Ghaziabad)</option>
                <option value="121001" className="bg-slate-950 text-white">121001 (Faridabad)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-[9.5px] font-bold uppercase tracking-wider text-white/80 mb-0.5 drop-shadow-sm">
            MESSAGE
          </label>
          <textarea
            rows={1.8}
            placeholder="Describe the problem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 resize-none font-medium transition-all backdrop-blur-sm"
          />
        </div>

        {/* LIME GREEN SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-[#b2d650] hover:bg-[#a1c83d] text-slate-900 font-extrabold text-sm sm:text-base shadow-lg hover:shadow-lime-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-1 disabled:opacity-75"
        >
          {isSubmitting ? (
            <span>Processing...</span>
          ) : (
            <span>Book Home Visit</span>
          )}
        </button>

        {/* Security badge line */}
        <div className="flex items-center justify-center gap-3 pt-0.5 text-[10px] text-white/80 font-medium drop-shadow-sm">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-400" /> 100% Privacy Protected
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-lime-400" /> Doorstep Collection
          </span>
        </div>

      </form>
    </div>
  );
};
