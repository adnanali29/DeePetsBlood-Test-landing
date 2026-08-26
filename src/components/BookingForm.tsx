'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Lock, CheckCircle2 } from 'lucide-react';
import { CAT_WHOLE_BODY_TESTS, DOG_WHOLE_BODY_TESTS, CAT_PACKAGES, DOG_PACKAGES } from '@/data/testsData';

interface BookingFormProps {
  initialTestName?: string;
  onSuccess: (title: string, message: string) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ initialTestName, onSuccess }) => {
  const [petType, setPetType] = useState<'Dog' | 'Cat'>('Dog');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubTest, setSelectedSubTest] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate categories list dynamically
  const categoriesList = useMemo(() => {
    const wholeBodycats = petType === 'Cat' ? CAT_WHOLE_BODY_TESTS : DOG_WHOLE_BODY_TESTS;
    const names = wholeBodycats.map(c => c.categoryName);
    return [...names, "Health Packages"];
  }, [petType]);

  const activeCategory = selectedCategory || categoriesList[0] || '';

  // Generate sub-tests list dynamically based on selected category
  const subTestsList = useMemo(() => {
    const wholeBodycats = petType === 'Cat' ? CAT_WHOLE_BODY_TESTS : DOG_WHOLE_BODY_TESTS;
    const packages = petType === 'Cat' ? CAT_PACKAGES : DOG_PACKAGES;
    
    if (activeCategory === "Health Packages") {
      return packages.map(pkg => ({
        name: pkg.title,
        price: pkg.price
      }));
    }
    
    const cat = wholeBodycats.find(c => c.categoryName === activeCategory);
    if (!cat) return [];
    
    return cat.items.map(item => {
      const priceNum = item.price 
        ? parseInt(item.price.replace(/[^0-9]/g, ''), 10) 
        : cat.price 
          ? parseInt(cat.price.replace(/[^0-9]/g, ''), 10) 
          : 1099;
      return {
        name: item.name,
        price: priceNum
      };
    });
  }, [petType, activeCategory]);

  const activeSubTest = useMemo(() => {
    if (selectedSubTest && subTestsList.some(s => s.name === selectedSubTest)) {
      return selectedSubTest;
    }
    return subTestsList[0]?.name || '';
  }, [selectedSubTest, subTestsList]);

  // Pre-select category and sub-test when initialTestName is provided
  useEffect(() => {
    if (initialTestName) {
      const catPackages = petType === 'Cat' ? CAT_PACKAGES : DOG_PACKAGES;
      const matchingPkg = catPackages.find(p => p.title === initialTestName || p.name === initialTestName);
      if (matchingPkg) {
        setSelectedCategory("Health Packages");
        setSelectedSubTest(matchingPkg.title);
        return;
      }
      
      const wholeBodycats = petType === 'Cat' ? CAT_WHOLE_BODY_TESTS : DOG_WHOLE_BODY_TESTS;
      for (const cat of wholeBodycats) {
        const matchingItem = cat.items.find(item => item.name === initialTestName);
        if (matchingItem) {
          setSelectedCategory(cat.categoryName);
          setSelectedSubTest(matchingItem.name);
          return;
        }
      }
    }
  }, [initialTestName, petType]);

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
        `Thank you ${name}! Your request for ${petType} - ${activeCategory} (${activeSubTest}) has been submitted. Our phlebotomist will contact ${phone} shortly.`
      );
      setName('');
      setPhone('');
      setCity('');
      setPincode('');
      setMessage('');
      setSelectedCategory('');
      setSelectedSubTest('');
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
                setSelectedCategory('');
                setSelectedSubTest('');
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
                setSelectedCategory('');
                setSelectedSubTest('');
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

        {/* TEST CATEGORY */}
        <div>
          <label className="block text-[9.5px] font-bold uppercase tracking-wider text-white/80 mb-1 drop-shadow-sm">
            TEST CATEGORY
          </label>
          <div className="relative">
            <select
              value={activeCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubTest('');
              }}
              className="w-full bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-xs sm:text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-400 pr-9 backdrop-blur-sm"
            >
              {categoriesList.map((catName, index) => (
                <option key={index} value={catName} className="bg-slate-950 text-white py-1.5">
                  {catName}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* SELECT SPECIFIC TEST / PACKAGE */}
        <div>
          <label className="block text-[9.5px] font-bold uppercase tracking-wider text-white/80 mb-1 drop-shadow-sm">
            SELECT SPECIFIC TEST / PACKAGE
          </label>
          <div className="relative">
            <select
              value={activeSubTest}
              onChange={(e) => setSelectedSubTest(e.target.value)}
              className="w-full bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-xs sm:text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-400 pr-9 backdrop-blur-sm"
            >
              {subTestsList.map((sub, index) => (
                <option key={index} value={sub.name} className="bg-slate-950 text-white py-1.5">
                  {sub.name} (₹{sub.price})
                </option>
              ))}
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
