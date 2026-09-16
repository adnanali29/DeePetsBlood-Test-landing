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
    q: "How does doorstep veterinary care work?",
    a: "Our qualified veterinarian arrives at your home with diagnostic tools and medication to examine, collect samples, or treat your pet stress-free in their familiar surroundings."
  },
  {
    q: "Are the package prices all-inclusive?",
    a: "Yes. Package prices include home visits, pre-anaesthetic testing, surgery/procedure, medications, and follow-up checks without itemised surprise bills."
  },
  {
    q: "What if my pet needs surgery or inpatient stay?",
    a: "Surgery and rehab packages include transportation, pre-op testing, procedure, medicines, and recovery care at our dedicated farm facility or hospital partner."
  },
  {
    q: "Which areas in Delhi NCR do you cover?",
    a: "We serve Gurgaon, Delhi, Noida, Greater Noida, and Ghaziabad with full doorstep coverage."
  },
  {
    q: "How do I prepare my pet for a home visit or blood test?",
    a: "Keep your pet in a quiet room, avoid heavy exercise right before collection, and keep their favorite treats ready. For fasting tests, an 8–10 hour fast is recommended."
  }
];

export interface WholeBodyTestItem {
  name: string;
  price?: string;
  subTests?: string[];
}

export interface WholeBodyTestCategory {
  categoryName: string;
  price?: string;
  items: WholeBodyTestItem[];
}

export interface PetPackage {
  name: string;
  title: string;
  price: number;
  idealFor: string;
  testsCount: number;
  includedTests: string[];
  isPopular?: boolean;
}

