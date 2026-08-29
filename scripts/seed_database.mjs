import pg from 'pg';
const { Pool } = pg;

import { 
  CAT_WHOLE_BODY_TESTS, 
  DOG_WHOLE_BODY_TESTS, 
  CAT_PACKAGES, 
  DOG_PACKAGES 
} from '../src/data/testsData.ts';

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_zOEtlm85nBdM@ep-restless-paper-ax1xqdxz-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false },
});

const DEFAULT_HERO = {
  headline: 'Professional Vet &\nPet Care at Your\nHome',
  subtitle: 'No travel. No waiting. No stress for your pet.',
  badgeText: 'Professional Home Consultation',
  badgeSubtext: '(All travel included)',
};

const DEFAULT_CONTACT = {
  whatsappNumber: '+917500367400',
  primaryPhone: '+919591875232',
  secondaryPhone: '+918076563747',
  email: 'contact@deepetservices.com',
};

const DEFAULT_TESTIMONIALS = [
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

const MOCK_LEADS = [
  {
    id: 'lead-1',
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
    id: 'lead-2',
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
    id: 'lead-3',
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
    id: 'lead-4',
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
    id: 'lead-5',
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

async function main() {
  console.log('Seeding initial data into Neon PostgreSQL database...');
  const client = await pool.connect();
  try {
    // 1. Seed admin settings
    const settings = [
      { key: 'hero_config', value: DEFAULT_HERO },
      { key: 'contact_config', value: DEFAULT_CONTACT },
      { key: 'cat_tests', value: CAT_WHOLE_BODY_TESTS },
      { key: 'dog_tests', value: DOG_WHOLE_BODY_TESTS },
      { key: 'cat_packages', value: CAT_PACKAGES },
      { key: 'dog_packages', value: DOG_PACKAGES },
      { key: 'testimonials', value: DEFAULT_TESTIMONIALS },
    ];

    for (const s of settings) {
      await client.query(
        `INSERT INTO admin_settings (key, value, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
        [s.key, JSON.stringify(s.value)]
      );
      console.log(`  ✓ Inserted setting: ${s.key}`);
    }

    // 2. Seed mock leads
    for (const lead of MOCK_LEADS) {
      await client.query(
        `INSERT INTO leads
          (id, consultation_code, name, phone, pet_type, category, sub_test,
           price, city, pincode, schedule_date, message, status, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
         ON CONFLICT (id) DO NOTHING
         ON CONFLICT ON CONSTRAINT leads_consultation_code_key DO NOTHING`,
        [
          lead.id,
          lead.consultationCode,
          lead.name,
          lead.phone,
          lead.petType,
          lead.category,
          lead.subTest,
          lead.price,
          lead.city,
          lead.pincode,
          lead.date,
          lead.message,
          lead.status,
          lead.timestamp
        ]
      ).catch(() => {});
      console.log(`  ✓ Processed lead: ${lead.consultationCode} (${lead.name})`);
    }

    // Verify row counts
    const sCount = await client.query('SELECT count(*) FROM admin_settings');
    const lCount = await client.query('SELECT count(*) FROM leads');
    console.log(`\n🎉 SEEDING COMPLETE!`);
    console.log(`   admin_settings rows: ${sCount.rows[0].count}`);
    console.log(`   leads rows: ${lCount.rows[0].count}`);

  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(e => { console.error('Seeding failed:', e); process.exit(1); });
