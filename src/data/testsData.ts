export interface BloodTest {
  id: string;
  name: string;
  category: 'cbc' | 'kft' | 'lft' | 'thyroid' | 'fullbody' | 'urinalysis' | 'specialized';
  petType: 'both' | 'cat' | 'dog';
  price: number;
  originalPrice?: number;
  description: string;
  parametersCount: number;
  turnaroundHours: string;
  sampleType: string;
  fastingRequired: boolean;
  featured?: boolean;
  popular?: boolean;
  includedParameters: string[];
}

export const DOG_BLOOD_TESTS = [
  { id: 'dog-cbc', name: 'Complete Blood Count (CBC)', price: 499, description: 'Checks RBCs, WBCs, platelets & hemoglobin for anemia & infections.' },
  { id: 'dog-tick', name: 'Canine Tick Fever & Blood Parasite Screen', price: 999, description: 'Detects Ehrlichia, Anaplasma, Babesia & tick-borne blood pathogens.' },
  { id: 'dog-kft-lft', name: 'Dog Kidney & Liver Functional Profile', price: 1199, description: 'Evaluates Creatinine, BUN, ALT, AST & Bilirubin for organ vital health.' },
  { id: 'dog-senior', name: 'Senior Dog Comprehensive Blood Checkup', price: 1499, description: 'Full organ screening, electrolytes, blood sugar & cardiac markers for older dogs.' },
  { id: 'dog-allergy', name: 'Dog Allergy & Immunity Blood Profile', price: 1299, description: 'Identifies environmental/food allergens and antibody response levels.' },
  { id: 'dog-thyroid', name: 'Canine Thyroid (T4/TSH) & Metabolic Screen', price: 899, description: 'Monitors hypothyroidism, metabolic rate & hormonal imbalance in dogs.' },
  { id: 'dog-fullbody', name: 'Full Body Master Diagnostic Panel', price: 2499, description: 'Complete 42+ parameter comprehensive test including CBC, KFT, LFT & Urinalysis.' },
];

export const CAT_BLOOD_TESTS = [
  { id: 'cat-cbc', name: 'Feline Complete Blood Count (CBC)', price: 499, description: 'Comprehensive blood cell, infection & differential count for cats.' },
  { id: 'cat-kft-lft', name: 'Feline Kidney (SDMA/BUN) & Liver Panel', price: 1199, description: 'Early renal indicator SDMA, Creatinine, BUN & Liver enzyme assessment.' },
  { id: 'cat-felv-fiv', name: 'Feline Leukemia (FeLV) & FIV Blood Screen', price: 1399, description: 'Rapid diagnostic screening for viral leukemia and feline immunodeficiency.' },
  { id: 'cat-senior', name: 'Senior Cat Health & Organ Scan', price: 1499, description: 'Targeted blood screen for aging felines focusing on kidneys, thyroid & liver.' },
  { id: 'cat-thyroid', name: 'Feline Thyroid (T4) & Metabolic Profile', price: 899, description: 'Detects hyperthyroidism, weight loss causes & endocrine activity.' },
  { id: 'cat-anemia', name: 'Cat Infectious Disease & Anemia Screen', price: 1099, description: 'Screens for Mycoplasma hemofelis, reticulocytes & blood parasites.' },
  { id: 'cat-fullbody', name: 'Full Body Master Diagnostic Panel', price: 2499, description: 'Complete 42+ parameter comprehensive test tailored for feline health.' },
];