export const CAT_WHOLE_BODY_TESTS: WholeBodyTestCategory[] = [
  {
    categoryName: "Hematology (Blood)",
    price: "799 starting",
    items: [
      {
        name: "Complete Blood Count (CBC)",
        price: "Rs 799 starting",
        subTests: ["RBC Count", "WBC Count", "Hemoglobin", "Hematocrit (PCV)", "Platelet Count", "Differential Count", "Blood Smear", "Reticulocyte Count"]
      }
    ]
  },
  {
    categoryName: "Liver Function",
    price: "1099 starting",
    items: [
      {
        name: "Liver Function Profile",
        price: "Rs 1099 starting",
        subTests: ["ALT (SGPT)", "AST (SGOT)", "ALP", "GGT", "Total Bilirubin", "Direct Bilirubin", "Total Protein", "Albumin", "Globulin", "A/G Ratio", "Bile Acids"]
      }
    ]
  },
  {
    categoryName: "Kidney Function",
    price: "1099 starting",
    items: [
      {
        name: "Kidney Function Profile",
        price: "Rs 1099 starting",
        subTests: ["BUN", "Creatinine", "Phosphorus", "Calcium", "Sodium", "Potassium", "Chloride"]
      },
      {
        name: "SDMA (Important early kidney marker)",
        price: "Rs 2599 starting",
        subTests: ["Symmetric Dimethylarginine (SDMA) Early Renal Biomarker"]
      }
    ]
  },
  {
    categoryName: "Diabetes & Metabolism",
    price: "599 starting",
    items: [
      {
        name: "Blood Glucose",
        price: "Rs 599",
        subTests: ["Blood Sugar Level (Random/Fasting)"]
      }
    ]
  },
  {
    categoryName: "Pancreas",
    price: "799 starting",
    items: [
      {
        name: "Spec fPL (Feline Pancreatic Lipase)",
        price: "Rs 2599 starting",
        subTests: ["Feline Pancreatic Lipase Lipemia Assessment"]
      },
      {
        name: "Amylase",
        price: "Rs 799 starting",
        subTests: ["Amylase Enzyme Level"]
      },
      {
        name: "Lipase",
        price: "Rs 799 starting",
        subTests: ["Lipase Enzyme Level"]
      }
    ]
  },
  {
    categoryName: "Thyroid & Hormones",
    price: "799 starting",
    items: [
      {
        name: "Total T4",
        price: "Rs 799 starting",
        subTests: ["Total Thyroxine Hormone Level"]
      },
      {
        name: "Free T4",
        price: "Rs 799 starting",
        subTests: ["Free Thyroxine Hormone Level"]
      },
      {
        name: "TSH",
        price: "Rs 799 starting",
        subTests: ["Thyroid Stimulating Hormone"]
      },
      {
        name: "Cortisol",
        price: "Rs 1099 starting",
        subTests: ["Adrenal Stress Cortisol Hormone"]
      }
    ]
  },
  {
    categoryName: "Urinalysis",
    price: "899 starting",
    items: [
      {
        name: "Routine Urine Test",
        price: "Rs 899 starting",
        subTests: ["Specific Gravity", "Protein", "Glucose", "Ketones", "Bilirubin", "pH", "Sediment Microscopy", "UPC Ratio"]
      },
      {
        name: "Urine Culture",
        price: "Rs 899 starting",
        subTests: ["Bacterial Pathogen Culture & Sensitivity Screening"]
      }
    ]
  },
  {
    categoryName: "Infectious Diseases (Cat Specific)",
    price: "1099 starting",
    items: [
      { name: "FIV (Feline Immunodeficiency Virus)", price: "Rs 1099 starting", subTests: ["FIV Antibody Screening"] },
      { name: "FeLV (Feline Leukemia Virus)", price: "Rs 1099 starting", subTests: ["FeLV Antigen Screening"] },
      { name: "Feline Parvovirus (FPV)", price: "Rs 1099 starting", subTests: ["FPV Antigen Screening"] },
      { name: "Feline Coronavirus", price: "Rs 1099 starting", subTests: ["FCoV Antibody/Antigen Screening"] },
      { name: "Toxoplasma IgG/IgM", price: "Rs 1099 starting", subTests: ["Toxoplasmosis Antibody Screen"] },
      { name: "Hemoplasma", price: "Rs 1099 starting", subTests: ["Mycoplasma haemofelis Screening"] },
      { name: "Tick Fever Panel", price: "Rs 3599", subTests: ["Tick-borne Pathogen Screening"] }
    ]
  },
  {
    categoryName: "Vitamins & Minerals",
    price: "400 starting",
    items: [
      { name: "Iron", price: "Rs 1500", subTests: ["Serum Iron Level"] },
      { name: "Iron Profile", price: "Rs 2100", subTests: ["Serum Iron", "TIBC", "Transferrin Saturation", "Ferritin"] },
      { name: "Magnesium", price: "Rs 400", subTests: ["Serum Magnesium Level"] },
      { name: "Phosphorus", price: "Rs 400", subTests: ["Inorganic Phosphorus Level"] },
      { name: "Zinc", price: "Rs 2100", subTests: ["Serum Zinc Assessment"] },
      { name: "Folic Acid", price: "Rs 1200", subTests: ["Serum Folate / Folic Acid Level"] },
      { name: "Vit D3", price: "Rs 1800", subTests: ["25-Hydroxy Vitamin D3"] },
      { name: "Vitamin A", price: "Rs 6500", subTests: ["Retinol / Vitamin A Level"] },
      { name: "Vitamin B1", price: "Rs 6500", subTests: ["Thiamine / Vitamin B1 Level"] },
      { name: "Vitamin B12", price: "Rs 1500", subTests: ["Cobalamin / Vitamin B12 Level"] },
      { name: "Vitamin E", price: "Rs 6000", subTests: ["Alpha-Tocopherol / Vitamin E Level"] }
    ]
  },
  {
    categoryName: "Hormonal Assay",
    price: "799 starting",
    items: [
      { name: "Aldosterone", price: "Rs 1500", subTests: ["Adrenal Aldosterone Hormone Level"] },
      { name: "Adrenocorticotropic hormone (ACTH)", price: "Rs 1800", subTests: ["Pituitary ACTH Level"] },
      { name: "Canine Free Thyroxine (FT4)", price: "Rs 800", subTests: ["Free T4 Hormone Level"] },
      { name: "Cortisol Routine", price: "Rs 1099", subTests: ["Basal Cortisol Hormone Level"] },
      { name: "Cortisol: LDDS Test (2 Analysis)", price: "Rs 1699", subTests: ["2-Sample Dexamethasone Suppression"] },
      { name: "Cortisol: LDDS Test (3 Analysis)", price: "Rs 2299", subTests: ["3-Sample Dexamethasone Suppression"] },
      { name: "Calcitonin Test", price: "Rs 1499", subTests: ["Serum Calcitonin Hormone Level"] },
      { name: "Estrogen", price: "Rs 1099", subTests: ["Serum Estradiol / Estrogen Level"] },
      { name: "FSH: Follicle Stimulating Hormone", price: "Rs 999", subTests: ["Follicle Stimulating Hormone"] },
      { name: "Feline Free Thyroxine (FT4)", price: "Rs 799", subTests: ["Feline Free T4 Hormone Level"] },
      { name: "GNRH (Stimulation Test)", price: "Rs 4399", subTests: ["Gonadotropin-Releasing Hormone Test"] },
      { name: "Insulin", price: "Rs 888", subTests: ["Serum Fasting Insulin Level"] },
      { name: "LH: Luteinising Hormone", price: "Rs 999", subTests: ["Luteinizing Hormone Level"] },
      { name: "Para Thyroid Hormone (PTH)", price: "Rs 1599", subTests: ["Parathyroid Hormone Level"] },
      { name: "Phenobarbitone", price: "Rs 1299", subTests: ["Serum Phenobarbital Drug Level"] },
      { name: "Progesterone Serum", price: "Rs 1099", subTests: ["Serum Progesterone Level"] },
      { name: "Prolactin", price: "Rs 999", subTests: ["Serum Prolactin Level"] },
      { name: "Reproductive Hormones: FSH & LH", price: "Rs 1499", subTests: ["Combined FSH & LH Panel"] },
      { name: "Testosterone", price: "Rs 1099", subTests: ["Serum Total Testosterone Level"] },
      { name: "Thyroid Profile", price: "Rs 2099", subTests: ["Comprehensive Thyroid Panel (T3, T4, TSH)"] }
    ]
  },
  {
    categoryName: "Cardiac",
    price: "999 starting",
    items: [
      { name: "NT-proBNP", price: "Rs 999 starting", subTests: ["Cardiac Stretch Biomarker"] },
      { name: "Troponin-I", price: "Rs 999 starting", subTests: ["Myocardial Injury Marker"] }
    ]
  },
  {
    categoryName: "Gastrointestinal",
    price: "799 starting",
    items: [
      {
        name: "Gastrointestinal Panel",
        price: "Rs 799 starting",
        subTests: ["Stool Routine", "Ova & Cyst", "Giardia", "Occult Blood", "Fecal Culture"]
      }
    ]
  },
  {
    categoryName: "Coagulation",
    price: "1199 starting",
    items: [
      {
        name: "Coagulation Panel",
        price: "Rs 1199 starting",
        subTests: ["PT (Prothrombin Time)", "aPTT (Activated Partial Thromboplastin Time)", "Fibrinogen"]
      }
    ]
  }
];

