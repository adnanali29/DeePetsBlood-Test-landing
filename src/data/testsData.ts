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

