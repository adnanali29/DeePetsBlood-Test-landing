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

export interface EmailSettings {
  recipientEmail: string;
  enabled: boolean;
  senderName: string;
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
  petType: string;
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

export interface BloodCheckCard {
  id: string;
  title: string;
  price: number;
  priceDisplay: string;
  isPopular: boolean;
  popularBadge?: string;
  description: string;
  features: string[];
  buttonText: string;
}

export interface RehabConfig {
  tag: string;
  title: string;
  subtitle: string;
  packageTitle: string;
  code: string;
  price: number;
  priceDisplay: string;
  description: string;
  inclusions: string[];
  allItems: string[];
}

export interface SurgeryPackageItem {
  id: string;
  code: string;
  title: string;
  tagline?: string;
  description: string;
  inclusions: string[];
  totalItemsCount: number;
  sections: {
    title: string;
    note: string;
    items: string[];
  }[];
  priceDisplay: string;
  subnote: string;
}

export interface ContactCategory {
  id: string;
  categoryName: string;
  options: string[];
}

export interface PreventiveWellnessPackage {
  id: string;
  code: string;
  title: string;
  tagline?: string;
  subtitle?: string;
  highlight?: string;
  inclusions: string[];
  totalItemsCount: number;
  allInclusions: string[];
  priceDisplay: string;
  subnote?: string;
}

export const DEFAULT_PREVENTIVE_PACKAGES: PreventiveWellnessPackage[] = [
  {
    id: 'pkg-1',
    code: 'PACKAGE 1',
    title: 'Puppy / Kitten First Year',
    tagline: 'Everything they need in their first year.',
    inclusions: [
      'Home vet examinations × 3–4',
      'Weight & growth monitoring',
      'Body-condition assessment',
      'Nutrition consultation',
    ],
    totalItemsCount: 19,
    allInclusions: [
      'Visit 1: Home vet exam, Core vaccine #1 (DHPPi/FVRCP), Deworming, Growth log',
      'Visit 2: Home vet exam, Core booster #2, Deworming check & repeat',
      'Visit 3: Home vet exam, Rabies vaccine, Core booster #3, Microchip guidance',
      'First-year wellness certificate & WhatsApp vet Q&A',
    ],
    priceDisplay: 'From ₹9,999 (dog) / ₹6,999 (cat)',
    subnote: 'Includes vaccine doses',
  },
  {
    id: 'pkg-2',
    code: 'PACKAGE 2',
    title: 'Wellness 360° — Adult Pet',
    tagline: 'Comprehensive annual health assessment.',
    inclusions: [
      'Comprehensive physical examination',
      'Weight + BCS',
      'Temperature',
      'Heart & respiratory assessment',
    ],
    totalItemsCount: 23,
    allInclusions: [
      'Full physical exam, ear/eye & oral screening',
      'CBC (Complete Blood Count), Blood Glucose',
      'LFT & KFT biochemical organ profiles',
      'Deworming, flea/tick recommendation & wellness summary',
    ],
    priceDisplay: 'Essential ₹2,999 · Comprehensive ₹4,999 · Complete ₹6,999',
    subnote: 'Tier depends on the panel of blood/urine tests included; vaccination/deworming billed separately at standard rates if added.',
  },
  {
    id: 'pkg-3',
    code: 'PACKAGE 3',
    title: 'Senior Pet — Age Well',
    tagline: 'Senior screening before symptoms become serious.',
    subtitle: 'For dogs 7+ / cats 8+',
    highlight: '★ Why pet parents pick this: structured senior plan with SDMA/thyroid screening',
    inclusions: [
      'Comprehensive vet examination × 2',
      'Blood pressure',
      'Weight + muscle condition',
      'Orthopedic examination',
    ],
    totalItemsCount: 23,
    allInclusions: [
      'Extended blood panel (CBC, LFT, KFT)',
      'Blood glucose & Thyroid (T4) screening',
      'SDMA kidney marker (early-stage detection)',
      'Urine routine & microscopy',
      'Mobility, joint & pain scoring',
      'Senior nutrition & supplement plan',
    ],
    priceDisplay: 'Essential ₹5,999 · Comprehensive ₹9,999 · Complete ₹15,999',
    subnote: '',
  },
  {
    id: 'pkg-4',
    code: 'PACKAGE 4',
    title: 'Pet Fit — Weight Loss Program (45 Days)',
    subtitle: 'At farm boarding facility · includes pet pickup & drop',
    highlight: '★ Why pet parents pick this: turns weight loss into a trackable program with vet-measured checkpoints, not just a one-time “feed less” instruction.',
    inclusions: [
      'Continuous veterinary assessment',
      'Weight + BCS + muscle condition',
      'Exercise assessment',
      'Mobility assessment',
    ],
    totalItemsCount: 12,
    allInclusions: [
      '45-day farm boarding stay',
      'Customised calorie-controlled weight loss diet',
      'Daily supervised exercise & hydrotherapy sessions',
      'Weekly vet weight logs & gait video updates',
    ],
    priceDisplay: '₹30,000 / 45-day program',
    subnote: '',
  },
];

export const DEFAULT_CONTACT_CATEGORIES: ContactCategory[] = [
  {
    id: 'cat-prev-wellness',
    categoryName: 'Preventive Wellness',
    options: [
      'Puppy / Kitten First Year',
      'Wellness 360° — Adult Pet',
      'Senior Pet — Age Well',
      'Pet Fit — Weight Loss Program (45 Days)',
      'Complete Blood Health Check',
    ],
  },
  {
    id: 'cat-rehab',
    categoryName: 'Recovery & Rehabilitation',
    options: [
      'Joint Rehabilitation Programme — 45 Days',
    ],
  },
  {
    id: 'cat-surgery',
    categoryName: 'Surgery Care',
    options: [
      'Minor Surgery Care Package',
      'Soft Tissue Surgery Care',
      'Major Surgery / Advanced Care',
      'Orthopedic Surgery Care',
      'Cancer Surgery Care',
      'Female Pet — Spay Care Package',
      'Male Pet — Neuter Care',
      'Emergency Surgery Support — Rapid Surgery Care',
      'Dental Care — Scale & Polish',
    ],
  },
];

interface AppContextType {
  heroConfig: HeroConfig;
  contactConfig: ContactConfig;
  emailSettings: EmailSettings;
  catTests: WholeBodyTestCategory[];
  dogTests: WholeBodyTestCategory[];
  catPackages: PetPackage[];
  dogPackages: PetPackage[];
  preventiveWellnessPackages: PreventiveWellnessPackage[];
  testimonials: TestimonialItem[];
  leads: Lead[];
  bloodCheckCards: BloodCheckCard[];
  rehabConfig: RehabConfig;
  surgeryPackages: SurgeryPackageItem[];
  contactCategories: ContactCategory[];
  