export const DOG_WHOLE_BODY_TESTS: WholeBodyTestCategory[] = [
  {
    categoryName: "Hematology (Blood)",
    price: "799 starting",
    items: [
      {
        name: "Complete Blood Count (CBC)",
        price: "Rs 799 starting",
        subTests: ["RBC Count", "WBC Count", "Hemoglobin", "Hematocrit (PCV)", "Platelet Count", "Differential Count", "Blood Smear", "Reticulocyte Count"]
      }
    ]
  },
  {
    categoryName: "Liver Function",
    price: "1099 starting",
    items: [
      {
        name: "Liver Function Profile",
        price: "Rs 1099 starting",
        subTests: ["ALT (SGPT)", "AST (SGOT)", "ALP", "GGT", "Total Bilirubin", "Direct Bilirubin", "Total Protein", "Albumin", "Globulin", "A/G Ratio", "Bile Acids"]
      }
    ]
  },
  {
    categoryName: "Kidney Function",
    price: "1099 starting",
    items: [
      {
        name: "Kidney Function Profile",
        price: "Rs 1099 starting",
        subTests: ["BUN", "Creatinine", "Phosphorus", "Calcium", "Sodium", "Potassium", "Chloride"]
      },
      {
        name: "SDMA",
        price: "Rs 2599 starting",
        subTests: ["Symmetric Dimethylarginine Early Renal Marker"]
      }
    ]
  },
  {
    categoryName: "Diabetes & Metabolism",
    price: "599 starting",
    items: [
      { name: "Blood Glucose", price: "Rs 599", subTests: ["Blood Glucose (Random/Fasting)"] },
      { name: "Fructosamine", price: "Rs 799 starting", subTests: ["Glycated Protein Assessment"] },
      { name: "Blood Ketones", price: "Rs 799 starting", subTests: ["Ketosis Metabolic Screen"] }
    ]
  },
  {
    categoryName: "Pancreas",
    price: "799 starting",
    items: [
      { name: "Spec cPL (Canine Pancreatic Lipase)", price: "Rs 2599 starting", subTests: ["Canine Pancreatic Lipase Lipemia Assessment"] },
      { name: "Amylase", price: "Rs 799 starting", subTests: ["Amylase Enzyme Level"] },
      { name: "Lipase", price: "Rs 799 starting", subTests: ["Lipase Enzyme Level"] }
    ]
  },
  {
    categoryName: "Endocrine (Dog Specific)",
    price: "799 starting",
    items: [
      { name: "Total T4", price: "Rs 799 starting", subTests: ["Thyroxine Hormone Level"] },
      { name: "Free T4", price: "Rs 799 starting", subTests: ["Free Thyroxine Hormone Level"] },
      { name: "TSH", price: "Rs 799 starting", subTests: ["Thyroid Stimulating Hormone"] },
      { name: "ACTH Stimulation Test", price: "Rs 1599 starting", subTests: ["Adrenocorticotropic Hormone Stimulation"] },
      { name: "Low Dose Dexamethasone Test", price: "Rs 1599 starting", subTests: ["LDDS Suppression Screening"] },
      { name: "Cortisol", price: "Rs 1099 starting", subTests: ["Adrenal Cortisol Hormone Level"] }
    ]
  },
  {
    categoryName: "Urinalysis",
    price: "899 starting",
    items: [
      {
        name: "Routine Urine Test",
        price: "Rs 899 starting",
        subTests: ["Specific Gravity", "Protein", "Glucose", "Ketones", "Bilirubin", "pH", "Sediment Microscopy", "UPC Ratio"]
      },
      {
        name: "Urine Culture",
        price: "Rs 899 starting",
        subTests: ["Bacterial Pathogen Culture & Sensitivity Screening"]
      }
    ]
  },
  {
    categoryName: "Infectious Diseases (Dog Specific)",
    price: "2599 starting",
    items: [
      { name: "4Dx Test (Ehrlichia, Anaplasma, Lyme, Heartworm)", price: "Rs 3000", subTests: ["4-Way Vector Vector-Borne Diagnostics"] },
      { name: "Babesia", price: "Rs 2599", subTests: ["Babesiosis Parasite Screening"] },
      { name: "Ehrlichia", price: "Rs 2599", subTests: ["Ehrlichiosis Antibody Screening"] },
      { name: "Anaplasma", price: "Rs 2599", subTests: ["Anaplasmosis Antibody Screening"] },
      { name: "Heartworm Antigen", price: "Rs 2599", subTests: ["Dirofilaria immitis Screen"] },
      { name: "Leptospira", price: "Rs 1599 starting", subTests: ["Leptospirosis Antibody Screen"] },
      { name: "Canine Parvovirus", price: "Rs 1599 starting", subTests: ["Canine Parvovirus Antigen Screen"] },
      { name: "Distemper", price: "Rs 1599 starting", subTests: ["Canine Distemper Antigen Screen"] },
      { name: "Tick Fever Panel", price: "Rs 3599", subTests: ["Comprehensive Tick Fever Screen"] }
    ]
  },
  {
    categoryName: "Vitamins & Minerals",
    price: "400 starting",
    items: [
      { name: "Iron", price: "Rs 1500", subTests: ["Serum Iron Level"] },
      { name: "Iron Profile", price: "Rs 2100", subTests: ["Serum Iron", "TIBC", "Transferrin Saturation", "Ferritin"] },
      { name: "Magnesium", price: "Rs 400", subTests: ["Serum Magnesium Level"] },
      { name: "Phosphorus", price: "Rs 400", subTests: ["Inorganic Phosphorus Level"] },
      { name: "Zinc", price: "Rs 2100", subTests: ["Serum Zinc Assessment"] },
      { name: "Folic Acid", price: "Rs 1200", subTests: ["Serum Folate / Folic Acid Level"] },
      { name: "Vit D3", price: "Rs 1800", subTests: ["25-Hydroxy Vitamin D3"] },
      { name: "Vitamin A", price: "Rs 6500", subTests: ["Retinol / Vitamin A Level"] },
      { name: "Vitamin B1", price: "Rs 6500", subTests: ["Thiamine / Vitamin B1 Level"] },
      { name: "Vitamin B12", price: "Rs 1500", subTests: ["Cobalamin / Vitamin B12 Level"] },
      { name: "Vitamin E", price: "Rs 6000", subTests: ["Alpha-Tocopherol / Vitamin E Level"] }
    ]
  },
  {
    categoryName: "Hormonal Assay",
    price: "799 starting",
    items: [
      { name: "Aldosterone", price: "Rs 1500", subTests: ["Adrenal Aldosterone Hormone Level"] },
      { name: "Adrenocorticotropic hormone (ACTH)", price: "Rs 1800", subTests: ["Pituitary ACTH Level"] },
      { name: "Canine Free Thyroxine (FT4)", price: "Rs 800", subTests: ["Free T4 Hormone Level"] },
      { name: "Cortisol Routine", price: "Rs 1099", subTests: ["Basal Cortisol Hormone Level"] },
      { name: "Cortisol: LDDS Test (2 Analysis)", price: "Rs 1699", subTests: ["2-Sample Dexamethasone Suppression"] },
      { name: "Cortisol: LDDS Test (3 Analysis)", price: "Rs 2299", subTests: ["3-Sample Dexamethasone Suppression"] },
      { name: "Calcitonin Test", price: "Rs 1499", subTests: ["Serum Calcitonin Hormone Level"] },
      { name: "Estrogen", price: "Rs 1099", subTests: ["Serum Estradiol / Estrogen Level"] },
      { name: "FSH: Follicle Stimulating Hormone", price: "Rs 999", subTests: ["Follicle Stimulating Hormone"] },
      { name: "Feline Free Thyroxine (FT4)", price: "Rs 799", subTests: ["Feline Free T4 Hormone Level"] },
      { name: "GNRH (Stimulation Test)", price: "Rs 4399", subTests: ["Gonadotropin-Releasing Hormone Test"] },
      { name: "Insulin", price: "Rs 888", subTests: ["Serum Fasting Insulin Level"] },
      { name: "LH: Luteinising Hormone", price: "Rs 999", subTests: ["Luteinizing Hormone Level"] },
      { name: "Para Thyroid Hormone (PTH)", price: "Rs 1599", subTests: ["Parathyroid Hormone Level"] },
      { name: "Phenobarbitone", price: "Rs 1299", subTests: ["Serum Phenobarbital Drug Level"] },
      { name: "Progesterone Serum", price: "Rs 1099", subTests: ["Serum Progesterone Level"] },
      { name: "Prolactin", price: "Rs 999", subTests: ["Serum Prolactin Level"] },
      { name: "Reproductive Hormones: FSH & LH", price: "Rs 1499", subTests: ["Combined FSH & LH Panel"] },
      { name: "Testosterone", price: "Rs 1099", subTests: ["Serum Total Testosterone Level"] },
      { name: "Thyroid Profile", price: "Rs 2099", subTests: ["Comprehensive Thyroid Panel (T3, T4, TSH)"] }
    ]
  },
  {
    categoryName: "Cardiac",
    price: "999 starting",
    items: [
      { name: "NT-proBNP", price: "Rs 999 starting", subTests: ["Cardiac Stretch Biomarker"] },
      { name: "Troponin-I", price: "Rs 999 starting", subTests: ["Myocardial Injury Marker"] }
    ]
  },
  {
    categoryName: "Gastrointestinal",
    price: "799 starting",
    items: [
      {
        name: "Gastrointestinal Panel",
        price: "Rs 799 starting",
        subTests: ["Stool Routine", "Ova & Cyst", "Giardia", "Occult Blood", "Fecal Culture"]
      }
    ]
  },
  {
    categoryName: "Coagulation",
    price: "1199 starting",
    items: [
      {
        name: "Coagulation Panel",
        price: "Rs 1199 starting",
        subTests: ["PT (Prothrombin Time)", "aPTT (Activated Partial Thromboplastin Time)", "Fibrinogen"]
      }
    ]
  }
];