export const BLOOD_TESTS: BloodTest[] = [
  {
    id: 'cbc-01',
    name: 'Complete Blood Count (CBC)',
    category: 'cbc',
    petType: 'both',
    price: 899,
    originalPrice: 1199,
    description: 'Measures RBCs, WBCs, hemoglobin, and platelets. Detects anemia, infections, and immune health.',
    parametersCount: 18,
    turnaroundHours: '12-24 Hours',
    sampleType: 'Blood (EDTA)',
    fastingRequired: false,
    popular: true,
    includedParameters: [
      'Hemoglobin (Hb)',
      'Total Leukocyte Count (TLC)',
      'RBC Count',
      'Platelet Count',
      'Packed Cell Volume (PCV)',
      'Differential WBC Count',
      'MCV, MCH & MCHC'
    ]
  },
  {
    id: 'kft-02',
    name: 'Kidney Function Test (KFT)',
    category: 'kft',
    petType: 'both',
    price: 1299,
    originalPrice: 1699,
    description: 'Evaluates Serum Creatinine, Blood Urea Nitrogen (BUN), and Uric Acid for early renal monitoring.',
    parametersCount: 8,
    turnaroundHours: '24 Hours',
    sampleType: 'Serum',
    fastingRequired: true,
    popular: true,
    includedParameters: [
      'Serum Creatinine',
      'Blood Urea Nitrogen (BUN)',
      'BUN / Creatinine Ratio',
      'Serum Uric Acid',
      'Sodium (Na+)',
      'Potassium (K+)',
      'Phosphorus'
    ]
  },
  {
    id: 'lft-03',
    name: 'Liver Function Test (LFT)',
    category: 'lft',
    petType: 'both',
    price: 1299,
    originalPrice: 1599,
    description: 'Tests key liver enzymes (ALT, AST, ALP, Bilirubin) to assess metabolic health and hepatic vitality.',
    parametersCount: 10,
    turnaroundHours: '24 Hours',
    sampleType: 'Serum',
    fastingRequired: true,
    popular: true,
    includedParameters: [
      'ALT (SGPT)',
      'AST (SGOT)',
      'Alkaline Phosphatase (ALP)',
      'Total Bilirubin',
      'Direct & Indirect Bilirubin',
      'Total Protein & Albumin',
      'A/G Ratio'
    ]
  },
  {
    id: 'thy-04',
    name: 'Thyroid Profile (T4 / TSH)',
    category: 'thyroid',
    petType: 'both',
    price: 1199,
    originalPrice: 1499,
    description: 'Monitors thyroid hormone levels to diagnose hypothyroidism in dogs or hyperthyroidism in older cats.',
    parametersCount: 3,
    turnaroundHours: '24-48 Hours',
    sampleType: 'Serum',
    fastingRequired: false,
    popular: true,
    includedParameters: [
      'Total T4 (Thyroxine)',
      'Free T4',
      'TSH (Thyroid Stimulating Hormone)'
    ]
  },
  {
    id: 'full-05',
    name: 'Full Body Advanced Profile',
    category: 'fullbody',
    petType: 'both',
    price: 2499,
    originalPrice: 3499,
    description: 'Comprehensive diagnostic master panel including CBC, KFT, LFT, Electrolytes, Blood Glucose, and Urinalysis.',
    parametersCount: 42,
    turnaroundHours: '24 Hours',
    sampleType: 'Whole Blood & Serum',
    fastingRequired: true,
    featured: true,
    popular: true,
    includedParameters: [
      'Complete CBC (18 parameters)',
      'Comprehensive KFT (8 parameters)',
      'Comprehensive LFT (10 parameters)',
      'Fasting Blood Glucose',
      'Electrolyte Panel (Na+, K+, Cl-)',
      'Urinalysis'
    ]
  },
  {
    id: 'uri-06',
    name: 'Urinalysis & Diabetes Screen',
    category: 'urinalysis',
    petType: 'both',
    price: 799,
    originalPrice: 999,
    description: 'Checks blood glucose levels, urinary tract infection markers, proteinuria, and hydration index.',
    parametersCount: 6,
    turnaroundHours: '12-24 Hours',
    sampleType: 'Urine & Blood Glucose',
    fastingRequired: true,
    popular: false,
    includedParameters: [
      'Blood Glucose (Random/Fasting)',
      'Urine Protein & Glucose',
      'Urine Specific Gravity',
      'Microscopic Sediment Analysis',
      'UTI Infection Markers'
    ]
  }
];

export const SERVICES = [
  {
    id: 's-01',
    title: 'Home Vet Consultation',
    description: 'Licensed doctors conduct complete clinical exams and issue digital prescriptions at your doorstep.',
    price: 'From ₹499 Only',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=400',
    badge: 'Popular',
  },
  {
    id: 's-02',
    title: 'Doorstep Vaccination',
    description: 'Essential 7-in-1, Rabies, ARV, and Anti-viral immunizations with guaranteed cold-chain storage.',
    price: 'Authentic Vaccines',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=400',
    badge: 'Cold Chain Guaranteed',
  },
  {
    id: 's-03',
    title: 'At-Home Pet Grooming',
    description: 'Medicated tick baths, nail trimming, ear cleaning, and coat styling by trained pet groomers.',
    price: 'Hygienic Care',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400',
    badge: 'Stress Free',
  },
  {
    id: 's-04',
    title: 'Online Video Consult',
    description: 'Video consultations with senior veterinary specialists for second opinions, dietary guidance & report analysis.',
    price: 'Instant Slots',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400',
    badge: '24/7 Available',
  },
];

export const FAQS = [
  {
    q: "How does home sample collection work for pets?",
    a: "Our certified veterinary phlebotomist visits your home at your chosen time slot. They are trained in low-stress, gentle handling so your pet feels safe and calm right in their comfortable surroundings."
  },
  {
    q: "Does my pet need to fast before a blood test?",
    a: "For tests involving Liver Function (LFT), Kidney Function (KFT), and Full Body profiles, an 8–10 hour fasting (water is allowed) is recommended for accurate biochemical values. CBC and Thyroid tests usually do not require fasting."
  },
  {
    q: "How soon will I receive the test results?",
    a: "Most routine reports (CBC, KFT, LFT) are generated within 12–24 hours. Specialized panels or cultures are delivered within 24–48 hours directly to your email and WhatsApp."
  },
  {
    q: "Are DeePet lab reports accepted by my regular veterinarian?",
    a: "Yes, 100%! All samples are tested in NABL-certified veterinary diagnostic reference laboratories. Our reports are signed by certified veterinary pathologists and widely accepted across all veterinary clinics in Delhi NCR."
  },
  {
    q: "How do I prepare my dog or cat for sample collection?",
    a: "Keep your pet in a quiet room, avoid heavy exercise right before collection, and keep their favorite treats ready! Our phlebotomist brings gentle restraint aids and treats to ensure a zero-stress experience."
  }
];
