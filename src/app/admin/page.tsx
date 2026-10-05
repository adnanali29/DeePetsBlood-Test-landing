'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  useApp, 
  Lead, 
  PetPackage, 
  TestimonialItem, 
  HeroConfig, 
  ContactConfig,
  BloodCheckCard,
  RehabConfig,
  SurgeryPackageItem,
  PreventiveWellnessPackage
} from '@/context/AppContext';
import { 
  WholeBodyTestCategory
} from '@/data/testsData';
import { 
  BarChart3, 
  Home, 
  PhoneCall, 
  Package, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  Menu, 
  X, 
  Check, 
  Search, 
  Settings, 
  Link as LinkIcon, 
  Download, 
  ShieldCheck, 
  LogOut, 
  Activity, 
  Stethoscope, 
  Star, 
  Sparkles,
  Droplet,
  Mail,
  Send,
  CheckCircle2,
  RotateCw,
  Copy,
  FileSpreadsheet
} from 'lucide-react';

export default function AdminPanel() {
  const {
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
    updatePackages,
    updateTestimonials,
    updateLeadStatus,
    updateLeadDetails,
    deleteLead,
    clearAllLeads,
    refreshLeads,
    googleSheetUrl,
    updateGoogleSheetUrl,
  } = useApp();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'email' | 'home' | 'contacts' | 'packages' | 'blood' | 'rehab' | 'surgery' | 'testimonials' | 'settings' | 'security'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isRefreshingLeads, setIsRefreshingLeads] = useState(false);

  // Auto-refresh DB leads whenever Dashboard tab is opened and poll every 10s
  useEffect(() => {
    if (activeTab === 'dashboard' && refreshLeads) {
      refreshLeads();
      const interval = setInterval(() => {
        refreshLeads();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Strict Auth guard
  useEffect(() => {
    const session = sessionStorage.getItem('deepet_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.replace('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('deepet_admin_session');
    router.push('/admin/login');
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Email Settings Form States
  const [emailForm, setEmailForm] = useState({
    recipientEmail: emailSettings?.recipientEmail || 'Sayedadnanali905@gmail.com',
    enabled: emailSettings?.enabled ?? true,
    senderName: emailSettings?.senderName || 'DeePets Notifications',
  });
  const [emailSaveMsg, setEmailSaveMsg] = useState('');
  const [testEmailLoading, setTestEmailLoading] = useState(false);
  const [testEmailMsg, setTestEmailMsg] = useState('');

  useEffect(() => {
    if (emailSettings) {
      setEmailForm({
        recipientEmail: emailSettings.recipientEmail || 'Sayedadnanali905@gmail.com',
        enabled: emailSettings.enabled ?? true,
        senderName: emailSettings.senderName || 'DeePets Notifications',
      });
    }
  }, [emailSettings]);

  const handleSaveEmailSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmailSettings({
      recipientEmail: emailForm.recipientEmail.trim(),
      enabled: emailForm.enabled,
      senderName: emailForm.senderName.trim(),
    });
    setEmailSaveMsg('Email settings saved successfully! 🚀');
    setTimeout(() => setEmailSaveMsg(''), 3500);
  };

  const handleSendTestEmail = async () => {
    setTestEmailLoading(true);
    setTestEmailMsg('');
    try {
      const res = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toEmail: emailForm.recipientEmail.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestEmailMsg(`✅ Test email sent to ${emailForm.recipientEmail.trim()}! Please check your inbox.`);
      } else {
        setTestEmailMsg(`❌ ${data.error || 'Failed to send test email.'}`);
      }
    } catch (err: any) {
      setTestEmailMsg(`❌ Error: ${err.message || 'Failed to send'}`);
    } finally {
      setTestEmailLoading(false);
    }
  };
  const [heroForm, setHeroForm] = useState<HeroConfig>({ ...heroConfig });
  const [heroMsg, setHeroMsg] = useState('');
  const [activePetTab, setActivePetTab] = useState<'Dog' | 'Cat'>('Dog');

  // Contact Form Categories Modal States
  const [showAddContactCatModal, setShowAddContactCatModal] = useState(false);
  const [newContactCatName, setNewContactCatName] = useState('');
  const [selectedContactCatIdx, setSelectedContactCatIdx] = useState<number>(-1);
  const [showAddOptionModal, setShowAddOptionModal] = useState(false);
  const [newOptionTitle, setNewOptionTitle] = useState('');
  const [contactCatMsg, setContactCatMsg] = useState('');

  // Categories and Sub-tests management
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [selectedCatIdx, setSelectedCatIdx] = useState<number>(-1);
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [newTestName, setNewTestName] = useState('');
  const [newTestPrice, setNewTestPrice] = useState('');
  const [newTestDesc, setNewTestDesc] = useState('');

  // Preventive Wellness Packages Form Modal
  const [showPrevPkgModal, setShowPrevPkgModal] = useState(false);
  const [prevPkgEditIdx, setPrevPkgEditIdx] = useState<number | null>(null);
  const [prevPkgForm, setPrevPkgForm] = useState<PreventiveWellnessPackage>({
    id: '',
    code: 'PACKAGE 1',
    title: '',
    tagline: '',
    subtitle: '',
    highlight: '',
    inclusions: [''],
    totalItemsCount: 15,
    allInclusions: [''],
    priceDisplay: 'Starting ₹2,999',
    subnote: '',
  });

  // Blood Check Cards Form Modal
  const [showBloodModal, setShowBloodModal] = useState(false);
  const [bloodEditIdx, setBloodEditIdx] = useState<number | null>(null);
  const [bloodForm, setBloodForm] = useState<BloodCheckCard>({
    id: '',
    title: '',
    price: 0,
    priceDisplay: '',
    isPopular: false,
    popularBadge: '',
    description: '',
    features: [''],
    buttonText: 'Book Now',
  });

  // Rehab Editor Form
  const [rehabForm, setRehabForm] = useState<RehabConfig>({ ...rehabConfig });
  const [rehabMsg, setRehabMsg] = useState('');

  // Surgery Packages Modal
  const [showSurgeryModal, setShowSurgeryModal] = useState(false);
  const [surgeryEditIdx, setSurgeryEditIdx] = useState<number | null>(null);
  const [surgeryForm, setSurgeryForm] = useState<SurgeryPackageItem>({
    id: '',
    code: 'PACKAGE 1',
    title: '',
    description: '',
    inclusions: [''],
    totalItemsCount: 10,
    sections: [
      { title: 'Before Surgery — At Home', note: '', items: [''] },
      { title: 'Surgery', note: '', items: [''] },
      { title: 'After Surgery', note: '', items: [''] },
    ],
    priceDisplay: 'Starting ₹6,999',
    subnote: '',
  });

  // Testimonial Modal
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [testimonialEditIdx, setTestimonialEditIdx] = useState<number | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<TestimonialItem>({
    id: '',
    name: '',
    role: 'Pet Parent',
    score: '5',
    text: '',
    avatar: '/ankita.webp',
  });

  // Contact Form State
  const [contactForm, setContactForm] = useState<ContactConfig>({ ...contactConfig });
  const [contactMsg, setContactMsg] = useState('');

  // Google Sheet State
  const [sheetUrlInput, setSheetUrlInput] = useState(googleSheetUrl);
  const [sheetMsg, setSheetMsg] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [testSheetLoading, setTestSheetLoading] = useState(false);
  const [testSheetMsg, setTestSheetMsg] = useState('');

  // Password & Email Security Form
  const [adminEmail, setAdminEmail] = useState(contactConfig.email || 'contact@deepetservices.com');
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityMsg, setSecurityMsg] = useState('');

  // Keep forms synced when props update
  useEffect(() => { setHeroForm({ ...heroConfig }); }, [heroConfig]);
  useEffect(() => { setContactForm({ ...contactConfig }); }, [contactConfig]);
  useEffect(() => { setRehabForm({ ...rehabConfig }); }, [rehabConfig]);
  useEffect(() => { setSheetUrlInput(googleSheetUrl); }, [googleSheetUrl]);
  useEffect(() => { setAdminEmail(contactConfig.email || 'contact@deepetservices.com'); }, [contactConfig.email]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-lime-400" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  // Filter Leads for Dashboard
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.consultationCode && l.consultationCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      l.petType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLeads = leads.length;
  const activeLeads = leads.filter((l) => l.status === 'active').length;
  const completedLeads = leads.filter((l) => l.status === 'completed').length;
  const cancelledLeads = leads.filter((l) => l.status === 'cancelled').length;

  // Save Hero Config
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroConfig(heroForm);
    setHeroMsg('Hero section content updated successfully!');
    setTimeout(() => setHeroMsg(''), 3000);
  };

  // Save Contact Config
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactConfig(contactForm);
    setContactMsg('WhatsApp & Call contact details updated!');
    setTimeout(() => setContactMsg(''), 3000);
  };

  // Save Rehab Config
  const handleSaveRehab = (e: React.FormEvent) => {
    e.preventDefault();
    updateRehabConfig(rehabForm);
    setRehabMsg('Recovery & Rehabilitation section updated!');
    setTimeout(() => setRehabMsg(''), 3000);
  };

  const GOOGLE_APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create Header Row if sheet is empty or missing headers
    if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() === "") {
      var headers = [
        "Consultation Code",
        "Customer Name",
        "Phone Number",
        "Pet Type",
        "Category",
        "Service / Package",
        "Price (₹)",
        "City",
        "Pincode",
        "Message / Preferred Date",
        "Submission Timestamp"
      ];
      sheet.appendRow(headers);
      
      // Style headers: Bold text, dark background, white font, frozen top row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1e293b");
      headerRange.setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }
    
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.consultationCode || '',
      data.name || '',
      data.phone || '',
      data.petType || '',
      data.category || '',
      data.subTest || '',
      data.price || '',
      data.city || '',
      data.pincode || '',
      data.message || (data.date ? 'Preferred date: ' + data.date : ''),
      new Date().toLocaleString()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  // Save Google Sheet URL
  const handleSaveSheetUrl = (e: React.FormEvent) => {
    e.preventDefault();
    updateGoogleSheetUrl(sheetUrlInput);
    setSheetMsg('Google Sheet integration URL saved!');
    setTimeout(() => setSheetMsg(''), 3000);
  };

  // Send Test Lead to Google Sheet Webhook
  const handleTestSheetWebhook = async () => {
    const targetUrl = sheetUrlInput.trim() || googleSheetUrl;
    if (!targetUrl) {
      alert('Please enter and save your Google App Script Webhook URL first.');
      return;
    }

    setTestSheetLoading(true);
    setTestSheetMsg('');

    try {
      await fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultationCode: `DEPE-TEST-${Math.floor(100 + Math.random() * 900)}`,
          timestamp: new Date().toISOString(),
          name: 'Test Customer (Admin Test)',
          phone: '+91 9876543210',
          petType: 'Dog',
          category: 'Preventive Wellness',
          subTest: 'Wellness 360° — Adult Pet',
          price: 4999,
          city: 'Delhi NCR',
          pincode: '110001',
          date: new Date().toISOString().slice(0, 10),
          message: 'This is a test submission sent from the Admin Panel.',
          status: 'Active',
        }),
      });

      setTestSheetMsg('✅ Test lead dispatched to your Google Sheet! Please open your Google Sheet to verify headers and data.');
    } catch (err: any) {
      setTestSheetMsg(`❌ Error sending test lead: ${err.message || 'Network error'}`);
    } finally {
      setTestSheetLoading(false);
    }
  };

  // Save Admin Password & Admin Email
  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('deepet_admin_password') || 'admin123';
    
    if (currentPasswordInput !== storedPass) {
      alert('Current password is incorrect. Please enter your valid current password to confirm changes.');
      return;
    }

    if (newPassword) {
      if (newPassword.length < 4) {
        alert('New password must be at least 4 characters long');
        return;
      }
      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
      }
      localStorage.setItem('deepet_admin_password', newPassword.trim());
    }

    if (adminEmail && adminEmail !== contactConfig.email) {
      updateContactConfig({ ...contactConfig, email: adminEmail });
    }

    setSecurityMsg('Security settings (Admin Email & Password) updated successfully!');
    setCurrentPasswordInput('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSecurityMsg(''), 3000);
  };

  // Preventive Wellness Package Handlers
  const handleSavePrevPackage = () => {
    if (!prevPkgForm.title.trim()) {
      alert('Please enter package title');
      return;
    }
    const pkgToSave: PreventiveWellnessPackage = {
      ...prevPkgForm,
      id: prevPkgEditIdx !== null ? preventiveWellnessPackages[prevPkgEditIdx].id : `pkg-${Date.now()}`,
      inclusions: prevPkgForm.inclusions.filter(Boolean),
      allInclusions: prevPkgForm.allInclusions.filter(Boolean),
      totalItemsCount: prevPkgForm.allInclusions.filter(Boolean).length,
    };

    let updated: PreventiveWellnessPackage[];
    if (prevPkgEditIdx !== null) {
      updated = [...preventiveWellnessPackages];
      updated[prevPkgEditIdx] = pkgToSave;
    } else {
      updated = [...preventiveWellnessPackages, pkgToSave];
    }

    updatePreventiveWellnessPackages(updated);
    setShowPrevPkgModal(false);
    setPrevPkgEditIdx(null);
  };

  const handleDeletePrevPackage = (idx: number) => {
    if (confirm('Delete this preventive wellness package?')) {
      const updated = preventiveWellnessPackages.filter((_, i) => i !== idx);
      updatePreventiveWellnessPackages(updated);
    }
  };

  // Category & Sub-test Handlers
  const currentTests = activePetTab === 'Dog' ? dogTests : catTests;

  // Contact Form Category Handlers
  const handleSaveContactCategories = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateContactCategories(contactCategories);
    setContactCatMsg('Contact Form Categories & Sub-categories saved & live on site!');
    setTimeout(() => setContactCatMsg(''), 3000);
  };

  const handleAddContactCategory = () => {
    if (!newContactCatName.trim()) return;
    const updated = [
      ...contactCategories,
      {
        id: 'cat-' + Date.now(),
        categoryName: newContactCatName.trim(),
        options: [],
      },
    ];
    updateContactCategories(updated);
    setNewContactCatName('');
    setShowAddContactCatModal(false);
  };

  const handleDeleteContactCategory = (cIdx: number) => {
    if (confirm('Delete this contact form category and all its sub-options?')) {
      const updated = contactCategories.filter((_, i) => i !== cIdx);
      updateContactCategories(updated);
    }
  };

  const handleAddContactOption = () => {
    if (selectedContactCatIdx < 0 || !newOptionTitle.trim()) return;
    const updated = [...contactCategories];
    const targetCat = { ...updated[selectedContactCatIdx] };
    targetCat.options = [...(targetCat.options || []), newOptionTitle.trim()];
    updated[selectedContactCatIdx] = targetCat;
    updateContactCategories(updated);
    setNewOptionTitle('');
    setShowAddOptionModal(false);
  };

  const handleDeleteContactOption = (cIdx: number, oIdx: number) => {
    const updated = [...contactCategories];
    const targetCat = { ...updated[cIdx] };
    targetCat.options = (targetCat.options || []).filter((_, i) => i !== oIdx);
    updated[cIdx] = targetCat;
    updateContactCategories(updated);
  };



  // Preventive Package Handlers - Now managed by handleSavePrevPackage / handleDeletePrevPackage


  // Blood Check Card Handlers
  const handleSaveBloodCard = () => {
    if (!bloodForm.title.trim() || !bloodForm.price) {
      alert('Please fill in card title and price');
      return;
    }
    const cardToSave: BloodCheckCard = {
      ...bloodForm,
      id: bloodEditIdx !== null ? bloodCheckCards[bloodEditIdx].id : `blood-${Date.now()}`,
      priceDisplay: bloodForm.priceDisplay || `₹${bloodForm.price.toLocaleString()}`,
      features: bloodForm.features.filter(Boolean),
    };

    let updated: BloodCheckCard[];
    if (bloodEditIdx !== null) {
      updated = [...bloodCheckCards];
      updated[bloodEditIdx] = cardToSave;
    } else {
      updated = [...bloodCheckCards, cardToSave];
    }

    updateBloodCheckCards(updated);
    setShowBloodModal(false);
    setBloodEditIdx(null);
  };

  const handleDeleteBloodCard = (idx: number) => {
    if (confirm('Delete this blood check card?')) {
      const updated = bloodCheckCards.filter((_, i) => i !== idx);
      updateBloodCheckCards(updated);
    }
  };

  // Surgery Package Handlers
  const handleSaveSurgeryPackage = () => {
    if (!surgeryForm.title.trim()) {
      alert('Please enter surgery package title');
      return;
    }
    const pkgToSave: SurgeryPackageItem = {
      ...surgeryForm,
      id: surgeryEditIdx !== null ? surgeryPackages[surgeryEditIdx].id : `surg-${Date.now()}`,
      inclusions: surgeryForm.inclusions.filter(Boolean),
      totalItemsCount: surgeryForm.sections.reduce((acc, s) => acc + s.items.length, 0),
    };

    let updated: SurgeryPackageItem[];
    if (surgeryEditIdx !== null) {
      updated = [...surgeryPackages];
      updated[surgeryEditIdx] = pkgToSave;
    } else {
      updated = [...surgeryPackages, pkgToSave];
    }

    updateSurgeryPackages(updated);
    setShowSurgeryModal(false);
    setSurgeryEditIdx(null);
  };

  const handleDeleteSurgeryPackage = (idx: number) => {
    if (confirm('Delete this surgery package?')) {
      const updated = surgeryPackages.filter((_, i) => i !== idx);
      updateSurgeryPackages(updated);
    }
  };

  // Testimonials Handlers
  const handleSaveTestimonial = () => {
    if (!testimonialForm.name.trim() || !testimonialForm.text.trim()) {
      alert('Please fill in name and testimonial text');
      return;
    }
    const itemToSave: TestimonialItem = {
      ...testimonialForm,
      id: testimonialEditIdx !== null ? testimonials[testimonialEditIdx].id : `t-${Date.now()}`,
    };

    let updated: TestimonialItem[];
    if (testimonialEditIdx !== null) {
      updated = [...testimonials];
      updated[testimonialEditIdx] = itemToSave;
    } else {
      updated = [...testimonials, itemToSave];
    }

    updateTestimonials(updated);
    setShowTestimonialModal(false);
    setTestimonialEditIdx(null);
  };

  const handleDeleteTestimonial = (idx: number) => {
    if (confirm('Delete this testimonial?')) {
      const updated = testimonials.filter((_, i) => i !== idx);
      updateTestimonials(updated);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('No consultation leads to export.');
      return;
    }
    const headers = ['Consultation Code', 'Timestamp', 'Name', 'Phone', 'Pet Type', 'Category', 'Sub Test', 'Price', 'City', 'Pincode', 'Status', 'Message'];
    const csvRows = [headers.join(',')];

    leads.forEach((l) => {
      const row = [
        `"${l.consultationCode || ''}"`,
        `"${l.timestamp || ''}"`,
        `"${l.name.replace(/"/g, '""')}"`,
        `"${l.phone}"`,
        `"${l.petType}"`,
        `"${(l.category || '').replace(/"/g, '""')}"`,
        `"${(l.subTest || '').replace(/"/g, '""')}"`,
        `"${l.price || ''}"`,
        `"${(l.city || '').replace(/"/g, '""')}"`,
        `"${l.pincode || ''}"`,
        `"${l.status}"`,
        `"${(l.message || '').replace(/"/g, '""')}"`,
      ];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DeePet_Consultations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const navItems = [
    { id: 'dashboard', label: 'Consultations', icon: BarChart3, badge: activeLeads > 0 ? activeLeads : null },
    { id: 'email', label: 'Email Notifications', icon: Mail },
    { id: 'home', label: 'Hero & Catalog', icon: Home },
    { id: 'packages', label: 'Preventive Wellness', icon: Package },
    { id: 'blood', label: 'Blood Check Cards', icon: Droplet },
    { id: 'rehab', label: 'Rehab Section', icon: Activity },
    { id: 'surgery', label: 'Surgery Packages', icon: Stethoscope },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contacts', label: 'WhatsApp & Calls', icon: PhoneCall },
    { id: 'settings', label: 'Google Sheet', icon: LinkIcon },
    { id: 'security', label: 'Security', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      
      {/* TOP BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <a href="/" target="_blank" className="flex items-center gap-2 group">
            <img src="/deepetservices-logo.webp" alt="DeePet Admin" className="h-9 w-auto object-contain" />
            <span className="bg-lime-500/10 text-lime-800 border border-lime-500/20 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
              Admin Portal
            </span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
          >
            <span>Live Site</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200/80 transition-transform lg:static lg:translate-x-0 pt-16 lg:pt-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[11px] font-black uppercase text-slate-400 tracking-wider">
              Management &amp; Sections
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-lime-400 text-slate-950 shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-100/70 space-y-8">

          {/* EMAIL NOTIFICATIONS SECTION */}
          {activeTab === 'email' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Email Notification Settings
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                  Configure the email address where all consultation requests and lead bookings will be delivered.
                </p>
              </div>

              {emailSaveMsg && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{emailSaveMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveEmailSettings} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                
                {/* RECIPIENT EMAIL */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    Notification Recipient Email Address
                  </label>
                  <p className="text-xs text-slate-500 mb-2 font-medium">
                    All consultation inquiries and lead bookings submitted by pet parents will be sent to this email address. You can update this email anytime.
                  </p>
                  <input
                    type="email"
                    required
                    value={emailForm.recipientEmail}
                    onChange={(e) => setEmailForm({ ...emailForm, recipientEmail: e.target.value })}
                    placeholder="e.g. Sayedadnanali905@gmail.com"
                    className="w-full max-w-md px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 transition-all"
                  />
                </div>

                {/* SENDER DISPLAY NAME */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    Sender Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={emailForm.senderName}
                    onChange={(e) => setEmailForm({ ...emailForm, senderName: e.target.value })}
                    placeholder="e.g. DeePets Notifications"
                    className="w-full max-w-md px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 transition-all"
                  />
                </div>

                {/* ENABLE / DISABLE TOGGLE */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="emailEnabled"
                    checked={emailForm.enabled}
                    onChange={(e) => setEmailForm({ ...emailForm, enabled: e.target.checked })}
                    className="w-5 h-5 text-lime-500 rounded border-slate-300 focus:ring-lime-500 cursor-pointer"
                  />
                  <label htmlFor="emailEnabled" className="text-sm font-bold text-slate-800 cursor-pointer">
                    Enable email notifications for new consultation bookings
                  </label>
                </div>

                {/* SAVE BUTTON & TEST EMAIL */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-lime-400 hover:bg-lime-500 text-slate-950 font-black rounded-xl text-sm shadow-xs transition-all cursor-pointer"
                  >
                    Save Email Settings
                  </button>

                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    disabled={testEmailLoading}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-lime-400" />
                    <span>{testEmailLoading ? 'Sending Test...' : 'Send Test Email Now'}</span>
                  </button>
                </div>

                {testEmailMsg && (
                  <div className={`p-4 rounded-xl text-sm font-bold ${testEmailMsg.startsWith('✅') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                    {testEmailMsg}
                  </div>
                )}
              </form>

              {/* CURRENT RESEND API & DOMAIN INFORMATION CARD */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-3">
                <div className="flex items-center gap-2 text-lime-400 font-bold text-sm">
                  <Mail className="w-5 h-5" />
                  <span>Active Email Delivery Setup</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 font-mono">
                  <p>• Sender Email: <strong className="text-white">contact@deepetservices.com</strong></p>
                  <p>• Active Recipient Email: <strong className="text-white">{emailSettings?.recipientEmail || 'Sayedadnanali905@gmail.com'}</strong></p>
                  <p>• Delivery Engine: <strong className="text-white">Resend API (Verified Domain)</strong></p>
                </div>
              </div>
            </div>
          )}

          {/* 1. DASHBOARD / CONSULTATIONS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Consultation Requests &amp; Leads
                  </h1>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                    All pet parent consultation inquiries, callback requests, and bookings.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      setIsRefreshingLeads(true);
                      await refreshLeads();
                      setTimeout(() => setIsRefreshingLeads(false), 500);
                    }}
                    disabled={isRefreshingLeads}
                    className="flex items-center gap-1.5 bg-lime-400 hover:bg-lime-500 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isRefreshingLeads ? 'animate-spin' : ''}`} />
                    <span>{isRefreshingLeads ? 'Syncing...' : 'Sync DB'}</span>
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* METRICS CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                  <span className="text-slate-500 text-xs font-bold block">Total Consultations</span>
                  <span className="text-3xl font-black text-slate-900 mt-1 block">{totalLeads}</span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                  <span className="text-amber-600 text-xs font-bold block">Active / Pending</span>
                  <span className="text-3xl font-black text-amber-600 mt-1 block">{activeLeads}</span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                  <span className="text-emerald-600 text-xs font-bold block">Completed</span>
                  <span className="text-3xl font-black text-emerald-600 mt-1 block">{completedLeads}</span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                  <span className="text-red-600 text-xs font-bold block">Cancelled</span>
                  <span className="text-3xl font-black text-red-600 mt-1 block">{cancelledLeads}</span>
                </div>
              </div>

              {/* SEARCH & FILTERS */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone, code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
                  {(['all', 'active', 'completed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        statusFilter === st
                          ? 'bg-lime-400 text-slate-950 font-extrabold shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* CONSULTATIONS TABLE */}
              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100/80 text-slate-600 text-[11px] font-black uppercase border-b border-slate-200">
                      <tr>
                        <th className="p-4">Code / Date</th>
                        <th className="p-4">Pet Parent</th>
                        <th className="p-4">Pet &amp; Service</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                            No consultation requests found.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead, idx) => {
                          const displayCode = lead.consultationCode || (lead as any).consultation_code || `DEPE-${String(idx + 1).padStart(2, '0')}`;
                          return (
                          <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-4 font-mono">
                              <span className="font-extrabold text-lime-700 block">{displayCode}</span>
                              <span className="text-[10px] text-slate-500 block mt-0.5">
                                {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : ''}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="font-bold text-slate-900 block">{lead.name}</span>
                              <a href={`tel:${lead.phone}`} className="text-slate-500 hover:text-lime-700 font-medium">
                                +91 {lead.phone}
                              </a>
                            </td>
                            <td className="p-4">
                              <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase mb-1">
                                {lead.petType}
                              </span>
                              <span className="block font-semibold text-slate-800">{lead.subTest || lead.category}</span>
                              {lead.price && <span className="text-[11px] text-lime-700 font-bold">₹{lead.price}</span>}
                            </td>
                            <td className="p-4">
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                                  lead.status === 'completed'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : lead.status === 'cancelled'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                              >
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <a
                                href={`https://api.whatsapp.com/send?phone=${lead.phone.replace(/[^0-9]/g, '').length === 10 ? '91' + lead.phone.replace(/[^0-9]/g, '') : lead.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent([
                                  'Hi DeePet Services, I want to request a callback:',
                                  `• Pet: ${lead.petType || 'Pet'}`,
                                  `• Package of interest: ${lead.subTest || lead.category || 'Consultation'}`,
                                  `• Name: ${lead.name}`,
                                  `• Phone / WhatsApp: ${lead.phone}`,
                                ].join('\n'))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
                                title="WhatsApp Parent"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`tel:${lead.phone}`}
                                className="inline-block p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 cursor-pointer"
                                title="Call Parent"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. HERO & CATALOG EDITOR */}
          {activeTab === 'home' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Hero Section &amp; Test Catalog Editor
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                  Edit main headline, subtitle, and manage categories/sub-tests used in the booking form.
                </p>
              </div>

              {/* HERO CONTENT FORM */}
              <form onSubmit={handleSaveHero} className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-4 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-lime-600" />
                  <span>Hero Section Content</span>
                </h2>

                {heroMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-bold">
                    {heroMsg}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Headline</label>
                  <input
                    type="text"
                    value={heroForm.headline}
                    onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subtitle</label>
                  <textarea
                    rows={3}
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer shadow-xs"
                >
                  Save Hero Section Content
                </button>
              </form>

              {/* CONTACT FORM TEST CATEGORIES & SUB-CATEGORIES EDITOR */}
              <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Menu className="w-5 h-5 text-lime-600" />
                      <span>Contact Form Test Categories &amp; Sub-categories</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Manage categories and sub-category options rendered directly inside the live booking form dropdown.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddContactCatModal(true)}
                    className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Category</span>
                  </button>
                </div>

                {contactCatMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{contactCatMsg}</span>
                  </div>
                )}

                {/* CONTACT CATEGORY CARDS */}
                <div className="space-y-4">
                  {(contactCategories || []).map((cat, cIdx) => {
                    const opts = Array.isArray(cat?.options) ? cat.options : [];
                    return (
                      <div key={cat.id || cIdx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                          <div>
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-0.5">Category {cIdx + 1}</span>
                            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                              <span>{cat?.categoryName || 'Untitled Category'}</span>
                              <span className="text-xs text-slate-500 font-normal">({opts.length} options)</span>
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedContactCatIdx(cIdx);
                                setShowAddOptionModal(true);
                              }}
                              className="bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer border border-slate-200 shadow-2xs"
                            >
                              <Plus className="w-3.5 h-3.5 text-lime-600" />
                              <span>Add Sub-category / Option</span>
                            </button>
                            <button
                              onClick={() => handleDeleteContactCategory(cIdx)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-200 cursor-pointer"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* SUB-CATEGORY OPTIONS LIST */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                          {opts.map((opt, oIdx) => (
                            <div key={oIdx} className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
                              <span className="font-semibold text-xs text-slate-800">{opt}</span>
                              <button
                                onClick={() => handleDeleteContactOption(cIdx, oIdx)}
                                className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                                title="Remove option"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                          {opts.length === 0 && (
                            <div className="col-span-full py-3 text-center text-slate-500 text-xs font-medium">
                              No sub-categories added yet. Click &quot;Add Sub-category / Option&quot; above.
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSaveContactCategories}
                    className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer shadow-xs"
                  >
                    Save Contact Form Categories &amp; Options
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. PREVENTIVE WELLNESS PACKAGES */}
          {activeTab === 'packages' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Preventive Wellness Packages
                  </h1>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                    Add, edit, or delete Preventive Wellness package cards live on the front-end.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setPrevPkgEditIdx(null);
                    setPrevPkgForm({
                      id: '',
                      code: `PACKAGE ${preventiveWellnessPackages.length + 1}`,
                      title: '',
                      tagline: '',
                      subtitle: '',
                      highlight: '',
                      inclusions: ['Home vet examination', 'Weight & growth monitoring'],
                      totalItemsCount: 15,
                      allInclusions: ['Full physical exam', 'CBC & Blood Glucose'],
                      priceDisplay: 'Starting ₹2,999',
                      subnote: '',
                    });
                    setShowPrevPkgModal(true);
                  }}
                  className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Package Card</span>
                </button>
              </div>

              {/* PREVENTIVE PACKAGES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(preventiveWellnessPackages || []).map((pkg, idx) => (
                  <div key={pkg?.id || idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs relative">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-purple-50 text-[#653bf7] border border-purple-100">
                          {pkg?.code || 'PACKAGE'}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-900 font-heading">{pkg?.title || 'Package'}</h3>
                      {pkg?.tagline && <p className="text-xs text-slate-500 italic mt-0.5">{pkg.tagline}</p>}
                      {pkg?.subtitle && <p className="text-xs text-slate-500 font-medium mt-0.5">{pkg.subtitle}</p>}

                      {pkg?.highlight && (
                        <div className="bg-slate-50 text-slate-700 text-xs p-3 rounded-xl mt-3 border border-slate-200 font-medium">
                          {pkg.highlight}
                        </div>
                      )}

                      <p className="text-base font-black text-lime-700 font-heading mt-3">{pkg?.priceDisplay}</p>
                      {pkg?.subnote && <p className="text-[11px] text-slate-500">{pkg.subnote}</p>}

                      <div className="mt-4">
                        <span className="text-[11px] font-bold text-slate-500 block mb-1">Checkmark Inclusions:</span>
                        <ul className="space-y-1 text-xs text-slate-700">
                          {(pkg?.inclusions || []).map((inc, iIdx) => (
                            <li key={iIdx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-500 block mb-1">Expanded Details ({pkg?.totalItemsCount || (pkg?.allInclusions || []).length} items):</span>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {(pkg?.allInclusions || []).map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-1.5">
                              <span className="text-lime-600 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setPrevPkgEditIdx(idx);
                          setPrevPkgForm({
                            id: pkg.id || '',
                            code: pkg.code || 'PACKAGE 1',
                            title: pkg.title || '',
                            tagline: pkg.tagline || '',
                            subtitle: pkg.subtitle || '',
                            highlight: pkg.highlight || '',
                            inclusions: (pkg.inclusions || []).length > 0 ? [...pkg.inclusions] : [''],
                            totalItemsCount: pkg.totalItemsCount || (pkg.allInclusions || []).length,
                            allInclusions: (pkg.allInclusions || []).length > 0 ? [...pkg.allInclusions] : [''],
                            priceDisplay: pkg.priceDisplay || '',
                            subnote: pkg.subnote || '',
                          });
                          setShowPrevPkgModal(true);
                        }}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeletePrevPackage(idx)}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. COMPLETE BLOOD HEALTH CHECK CARDS */}
          {activeTab === 'blood' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Complete Blood Health Check Cards
                  </h1>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                    Add, edit, or delete Blood Check cards (Basic, Advanced, Premium).
                  </p>
                </div>

                <button
                  onClick={() => {
                    setBloodEditIdx(null);
                    setBloodForm({
                      id: '',
                      title: '',
                      price: 1999,
                      priceDisplay: '₹1,999',
                      isPopular: false,
                      popularBadge: '',
                      description: '',
                      features: ['CBC', 'LFT', 'KFT'],
                      buttonText: 'Book Now',
                    });
                    setShowBloodModal(true);
                  }}
                  className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Blood Check Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bloodCheckCards.map((card, idx) => (
                  <div key={card.id || idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs">
                    <div>
                      {card.isPopular && (
                        <span className="inline-block px-2.5 py-0.5 rounded bg-lime-400 text-slate-950 text-[10px] font-black uppercase mb-2">
                          {card.popularBadge || 'MOST POPULAR'}
                        </span>
                      )}
                      <h3 className="text-2xl font-extrabold text-slate-900 font-heading">{card.title}</h3>
                      <p className="text-2xl font-black text-lime-700 font-heading mt-1">{card.priceDisplay || `₹${card.price}`}</p>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">{card.description}</p>

                      <ul className="mt-4 space-y-2 text-xs text-slate-700">
                        {card.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setBloodEditIdx(idx);
                          setBloodForm({ ...card });
                          setShowBloodModal(true);
                        }}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteBloodCard(idx)}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. RECOVERY & REHABILITATION */}
          {activeTab === 'rehab' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Recovery &amp; Rehabilitation Section
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                  Edit all titles, description, inclusions, and program list items.
                </p>
              </div>

              <form onSubmit={handleSaveRehab} className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-4 shadow-xs">
                {rehabMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-bold">
                    {rehabMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Section Tag</label>
                    <input
                      type="text"
                      value={rehabForm.tag}
                      onChange={(e) => setRehabForm({ ...rehabForm, tag: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Package Code</label>
                    <input
                      type="text"
                      value={rehabForm.code}
                      onChange={(e) => setRehabForm({ ...rehabForm, code: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Main Section Title</label>
                  <input
                    type="text"
                    value={rehabForm.title}
                    onChange={(e) => setRehabForm({ ...rehabForm, title: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Package Title</label>
                  <input
                    type="text"
                    value={rehabForm.packageTitle}
                    onChange={(e) => setRehabForm({ ...rehabForm, packageTitle: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subtitle / Description</label>
                  <textarea
                    rows={3}
                    value={rehabForm.subtitle}
                    onChange={(e) => setRehabForm({ ...rehabForm, subtitle: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Price Numeric</label>
                    <input
                      type="number"
                      value={rehabForm.price}
                      onChange={(e) => setRehabForm({ ...rehabForm, price: Number(e.target.value) })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Price Display Text</label>
                    <input
                      type="text"
                      value={rehabForm.priceDisplay}
                      onChange={(e) => setRehabForm({ ...rehabForm, priceDisplay: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* INCLUSIONS LIST */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Assessment Inclusions List</label>
                  {rehabForm.inclusions.map((inc, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={inc}
                        onChange={(e) => {
                          const updated = [...rehabForm.inclusions];
                          updated[i] = e.target.value;
                          setRehabForm({ ...rehabForm, inclusions: updated });
                        }}
                        className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = rehabForm.inclusions.filter((_, idx) => idx !== i);
                          setRehabForm({ ...rehabForm, inclusions: updated });
                        }}
                        className="text-red-600 p-2 cursor-pointer hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setRehabForm({ ...rehabForm, inclusions: [...rehabForm.inclusions, ''] })}
                    className="text-xs font-bold text-lime-700 flex items-center gap-1 cursor-pointer mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Inclusion
                  </button>
                </div>

                {/* PROGRAM ITEMS */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Program Details (Full Collapsible List)</label>
                  {rehabForm.allItems.map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...rehabForm.allItems];
                          updated[i] = e.target.value;
                          setRehabForm({ ...rehabForm, allItems: updated });
                        }}
                        className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = rehabForm.allItems.filter((_, idx) => idx !== i);
                          setRehabForm({ ...rehabForm, allItems: updated });
                        }}
                        className="text-red-600 p-2 cursor-pointer hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setRehabForm({ ...rehabForm, allItems: [...rehabForm.allItems, ''] })}
                    className="text-xs font-bold text-lime-700 flex items-center gap-1 cursor-pointer mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Program Detail Item
                  </button>
                </div>

                <button
                  type="submit"
                  className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-6 py-3 rounded-xl font-extrabold text-xs transition-all cursor-pointer shadow-xs"
                >
                  Save Rehab Section Content
                </button>
              </form>
            </div>
          )}

          {/* 6. SURGERY CARE PACKAGES */}
          {activeTab === 'surgery' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Surgery Care Packages
                  </h1>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                    Add, edit, or delete cards in the current surgery care format and structure.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSurgeryEditIdx(null);
                    setSurgeryForm({
                      id: '',
                      code: `PACKAGE ${surgeryPackages.length + 1}`,
                      title: '',
                      description: '',
                      inclusions: ['Pre-anesthetic assessment', 'Surgery', 'Post-op care'],
                      totalItemsCount: 10,
                      sections: [
                        { title: 'Before Surgery', note: 'Pre-op checks', items: ['Vet exam'] },
                        { title: 'Surgery', note: 'Sterile procedure', items: ['Procedure', 'Anaesthesia'] },
                        { title: 'After Surgery', note: 'Recovery', items: ['Post-op home visit'] },
                      ],
                      priceDisplay: 'Starting ₹6,999',
                      subnote: 'Boarding facility charged extra.',
                    });
                    setShowSurgeryModal(true);
                  }}
                  className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Surgery Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {surgeryPackages.map((pkg, idx) => (
                  <div key={pkg.id || idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded bg-purple-50 text-[#653bf7] border border-purple-100 text-[10px] font-black uppercase mb-2">
                        {pkg.code}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 font-heading">{pkg.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{pkg.description}</p>
                      <p className="text-lg font-black text-lime-700 font-heading mt-2">{pkg.priceDisplay}</p>

                      <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                        {(pkg?.inclusions || []).map((inc, iIdx) => (
                          <li key={iIdx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setSurgeryEditIdx(idx);
                          setSurgeryForm({ ...pkg });
                          setShowSurgeryModal(true);
                        }}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteSurgeryPackage(idx)}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. TESTIMONIALS SECTION */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Testimonial Section Editor
                  </h1>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                    Add, edit, or delete pet parent review stories.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setTestimonialEditIdx(null);
                    setTestimonialForm({
                      id: '',
                      name: '',
                      role: 'Pet Parent',
                      score: '5',
                      text: '',
                      avatar: '/ankita.webp',
                    });
                    setShowTestimonialModal(true);
                  }}
                  className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, idx) => (
                  <div key={t.id || idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img src={t.avatar || '/ankita.webp'} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-lime-400/50" />
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">{t.name}</h4>
                          <span className="text-[11px] text-slate-500 block">{t.role}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-500 gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        ))}
                        <span className="text-xs font-bold text-slate-800 ml-1">{t.score}</span>
                      </div>

                      <p className="text-xs text-slate-600 italic leading-relaxed">&quot;{t.text}&quot;</p>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setTestimonialEditIdx(idx);
                          setTestimonialForm({ ...t });
                          setShowTestimonialModal(true);
                        }}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(idx)}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. WHATSAPP & CALL SETTINGS */}
          {activeTab === 'contacts' && (
            <div className="space-y-6 animate-fade-in max-w-2xl">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  WhatsApp &amp; Call Settings
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                  Configure primary phone numbers and WhatsApp links used across CTAs and header buttons.
                </p>
              </div>

              <form onSubmit={handleSaveContact} className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-4 shadow-xs">
                {contactMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-bold">
                    {contactMsg}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Primary Phone Number</label>
                  <input
                    type="text"
                    value={contactForm.primaryPhone}
                    onChange={(e) => setContactForm({ ...contactForm, primaryPhone: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={contactForm.whatsappNumber}
                    onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Secondary Phone / Emergency</label>
                  <input
                    type="text"
                    value={contactForm.secondaryPhone}
                    onChange={(e) => setContactForm({ ...contactForm, secondaryPhone: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer shadow-xs"
                >
                  Save WhatsApp &amp; Phone Contact Details
                </button>
              </form>
            </div>
          )}

          {/* 9. GOOGLE SHEET INTEGRATION */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
                  <FileSpreadsheet className="w-7 h-7 text-lime-600" />
                  <span>Google Sheet Integration</span>
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                  Connect your Google Sheet via Apps Script Webhook to automatically receive all incoming consultation leads in real-time with proper table headers.
                </p>
              </div>

              {/* STEP BY STEP SETUP GUIDE */}
              <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-5 shadow-xs">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-lime-600" />
                    <span>Step-by-Step Google Sheet Setup Instructions</span>
                  </h2>
                  <button
                    type="button"
                    onClick={handleCopyScript}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      copiedScript 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                    }`}
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedScript ? 'Copied to Clipboard! 🎉' : 'Copy Apps Script Code'}</span>
                  </button>
                </div>

                <div className="space-y-3.5 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-lime-500/10 text-lime-800 font-extrabold flex items-center justify-center shrink-0 text-[11px] border border-lime-500/20">1</span>
                    <p><strong className="text-slate-900">Create a Google Sheet:</strong> Open <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-lime-700 underline font-bold">sheets.new</a> (or use your existing sheet). If the sheet is brand new or missing headers, the script below will automatically create, format, and freeze the header row for you!</p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-lime-500/10 text-lime-800 font-extrabold flex items-center justify-center shrink-0 text-[11px] border border-lime-500/20">2</span>
                    <p><strong className="text-slate-900">Open Script Editor:</strong> In your Google Sheet, click <strong>Extensions → Apps Script</strong> from the top navigation menu.</p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-lime-500/10 text-lime-800 font-extrabold flex items-center justify-center shrink-0 text-[11px] border border-lime-500/20">3</span>
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1.5">
                        <p><strong className="text-slate-900">Paste Apps Script Code:</strong> Erase everything inside <code className="text-lime-700 font-mono">Code.gs</code> and paste this exact script:</p>
                        <button
                          type="button"
                          onClick={handleCopyScript}
                          className="text-[11px] font-bold text-lime-700 hover:text-lime-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedScript ? 'Copied!' : 'Copy Code'}</span>
                        </button>
                      </div>
                      <pre className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed select-all">
{GOOGLE_APPS_SCRIPT_CODE}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-lime-500/10 text-lime-800 font-extrabold flex items-center justify-center shrink-0 text-[11px] border border-lime-500/20">4</span>
                    <p><strong className="text-slate-900">Deploy Web App:</strong> Click <strong>Deploy → New deployment</strong>. Click the gear icon next to "Select type", select <em>Web app</em>. Set <strong>Execute as: Me</strong> and <strong>Who has access: Anyone</strong>. Click <em>Deploy</em>, Authorize Access, and copy the Web App URL.</p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-lime-500/10 text-lime-800 font-extrabold flex items-center justify-center shrink-0 text-[11px] border border-lime-500/20">5</span>
                    <p><strong className="text-slate-900">Save &amp; Test:</strong> Paste the copied Web App URL into the form below, click <strong>Save Google Sheet Webhook URL</strong>, and click <strong>Send Test Lead</strong> to verify!</p>
                  </div>
                </div>
              </div>

              {/* COLUMN HEADERS REFERENCE TABLE */}
              <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-lime-600" />
                  <h2 className="text-sm font-bold text-slate-900">
                    Google Sheet Column Structure &amp; Headings Reference
                  </h2>
                </div>
                <p className="text-xs text-slate-500">
                  When leads are submitted, each piece of data is placed into the designated column as mapped below:
                </p>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-white font-bold">
                      <tr>
                        <th className="py-2.5 px-3">Col</th>
                        <th className="py-2.5 px-3">Header Name</th>
                        <th className="py-2.5 px-3">Data Field</th>
                        <th className="py-2.5 px-3">Example Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700 bg-white">
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">A</td>
                        <td className="py-2 px-3 font-bold text-slate-900">Consultation Code</td>
                        <td className="py-2 px-3 text-slate-500">Unique ID</td>
                        <td className="py-2 px-3 font-mono text-lime-700">DEPE-30</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">B</td>
                        <td className="py-2 px-3 font-bold text-slate-900">Customer Name</td>
                        <td className="py-2 px-3 text-slate-500">Name</td>
                        <td className="py-2 px-3">Adnan Ali</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">C</td>
                        <td className="py-2 px-3 font-bold text-slate-900">Phone Number</td>
                        <td className="py-2 px-3 text-slate-500">Contact Number</td>
                        <td className="py-2 px-3 font-mono">+91 9889989899</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">D</td>
                        <td className="py-2 px-3 font-bold text-slate-900">Pet Type</td>
                        <td className="py-2 px-3 text-slate-500">Dog / Cat</td>
                        <td className="py-2 px-3">Dog</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">E</td>
                        <td className="py-2 px-3 font-bold text-slate-900">Category</td>
                        <td className="py-2 px-3 text-slate-500">Service Category</td>
                        <td className="py-2 px-3">Preventive Wellness</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">F</td>
                        <td className="py-2 px-3 font-bold text-slate-900">Service / Package</td>
                        <td className="py-2 px-3 text-slate-500">Selected Package / Test</td>
                        <td className="py-2 px-3">Wellness 360° — Adult Pet</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">G</td>
                        <td className="py-2 px-3 font-bold text-slate-900">Price (₹)</td>
                        <td className="py-2 px-3 text-slate-500">Package Cost</td>
                        <td className="py-2 px-3 font-mono text-slate-900">4999</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">H</td>
                        <td className="py-2 px-3 font-bold text-slate-900">City</td>
                        <td className="py-2 px-3 text-slate-500">Location</td>
                        <td className="py-2 px-3">Delhi NCR</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">I</td>
                        <td className="py-2 px-3 font-bold text-slate-900">Pincode</td>
                        <td className="py-2 px-3 text-slate-500">Postal Code</td>
                        <td className="py-2 px-3 font-mono">110001</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">J</td>
                        <td className="py-2 px-3 font-bold text-slate-900">Message / Preferred Date</td>
                        <td className="py-2 px-3 text-slate-500">Notes / Schedule</td>
                        <td className="py-2 px-3 text-slate-600">Preferred date: 2026-11-05</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold font-mono text-slate-900">K</td>
                        <td className="py-2 px-3 font-bold text-slate-900">Submission Timestamp</td>
                        <td className="py-2 px-3 text-slate-500">Date &amp; Time</td>
                        <td className="py-2 px-3 text-slate-500 font-mono">05/10/2026, 12:44:50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* WEBHOOK URL FORM & TEST DISPATCHER */}
              <form onSubmit={handleSaveSheetUrl} className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-4 shadow-xs">
                {sheetMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{sheetMsg}</span>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Google App Script Webhook URL</label>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={sheetUrlInput}
                    onChange={(e) => setSheetUrlInput(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white font-mono"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer shadow-xs"
                  >
                    Save Google Sheet Webhook URL
                  </button>

                  <button
                    type="button"
                    onClick={handleTestSheetWebhook}
                    disabled={testSheetLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-lime-400" />
                    <span>{testSheetLoading ? 'Sending Test Lead...' : 'Send Test Lead to Google Sheet'}</span>
                  </button>
                </div>

                {testSheetMsg && (
                  <div className={`p-3.5 rounded-xl text-xs font-bold mt-2 ${testSheetMsg.startsWith('✅') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                    {testSheetMsg}
                  </div>
                )}
              </form>
            </div>
          )}

          {/* 10. SECURITY & CREDENTIALS */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in max-w-2xl">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Security &amp; Admin Credentials
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                  Change admin email address and update portal login password.
                </p>
              </div>

              <form onSubmit={handleSaveSecurity} className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-4 shadow-xs">
                {securityMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{securityMsg}</span>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Admin Contact Email Address</label>
                  <input
                    type="email"
                    placeholder="contact@deepetservices.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Current Password (Required to authorize changes)</label>
                    <input
                      type="password"
                      placeholder="Enter current password..."
                      value={currentPasswordInput}
                      onChange={(e) => setCurrentPasswordInput(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">New Admin Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password..."
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Confirm New Admin Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password..."
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer shadow-xs"
                >
                  Update Security Credentials
                </button>
              </form>
            </div>
          )}

        </main>
      </div>



      {/* MODAL: PREVENTIVE WELLNESS PACKAGE */}
      {showPrevPkgModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">
              {prevPkgEditIdx !== null ? 'Edit Preventive Package' : 'Add Preventive Package'}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Code (e.g. PACKAGE 1)</label>
                <input
                  type="text"
                  value={prevPkgForm.code}
                  onChange={(e) => setPrevPkgForm({ ...prevPkgForm, code: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Price Display (e.g. Starting ₹2,999)</label>
                <input
                  type="text"
                  value={prevPkgForm.priceDisplay}
                  onChange={(e) => setPrevPkgForm({ ...prevPkgForm, priceDisplay: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Package Title</label>
              <input
                type="text"
                value={prevPkgForm.title}
                onChange={(e) => setPrevPkgForm({ ...prevPkgForm, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tagline (Optional)</label>
                <input
                  type="text"
                  value={prevPkgForm.tagline || ''}
                  onChange={(e) => setPrevPkgForm({ ...prevPkgForm, tagline: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Subtitle (Optional)</label>
                <input
                  type="text"
                  value={prevPkgForm.subtitle || ''}
                  onChange={(e) => setPrevPkgForm({ ...prevPkgForm, subtitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Highlight Badge Note (Optional)</label>
              <input
                type="text"
                placeholder="★ Why pet parents pick this..."
                value={prevPkgForm.highlight || ''}
                onChange={(e) => setPrevPkgForm({ ...prevPkgForm, highlight: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Subnote (Optional)</label>
              <input
                type="text"
                value={prevPkgForm.subnote || ''}
                onChange={(e) => setPrevPkgForm({ ...prevPkgForm, subnote: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>

            {/* CHECKMARK INCLUSIONS */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Front Card Checkmark Inclusions</label>
              {prevPkgForm.inclusions.map((inc, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={inc}
                    onChange={(e) => {
                      const updated = [...prevPkgForm.inclusions];
                      updated[i] = e.target.value;
                      setPrevPkgForm({ ...prevPkgForm, inclusions: updated });
                    }}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = prevPkgForm.inclusions.filter((_, idx) => idx !== i);
                      setPrevPkgForm({ ...prevPkgForm, inclusions: updated });
                    }}
                    className="text-red-600 p-2 cursor-pointer hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setPrevPkgForm({ ...prevPkgForm, inclusions: [...prevPkgForm.inclusions, ''] })}
                className="text-xs font-bold text-lime-700 flex items-center gap-1 cursor-pointer mt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Front Inclusion
              </button>
            </div>

            {/* ALL INCLUSIONS (COLLAPSIBLE DETAILS) */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Detailed Accordion Inclusions (&quot;See everything included&quot; list)</label>
              {prevPkgForm.allInclusions.map((item, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...prevPkgForm.allInclusions];
                      updated[i] = e.target.value;
                      setPrevPkgForm({ ...prevPkgForm, allInclusions: updated });
                    }}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = prevPkgForm.allInclusions.filter((_, idx) => idx !== i);
                      setPrevPkgForm({ ...prevPkgForm, allInclusions: updated });
                    }}
                    className="text-red-600 p-2 cursor-pointer hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setPrevPkgForm({ ...prevPkgForm, allInclusions: [...prevPkgForm.allInclusions, ''] })}
                className="text-xs font-bold text-lime-700 flex items-center gap-1 cursor-pointer mt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Detailed Inclusion
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowPrevPkgModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer border border-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrevPackage}
                className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-500 text-slate-950 text-xs font-extrabold cursor-pointer shadow-xs"
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BLOOD CHECK CARD */}
      {showBloodModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 my-8 shadow-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">
              {bloodEditIdx !== null ? 'Edit Blood Check Card' : 'Add Blood Check Card'}
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Title (e.g. Basic, Advanced, Premium)</label>
              <input
                type="text"
                value={bloodForm.title}
                onChange={(e) => setBloodForm({ ...bloodForm, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={bloodForm.price}
                  onChange={(e) => setBloodForm({ ...bloodForm, price: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Price Display (e.g. ₹1,499)</label>
                <input
                  type="text"
                  value={bloodForm.priceDisplay}
                  onChange={(e) => setBloodForm({ ...bloodForm, priceDisplay: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bloodForm.isPopular}
                  onChange={(e) => setBloodForm({ ...bloodForm, isPopular: e.target.checked })}
                  className="rounded border-slate-300 text-lime-600 focus:ring-lime-500"
                />
                <span>Highlight as Popular</span>
              </label>

              {bloodForm.isPopular && (
                <input
                  type="text"
                  placeholder="MOST POPULAR"
                  value={bloodForm.popularBadge || ''}
                  onChange={(e) => setBloodForm({ ...bloodForm, popularBadge: e.target.value })}
                  className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
              <textarea
                rows={2}
                value={bloodForm.description}
                onChange={(e) => setBloodForm({ ...bloodForm, description: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Features List</label>
              {bloodForm.features.map((f, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => {
                      const updated = [...bloodForm.features];
                      updated[i] = e.target.value;
                      setBloodForm({ ...bloodForm, features: updated });
                    }}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = bloodForm.features.filter((_, idx) => idx !== i);
                      setBloodForm({ ...bloodForm, features: updated });
                    }}
                    className="text-red-600 p-2 cursor-pointer hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setBloodForm({ ...bloodForm, features: [...bloodForm.features, ''] })}
                className="text-xs font-bold text-lime-700 flex items-center gap-1 cursor-pointer mt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Feature
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowBloodModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBloodCard}
                className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-500 text-slate-950 text-xs font-extrabold shadow-xs"
              >
                Save Blood Check Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SURGERY PACKAGE */}
      {showSurgeryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-4 my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">
              {surgeryEditIdx !== null ? 'Edit Surgery Package' : 'Add Surgery Package'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Code (e.g. PACKAGE 1)</label>
                <input
                  type="text"
                  value={surgeryForm.code}
                  onChange={(e) => setSurgeryForm({ ...surgeryForm, code: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Price Display (e.g. Starting ₹6,999)</label>
                <input
                  type="text"
                  value={surgeryForm.priceDisplay}
                  onChange={(e) => setSurgeryForm({ ...surgeryForm, priceDisplay: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Package Title</label>
              <input
                type="text"
                value={surgeryForm.title}
                onChange={(e) => setSurgeryForm({ ...surgeryForm, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
              <textarea
                rows={2}
                value={surgeryForm.description}
                onChange={(e) => setSurgeryForm({ ...surgeryForm, description: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Subnote</label>
              <input
                type="text"
                value={surgeryForm.subnote}
                onChange={(e) => setSurgeryForm({ ...surgeryForm, subnote: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>

            {/* INCLUSIONS CHECKLIST */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Front Card Checkmark Inclusions</label>
              {surgeryForm.inclusions.map((inc, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={inc}
                    onChange={(e) => {
                      const updated = [...surgeryForm.inclusions];
                      updated[i] = e.target.value;
                      setSurgeryForm({ ...surgeryForm, inclusions: updated });
                    }}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = surgeryForm.inclusions.filter((_, idx) => idx !== i);
                      setSurgeryForm({ ...surgeryForm, inclusions: updated });
                    }}
                    className="text-red-600 p-2 cursor-pointer hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setSurgeryForm({ ...surgeryForm, inclusions: [...surgeryForm.inclusions, ''] })}
                className="text-xs font-bold text-lime-700 flex items-center gap-1 cursor-pointer mt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Front Inclusion
              </button>
            </div>

            {/* FULL COLLAPSIBLE DETAILS (SECTIONS) */}
            <div className="border-t border-slate-100 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Full Collapsible Details (&quot;See everything included&quot;)</h4>
                  <p className="text-[11px] text-slate-500">Manage step-by-step sections, notes, and items displayed when user expands the card.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updatedSec = [
                      ...(surgeryForm.sections || []),
                      { title: 'New Section Header', note: '', items: [''] }
                    ];
                    setSurgeryForm({ ...surgeryForm, sections: updatedSec });
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer border border-slate-200 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-lime-600" /> Add Section
                </button>
              </div>

              {(surgeryForm.sections || []).map((sec, sIdx) => (
                <div key={sIdx} className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase text-slate-400">Section {sIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSec = surgeryForm.sections.filter((_, idx) => idx !== sIdx);
                        setSurgeryForm({ ...surgeryForm, sections: updatedSec });
                      }}
                      className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      title="Delete section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Section Title (e.g. Before Surgery — At Home)</label>
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => {
                        const updatedSec = [...surgeryForm.sections];
                        updatedSec[sIdx] = { ...updatedSec[sIdx], title: e.target.value };
                        setSurgeryForm({ ...surgeryForm, sections: updatedSec });
                      }}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-lime-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Section Note (Explanatory text)</label>
                    <input
                      type="text"
                      value={sec.note}
                      onChange={(e) => {
                        const updatedSec = [...surgeryForm.sections];
                        updatedSec[sIdx] = { ...updatedSec[sIdx], note: e.target.value };
                        setSurgeryForm({ ...surgeryForm, sections: updatedSec });
                      }}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-lime-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Section Items List</label>
                    {(sec.items || []).map((item, itemIdx) => (
                      <div key={itemIdx} className="flex gap-2 mb-1.5">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const updatedSec = [...surgeryForm.sections];
                            const updatedItems = [...updatedSec[sIdx].items];
                            updatedItems[itemIdx] = e.target.value;
                            updatedSec[sIdx] = { ...updatedSec[sIdx], items: updatedItems };
                            setSurgeryForm({ ...surgeryForm, sections: updatedSec });
                          }}
                          className="flex-1 p-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-lime-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedSec = [...surgeryForm.sections];
                            const updatedItems = updatedSec[sIdx].items.filter((_, idx) => idx !== itemIdx);
                            updatedSec[sIdx] = { ...updatedSec[sIdx], items: updatedItems };
                            setSurgeryForm({ ...surgeryForm, sections: updatedSec });
                          }}
                          className="text-red-600 p-1 cursor-pointer hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSec = [...surgeryForm.sections];
                        const updatedItems = [...(updatedSec[sIdx].items || []), ''];
                        updatedSec[sIdx] = { ...updatedSec[sIdx], items: updatedItems };
                        setSurgeryForm({ ...surgeryForm, sections: updatedSec });
                      }}
                      className="text-[11px] font-bold text-lime-700 flex items-center gap-1 cursor-pointer mt-1"
                    >
                      <Plus className="w-3 h-3" /> Add Item to Section
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowSurgeryModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSurgeryPackage}
                className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-500 text-slate-950 text-xs font-extrabold cursor-pointer shadow-xs"
              >
                Save Surgery Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TESTIMONIAL */}
      {showTestimonialModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">
              {testimonialEditIdx !== null ? 'Edit Testimonial' : 'Add Testimonial'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Name</label>
                <input
                  type="text"
                  value={testimonialForm.name}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Role (e.g. Dog Parent)</label>
                <input
                  type="text"
                  value={testimonialForm.role}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Rating Score (e.g. 5)</label>
                <input
                  type="text"
                  value={testimonialForm.score}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, score: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Avatar Image Path</label>
                <input
                  type="text"
                  placeholder="/ankita.webp"
                  value={testimonialForm.avatar}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Testimonial Text</label>
              <textarea
                rows={3}
                value={testimonialForm.text}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowTestimonialModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTestimonial}
                className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-500 text-slate-950 text-xs font-extrabold shadow-xs"
              >
                Save Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CONTACT CATEGORY */}
      {showAddContactCatModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">Add Contact Form Category</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Category Name</label>
              <input
                type="text"
                placeholder="e.g. Preventive Wellness, Surgery Care"
                value={newContactCatName}
                onChange={(e) => setNewContactCatName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowAddContactCatModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContactCategory}
                className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-500 text-slate-950 text-xs font-extrabold cursor-pointer shadow-xs"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CONTACT SUB-CATEGORY OPTION */}
      {showAddOptionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">Add Sub-category / Option</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Option Name</label>
              <input
                type="text"
                placeholder="e.g. Senior Pet — Age Well"
                value={newOptionTitle}
                onChange={(e) => setNewOptionTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowAddOptionModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContactOption}
                className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-500 text-slate-950 text-xs font-extrabold cursor-pointer shadow-xs"
              >
                Add Option
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