export const CAT_PACKAGES: PetPackage[] = [
  {
    name: "Cat Basic Care",
    title: "Basic Wellness Package (Essential)",
    price: 2700,
    idealFor: "Ideal for: Healthy cats, annual check-up",
    testsCount: 15,
    includedTests: [
      "Complete Blood Count (CBC)",
      "Blood Smear",
      "Blood Glucose",
      "BUN",
      "Creatinine",
      "ALT (SGPT)",
      "ALP",
      "Total Protein",
      "Albumin",
      "Total Bilirubin",
      "Calcium",
      "Sodium",
      "Potassium",
      "Routine Urine Analysis",
      "Stool Routine Examination"
    ]
  },
  {
    name: "Cat Complete Care",
    title: "Comprehensive Health Package (Most Popular)",
    price: 3500,
    idealFor: "Ideal for: Adult & senior cats (1–8 years)",
    testsCount: 28,
    isPopular: true,
    includedTests: [
      "Complete Blood Count (CBC) + Blood Smear",
      "ALT (SGPT)",
      "AST (SGOT)",
      "ALP",
      "GGT",
      "Total & Direct Bilirubin",
      "Total Protein",
      "Albumin",
      "Globulin",
      "BUN (Blood Urea Nitrogen)",
      "Creatinine",
      "SDMA (Early Kidney Marker)",
      "Calcium",
      "Phosphorus",
      "Sodium",
      "Potassium",
      "Chloride",
      "Blood Glucose",
      "Fructosamine",
      "Cholesterol",
      "Routine Urinalysis",
      "UPC Ratio (Urine Protein Creatinine)",
      "Stool Routine Examination",
      "FIV (Feline Immunodeficiency Virus)",
      "FeLV (Feline Leukemia Virus)"
    ]
  },
  {
    name: "Cat Platinum 360",
    title: "Premium Whole Body Package",
    price: 5000,
    idealFor: "Ideal for: Senior cats, illness screening, full preventive care",
    testsCount: 38,
    includedTests: [
      "All Complete Care Diagnostic Biomarkers",
      "Spec fPL (Feline Pancreatic Lipase)",
      "Total T4 (Thyroid Profile)",
      "Free T4 (Thyroid Profile)",
      "TSH (Thyroid Profile)",
      "Vitamin B12",
      "Folate",
      "Iron Profile",
      "Ferritin",
      "NT-proBNP (Heart Biomarker)",
      "Troponin-I (Heart Injury Marker)",
      "PT (Coagulation Panel)",
      "aPTT (Coagulation Panel)",
      "Urine Culture"
    ]
  }
];

