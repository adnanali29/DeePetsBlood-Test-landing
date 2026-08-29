'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CAT_WHOLE_BODY_TESTS, 
  DOG_WHOLE_BODY_TESTS, 
  CAT_PACKAGES, 
  DOG_PACKAGES, 
  type WholeBodyTestCategory, 
  type PetPackage 
} from '@/data/testsData';

export type { PetPackage, WholeBodyTestCategory };

export interface HeroConfig {
  headline: string;
  subtitle: string;
  badgeText: string;
  badgeSubtext: string;
}

export interface ContactConfig {
  whatsappNumber: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  score: string;
  text: string;
  avatar: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  petType: 'Dog' | 'Cat';
  category: string;
  subTest: string;
  price?: number;
  date?: string;
  city?: string;
  pincode?: string;
  message?: string;
  timestamp: string;
  status: 'active' | 'completed' | 'cancelled';
  remark?: string;
  followUp?: {
    date: string;
    medium: 'WhatsApp' | 'Call';
    remark: string;
  };
  consultationCode?: string;
}

interface AppContextType {
  heroConfig: HeroConfig;
  contactConfig: ContactConfig;
  catTests: WholeBodyTestCategory[];
  dogTests: WholeBodyTestCategory[];
  catPackages: PetPackage[];
  dogPackages: PetPackage[];
  testimonials: TestimonialItem[];
  leads: Lead[];
  
  // Setters/Updators
  updateHeroConfig: (config: HeroConfig) => void;
  updateContactConfig: (config: ContactConfig) => void;
  
  // Tests management
  updateTests: (petType: 'Dog' | 'Cat', tests: WholeBodyTestCategory[]) => void;
  
  // Packages management
  updatePackages: (petType: 'Dog' | 'Cat', packages: PetPackage[]) => void;
  
  // Testimonials management
  updateTestimonials: (testimonials: TestimonialItem[]) => void;
  
  // Leads management
  addLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'status'>) => string;
  updateLeadStatus: (id: string, status: 'active' | 'completed' | 'cancelled') => void;
  updateLeadDetails: (id: string, details: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  clearAllLeads: () => void;

  // Google Sheet integration
  googleSheetUrl: string;
  updateGoogleSheetUrl: (url: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_HERO: HeroConfig = {
  headline: 'Professional Vet &\nPet Care at Your\nHome',
  subtitle: 'No travel. No waiting. No stress for your pet.',
  badgeText: 'Professional Home Consultation',
  badgeSubtext: '(All travel included)',
};

const DEFAULT_CONTACT: ContactConfig = {
  whatsappNumber: '+917500367400',
  primaryPhone: '+919591875232',
  secondaryPhone: '+918076563747',
  email: 'contact@deepetservices.com',
};

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Madhu Vyas',
    role: 'Dog Parent',
    score: '5',
    text: 'The best decision I made for my dog! The vet came right to our doorstep, and the entire checkup was so smooth. No travel stress at all.',
    avatar: '/madhu.webp',
  },
  {
    id: 't-2',
    name: 'Jyoti Gupta',
    role: 'Cat parent',
    score: '4.9',
    text: 'I used to struggle taking my cat to the clinic. Now, with their home veterinary services, my cat is relaxed and gets treated at home.',
    avatar: '/jyoti.webp',
  },
  {
    id: 't-3',
    name: 'Nikhil Bhati',
    role: 'Pet Parent',
    score: '5',
    text: 'Professional veterinary care in the comfort of my home. The team was punctual, knowledgeable, and handled my pet with so much love.',
    avatar: '/nikhil.webp',
  },
  {
    id: 't-4',
    name: 'Lokesh Reddy',
    role: 'Dog Lover',
    score: '4.8',
    text: 'Convenience at its best! Booked a vaccination slot, and the vet arrived on time. My dog stayed calm throughout the process.',
    avatar: '/loskesh.webp',
  },
  {
    id: 't-5',
    name: 'Mohit Rajput',
    role: 'Cat Dad',
    score: '5',
    text: 'Forget the clinic waiting rooms. This home service is a game-changer. Professional care, right at my doorstep. Highly recommended!',
    avatar: '/mohit.webp',
  },
  {
    id: 't-6',
    name: 'Ankita Jindal',
    role: 'Pet Parent',
    score: '4.9',
    text: 'Excellent doorstep service! From the initial booking to the actual visit, everything was seamless. My furry friend is happy and healthy.',
    avatar: '/ankita.webp',
  },
];

