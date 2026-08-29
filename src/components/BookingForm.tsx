'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Lock, CheckCircle2, Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  initialTestName?: string;
  onSuccess: (title: string, message: string) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ initialTestName, onSuccess }) => {
  const router = useRouter();
  const { 
    catTests, 
    dogTests, 
    catPackages, 
    dogPackages, 
    contactConfig, 
    addLead 
  } = useApp();
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
    const wholeBodycats = petType === 'Cat' ? catTests : dogTests;
    const packages = petType === 'Cat' ? catPackages : dogPackages;
    const names = wholeBodycats.map(c => c.categoryName);
    const packageNames = packages.map(p => p.title);
    return [...names, ...packageNames];
  }, [petType, catTests, dogTests, catPackages, dogPackages]);

  const activeCategory = selectedCategory || categoriesList[0] || '';

  // Generate sub-tests list dynamically based on selected category
  const subTestsList = useMemo(() => {
    const wholeBodycats = petType === 'Cat' ? catTests : dogTests;
    const packages = petType === 'Cat' ? catPackages : dogPackages;
    
    // Check if the selected category is one of the packages
    const activePackage = packages.find(pkg => pkg.title === activeCategory || pkg.name === activeCategory);
    if (activePackage) {
      return [{
        name: activePackage.title,
        price: activePackage.price
      }];
    }
    
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
  }, [petType, activeCategory, catTests, dogTests, catPackages, dogPackages]);

  const activeSubTest = useMemo(() => {
    if (selectedSubTest && subTestsList.some(s => s.name === selectedSubTest)) {
      return selectedSubTest;
    }
    return subTestsList[0]?.name || '';
  }, [selectedSubTest, subTestsList]);

  // Pre-select category and sub-test when initialTestName is provided
  useEffect(() => {
    if (initialTestName) {
      const packages = petType === 'Cat' ? catPackages : dogPackages;
      const matchingPkg = packages.find(p => p.title === initialTestName || p.name === initialTestName);
      if (matchingPkg) {
        setSelectedCategory(matchingPkg.title);
        setSelectedSubTest(matchingPkg.title);
        return;
      }
      
      const wholeBodycats = petType === 'Cat' ? catTests : dogTests;
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

    // WhatsApp message — build line by line, skip empty optional fields
    const activeSubTestObj = subTestsList.find(s => s.name === activeSubTest);
    const priceStr = activeSubTestObj ? ` (\u20B9${activeSubTestObj.price})` : '';

    const lines = [
      'Hi Dee Pets, I want to book an appointment:',
      `\u2022 Pet Type: ${petType}`,
      `\u2022 Main Category: ${activeCategory}`,
      `\u2022 Test/Package: ${activeSubTest}${priceStr}`,
      `\u2022 Name: ${name}`,
      `\u2022 Phone Number: ${phone}`,
    ];
    if (city)    lines.push(`\u2022 City: ${city}`);
    if (pincode) lines.push(`\u2022 Pincode: ${pincode}`);
    if (message) lines.push(`\u2022 Message: ${message}`);

    const messageText = lines.join('\n');
    const whatsappUrl = `https://wa.me/${contactConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(messageText)}`;

    const code = addLead({
      name,
      phone,
      petType,
      category: activeCategory,
      subTest: activeSubTest,
      price: activeSubTestObj?.price,
      city,
      pincode,
      message,
    });

    // Store WhatsApp URL in sessionStorage keyed by code, then navigate to clean URL
    sessionStorage.setItem(`deepet_wa_${code}`, whatsappUrl);
    router.push(`/thank-you/${code}`);

    onSuccess(
      'Appointment Booked! 🐾',
      `Thank you ${name}! Your consultation code is ${code}. Our team will contact ${phone} shortly.`
    );

    setName('');
    setPhone('');
    setCity('');
    setPincode('');
    setMessage('');
    setSelectedCategory('');
    setSelectedSubTest('');
  };

  return (
    <div className="bg-black/35 backdrop-blur-md rounded-[1.75rem] p-4 sm:p-6 shadow-2xl border border-white/20 text-white relative overflow-hidden ring-1 ring-white/10 w-full max-w-xl lg:max-w-md mx-auto">
      
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

        {/* Mobile Action Buttons: Call Now & WhatsApp (Image 3 style) */}
        <div className="grid grid-cols-2 gap-2.5 mt-2.5 lg:hidden">
          <a
            href="tel:+919591875232"
            className="bg-[#1e88e5] hover:bg-[#1565c0] text-white py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-[0.99] transition-all"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>Call Now</span>
          </a>
          <a
            href="https://wa.me/919591875232?text=Hi%20Deepet%20Services%0AI%20want%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-[0.99] transition-all"
          >
            <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

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