export const DOG_PACKAGES: PetPackage[] = [
  {
    name: "Dog Basic Care",
    title: "Basic Wellness Package (Essential)",
    price: 2500,
    idealFor: "Ideal for: Annual preventive check-up",
    testsCount: 15,
    includedTests: [
      "Complete Blood Count (CBC)",
      "Blood Smear",
      "Blood Glucose",
      "BUN",
      "Creatinine",
      "ALT (SGPT)",
      "ALP",
      "Total Protein",
      "Albumin",
      "Total Bilirubin",
      "Calcium",
      "Sodium",
      "Potassium",
      "Routine Urine Analysis",
      "Stool Routine Examination"
    ]
  },
  {
    name: "Dog Complete Care",
    title: "Comprehensive Health Package (Most Popular)",
    price: 3600,
    idealFor: "Ideal for: Adult dogs & breed health screening",
    testsCount: 30,
    isPopular: true,
    includedTests: [
      "Complete Blood Count (CBC) + Blood Smear",
      "ALT (SGPT)",
      "AST (SGOT)",
      "ALP",
      "GGT",
      "Bilirubin (Total & Direct)",
      "Total Protein",
      "Albumin",
      "Globulin",
      "BUN (Blood Urea Nitrogen)",
      "Creatinine",
      "SDMA (Early Kidney Marker)",
      "Calcium",
      "Phosphorus",
      "Sodium",
      "Potassium",
      "Chloride",
      "Blood Glucose",
      "Fructosamine",
      "Cholesterol",
      "Routine Urinalysis",
      "UPC Ratio (Urine Protein Creatinine)",
      "Stool Routine Examination",
      "4Dx Tick Fever Panel (Ehrlichia, Anaplasma, Lyme, Heartworm)"
    ]
  },
  {
    name: "Dog Platinum 360",
    title: "Premium Whole Body Package",
    price: 4000,
    idealFor: "Ideal for: Senior dogs & complete disease screening",
    testsCount: 42,
    includedTests: [
      "All Complete Care Diagnostic Biomarkers",
      "Spec cPL (Canine Pancreatic Lipase)",
      "Total T4 (Thyroid Profile)",
      "Free T4 (Thyroid Profile)",
      "TSH (Thyroid Profile)",
      "ACTH Stimulation Test (Cushing's/Addison's Screening)",
      "Vitamin B12",
      "Folate",
      "Iron Profile",
      "Ferritin",
      "NT-proBNP (Heart Biomarker)",
      "Troponin-I (Heart Injury Marker)",
      "PT (Coagulation Panel)",
      "aPTT (Coagulation Panel)",
      "Urine Culture"
    ]
  }
];

export interface DetailedPackage {
  id: string;
  code: string;
  title: string;
  priceDisplay: string;
  price: number;
  category: 'wellness' | 'blood' | 'rehab' | 'surgery';
  badge?: string;
  subtitle?: string;
  overview: string;
  isPopular?: boolean;
  inclusions: {
    title?: string;
    items: string[];
  }[];
}