  // Setters/Updators
  updateHeroConfig: (config: HeroConfig) => void;
  updateContactConfig: (config: ContactConfig) => void;
  updateEmailSettings: (settings: EmailSettings) => void;
  updateBloodCheckCards: (cards: BloodCheckCard[]) => void;
  updateRehabConfig: (config: RehabConfig) => void;
  updateSurgeryPackages: (packages: SurgeryPackageItem[]) => void;
  updateContactCategories: (categories: ContactCategory[]) => void;
  updatePreventiveWellnessPackages: (packages: PreventiveWellnessPackage[]) => void;
  
  // Tests management
  updateTests: (petType: 'Dog' | 'Cat' | string, tests: WholeBodyTestCategory[]) => void;
  resetDefaultCatalog: () => void;
  
  // Packages management
  updatePackages: (petType: 'Dog' | 'Cat' | string, packages: PetPackage[]) => void;
  
  // Testimonials management
  updateTestimonials: (testimonials: TestimonialItem[]) => void;
  
  // Leads management
  addLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'status'>) => string;
  updateLeadStatus: (id: string, status: 'active' | 'completed' | 'cancelled') => void;
  updateLeadDetails: (id: string, details: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  clearAllLeads: () => void;
  refreshLeads: () => Promise<void>;

  // Google Sheet integration
  googleSheetUrl: string;
  updateGoogleSheetUrl: (url: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_HERO: HeroConfig = {
  headline: 'Pet Health Care Packages',
  subtitle: 'One complete price — from home check-ups and bloodwork to surgery, medicines, home monitoring and follow-up — instead of itemised quotes.',
  badgeText: 'Doorstep Veterinary Care in Delhi NCR',
  badgeSubtext: '(All travel & pre-op bloodwork included)',
};

const DEFAULT_CONTACT: ContactConfig = {
  whatsappNumber: '+917238002900',
  primaryPhone: '+917238002900',
  secondaryPhone: '+917238002900',
  email: 'contact@deepetservices.com',
};

const DEFAULT_EMAIL_SETTINGS: EmailSettings = {
  recipientEmail: 'deepetservices1@gmail.com',
  enabled: true,
  senderName: 'DeePets Notifications',
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

export function mapDbLeadToLead(row: any, idx?: number): Lead {
  return {
    id: row.id || `lead-${Date.now()}-${idx ?? 0}`,
    consultationCode: row.consultation_code || row.consultationCode || `DEPE-${String((idx ?? 0) + 1).padStart(2, '0')}`,
    name: row.name || 'Anonymous',
    phone: row.phone || '',
    petType: row.pet_type || row.petType || 'Dog',
    category: row.category || '',
    subTest: row.sub_test || row.subTest || '',
    price: row.price ? Number(row.price) : undefined,
    city: row.city || undefined,
    pincode: row.pincode || undefined,
    date: row.schedule_date || row.date || undefined,
    message: row.message || undefined,
    timestamp: row.created_at || row.timestamp || new Date().toISOString(),
    status: row.status || 'active',
    remark: row.remark || undefined,
    followUp: row.follow_up ? (typeof row.follow_up === 'string' ? JSON.parse(row.follow_up) : row.follow_up) : undefined,
  };
}

const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-mock-01',
    consultationCode: 'DEPE-01',
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
    timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    status: 'completed',
  },
  {
    id: 'lead-mock-02',
    consultationCode: 'DEPE-02',
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
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    status: 'active',
  },
  {
    id: 'lead-mock-03',
    consultationCode: 'DEPE-03',
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
    id: 'lead-mock-04',
    consultationCode: 'DEPE-04',
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
    timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    status: 'cancelled',
  },
  {
    id: 'lead-mock-05',
    consultationCode: 'DEPE-05',
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
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'active',
  }
];

const DEFAULT_BLOOD_CHECK_CARDS: BloodCheckCard[] = [
  {
    id: 'basic',
    title: 'Basic',
    price: 1499,
    priceDisplay: '₹1,499',
    isPopular: false,
    description: 'The four numbers every vet wants before any procedure, or when a pet “just seems off” — infection, anaemia, liver and kidney status.',
    features: ['CBC', 'Blood glucose', 'LFT', 'KFT'],
    buttonText: 'Book Basic',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    price: 2999,
    priceDisplay: '₹2,999',
    isPopular: true,
    popularBadge: 'MOST POPULAR',
    description: 'Adds thyroid and a kidney-specific marker (SDMA) that can flag problems a year or more before standard tests would.',
    features: ['CBC', 'LFT', 'KFT', 'Electrolytes', 'Thyroid', 'SDMA'],
    buttonText: 'Book Advanced',
  },
  {
    id: 'premium',
    title: 'Premium',
    price: 4999,
    priceDisplay: '₹4,999',
    isPopular: false,
    description: 'Extends to disease-specific markers when a particular condition is suspected, avoiding a second round of blood draws.',
    features: ['Everything in Advanced', 'Additional disease-specific biomarkers where clinically indicated'],
    buttonText: 'Book Premium',
  },
];

const DEFAULT_REHAB_CONFIG: RehabConfig = {
  tag: 'Residential Care',
  title: 'Recovery & Rehabilitation',
  subtitle: "Structured, residential recovery at DeePet's farm boarding facility — for pets who need more than a home visit and less than a hospital stay.",
  packageTitle: 'Joint Rehabilitation Programme — 45 Days',
  code: 'PACKAGE 6',
  price: 49999,
  priceDisplay: '₹49,999',
  description: 'Full-scope residential joint & mobility recovery for post-op, arthritic, or paralyzed pets.',
  inclusions: [
    'Orthopedic & mobility assessment',
    'Gait analysis',
    'Pain scoring',
    'Baseline weight & body-condition score',
  ],
  allItems: [
    '45-day farm residential stay with pet pickup & drop-off',
    'Daily supervised physical therapy & mobility exercises',
    'Hydrotherapy sessions tailored to joint & muscle rehab',
    'Veterinary-monitored pain scoring & anti-inflammatory management',
    'Customised recovery diet & joint nutrition supplements',
    'Weekly gait video updates sent directly to pet parents via WhatsApp',
    '24/7 on-site farm veterinary monitoring & emergency coverage',
    'Post-rehab discharge examination, progress certificate & home exercise plan',
  ],
};

const DEFAULT_SURGERY_PACKAGES: SurgeryPackageItem[] = [
  {
    id: 'pkg-7',
    code: 'PACKAGE 1',
    title: 'Minor Surgery Care Package',
    description: 'Small mass/lump removal · wound repair · abscess surgery · small cyst removal · minor skin procedures · suture-related procedures · cherry eye',
    inclusions: [
      'Veterinary consultation',
      'Pre-anesthetic assessment',
      'CBC',
      'Blood glucose',
    ],
    totalItemsCount: 15,
    sections: [
      {
        title: 'Before Surgery — At Home',
        note: "Pre-anaesthetic bloodwork confirms your pet's organs can safely process anaesthesia — the single most important safety check before any sedation.",
        items: ['Veterinary consultation', 'Pre-anesthetic assessment', 'CBC', 'Blood glucose', 'LFT/KFT as appropriate', 'Blood pressure where indicated', 'Pre-surgical fitness assessment']
      },
      {
        title: 'Surgery',
        note: "Surgeon, anaesthesia and monitoring are priced as one line item, so there's no separate “anaesthesia bill” shock afterward.",
        items: ['Surgical procedure', 'Anaesthesia', 'Surgical consumables', 'Monitoring']
      },
      {
        title: 'After Surgery',
        note: 'A home visit checks the wound is healing properly, instead of leaving you to judge it yourself from a photo.',
        items: ['Recovery monitoring', 'Discharge instructions', 'Prescribed medicines', 'Wound-care instructions', '1 post-op home visit', 'Suture-removal visit where applicable']
      }
    ],
    priceDisplay: 'Starting ₹6,999',
    subnote: 'Final price depends on procedure size, pet weight and anaesthesia duration. Post-op at boarding facility charged extra.',
  },
  {
    id: 'pkg-8',
    code: 'PACKAGE 2',
    title: 'Soft Tissue Surgery Care',
    description: 'Pyometra · C-Section · tumour/mass removal · hernia · major wound repair · abdominal soft-tissue procedures · entropion',
    inclusions: [
      'Veterinary examination',
      'Pre-anesthetic assessment',
      'Blood collection',
      'CBC',
    ],
    totalItemsCount: 22,
    sections: [
      {
        title: 'Pre-Surgery — At Home',
        note: 'A fuller organ-function panel plus imaging where needed, because abdominal procedures carry higher anaesthesia risk than minor skin surgery.',
        items: ['Veterinary examination', 'Pre-anesthetic assessment', 'Blood collection', 'CBC', 'LFT', 'KFT', 'Blood glucose', 'Electrolytes where indicated', 'Urine testing where appropriate', 'Ultrasound/X-ray if clinically indicated (pickup & drop included)']
      },
      {
        title: 'Surgery',
        note: 'IV fluids keep blood pressure stable under anaesthesia — a standard-of-care step some budget providers skip to save cost.',
        items: ['Surgical procedure', 'Anaesthesia', 'IV fluids', 'Monitoring', 'Surgical consumables', 'Recovery monitoring']
      },
      {
        title: 'Post-Surgery',
        note: 'Two home visits, not one — deeper incisions need closer monitoring for infection or dehiscence in the first two weeks.',
        items: ['Discharge consultation', 'Medicines', 'Wound-care kit', 'Nutrition/recovery advice', 'Home monitoring instructions', '2 post-operative home visits', 'Suture removal', 'Post-op care at farm boarding facility']
      }
    ],
    priceDisplay: 'Starting ₹11,999',
    subnote: 'Post-op at boarding facility charged extra.',
  },
  {
    id: 'pkg-9',
    code: 'PACKAGE 3',
    title: 'Major Surgery / Advanced Care',
    description: 'Major abdominal surgery · tumour surgery · amputation · foreign body surgery · cystotomy / bladder stone removal / urethrostomy · fracture repair · complicated procedures',
    inclusions: [
      'CBC',
      'LFT',
      'KFT',
      'Electrolytes',
    ],
    totalItemsCount: 25,
    sections: [
      {
        title: 'Pre-Operative — At Home Consultation + Sample Collection',
        note: "A coagulation profile is added because major surgery carries real bleeding risk — a test that's often skipped elsewhere but shouldn't be.",
        items: ['CBC', 'LFT', 'KFT', 'Electrolytes', 'Blood glucose', 'Coagulation profile', 'Blood pressure', 'ECG where indicated', 'X-ray', 'Ultrasound', 'Other imaging as required']
      },
      {
        title: 'Surgery',
        note: "Hospitalisation length is matched to the actual procedure rather than a flat one-night stay, so you're not paying for recovery time your pet doesn't need.",
        items: ['Surgeon', 'Anaesthesia', 'IV fluids', 'Monitoring', 'Surgical consumables', 'Hospitalisation/recovery according to procedure']
      },
      {
        title: 'Post-Operative',
        note: 'Three follow-ups plus a final recovery assessment formally close the case out, instead of leaving it open-ended.',
        items: ['Pain-management plan', 'Antibiotics where prescribed', 'Wound-care kit', 'Nutritional recovery plan', '3 home follow-ups', 'Suture/staple removal', 'Post-op bloodwork where clinically indicated', 'Final recovery assessment']
      }
    ],
    priceDisplay: 'Starting ₹24,999',
    subnote: 'Varies with procedure type, implants used and hospitalisation duration — confirmed after pre-op assessment. Post-op at boarding facility charged extra.',
  },
  {
    id: 'pkg-10',
    code: 'PACKAGE 4',
    title: 'Orthopedic Surgery Care',
    description: 'Fractures · TPLO/CCL · patellar luxation · hip/elbow procedures · other orthopedic surgeries',
    inclusions: [
      'Orthopedic consultation',
      'Gait assessment',
      'X-rays',
      'CBC',
    ],
    totalItemsCount: 22,
    sections: [
      {
        title: 'Before Surgery',
        note: 'Gait assessment and X-rays confirm the exact joint/bone issue so the surgical plan is precise, not exploratory.',
        items: ['Orthopedic consultation', 'Gait assessment', 'X-rays', 'CBC', 'LFT/KFT', 'Electrolytes', 'Pre-anesthetic assessment']
      },
      {
        title: 'Surgery',
        note: 'Hospitalisation time is scaled to orthopedic recovery, which typically runs longer than soft-tissue procedures.',
        items: ['Procedure', 'Anaesthesia', 'Monitoring', 'Hospitalisation/recovery']
      },
      {
        title: 'After Surgery — At Home',
        note: 'An exercise-restriction plan is critical — most implant failures happen from too much activity too soon after surgery.',
        items: ['Post-op examination', 'Pain assessment', 'Wound assessment', 'Mobility assessment', 'Exercise restriction plan', 'Home-care instructions']
      },
      {
        title: 'Rehabilitation Add-on',
        note: 'Physio and hydrotherapy speed up return to normal movement and reduce the risk of long-term lameness or muscle loss.',
        items: ['Physiotherapy', 'Hydrotherapy where appropriate', 'Range-of-motion exercises', 'Weight management', 'Mobility tracking']
      }
    ],
    priceDisplay: 'Starting ₹41,999',
    subnote: 'Implants (plates/screws) priced additionally. Rehab add-on available.',
  },
  {
    id: 'pkg-11',
    code: 'PACKAGE 5',
    title: 'Cancer Surgery Care',
    description: 'Comprehensive oncological surgical care with dedicated coordinator support.',
    inclusions: [
      'Home veterinary consultation',
      'Blood collection',
      'CBC',
      'LFT/KFT',
    ],
    totalItemsCount: 18,
    sections: [
      {
        title: 'Cancer Care Protocol',
        note: 'Comprehensive oncological surgical care with dedicated coordinator support.',
        items: ['Home veterinary consultation', 'Blood collection & baseline panel', 'Pre-operative tumor staging', 'Histopathology & surgical biopsy', 'Oncology post-op monitoring & follow-up']
      }
    ],
    priceDisplay: 'Starting ₹12,999',
    subnote: 'Add a Cancer Care Coordinator — a dedicated team member managing sample → lab → surgery → histopathology → follow-up — for +₹4,999.',
  },
  {
    id: 'pkg-12',
    code: 'PACKAGE 6',
    title: 'Female Pet — Spay Care Package',
    description: 'From pre-op blood test to complete recovery — we take care of everything.',
    inclusions: [
      'Home consultation',
      'Physical examination',
      'CBC',
      'LFT',
    ],
    totalItemsCount: 20,
    sections: [
      {
        title: 'Complete Spay Care',
        note: 'Comprehensive surgical spay procedure with full pre-op and post-op care.',
        items: ['Home consultation & physical exam', 'CBC & LFT blood check', 'Anaesthesia & sterile surgery', 'Post-op medication kit', 'Wound check & suture removal']
      }
    ],
    priceDisplay: 'Starting ₹12,999',
    subnote: 'Post-operative care at pet boarding facility charged extra.',
  },
  {
    id: 'pkg-13',
    code: 'PACKAGE 7',
    title: 'Male Pet — Neuter Care',
    description: 'Safe and comfortable neuter procedure with complete home follow-up.',
    inclusions: [
      'Home consultation',
      'CBC',
      'LFT/KFT',
      'Anaesthetic assessment',
    ],
    totalItemsCount: 12,
    sections: [
      {
        title: 'Complete Neuter Care',
        note: 'Safe and comfortable neuter procedure with complete home follow-up.',
        items: ['Home consultation', 'CBC & LFT/KFT screening', 'Anaesthetic assessment', 'Surgery & recovery monitoring', 'Discharge care & medicines']
      }
    ],
    priceDisplay: 'Starting ₹9,499',
    subnote: 'Post-operative care at pet boarding facility charged extra.',
  },
  {
    id: 'pkg-14',
    code: 'PACKAGE 8',
    title: 'Emergency Surgery Support — Rapid Surgery Care',
    description: 'Immediate emergency triage and sample collection at home.',
    inclusions: [
      'Step 1: Home veterinary assessment',
      'Step 2: Blood collection at home',
      'Step 3: Emergency diagnostics',
      'Step 4: Immediate referral/transfer if required',
    ],
    totalItemsCount: 7,
    sections: [
      {
        title: 'Rapid Emergency Support',
        note: 'Immediate emergency triage and sample collection at home.',
        items: ['Home veterinary assessment', 'Blood collection at home', 'Emergency diagnostics', 'Immediate referral/transfer coordination']
      }
    ],
    priceDisplay: 'Coordination fee ₹1,999',
    subnote: 'Not a fixed surgery price — covers assessment, blood collection and coordination only. Surgery/hospitalisation billed separately by the facility. Emergency surgery itself is not performed at home.',
  },
  {
    id: 'pkg-15',
    code: 'PACKAGE 9',
    title: 'Dental Care — Scale & Polish',
    description: 'For tartar buildup, bad breath, red/swollen gums, pets 3+ years due their first professional clean, or a pre-adoption dental check.',
    inclusions: [
      'Oral & dental examination',
      'Pre-anaesthetic bloodwork (CBC, LFT, KFT)',
      'Fitness-for-anaesthesia assessment',
    ],
    totalItemsCount: 12,
    sections: [
      {
        title: 'Full Dental Procedure',
        note: 'Professional ultrasonic scaling and polishing under full veterinary anaesthetic monitoring.',
        items: ['Oral & dental examination', 'Pre-anaesthetic bloodwork (CBC, LFT, KFT)', 'Fitness-for-anaesthesia assessment', 'Ultrasonic scaling & polishing', 'Post-dental home oral care advice']
      }
    ],
    priceDisplay: 'Starting ₹4,999',
    subnote: 'Extractions billed per tooth (approx. ₹500–₹800 each) beyond the base package; large-breed or heavy-tartar cases may need a longer anaesthesia slot, priced slightly higher.',
  },
];

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO);
  const [contactConfig, setContactConfig] = useState<ContactConfig>(DEFAULT_CONTACT);
  const [emailSettings, setEmailSettings] = useState<EmailSettings>(DEFAULT_EMAIL_SETTINGS);
  const [catTests, setCatTests] = useState<WholeBodyTestCategory[]>(CAT_WHOLE_BODY_TESTS);
  const [dogTests, setDogTests] = useState<WholeBodyTestCategory[]>(DOG_WHOLE_BODY_TESTS);
  const [catPackages, setCatPackages] = useState<PetPackage[]>(CAT_PACKAGES);
  const [dogPackages, setDogPackages] = useState<PetPackage[]>(DOG_PACKAGES);
  const [preventiveWellnessPackages, setPreventiveWellnessPackages] = useState<PreventiveWellnessPackage[]>(DEFAULT_PREVENTIVE_PACKAGES);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bloodCheckCards, setBloodCheckCards] = useState<BloodCheckCard[]>(DEFAULT_BLOOD_CHECK_CARDS);
  const [rehabConfig, setRehabConfig] = useState<RehabConfig>(DEFAULT_REHAB_CONFIG);
  const [surgeryPackages, setSurgeryPackages] = useState<SurgeryPackageItem[]>(DEFAULT_SURGERY_PACKAGES);
  const [contactCategories, setContactCategories] = useState<ContactCategory[]>(DEFAULT_CONTACT_CATEGORIES);
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
      if (storedCatTests) {
        setCatTests(JSON.parse(storedCatTests));
      }

      const storedDogTests = localStorage.getItem('deepet_dog_tests');
      if (storedDogTests) {
        setDogTests(JSON.parse(storedDogTests));
      }

      const storedCatPackages = localStorage.getItem('deepet_cat_packages');
      if (storedCatPackages) setCatPackages(JSON.parse(storedCatPackages));

      const storedDogPackages = localStorage.getItem('deepet_dog_packages');
      if (storedDogPackages) setDogPackages(JSON.parse(storedDogPackages));

      const storedPreventive = localStorage.getItem('deepet_preventive_packages');
      if (storedPreventive) setPreventiveWellnessPackages(JSON.parse(storedPreventive));

      const storedTestimonials = localStorage.getItem('deepet_testimonials');
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedLeads = localStorage.getItem('deepet_leads');
      if (storedLeads) {
        try {
          const parsed = JSON.parse(storedLeads);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mapped = parsed.map((l: any, i: number) => mapDbLeadToLead(l, i));
            setLeads(mapped);
          } else {
            setLeads(MOCK_LEADS);
          }
        } catch {
          setLeads(MOCK_LEADS);
        }
      } else {
        setLeads(MOCK_LEADS);
      }

      // 🗄️ Fetch latest leads from DB on mount and merge with sample leads
      fetch('/api/leads')
        .then(async (res) => {
          if (!res.ok) return null;
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return res.json();
          }
          return null;
        })
        .then(data => {
          if (data?.leads && Array.isArray(data.leads)) {
            const dbLeads = data.leads.map((row: any, i: number) => mapDbLeadToLead(row, i));
            const dbCodes = new Set(dbLeads.map((l: any) => l.consultationCode || l.id));
            const uniqueMocks = MOCK_LEADS.filter(m => !dbCodes.has(m.consultationCode) && !dbCodes.has(m.id));
            const combined = [...dbLeads, ...uniqueMocks];
            setLeads(combined);
            localStorage.setItem('deepet_leads', JSON.stringify(combined));
          }
        })
        .catch(err => console.warn('Error loading DB leads:', err));

      const storedSheetUrl = localStorage.getItem('deepet_sheet_url');
      if (storedSheetUrl) setGoogleSheetUrl(storedSheetUrl);

      const storedCounter = localStorage.getItem('deepet_lead_counter');
      if (storedCounter) setLeadCounter(parseInt(storedCounter, 10));

      const storedBloodCheck = localStorage.getItem('deepet_blood_cards');
      if (storedBloodCheck) setBloodCheckCards(JSON.parse(storedBloodCheck));

      const storedRehab = localStorage.getItem('deepet_rehab_config');
      if (storedRehab) setRehabConfig(JSON.parse(storedRehab));

      const storedSurgery = localStorage.getItem('deepet_surgery_packages');
      if (storedSurgery) setSurgeryPackages(JSON.parse(storedSurgery));

      const storedContactCats = localStorage.getItem('deepet_contact_categories');
      if (storedContactCats) setContactCategories(JSON.parse(storedContactCats));

      // 🗄️ Fetch latest configurations from DB on mount
      fetch('/api/settings')
        .then(async (res) => {
          if (!res.ok) return null;
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return res.json();
          }
          return null;
        })
        .then(data => {
          if (data?.settings) {
            const s = data.settings;
            if (s.hero_config) { setHeroConfig(s.hero_config); localStorage.setItem('deepet_hero', JSON.stringify(s.hero_config)); }
            if (s.contact_config) { setContactConfig(s.contact_config); localStorage.setItem('deepet_contact', JSON.stringify(s.contact_config)); }
            if (s.email_settings) { 
              const val = typeof s.email_settings === 'string' ? JSON.parse(s.email_settings) : s.email_settings;
              setEmailSettings(val); 
              localStorage.setItem('deepet_email_settings', JSON.stringify(val)); 
            }
            if (s.cat_tests) { setCatTests(s.cat_tests); localStorage.setItem('deepet_cat_tests', JSON.stringify(s.cat_tests)); }
            if (s.dog_tests) { setDogTests(s.dog_tests); localStorage.setItem('deepet_dog_tests', JSON.stringify(s.dog_tests)); }
            if (s.cat_packages) { setCatPackages(s.cat_packages); localStorage.setItem('deepet_cat_packages', JSON.stringify(s.cat_packages)); }
            if (s.dog_packages) { setDogPackages(s.dog_packages); localStorage.setItem('deepet_dog_packages', JSON.stringify(s.dog_packages)); }
            if (s.preventive_packages) { setPreventiveWellnessPackages(s.preventive_packages); localStorage.setItem('deepet_preventive_packages', JSON.stringify(s.preventive_packages)); }
            if (s.testimonials) { setTestimonials(s.testimonials); localStorage.setItem('deepet_testimonials', JSON.stringify(s.testimonials)); }
            if (s.blood_cards) { setBloodCheckCards(s.blood_cards); localStorage.setItem('deepet_blood_cards', JSON.stringify(s.blood_cards)); }
            if (s.rehab_config) { setRehabConfig(s.rehab_config); localStorage.setItem('deepet_rehab_config', JSON.stringify(s.rehab_config)); }
            if (s.surgery_packages) { setSurgeryPackages(s.surgery_packages); localStorage.setItem('deepet_surgery_packages', JSON.stringify(s.surgery_packages)); }
            if (s.contact_categories) { setContactCategories(s.contact_categories); localStorage.setItem('deepet_contact_categories', JSON.stringify(s.contact_categories)); }
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

  const updateEmailSettings = (settings: EmailSettings) => {
    setEmailSettings(settings);
    localStorage.setItem('deepet_email_settings', JSON.stringify(settings));
    saveSettingToDB('email_settings', settings);
  };

  const updateBloodCheckCards = (cards: BloodCheckCard[]) => {
    setBloodCheckCards(cards);
    localStorage.setItem('deepet_blood_cards', JSON.stringify(cards));
    saveSettingToDB('blood_cards', cards);
  };

  const updateRehabConfig = (config: RehabConfig) => {
    setRehabConfig(config);
    localStorage.setItem('deepet_rehab_config', JSON.stringify(config));
    saveSettingToDB('rehab_config', config);
  };

  const updateSurgeryPackages = (packages: SurgeryPackageItem[]) => {
    setSurgeryPackages(packages);
    localStorage.setItem('deepet_surgery_packages', JSON.stringify(packages));
    saveSettingToDB('surgery_packages', packages);
  };

  const updateContactCategories = (categories: ContactCategory[]) => {
    setContactCategories(categories);
    localStorage.setItem('deepet_contact_categories', JSON.stringify(categories));
    saveSettingToDB('contact_categories', categories);
  };

  const updatePreventiveWellnessPackages = (packages: PreventiveWellnessPackage[]) => {
    setPreventiveWellnessPackages(packages);
    localStorage.setItem('deepet_preventive_packages', JSON.stringify(packages));
    saveSettingToDB('preventive_packages', packages);
  };

  const updateTests = (petType: 'Dog' | 'Cat' | string, tests: WholeBodyTestCategory[]) => {
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

  const resetDefaultCatalog = () => {
    setDogTests(DOG_WHOLE_BODY_TESTS);
    setCatTests(CAT_WHOLE_BODY_TESTS);
    localStorage.setItem('deepet_dog_tests', JSON.stringify(DOG_WHOLE_BODY_TESTS));
    localStorage.setItem('deepet_cat_tests', JSON.stringify(CAT_WHOLE_BODY_TESTS));
    saveSettingToDB('dog_tests', DOG_WHOLE_BODY_TESTS);
    saveSettingToDB('cat_tests', CAT_WHOLE_BODY_TESTS);
  };

  const updatePackages = (petType: 'Dog' | 'Cat' | string, packages: PetPackage[]) => {
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

  const refreshLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (!res.ok) return;
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) return;
      const data = await res.json();
      if (data?.leads && Array.isArray(data.leads)) {
        const dbLeads = data.leads.map((row: any, i: number) => mapDbLeadToLead(row, i));
        const dbCodes = new Set(dbLeads.map((l: any) => l.consultationCode || l.id));
        const uniqueMocks = MOCK_LEADS.filter(m => !dbCodes.has(m.consultationCode) && !dbCodes.has(m.id));
        const combined = [...dbLeads, ...uniqueMocks];
        setLeads(combined);
        localStorage.setItem('deepet_leads', JSON.stringify(combined));
      }
    } catch (err) {
      console.warn('Failed to refresh leads:', err);
    }
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'timestamp' | 'status'>) => {
    const currentMax = Math.max(leadCounter, leads.length);
    const nextCounter = currentMax + 1;
    const consultationCode = `DEPE-${String(nextCounter).padStart(2, '0')}`;
    setLeadCounter(nextCounter);
    localStorage.setItem('deepet_lead_counter', String(nextCounter));

    const newLead: Lead = {
      ...leadData,
      name: (leadData.name && leadData.name.trim()) ? leadData.name.trim() : 'Guest User',
      phone: (leadData.phone && leadData.phone.trim()) ? leadData.phone.trim() : 'Not Provided',
      date: (leadData.date && leadData.date.trim()) ? leadData.date.trim() : undefined,
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
      emailSettings,
      catTests,
      dogTests,
      catPackages,
      dogPackages,
      preventiveWellnessPackages,
      testimonials,
      leads,
      bloodCheckCards,
      rehabConfig,
      surgeryPackages,
      contactCategories,
      updateHeroConfig,
      updateContactConfig,
      updateEmailSettings,
      updateBloodCheckCards,
      updateRehabConfig,
      updateSurgeryPackages,
      updateContactCategories,
      updatePreventiveWellnessPackages,
      updateTests,
      resetDefaultCatalog,
      updatePackages,
      updateTestimonials,
      addLead,
      updateLeadStatus,
      updateLeadDetails,
      deleteLead,
      clearAllLeads,
      refreshLeads,
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