const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rohan Sharma',
    phone: '9812345678',
    petType: 'Dog',
    category: 'Hematology (Blood)',
    subTest: 'Complete Blood Count (CBC)',
    price: 799,
    city: 'Gurgaon',
    pincode: '122001',
    date: '2026-08-31',
    message: 'My dog has been lethargic. Need blood test.',
    timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
    status: 'completed',
  },
  {
    id: 'lead-2',
    name: 'Priyanka Sen',
    phone: '9560987654',
    petType: 'Cat',
    category: 'Kidney Function',
    subTest: 'Kidney Function Profile',
    price: 1099,
    city: 'Delhi NCR',
    pincode: '110001',
    date: '2026-08-30',
    message: 'Routine test for my 8 year old cat.',
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), // 8 hours ago
    status: 'active',
  },
  {
    id: 'lead-3',
    name: 'Vikram Malhotra',
    phone: '9899778855',
    petType: 'Dog',
    category: 'Dog Complete Care',
    subTest: 'Comprehensive Health Package (Most Popular)',
    price: 3600,
    city: 'Noida',
    pincode: '201301',
    date: '2026-09-02',
    message: 'Tick fever check is required. He got tick bites.',
    timestamp: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'lead-4',
    name: 'Sneha Rao',
    phone: '8800123456',
    petType: 'Cat',
    category: 'Infectious Diseases (Cat Specific)',
    subTest: 'FIV (Feline Immunodeficiency Virus)',
    price: 1099,
    city: 'Faridabad',
    pincode: '121001',
    date: '2026-08-28',
    message: 'Adopting a stray cat, want to test FIV first.',
    timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString(), // 5 days ago
    status: 'cancelled',
  },
  {
    id: 'lead-5',
    name: 'Anuj Verma',
    phone: '9910012233',
    petType: 'Dog',
    category: 'Home Vet Consultation',
    subTest: 'Home Vet Consultation',
    price: 499,
    city: 'Delhi NCR',
    pincode: '110001',
    date: '2026-08-29',
    message: 'Skin allergies checkup.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    status: 'active',
  }
];

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO);
  const [contactConfig, setContactConfig] = useState<ContactConfig>(DEFAULT_CONTACT);
  const [catTests, setCatTests] = useState<WholeBodyTestCategory[]>(CAT_WHOLE_BODY_TESTS);
  const [dogTests, setDogTests] = useState<WholeBodyTestCategory[]>(DOG_WHOLE_BODY_TESTS);
  const [catPackages, setCatPackages] = useState<PetPackage[]>(CAT_PACKAGES);
  const [dogPackages, setDogPackages] = useState<PetPackage[]>(DOG_PACKAGES);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [googleSheetUrl, setGoogleSheetUrl] = useState<string>('');
  const [leadCounter, setLeadCounter] = useState<number>(0);

  // Load from LocalStorage & DB on mount
  useEffect(() => {
    try {
      const storedHero = localStorage.getItem('deepet_hero');
      if (storedHero) setHeroConfig(JSON.parse(storedHero));

      const storedContact = localStorage.getItem('deepet_contact');
      if (storedContact) setContactConfig(JSON.parse(storedContact));

      const storedCatTests = localStorage.getItem('deepet_cat_tests');
      if (storedCatTests) setCatTests(JSON.parse(storedCatTests));

      const storedDogTests = localStorage.getItem('deepet_dog_tests');
      if (storedDogTests) setDogTests(JSON.parse(storedDogTests));

      const storedCatPackages = localStorage.getItem('deepet_cat_packages');
      if (storedCatPackages) setCatPackages(JSON.parse(storedCatPackages));

      const storedDogPackages = localStorage.getItem('deepet_dog_packages');
      if (storedDogPackages) setDogPackages(JSON.parse(storedDogPackages));

      const storedTestimonials = localStorage.getItem('deepet_testimonials');
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedLeads = localStorage.getItem('deepet_leads');
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      } else {
        // Seed mock leads on first run
        localStorage.setItem('deepet_leads', JSON.stringify(MOCK_LEADS));
        setLeads(MOCK_LEADS);
      }

      const storedSheetUrl = localStorage.getItem('deepet_sheet_url');
      if (storedSheetUrl) setGoogleSheetUrl(storedSheetUrl);

      const storedCounter = localStorage.getItem('deepet_lead_counter');
      if (storedCounter) setLeadCounter(parseInt(storedCounter, 10));

      // 🗄️ Fetch latest configurations from PostgreSQL DB on mount
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          if (data?.settings) {
            const s = data.settings;
            if (s.hero_config) { setHeroConfig(s.hero_config); localStorage.setItem('deepet_hero', JSON.stringify(s.hero_config)); }
            if (s.contact_config) { setContactConfig(s.contact_config); localStorage.setItem('deepet_contact', JSON.stringify(s.contact_config)); }
            if (s.cat_tests) { setCatTests(s.cat_tests); localStorage.setItem('deepet_cat_tests', JSON.stringify(s.cat_tests)); }
            if (s.dog_tests) { setDogTests(s.dog_tests); localStorage.setItem('deepet_dog_tests', JSON.stringify(s.dog_tests)); }
            if (s.cat_packages) { setCatPackages(s.cat_packages); localStorage.setItem('deepet_cat_packages', JSON.stringify(s.cat_packages)); }
            if (s.dog_packages) { setDogPackages(s.dog_packages); localStorage.setItem('deepet_dog_packages', JSON.stringify(s.dog_packages)); }
            if (s.testimonials) { setTestimonials(s.testimonials); localStorage.setItem('deepet_testimonials', JSON.stringify(s.testimonials)); }
            if (s.google_sheet_url) { setGoogleSheetUrl(s.google_sheet_url); localStorage.setItem('deepet_sheet_url', s.google_sheet_url); }
          }
        })
        .catch(() => {});
    } catch (e) {
      console.error('Failed to load storage configurations:', e);
    }
  }, []);

  const saveSettingToDB = (key: string, value: any) => {
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    }).catch(() => {});
  };

  const updateHeroConfig = (config: HeroConfig) => {
    setHeroConfig(config);
    localStorage.setItem('deepet_hero', JSON.stringify(config));
    saveSettingToDB('hero_config', config);
  };

  const updateContactConfig = (config: ContactConfig) => {
    setContactConfig(config);
    localStorage.setItem('deepet_contact', JSON.stringify(config));
    saveSettingToDB('contact_config', config);
  };

  const updateTests = (petType: 'Dog' | 'Cat', tests: WholeBodyTestCategory[]) => {
    if (petType === 'Dog') {
      setDogTests(tests);
      localStorage.setItem('deepet_dog_tests', JSON.stringify(tests));
      saveSettingToDB('dog_tests', tests);
    } else {
      setCatTests(tests);
      localStorage.setItem('deepet_cat_tests', JSON.stringify(tests));
      saveSettingToDB('cat_tests', tests);
    }
  };

  const updatePackages = (petType: 'Dog' | 'Cat', packages: PetPackage[]) => {
    if (petType === 'Dog') {
      setDogPackages(packages);
      localStorage.setItem('deepet_dog_packages', JSON.stringify(packages));
      saveSettingToDB('dog_packages', packages);
    } else {
      setCatPackages(packages);
      localStorage.setItem('deepet_cat_packages', JSON.stringify(packages));
      saveSettingToDB('cat_packages', packages);
    }
  };

  const updateTestimonials = (items: TestimonialItem[]) => {
    setTestimonials(items);
    localStorage.setItem('deepet_testimonials', JSON.stringify(items));
    saveSettingToDB('testimonials', items);
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'timestamp' | 'status'>) => {
    const nextCounter = leadCounter + 1;
    const consultationCode = `DEPE-${String(nextCounter).padStart(2, '0')}`;
    setLeadCounter(nextCounter);
    localStorage.setItem('deepet_lead_counter', String(nextCounter));

    const newLead: Lead = {
      ...leadData,
      id: 'lead-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      status: 'active',
      consultationCode,
    };
    const updatedLeads = [newLead, ...leads];
    setLeads(updatedLeads);
    localStorage.setItem('deepet_leads', JSON.stringify(updatedLeads));

    // 🗄️ Sync to PostgreSQL (background, non-blocking)
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: newLead.id,
        consultation_code: consultationCode,
        name: newLead.name,
        phone: newLead.phone,
        pet_type: newLead.petType,
        category: newLead.category,
        sub_test: newLead.subTest,
        price: newLead.price ?? null,
        city: newLead.city ?? null,
        pincode: newLead.pincode ?? null,
        schedule_date: newLead.date ?? null,
        message: newLead.message ?? null,
        status: 'active',
        timestamp: newLead.timestamp,
      }),
    }).catch(() => {});

    // 🔗 Fire to Google Sheet if URL is configured (silent background request)
    const sheetUrl = localStorage.getItem('deepet_sheet_url');
    if (sheetUrl) {
      fetch(sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultationCode,
          timestamp: newLead.timestamp,
          name: newLead.name,
          phone: newLead.phone,
          petType: newLead.petType,
          category: newLead.category,
          subTest: newLead.subTest,
          price: newLead.price ?? '',
          city: newLead.city ?? '',
          pincode: newLead.pincode ?? '',
          date: newLead.date ?? '',
          message: newLead.message ?? '',
          status: 'Active',
        }),
      }).catch(() => {});
    }

    return consultationCode;
  };

  const updateLeadStatus = (id: string, status: 'active' | 'completed' | 'cancelled') => {
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, status } : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('deepet_leads', JSON.stringify(updatedLeads));

    // 🗄️ Sync status update to PostgreSQL
    fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => {});
  };

  const updateLeadDetails = (id: string, details: Partial<Lead>) => {
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, ...details } : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('deepet_leads', JSON.stringify(updatedLeads));
  };

  const deleteLead = (id: string) => {
    const updatedLeads = leads.filter(lead => lead.id !== id);
    setLeads(updatedLeads);
    localStorage.setItem('deepet_leads', JSON.stringify(updatedLeads));

    // 🗄️ Sync delete to PostgreSQL
    fetch(`/api/leads/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const clearAllLeads = () => {
    setLeads([]);
    localStorage.removeItem('deepet_leads');
  };

  const updateGoogleSheetUrl = (url: string) => {
    setGoogleSheetUrl(url);
    localStorage.setItem('deepet_sheet_url', url);
  };

  return (
    <AppContext.Provider value={{
      heroConfig,
      contactConfig,
      catTests,
      dogTests,
      catPackages,
      dogPackages,
      testimonials,
      leads,
      updateHeroConfig,
      updateContactConfig,
      updateTests,
      updatePackages,
      updateTestimonials,
      addLead,
      updateLeadStatus,
      updateLeadDetails,
      deleteLead,
      clearAllLeads,
      googleSheetUrl,
      updateGoogleSheetUrl,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
};