export const DETAILED_PACKAGES: DetailedPackage[] = [
  // CATEGORY 1: WELLNESS
  {
    id: 'pkg-1',
    code: 'Package 1',
    title: 'Puppy / Kitten First-Year Wellness Package',
    priceDisplay: '₹3,499',
    price: 3499,
    category: 'wellness',
    subtitle: 'Delivered over 3 scheduled visits',
    overview: 'Everything a young pet needs in their first year: full core vaccination series, deworming schedule, growth checks, and diet plan — delivered at home over 3 scheduled visits.',
    inclusions: [
      {
        title: 'Visit 1 (6–8 weeks)',
        items: [
          'At-home veterinary consultation',
          'Physical examination',
          'Core vaccine #1 (DHPPi / FVRCP)',
          'Deworming protocol',
          'Kitten / puppy growth log',
          'Feeding & nutrition guidance'
        ]
      },
      {
        title: 'Visit 2 (10–12 weeks)',
        items: [
          'At-home veterinary consultation',
          'Core vaccine #2 (booster)',
          'Deworming check & repeat',
          'Socialisation & behavioural advice'
        ]
      },
      {
        title: 'Visit 3 (14–16 weeks)',
        items: [
          'At-home veterinary consultation',
          'Rabies vaccination',
          'Core vaccine #3',
          'Microchip guidance & registration advice',
          'First-year wellness certificate',
          'WhatsApp vet support between visits'
        ]
      }
    ]
  },
  {
    id: 'pkg-2',
    code: 'Package 2',
    title: 'Adult Pet Annual Preventive Care Package',
    priceDisplay: '₹2,499',
    price: 2499,
    category: 'wellness',
    subtitle: '13 Items in 1 Visit',
    overview: 'Annual boosters, routine health check, basic bloodwork, and parasite prevention — the once-a-year reset every adult pet needs.',
    inclusions: [
      {
        title: 'Full Single-Visit Care',
        items: [
          'At-home veterinary consultation',
          'Full physical examination',
          'Annual core booster (DHPPi / FVRCP)',
          'Rabies booster',
          'CBC (Complete Blood Count)',
          'Blood glucose test',
          'Ear & eye check',
          'Dental & oral screening',
          'Heart & lung auscultation',
          'Deworming dose',
          'Flea/tick preventive recommendation',
          'Personalised wellness summary report',
          'WhatsApp vet Q&A for 14 days post-visit'
        ]
      }
    ]
  },
  {
    id: 'pkg-3',
    code: 'Package 3',
    title: 'Senior Pet Care Package (Ages 7+)',
    priceDisplay: '₹4,999',
    price: 4999,
    category: 'wellness',
    subtitle: '18 Items across 2 Visits',
    overview: 'Proactive screening for kidney disease, arthritis, heart issues, and thyroid changes before symptoms appear.',
    inclusions: [
      {
        title: 'Visit 1 — Screening Visit',
        items: [
          'Comprehensive home veterinary examination',
          'Extended blood panel (CBC, LFT, KFT)',
          'Blood glucose & thyroid (T4) screening',
          'SDMA kidney marker (early-stage detection)',
          'Blood pressure measurement',
          'Urine routine & microscopy',
          'Mobility & joint assessment',
          'Pain scoring',
          'Body condition & weight tracking',
          'Senior nutrition plan'
        ]
      },
      {
        title: 'Visit 2 — Follow-Up Visit',
        items: [
          'Follow-up vet visit to discuss lab results',
          'Tailored senior care plan',
          'Joint supplement recommendations',
          'Prescription management',
          'WhatsApp vet support for 30 days'
        ]
      }
    ]
  },
  {
    id: 'pkg-4',
    code: 'Package 4',
    title: 'Chronic Disease Management — Quarterly Track',
    priceDisplay: '₹7,999 / quarter',
    price: 7999,
    category: 'wellness',
    subtitle: '90-Day Structured Care (18 Items)',
    overview: 'Structured, 90-day monitoring for pets with renal failure, diabetes, cardiac disease, or chronic liver conditions.',
    inclusions: [
      {
        title: 'Quarterly Inclusions',
        items: [
          '3 home vet visits (1 per month)',
          '2 blood panels (CBC, LFT/KFT as clinically indicated)',
          'Targeted monitoring (blood glucose curve / blood pressure / electrolyte checks)',
          'Medication review & dosage adjustment',
          'Urine monitoring',
          'Prescription renewals',
          'Direct vet WhatsApp line for non-emergency queries',
          'Emergency referral priority',
          'End-of-quarter progress summary report'
        ]
      }
    ]
  },
  {
    id: 'pkg-5',
    code: 'Package 5',
    title: 'Pre-Flight & Travel Fitness Certificate',
    priceDisplay: '₹1,999',
    price: 1999,
    category: 'wellness',
    subtitle: '9 Inclusions for Travel',
    overview: 'Everything required for domestic pet travel by air, rail, or road — fit-to-fly assessment, microchip check, and health certificate.',
    inclusions: [
      {
        title: 'Travel Certification',
        items: [
          'At-home veterinary examination',
          'Microchip verification & scan',
          'Vaccination record verification',
          'Fit-to-fly / fit-to-travel health certificate',
          'Internal & external parasite treatment stamp',
          'Deworming certificate',
          'Airline / rail compliance check',
          'Travel-stress advice & mild sedative prescription (where required)',
          'Digital & printed certificate set'
        ]
      }
    ]
  },

  // CATEGORY 2: BLOOD CHECK
  {
    id: 'pkg-b1',
    code: 'Basic Blood',
    title: 'Basic Blood Check',
    priceDisplay: '₹1,499',
    price: 1499,
    category: 'blood',
    overview: 'Essential routine diagnostic check covering blood counts, glucose, kidney and liver function.',
    inclusions: [
      {
        title: 'Included Panels',
        items: [
          'CBC (Complete Blood Count)',
          'Blood Glucose',
          'LFT (Liver Function Profile)',
          'KFT (Kidney Function Profile)'
        ]
      }
    ]
  },
  {
    id: 'pkg-b2',
    code: 'Advanced Blood',
    title: 'Advanced Blood Check',
    priceDisplay: '₹2,999',
    price: 2999,
    category: 'blood',
    badge: 'Most Popular',
    isPopular: true,
    overview: 'Comprehensive organ screening with early renal biomarker SDMA, thyroid, and electrolyte balance.',
    inclusions: [
      {
        title: 'Included Panels',
        items: [
          'CBC (Complete Blood Count)',
          'LFT (Liver Function Profile)',
          'KFT (Kidney Function Profile)',
          'Electrolytes Panel (Na+, K+, Cl-)',
          'Thyroid (T4) Screening',
          'SDMA Early Kidney Marker'
        ]
      }
    ]
  },
  {
    id: 'pkg-b3',
    code: 'Premium Blood',
    title: 'Premium Blood Check',
    priceDisplay: '₹4,999',
    price: 4999,
    category: 'blood',
    overview: 'Full-spectrum diagnostic master panel with disease-specific biomarkers, cardiac markers, and urinalysis.',
    inclusions: [
      {
        title: 'Included Panels',
        items: [
          'Everything in Advanced Blood Check',
          'Cardiac Stretch Biomarker (NT-proBNP)',
          'Cardiac Injury Marker (Troponin-I)',
          'Coagulation Profile (PT / aPTT)',
          'Urine Routine & UPC Ratio',
          'Pancreatic Lipase (Spec cPL/fPL)'
        ]
      }
    ]
  },

  // CATEGORY 3: REHABILITATION
  {
    id: 'pkg-6',
    code: 'Package 6',
    title: 'Joint Rehabilitation Programme — 45 Days',
    priceDisplay: 'From ₹49,999',
    price: 49999,
    category: 'rehab',
    badge: 'Residential Stay',
    subtitle: '45-Day Farm Boarding & Physio (33 Items across 6 Stages)',
    overview: 'Covers boarding, physiotherapy, hydrotherapy, diet, standard medication, and vet monitoring at DeePet Farm Facility. Pickup & drop included.',
    inclusions: [
      {
        title: 'Stage 1 — Intake Assessment',
        items: [
          'Orthopedic & mobility assessment',
          'Gait analysis',
          'Pain scoring',
          'Baseline weight & BCS score',
          'Rehab goal-setting'
        ]
      },
      {
        title: 'Stage 2 — Physiotherapy & Hydrotherapy',
        items: [
          'Structured physio sessions',
          'Range-of-motion exercises',
          'Therapeutic massage',
          'Assisted walking & muscle-strengthening',
          'Infrared therapy',
          'Supervised swimming in farm pool/pond'
        ]
      },
      {
        title: 'Stage 3 — Nutrition & Medication',
        items: [
          'Customised joint-support diet plan',
          'Glucosamine / Chondroitin / Omega-3 supplementation',
          'Prescribed pain management & anti-inflammatory course',
          'Daily activity & mobility logs'
        ]
      },
      {
        title: 'Stage 4 — Progress Tracking & Discharge',
        items: [
          'Weekly mobility scoring',
          'Gait video comparison (Day 1 vs 45)',
          'Final vet reassessment',
          'Discharge report + home-care plan'
        ]
      }
    ]
  },

  // CATEGORY 4: SURGERY CARE
  {
    id: 'pkg-7',
    code: 'Package 7',
    title: 'Minor Surgery Care Package',
    priceDisplay: 'Starting ₹6,999',
    price: 6999,
    category: 'surgery',
    subtitle: '17 Items (Pre-Op, Surgery, Post-Op)',
    overview: 'Small mass/lump removal, wound repair, abscess surgery, small cyst removal, minor skin procedures, suture-related procedures, cherry eye.',
    inclusions: [
      {
        title: 'Pre-Op & Diagnostics (At Home)',
        items: [
          'Home vet consultation',
          'Pre-anesthetic assessment',
          'CBC & Blood Glucose',
          'LFT/KFT (as appropriate)',
          'Blood pressure',
          'Surgical fitness check'
        ]
      },
      {
        title: 'Surgery & Post-Op Care',
        items: [
          'Procedure & Anaesthesia',
          'Surgical consumables & vital monitoring',
          'Recovery monitoring',
          'Discharge medicines & wound-care instructions',
          '1 post-op home visit',
          'Suture-removal visit'
        ]
      }
    ]
  },
  {
    id: 'pkg-8',
    code: 'Package 8',
    title: 'Soft Tissue Surgery Care',
    priceDisplay: 'Starting ₹11,999',
    price: 11999,
    category: 'surgery',
    subtitle: '24 Items (Pre-Op, Surgery, Post-Op)',
    overview: 'Pyometra, C-Section, tumour/mass removal, hernia, major wound repair, abdominal soft-tissue procedures, entropion.',
    inclusions: [
      {
        title: 'Pre-Op & Diagnostics (At Home)',
        items: [
          'Vet exam & Pre-anesthetic assessment',
          'Blood collection: CBC, LFT, KFT, Glucose, Electrolytes',
          'Urine testing',
          'Ultrasound/X-ray coordination (pickup/drop included)'
        ]
      },
      {
        title: 'Surgery & Post-Op Care',
        items: [
          'Procedure, Anaesthesia & IV fluids',
          'Vital monitoring & consumables',
          'Discharge medicines & Wound-care kit',
          '2 post-op home visits',
          'Suture removal & post-op boarding options'
        ]
      }
    ]
  },
  {
    id: 'pkg-9',
    code: 'Package 9',
    title: 'Major Surgery / Advanced Care',
    priceDisplay: 'Starting ₹24,999',
    price: 24999,
    category: 'surgery',
    subtitle: '25 Items (Pre-Op, Surgery, Post-Op)',
    overview: 'Major abdominal surgery, tumour surgery, amputation, foreign body removal, cystotomy / bladder stone removal / urethrostomy, fracture repair.',
    inclusions: [
      {
        title: 'Comprehensive Inclusions',
        items: [
          'Pre-op bloods: CBC, LFT, KFT, Electrolytes, Coagulation',
          'ECG, X-ray & Ultrasound imaging coordination',
          'Surgeon, Anaesthesia, IV fluids & Hospitalisation',
          'Pain-management plan & Antibiotics',
          '3 home follow-ups & Post-op bloodwork',
          'Suture/staple removal & Final recovery assessment'
        ]
      }
    ]
  },
  {
    id: 'pkg-10',
    code: 'Package 10',
    title: 'Orthopedic Surgery Care',
    priceDisplay: 'Starting ₹41,999',
    price: 41999,
    category: 'surgery',
    subtitle: '22 Items (Implants extra)',
    overview: 'Fractures, TPLO / CCL repair, patellar luxation, hip/elbow procedures. (Implants priced additionally).',
    inclusions: [
      {
        title: 'Orthopedic Inclusions',
        items: [
          'Orthopedic consultation & Gait assessment',
          'Digital X-rays, CBC, LFT/KFT & Pre-anesthetic check',
          'Surgical procedure & Anaesthesia',
          'Vital monitoring & Scaled hospitalisation',
          'Post-op home exam & Pain assessment',
          'Exercise restriction plan & Rehab add-on options'
        ]
      }
    ]
  },
  {
    id: 'pkg-11',
    code: 'Package 11',
    title: 'Cancer Surgery Care',
    priceDisplay: 'Starting ₹12,999',
    price: 12999,
    category: 'surgery',
    subtitle: '18 Items (Add Coordinator +₹4,999)',
    overview: 'Full diagnostic, surgical, and post-op oncology coordination.',
    inclusions: [
      {
        title: 'Oncology Care Inclusions',
        items: [
          'Home vet consultation & Blood collection',
          'CBC, LFT/KFT, Cytology/Biopsy & Histopathology coordination',
          'Surgery, Anaesthesia & Vital monitoring',
          'Hospitalisation & Post-op wound care',
          'Histopathology discussion & Oncology referral coordination'
        ]
      }
    ]
  },
  {
    id: 'pkg-12',
    code: 'Package 12',
    title: 'Female Pet — Spay Care Package',
    priceDisplay: 'Starting ₹12,999',
    price: 12999,
    category: 'surgery',
    subtitle: '20 Items (Pre-Op, Surgery, Post-Op)',
    overview: 'Complete, safe, sterile spaying with pre-anesthetic bloodwork, surgery, and 2 post-op home visits.',
    inclusions: [
      {
        title: 'Spay Package Inclusions',
        items: [
          'Home consultation & Physical exam',
          'CBC, LFT, KFT, Blood glucose',
          'Pre-anesthetic assessment',
          'Spay procedure, Anaesthesia & IV fluids',
          'Wound-care kit & Medicines',
          '2 post-op home visits & Suture removal',
          'Post-sterilisation weight-management advice'
        ]
      }
    ]
  },
  {
    id: 'pkg-13',
    code: 'Package 13',
    title: 'Male Pet — Neuter Care',
    priceDisplay: 'Starting ₹9,499',
    price: 9499,
    category: 'surgery',
    subtitle: '12 Inclusions',
    overview: 'Safe doorstep pre-op screening, neutering procedure, discharge medications, and suture-removal visit.',
    inclusions: [
      {
        title: 'Neuter Package Inclusions',
        items: [
          'Home consultation & Pre-op bloods (CBC, LFT/KFT)',
          'Anaesthetic assessment',
          'Neutering procedure & Anaesthesia',
          'Vital monitoring',
          'Discharge medicines & Wound care',
          'Follow-up visit & Suture removal'
        ]
      }
    ]
  },
  {
    id: 'pkg-14',
    code: 'Package 14',
    title: 'Emergency Surgery Support — Rapid Surgery Care',
    priceDisplay: 'Coordination Fee ₹1,999',
    price: 1999,
    category: 'surgery',
    subtitle: '7-Step Emergency Protocol',
    overview: 'Rapid home assessment, blood collection, and referral/hospital coordination within the hour.',
    inclusions: [
      {
        title: 'Emergency 7-Step Protocol',
        items: [
          'Step 1: Rapid home vet assessment',
          'Step 2: Emergency blood collection at home',
          'Step 3: Emergency diagnostics',
          'Step 4: Immediate referral/transfer to target hospital facility',
          'Step 5: Surgery coordination',
          'Step 6: Hospitalisation coordination',
          'Step 7: Post-discharge home care'
        ]
      }
    ]
  },
  {
    id: 'pkg-15',
    code: 'Package 15',
    title: 'Dental Care — Scale & Polish',
    priceDisplay: 'Starting ₹4,999',
    price: 4999,
    category: 'surgery',
    subtitle: '12 Items (Scaling, Polishing & Extractions)',
    overview: 'Base ultrasonic scale & polish at ₹4,999. If extractions are required, ₹6,999+ (extractions billed ~₹500–₹800 per tooth).',
    inclusions: [
      {
        title: 'Dental Inclusions',
        items: [
          'Oral exam & Pre-anaesthetic bloodwork (CBC, LFT, KFT)',
          'Fitness-for-anaesthesia assessment',
          'Ultrasonic scaling above & below gumline',
          'Polishing & Anaesthesia monitoring',
          'Simple extractions (if necessary)',
          'Pain management & Home dental-care plan'
        ]
      }
    ]
  }
];


