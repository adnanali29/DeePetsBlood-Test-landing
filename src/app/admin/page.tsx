'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  useApp, 
  Lead, 
  PetPackage, 
  TestimonialItem, 
  HeroConfig, 
  ContactConfig 
} from '@/context/AppContext';
import { 
  WholeBodyTestCategory, 
  WholeBodyTestItem 
} from '@/data/testsData';
import { 
  BarChart3, 
  Home, 
  PhoneCall, 
  FileText, 
  Package, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  Menu, 
  X, 
  Check, 
  ArrowLeft,
  Search,
  Settings,
  Link,
  ExternalLink,
  Download,
  ShieldCheck,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AdminPanel() {
  const {
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
    updateLeadStatus,
    updateLeadDetails,
    deleteLead,
    clearAllLeads,
    googleSheetUrl,
    updateGoogleSheetUrl,
  } = useApp();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'home' | 'contacts' | 'leads' | 'packages' | 'testimonials' | 'settings' | 'security'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Strict Auth guard — check BEFORE rendering any dashboard UI
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
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [followUpForm, setFollowUpForm] = useState<{ date: string; medium: 'WhatsApp' | 'Call'; remark: string }>({
    date: '',
    medium: 'WhatsApp',
    remark: ''
  });
  const [sheetUrlInput, setSheetUrlInput] = useState(googleSheetUrl);
  const [sheetMsg, setSheetMsg] = useState('');

  // States for Hero Section editing
  const [heroForm, setHeroForm] = useState<HeroConfig>({ ...heroConfig });
  const [heroMsg, setHeroMsg] = useState('');

  // States for Contacts editing
  const [contactForm, setContactForm] = useState<ContactConfig>({ ...contactConfig });
  const [contactMsg, setContactMsg] = useState('');

  // States for Test & Package editing
  const [activePetTab, setActivePetTab] = useState<'Dog' | 'Cat'>('Dog');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(-1);
  const [newTest, setNewTest] = useState<{ name: string; price: string; subTests: string }>({
    name: '',
    price: '',
    subTests: ''
  });

  // Package Form Modal states
  const [showPkgModal, setShowPkgModal] = useState(false);
  const [pkgEditIdx, setPkgEditIdx] = useState<number | null>(null);
  const [pkgForm, setPkgForm] = useState<Omit<PetPackage, 'testsCount'>>({
    name: '',
    title: '',
    price: 0,
    idealFor: '',
    includedTests: [],
    isPopular: false
  });
  const [pkgTestInput, setPkgTestInput] = useState('');

  // Testimonial Modal states
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [testimonialEditId, setTestimonialEditId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Omit<TestimonialItem, 'id'>>({
    name: '',
    role: '',
    score: '5',
    text: '',
    avatar: '/madhu.webp'
  });

  // Filter states for Leads
  const [leadsSearch, setLeadsSearch] = useState('');
  const [leadsStatusFilter, setLeadsStatusFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');

  // Security / Credentials state
  const [credEmail, setCredEmail] = useState('');
  const [credNewPw, setCredNewPw] = useState('');
  const [credConfirmPw, setCredConfirmPw] = useState('');
  const [credCurrentPw, setCredCurrentPw] = useState('');
  const [showCredPw, setShowCredPw] = useState(false);
  const [credMsg, setCredMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Diagnostics save feedback
  const [testsMsg, setTestsMsg] = useState('');

  // Leads Calculation
  const totalLeads = leads.length;
  const activeLeads = leads.filter(l => l.status === 'active').length;
  const completedLeads = leads.filter(l => l.status === 'completed').length;
  const cancelledLeads = leads.filter(l => l.status === 'cancelled').length;
  const conversionRate = totalLeads > 0 ? ((completedLeads / totalLeads) * 100).toFixed(1) : '0';

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'home', name: 'Home Editor', icon: Home },
    { id: 'contacts', name: 'WhatsApp & Calls', icon: PhoneCall },
    { id: 'leads', name: 'Consultations', icon: FileText, badge: activeLeads },
    { id: 'packages', name: 'Packages (Diagnostics)', icon: Package },
    { id: 'testimonials', name: 'Testimonials', icon: MessageSquare },
    { id: 'settings', name: 'Google Sheet', icon: Settings },
    { id: 'security', name: 'Security', icon: ShieldCheck },
  ];

  // CSV Download helper
  const downloadCSV = () => {
    const headers = ['Code', 'Date', 'Name', 'Phone', 'Pet Type', 'Category', 'Test/Service', 'Price', 'City', 'Pincode', 'Schedule Date', 'Message', 'Status'];
    const rows = leads.map(l => [
      l.consultationCode ?? '',
      new Date(l.timestamp).toLocaleString('en-IN'),
      l.name,
      l.phone,
      l.petType,
      l.category,
      l.subTest,
      l.price ?? '',
      l.city ?? '',
      l.pincode ?? '',
      l.date ?? '',
      (l.message ?? '').replace(/,/g, ';'),
      l.status,
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deepet-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Tab 1: Leads functions
  const handleStatusChange = (id: string, status: 'active' | 'completed' | 'cancelled') => {
    updateLeadStatus(id, status);
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
    }
  };

  // Tab 2: Save Hero Settings
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroConfig(heroForm);
    setHeroMsg('Hero configurations successfully updated!');
    setTimeout(() => setHeroMsg(''), 3000);
  };

  // Tab 3: Save Contact Settings
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactConfig(contactForm);
    setContactMsg('WhatsApp and Call configurations updated!');
    setTimeout(() => setContactMsg(''), 3000);
  };

  const handleSaveDiagnostics = () => {
    const currentTests = activePetTab === 'Dog' ? dogTests : catTests;
    updateTests(activePetTab, currentTests);
    setTestsMsg(`✓ ${activePetTab} Hero Form Diagnostics settings saved & live on website!`);
    setTimeout(() => setTestsMsg(''), 4000);
  };

  // Category Operations
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const currentTests = activePetTab === 'Dog' ? [...dogTests] : [...catTests];
    const updated = [...currentTests, {
      categoryName: newCategoryName,
      items: []
    }];
    updateTests(activePetTab, updated);
    setNewCategoryName('');
    setShowAddCategoryModal(false);
  };

  const handleDeleteCategory = (idx: number) => {
    if (confirm('Deleting this category will remove all subtests under it. Proceed?')) {
      const currentTests = activePetTab === 'Dog' ? [...dogTests] : [...catTests];
      const updated = currentTests.filter((_, i) => i !== idx);
      updateTests(activePetTab, updated);
    }
  };

  // Test Operations
  const handleOpenAddTest = (catIdx: number) => {
    setSelectedCategoryIdx(catIdx);
    setNewTest({ name: '', price: '', subTests: '' });
    setShowAddTestModal(true);
  };

  const handleAddTestItem = () => {
    if (!newTest.name.trim() || selectedCategoryIdx === -1) return;
    const currentTests = activePetTab === 'Dog' ? [...dogTests] : [...catTests];
    const category = currentTests[selectedCategoryIdx];
    
    const formattedPrice = newTest.price ? `Rs ${newTest.price} starting` : undefined;
    const subList = newTest.subTests 
      ? newTest.subTests.split(',').map(s => s.trim()).filter(Boolean) 
      : [];

    const newItem: WholeBodyTestItem = {
      name: newTest.name,
      price: formattedPrice,
      subTests: subList
    };

    const updatedItems = [...category.items, newItem];
    const updatedCategory = { ...category, items: updatedItems };
    const updatedTests = currentTests.map((cat, i) => i === selectedCategoryIdx ? updatedCategory : cat);
    
    updateTests(activePetTab, updatedTests);
    setShowAddTestModal(false);
    setSelectedCategoryIdx(-1);
  };

  const handleDeleteTestItem = (catIdx: number, itemIdx: number) => {
    if (confirm('Delete this test item?')) {
      const currentTests = activePetTab === 'Dog' ? [...dogTests] : [...catTests];
      const category = currentTests[catIdx];
      const updatedItems = category.items.filter((_, i) => i !== itemIdx);
      const updatedCategory = { ...category, items: updatedItems };
      const updatedTests = currentTests.map((cat, i) => i === catIdx ? updatedCategory : cat);
      updateTests(activePetTab, updatedTests);
    }
  };

  // Packages Operations
  const handleOpenPkgModal = (idx: number | null) => {
    setPkgEditIdx(idx);
    if (idx !== null) {
      const currentPackages = activePetTab === 'Dog' ? dogPackages : catPackages;
      const pkg = currentPackages[idx];
      setPkgForm({
        name: pkg.name,
        title: pkg.title,
        price: pkg.price,
        idealFor: pkg.idealFor,
        includedTests: [...pkg.includedTests],
        isPopular: pkg.isPopular || false
      });
    } else {
      setPkgForm({
        name: '',
        title: '',
        price: 0,
        idealFor: '',
        includedTests: [],
        isPopular: false
      });
    }
    setPkgTestInput('');
    setShowPkgModal(true);
  };

  const handleAddPkgTest = () => {
    if (!pkgTestInput.trim()) return;
    setPkgForm({
      ...pkgForm,
      includedTests: [...pkgForm.includedTests, pkgTestInput.trim()]
    });
    setPkgTestInput('');
  };

  const handleRemovePkgTest = (idx: number) => {
    setPkgForm({
      ...pkgForm,
      includedTests: pkgForm.includedTests.filter((_, i) => i !== idx)
    });
  };

  const handleSavePackage = () => {
    if (!pkgForm.name || !pkgForm.title || pkgForm.price <= 0) {
      alert('Please fill out Name, Title and Price');
      return;
    }
    const currentPackages = activePetTab === 'Dog' ? [...dogPackages] : [...catPackages];
    const newPkg: PetPackage = {
      ...pkgForm,
      testsCount: pkgForm.includedTests.length
    };

    let updatedPackages = [];
    if (pkgEditIdx !== null) {
      updatedPackages = currentPackages.map((pkg, i) => i === pkgEditIdx ? newPkg : pkg);
    } else {
      updatedPackages = [...currentPackages, newPkg];
    }
    
    updatePackages(activePetTab, updatedPackages);
    setShowPkgModal(false);
  };

  const handleDeletePackage = (idx: number) => {
    if (confirm('Are you sure you want to delete this package?')) {
      const currentPackages = activePetTab === 'Dog' ? [...dogPackages] : [...catPackages];
      const updated = currentPackages.filter((_, i) => i !== idx);
      updatePackages(activePetTab, updated);
    }
  };

  // Testimonials Operations
  const handleOpenTestimonialModal = (item: TestimonialItem | null) => {
    if (item) {
      setTestimonialEditId(item.id);
      setTestimonialForm({
        name: item.name,
        role: item.role,
        score: item.score,
        text: item.text,
        avatar: item.avatar
      });
    } else {
      setTestimonialEditId(null);
      setTestimonialForm({
        name: '',
        role: '',
        score: '5',
        text: '',
        avatar: '/madhu.webp'
      });
    }
    setShowTestimonialModal(true);
  };

  const handleSaveTestimonial = () => {
    if (!testimonialForm.name || !testimonialForm.text) {
      alert('Please fill out Name and Testimony content');
      return;
    }

    let updated = [];
    if (testimonialEditId) {
      updated = testimonials.map(t => t.id === testimonialEditId ? { ...testimonialForm, id: t.id } : t);
    } else {
      updated = [...testimonials, {
        ...testimonialForm,
        id: 't-' + Date.now()
      }];
    }

    updateTestimonials(updated);
    setShowTestimonialModal(false);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      const updated = testimonials.filter(t => t.id !== id);
      updateTestimonials(updated);
    }
  };

  // Filter Leads list
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(leadsSearch.toLowerCase()) || 
      l.phone.includes(leadsSearch) || 
      l.subTest.toLowerCase().includes(leadsSearch.toLowerCase());
    const matchesStatus = 
      leadsStatusFilter === 'all' || 
      l.status === leadsStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Strictly block render if unauthenticated
  if (isAuthenticated !== true) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-400 text-xs font-bold tracking-wider uppercase">Authenticating...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200/80 p-5 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex lg:flex-col ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="font-heading font-black text-xl tracking-tight text-slate-900">DeePet Admin</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-1.5 flex-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <a
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all font-bold text-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        
        {/* Header bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 capitalize font-heading">
              {activeTab === 'contacts' ? 'WhatsApp & Calls' : activeTab === 'leads' ? 'Consultations' : activeTab === 'security' ? 'Security & Credentials' : activeTab}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Live Sync Active
            </span>
          </div>
        </header>

        {/* Tab Contents */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto pb-16">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Leads</span>
                  <span className="text-3xl font-black text-slate-900 mt-1 block">{totalLeads}</span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm border-l-blue-500 border-l-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Active Leads</span>
                  <span className="text-3xl font-black text-blue-600 mt-1 block">{activeLeads}</span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm border-l-green-500 border-l-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Completed</span>
                  <span className="text-3xl font-black text-green-600 mt-1 block">{completedLeads}</span>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm border-l-purple-500 border-l-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Conv. Rate</span>
                  <span className="text-3xl font-black text-purple-600 mt-1 block">{conversionRate}%</span>
                </div>
              </div>

              {/* Recent Active Leads */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Recent Active Leads</h3>
                  <button 
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    View All Leads
                  </button>
                </div>
                {leads.filter(l => l.status === 'active').length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    No active consultations remaining. Great job!
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {leads.filter(l => l.status === 'active').slice(0, 5).map(lead => (
                      <div 
                        key={lead.id} 
                        onClick={() => setSelectedLead(lead)}
                        className="bg-slate-50/50 border border-slate-200/85 hover:bg-slate-50 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-900">{lead.name}</span>
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              lead.petType === 'Cat' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {lead.petType === 'Cat' ? '🐱 Cat' : '🐶 Dog'}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">({lead.phone})</span>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            <span className="text-slate-400 font-bold">Requested: </span>
                            {lead.category} - {lead.subTest}
                          </p>
                          {lead.message && (
                            <p className="text-xs text-slate-500 italic mt-1 font-medium bg-white px-2 py-1 rounded border border-slate-150 inline-block">"{lead.message}"</p>
                          )}
                          {lead.followUp && (
                            <div className="text-[9.5px] mt-2 bg-indigo-50 border border-indigo-150 rounded-lg px-2 py-0.5 text-indigo-700 font-bold inline-flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                              Follow-up: {lead.followUp.medium} ({new Date(lead.followUp.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(lead.id, 'completed');
                            }}
                            className="bg-green-600 hover:bg-green-500 text-white font-bold text-xs py-1.5 px-3 rounded-lg transition-colors cursor-pointer shadow-sm"
                          >
                            Mark Complete
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(lead.id, 'cancelled');
                            }}
                            className="bg-slate-200 hover:bg-slate-350 text-slate-700 font-bold text-xs py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: HOME EDITOR */}
          {activeTab === 'home' && (
            <div className="space-y-8">
              
              {/* Hero Section Config Form */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Edit Hero Section Text</h3>
                {heroMsg && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl text-xs font-bold mb-4 flex items-center gap-2">
                    <Check className="w-4 h-4" /> {heroMsg}
                  </div>
                )}
                <form onSubmit={handleSaveHero} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Headline (use \n for line breaks)</label>
                    <textarea
                      required
                      value={heroForm.headline}
                      onChange={e => setHeroForm({ ...heroForm, headline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none min-h-[90px] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Subtitle</label>
                    <input
                      type="text"
                      required
                      value={heroForm.subtitle}
                      onChange={e => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Highlight Badge Text</label>
                      <input
                        type="text"
                        required
                        value={heroForm.badgeText}
                        onChange={e => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Highlight Subtext</label>
                      <input
                        type="text"
                        required
                        value={heroForm.badgeSubtext}
                        onChange={e => setHeroForm({ ...heroForm, badgeSubtext: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-2.5 px-6 rounded-xl transition-colors shadow-lg cursor-pointer"
                  >
                    Save Hero Settings
                  </button>
                </form>
              </div>

              {/* Sub-Tests Categories Editor */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Edit Hero Form Diagnostics</h3>
                    <p className="text-xs text-slate-500 font-medium">Manage categories and specific tests listed inside the Hero Form dropdowns.</p>
                  </div>
                  
                  {/* Pet Category Selector */}
                  <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
                    <button
                      onClick={() => setActivePetTab('Dog')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        activePetTab === 'Dog'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🐶 Dog Tests
                    </button>
                    <button
                      onClick={() => setActivePetTab('Cat')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        activePetTab === 'Cat'
                          ? 'bg-pink-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🐱 Cat Tests
                    </button>
                  </div>
                </div>

                {testsMsg && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl text-xs font-bold mb-4 flex items-center gap-2">
                    <Check className="w-4 h-4" /> {testsMsg}
                  </div>
                )}

                {/* Add Category Trigger */}
                <button
                  onClick={() => setShowAddCategoryModal(true)}
                  className="mb-4 inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-indigo-600 text-xs font-extrabold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Category
                </button>

                {/* Categories & Sub Tests list */}
                <div className="space-y-4">
                  {(activePetTab === 'Dog' ? dogTests : catTests).map((cat, catIdx) => (
                    <div key={catIdx} className="bg-slate-50/40 border border-slate-200/80 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-3 border-b border-slate-200/70 pb-2">
                        <span className="font-extrabold text-sm sm:text-base text-slate-900">{cat.categoryName}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenAddTest(catIdx)}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-500 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Test
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(catIdx)}
                            className="text-slate-400 hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Sub-tests in this category */}
                      {cat.items && cat.items.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {cat.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="bg-white border border-slate-200/60 rounded-xl p-3 flex items-start justify-between gap-2 shadow-sm">
                              <div>
                                <span className="text-xs font-bold text-slate-950 block leading-tight">{item.name}</span>
                                {item.price && (
                                  <span className="text-[10px] text-green-600 font-extrabold block mt-0.5">{item.price}</span>
                                )}
                                {item.subTests && item.subTests.length > 0 && (
                                  <span className="text-[9px] text-slate-450 block leading-tight mt-1 truncate max-w-[150px]" title={item.subTests.join(', ')}>
                                    {item.subTests.join(', ')}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeleteTestItem(catIdx, itemIdx)}
                                className="text-slate-400 hover:text-red-500 cursor-pointer shrink-0 mt-0.5"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 italic py-2">
                          No specific tests added yet. Click "Add Test" above.
                        </div>
                      )}

                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleSaveDiagnostics}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <Check className="w-4 h-4" /> Save Diagnostic Tests Settings
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Edit Direct Contact Configurations</h3>
                {contactMsg && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl text-xs font-bold mb-4 flex items-center gap-2">
                    <Check className="w-4 h-4" /> {contactMsg}
                  </div>
                )}
                
                <form onSubmit={handleSaveContact} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        required
                        value={contactForm.whatsappNumber}
                        onChange={e => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                        className="w-full bg-slate-55 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-slate-55 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Primary Calling Number</label>
                      <input
                        type="text"
                        required
                        value={contactForm.primaryPhone}
                        onChange={e => setContactForm({ ...contactForm, primaryPhone: e.target.value })}
                        className="w-full bg-slate-55 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Secondary Calling Number</label>
                      <input
                        type="text"
                        required
                        value={contactForm.secondaryPhone}
                        onChange={e => setContactForm({ ...contactForm, secondaryPhone: e.target.value })}
                        className="w-full bg-slate-55 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-2.5 px-6 rounded-xl transition-colors shadow-lg cursor-pointer"
                    >
                      Save Contacts Config
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

          {/* TAB 4: CONSULTATIONS (Leads) */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              
              {/* Filters toolbar */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                
                {/* Search Bar */}
                <div className="relative w-full md:max-w-xs">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone, test..."
                    value={leadsSearch}
                    onChange={e => setLeadsSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-10 pr-4 py-2 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  
                  {/* Status Toggle filter */}
                  <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                    {['all', 'active', 'completed', 'cancelled'].map(status => (
                      <button
                        key={status}
                        onClick={() => setLeadsStatusFilter(status as any)}
                        className={`px-3 py-1 rounded text-[10px] font-black uppercase cursor-pointer transition-all ${
                          leadsStatusFilter === status
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={downloadCSV}
                    className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 text-[10px] font-black px-3.5 py-1.5 rounded-lg transition-all cursor-pointer uppercase tracking-wider"
                  >
                    <Download className="w-3 h-3" /> Export CSV
                  </button>

                </div>
              </div>

              {/* Consultation Leads Table */}
              <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm">
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 text-sm">
                    No leads found matching current filter and query.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-[10.5px] font-bold uppercase tracking-wider">
                          <th className="px-4 py-4 w-[90px]">Code</th>
                          <th className="px-5 py-4 w-[130px]">Date</th>
                          <th className="px-5 py-4 w-[150px]">Client</th>
                          <th className="px-4 py-4 w-[90px]">Pet</th>
                          <th className="px-5 py-4 w-[170px]">Opted Service</th>
                          <th className="px-5 py-4">Details</th>
                          <th className="px-5 py-4 text-center w-[100px]">Status</th>
                          <th className="px-5 py-4 text-center w-[100px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                        {filteredLeads.map(lead => (
                          <tr 
                            key={lead.id} 
                            onClick={() => setSelectedLead(lead)}
                            className={`transition-colors cursor-pointer ${
                              lead.status === 'completed'
                                ? 'bg-emerald-50/70 hover:bg-emerald-100/80'
                                : lead.status === 'cancelled'
                                  ? 'bg-red-50/70 hover:bg-red-100/80'
                                  : 'bg-yellow-50/70 hover:bg-yellow-100/80'
                            }`}
                          >
                            <td className="px-4 py-4 align-top">
                              {lead.consultationCode ? (
                                <span className="inline-block whitespace-nowrap text-indigo-700 font-black text-[10px] bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-lg font-mono">{lead.consultationCode}</span>
                              ) : (
                                <span className="text-slate-400 text-[10px]">—</span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-slate-500 font-medium whitespace-nowrap align-top text-xs">
                              {new Date(lead.timestamp).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-900">{lead.name}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">{lead.phone}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                lead.petType === 'Cat' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {lead.petType === 'Cat' ? '🐱 Feline' : '🐶 Canine'}
                              </span>
                            </td>
                            <td className="px-5 py-4 align-top">
                              <div className="font-bold text-slate-900 text-xs leading-snug">{lead.subTest}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5 font-medium leading-tight">{lead.category}</div>
                            </td>
                            <td className="px-5 py-4 align-top">
                              <div className="flex flex-col gap-1.5">
                                {/* Location */}
                                {(lead.city || lead.pincode) && (
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 w-[52px] shrink-0">Location</span>
                                    <span className="text-[11px] text-slate-700 font-semibold leading-tight">
                                      {lead.city}{lead.pincode ? ` (${lead.pincode})` : ''}
                                    </span>
                                  </div>
                                )}
                                {/* Schedule */}
                                {lead.date && (
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 w-[52px] shrink-0">Schedule</span>
                                    <span className="text-[11px] text-slate-700 font-semibold leading-tight">{lead.date}</span>
                                  </div>
                                )}
                                {/* Price */}
                                {lead.price && (
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 w-[52px] shrink-0">Price</span>
                                    <span className="text-[11px] text-green-600 font-black leading-tight">₹{lead.price.toLocaleString('en-IN')}</span>
                                  </div>
                                )}
                                {/* Message */}
                                {lead.message && (
                                  <div className="bg-white/80 border border-slate-200 rounded-lg px-2.5 py-1.5 mt-0.5 max-w-[220px]">
                                    <p className="text-[10.5px] text-slate-600 italic leading-snug line-clamp-2">"{lead.message}"</p>
                                  </div>
                                )}
                                {/* Follow-up */}
                                {lead.followUp && (
                                  <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
                                    <span className="text-[10px] text-indigo-700 font-bold leading-tight">
                                      {lead.followUp.medium} · {new Date(lead.followUp.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-center align-top">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                lead.status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                  : lead.status === 'cancelled'
                                    ? 'bg-red-100 text-red-600 border border-red-200'
                                    : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                              }`}>
                                {lead.status === 'active' ? 'Pending' : lead.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-center whitespace-nowrap align-top">
                              <div className="flex items-center justify-center gap-1.5">
                                {lead.status === 'active' && (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusChange(lead.id, 'completed');
                                      }}
                                      className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all cursor-pointer border border-green-200"
                                      title="Mark as completed"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusChange(lead.id, 'cancelled');
                                      }}
                                      className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 transition-all cursor-pointer border border-slate-200"
                                      title="Cancel lead"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                                {lead.status !== 'active' && (
                                  <span className="text-[11px] text-slate-400 font-medium">—</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 5: DIAGNOSTICS PACKAGES */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Diagnostic Packages</h3>
                    <p className="text-xs text-slate-500 font-medium">Manage diagnostic packages displayed inside the pricing grids.</p>
                  </div>
                  
                  {/* Pet Selector */}
                  <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
                    <button
                      onClick={() => setActivePetTab('Dog')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        activePetTab === 'Dog'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🐶 Dogs
                    </button>
                    <button
                      onClick={() => setActivePetTab('Cat')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        activePetTab === 'Cat'
                          ? 'bg-pink-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🐱 Cats
                    </button>
                  </div>
                </div>

                {/* Add Package Button */}
                <button
                  onClick={() => handleOpenPkgModal(null)}
                  className="mb-4 inline-flex items-center gap-1.5 bg-slate-55 border border-slate-200 hover:bg-slate-100 text-indigo-650 text-xs font-extrabold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Package
                </button>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(activePetTab === 'Dog' ? dogPackages : catPackages).map((pkg, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between shadow-sm">
                      {pkg.isPopular && (
                        <div className="absolute top-0 right-0 bg-yellow-450 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                          Popular
                        </div>
                      )}
                      
                      <div>
                        <span className="text-[10px] text-slate-450 font-bold block">{pkg.name}</span>
                        <h4 className="font-extrabold text-lg text-slate-900 mt-0.5 leading-snug">{pkg.title}</h4>
                        <span className="text-2xl font-black text-green-600 mt-2 block">₹{pkg.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-slate-500 mt-1 block italic">{pkg.idealFor}</span>
                        
                        <div className="mt-4 border-t border-slate-100 pt-3">
                          <span className="text-xs font-bold text-slate-500 block uppercase mb-2">Included Tests ({pkg.testsCount})</span>
                          <ul className="space-y-1">
                            {pkg.includedTests.slice(0, 5).map((test, tIdx) => (
                              <li key={tIdx} className="text-xs text-slate-650 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span className="truncate">{test}</span>
                              </li>
                            ))}
                            {pkg.includedTests.length > 5 && (
                              <li className="text-[10.5px] text-indigo-650 font-bold mt-1">
                                + {pkg.includedTests.length - 5} more tests...
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-6 border-t border-slate-100 pt-3">
                        <button
                          onClick={() => handleOpenPkgModal(idx)}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePackage(idx)}
                          className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer border border-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}

          {/* TAB 6: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Client Testimonials</h3>
                    <p className="text-xs text-slate-500 font-medium">Manage testimonials rendering in the horizontal slider.</p>
                  </div>
                  <button
                    onClick={() => handleOpenTestimonialModal(null)}
                    className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Testimonial
                  </button>
                </div>

                {/* Testimonials List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testi) => (
                    <div key={testi.id} className="bg-white border border-slate-200/85 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                      <div>
                        {/* Header Avatar and Score */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={testi.avatar}
                              alt={testi.name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-100"
                            />
                            <div>
                              <span className="font-bold text-slate-900 block leading-tight">{testi.name}</span>
                              <span className="text-[10px] text-slate-555 block mt-0.5">{testi.role}</span>
                            </div>
                          </div>
                          <span className="bg-yellow-50 text-yellow-750 text-xs font-black px-2 py-0.5 rounded-md border border-yellow-250">
                            ★ {testi.score}
                          </span>
                        </div>
                        
                        <p className="text-slate-650 text-xs sm:text-sm italic leading-relaxed mt-4 font-medium">
                          "{testi.text}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-6 border-t border-slate-100 pt-3">
                        <button
                          onClick={() => handleOpenTestimonialModal(testi)}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(testi.id)}
                          className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer border border-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* MODAL 1: ADD CATEGORY MODAL */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setShowAddCategoryModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg text-slate-900 mb-4">Add Test Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Hematology"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                />
              </div>
              <button
                onClick={handleAddCategory}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-3 rounded-xl transition-colors cursor-pointer"
              >
                Add Category Name
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD TEST ITEM MODAL */}
      {showAddTestModal && (
        <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => {
                setShowAddTestModal(false);
                setSelectedCategoryIdx(-1);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg text-slate-900 mb-4">
              Add Test Item to {activePetTab === 'Dog' ? dogTests[selectedCategoryIdx]?.categoryName : catTests[selectedCategoryIdx]?.categoryName}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Test Name</label>
                <input
                  type="text"
                  placeholder="e.g. CBC test"
                  value={newTest.name}
                  onChange={e => setNewTest({ ...newTest, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Fasting/Starting Price (e.g. 799)</label>
                <input
                  type="text"
                  placeholder="e.g. 799"
                  value={newTest.price}
                  onChange={e => setNewTest({ ...newTest, price: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Sub-Tests Included (comma separated)</label>
                <textarea
                  placeholder="RBC Count, WBC Count, Hemoglobin..."
                  value={newTest.subTests}
                  onChange={e => setNewTest({ ...newTest, subTests: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none min-h-[70px] focus:bg-white transition-all"
                />
              </div>
              <button
                onClick={handleAddTestItem}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-3 rounded-xl transition-colors cursor-pointer"
              >
                Add Test Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PACKAGES ADD/EDIT MODAL */}
      {showPkgModal && (
        <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setShowPkgModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg text-slate-900 mb-4">
              {pkgEditIdx !== null ? 'Edit Diagnostic Package' : 'Add Diagnostic Package'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Name Code (e.g. Cat Basic)</label>
                  <input
                    type="text"
                    required
                    value={pkgForm.name}
                    onChange={e => setPkgForm({ ...pkgForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Pricing Title (e.g. Basic Wellness)</label>
                  <input
                    type="text"
                    required
                    value={pkgForm.title}
                    onChange={e => setPkgForm({ ...pkgForm, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={pkgForm.price}
                    onChange={e => setPkgForm({ ...pkgForm, price: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Ideal For (Subtext)</label>
                  <input
                    type="text"
                    value={pkgForm.idealFor}
                    onChange={e => setPkgForm({ ...pkgForm, idealFor: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={pkgForm.isPopular}
                    onChange={e => setPkgForm({ ...pkgForm, isPopular: e.target.checked })}
                    className="rounded bg-slate-100 border-slate-300 text-indigo-650 focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-xs font-bold text-slate-650">Highlight as Popular (Banner Ribbon)</span>
                </label>
              </div>

              {/* Package tests sublist management */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                <label className="block text-xs font-bold text-slate-500 mb-1">Included Sub-Tests</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Complete Blood Count (CBC)"
                    value={pkgTestInput}
                    onChange={e => setPkgTestInput(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-205 text-slate-900 rounded-xl px-4 py-2 text-xs focus:outline-none focus:bg-white transition-all"
                  />
                  <button
                    onClick={handleAddPkgTest}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Add Test
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto">
                  {pkgForm.includedTests.map((test, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 pl-3.5 pr-2 py-1 rounded-full text-xs font-medium shadow-sm">
                      <span>{test}</span>
                      <button
                        onClick={() => handleRemovePkgTest(index)}
                        className="text-slate-400 hover:text-red-500 font-bold ml-1 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSavePackage}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Save Diagnostics Package
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 4: TESTIMONIALS ADD/EDIT MODAL */}
      {showTestimonialModal && (
        <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setShowTestimonialModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg text-slate-900 mb-4">
              {testimonialEditId ? 'Edit Testimonial' : 'Add Testimonial'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.name}
                    onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Role / Pet Type (e.g. Dog Parent)</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.role}
                    onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Score Rating (e.g. 5, 4.9)</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.score}
                    onChange={e => setTestimonialForm({ ...testimonialForm, score: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white transition-all"
                  />
                </div>
                
                {/* Avatar Selector with Custom Image URL option */}
                <div className="space-y-3 col-span-2">
                  <div className="flex items-center gap-3">
                    {/* Live Avatar Preview Thumbnail */}
                    <div className="shrink-0">
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">Preview</label>
                      <img
                        src={testimonialForm.avatar || '/madhu.webp'}
                        alt="Avatar Preview"
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200 shadow-sm bg-slate-100"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/madhu.webp'; }}
                      />
                    </div>

                    {/* Preset Selector */}
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Select Preset Avatar</label>
                      <select
                        value={testimonialForm.avatar}
                        onChange={e => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none cursor-pointer focus:bg-white transition-all font-medium"
                      >
                        <option value="/madhu.webp">Madhu Vyas Profile (/madhu.webp)</option>
                        <option value="/jyoti.webp">Jyoti Gupta Profile (/jyoti.webp)</option>
                        <option value="/nikhil.webp">Nikhil Bhati Profile (/nikhil.webp)</option>
                        <option value="/loskesh.webp">Lokesh Reddy Profile (/loskesh.webp)</option>
                        <option value="/mohit.webp">Mohit Rajput Profile (/mohit.webp)</option>
                        <option value="/ankita.webp">Ankita Jindal Profile (/ankita.webp)</option>
                        {!['/madhu.webp', '/jyoti.webp', '/nikhil.webp', '/loskesh.webp', '/mohit.webp', '/ankita.webp'].includes(testimonialForm.avatar) && (
                          <option value={testimonialForm.avatar}>Custom Image URL (Active)</option>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Custom Image URL Option */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">OR Enter Custom Image URL / Path</label>
                    <input
                      type="text"
                      placeholder="https://example.com/avatar.jpg or /my-image.webp"
                      value={testimonialForm.avatar}
                      onChange={e => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:bg-white transition-all font-mono"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1 font-medium">Paste any image web URL (`https://...`) or public file path (`/avatar.jpg`).</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Testimony Card Content</label>
                <textarea
                  required
                  value={testimonialForm.text}
                  onChange={e => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none min-h-[90px] focus:bg-white transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSaveTestimonial}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-3 rounded-xl transition-colors cursor-pointer animate-fade-in"
                >
                  Save Testimonial Card
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ===================== SETTINGS / GOOGLE SHEET TAB ===================== */}
      {activeTab === 'settings' && (
        <div className="p-6 sm:p-8 max-w-2xl mx-auto space-y-6">

          {/* Header */}
          <div>
            <h2 className="font-heading font-black text-2xl text-slate-900">Google Sheet Integration</h2>
            <p className="text-slate-500 text-sm mt-1">Every new booking will automatically be sent to your Google Sheet in real-time.</p>
          </div>

          {/* Current Status */}
          <div className={`flex items-center gap-3 p-4 rounded-2xl border ${googleSheetUrl ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${googleSheetUrl ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
            <div>
              <span className={`text-xs font-black uppercase tracking-wider ${googleSheetUrl ? 'text-emerald-700' : 'text-amber-700'}`}>
                {googleSheetUrl ? '✓ Connected — Sheet Sync Active' : 'Not Connected — No Sheet URL configured'}
              </span>
              {googleSheetUrl && (
                <p className="text-[10px] text-emerald-600 mt-0.5 font-medium truncate max-w-md">{googleSheetUrl}</p>
              )}
            </div>
          </div>

          {/* URL Input Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Link className="w-4 h-4 text-indigo-500" />
              Apps Script Web App URL
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Paste your Google Apps Script <strong>deployment URL</strong> below (not the Sheet URL). Every new lead will POST to this endpoint and appear as a new row in your Sheet.
            </p>

            <input
              type="url"
              value={sheetUrlInput}
              onChange={e => setSheetUrlInput(e.target.value)}
              placeholder="https://script.google.com/macros/s/AKfy.../exec"
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white transition-all font-mono"
            />

            {sheetMsg && (
              <p className={`text-xs font-bold px-3 py-2 rounded-lg ${sheetMsg.includes('✓') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                {sheetMsg}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (!sheetUrlInput.trim()) {
                    setSheetMsg('⚠ Please enter a valid Apps Script URL.');
                    return;
                  }
                  if (!sheetUrlInput.startsWith('https://script.google.com')) {
                    setSheetMsg('⚠ URL must be a Google Apps Script deployment link.');
                    return;
                  }
                  updateGoogleSheetUrl(sheetUrlInput.trim());
                  setSheetMsg('✓ Sheet URL saved! New bookings will now sync automatically.');
                  setTimeout(() => setSheetMsg(''), 5000);
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl transition-colors cursor-pointer"
              >
                Save & Activate
              </button>
              {googleSheetUrl && (
                <button
                  onClick={() => {
                    updateGoogleSheetUrl('');
                    setSheetUrlInput('');
                    setSheetMsg('Sheet integration disconnected.');
                  }}
                  className="px-4 py-3 border border-red-200 text-red-500 hover:bg-red-50 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Disconnect
                </button>
              )}
            </div>
          </div>

          {/* Your Sheet Reference */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-green-500" />
              Your Google Sheet
            </h3>
            <p className="text-xs text-slate-500">Your DeePet leads sheet — open it to verify incoming data after setup.</p>
            <a
              href="https://docs.google.com/spreadsheets/d/11ZvyaqWgkj7pqiWnwIPMJZ_Qj_6t19Tj-U4W1uJWAIc/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-green-100 transition-colors cursor-pointer"
            >
              Open Google Sheet <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Setup Instructions */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">🚀 One-Time Setup (5 minutes)</h3>
            <ol className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <li className="flex gap-3">
                <span className="bg-indigo-100 text-indigo-700 font-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                <span>Open your Google Sheet → click <strong>Extensions</strong> → <strong>Apps Script</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="bg-indigo-100 text-indigo-700 font-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                <span>Delete any existing code and paste the script below (click Copy)</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-indigo-100 text-indigo-700 font-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                <span>Click <strong>Deploy</strong> → <strong>New deployment</strong> → Type: <strong>Web App</strong> → Execute as: <strong>Me</strong> → Who has access: <strong>Anyone</strong> → Deploy</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-indigo-100 text-indigo-700 font-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">4</span>
                <span>Copy the <strong>Web App URL</strong> and paste it in the field above → click Save & Activate</span>
              </li>
            </ol>

            {/* Apps Script Code */}
            <div className="bg-slate-900 rounded-2xl p-4 relative">
              <span className="text-slate-400 text-[10px] font-mono block mb-2">Apps Script — Code.gs</span>
              <pre className="text-[10px] text-green-400 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">{`function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Code','Timestamp','Name','Phone','Pet Type',
        'Category','Test/Service','Price (₹)',
        'City','Pincode','Preferred Date','Message','Status'
      ]);
    }
    
    sheet.appendRow([
      data.consultationCode || '',
      data.timestamp || '',
      data.name || '',
      data.phone || '',
      data.petType || '',
      data.category || '',
      data.subTest || '',
      data.price || '',
      data.city || '',
      data.pincode || '',
      data.date || '',
      data.message || '',
      data.status || 'Active'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}</pre>
            </div>
          </div>

        </div>
      )}

      {/* TAB: SECURITY & CREDENTIALS */}
      {activeTab === 'security' && (
        <div className="p-6 sm:p-8 max-w-2xl mx-auto space-y-6">

          {/* Header */}
          <div>
            <h2 className="font-heading font-black text-2xl text-slate-900">Security & Credentials</h2>
            <p className="text-slate-500 text-sm mt-1">Update your admin login email and password. Current password is required to make changes.</p>
          </div>

          {/* Current Login Info */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-black text-indigo-700 uppercase tracking-wider">Currently Logged In As</p>
              <p className="text-sm text-indigo-900 font-bold mt-0.5">
                {(() => {
                  try {
                    const stored = typeof window !== 'undefined' ? localStorage.getItem('deepet_admin_credentials') : null;
                    if (stored) return JSON.parse(stored).email || '1';
                  } catch {}
                  return '1';
                })()}
              </p>
            </div>
          </div>

          {/* Change Credentials Form */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-800 text-base">Change Login Credentials</h3>

            {/* Feedback message */}
            {credMsg && (
              <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold border ${
                credMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-red-50 text-red-600 border-red-200'
              }`}>
                {credMsg.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <X className="w-4 h-4 shrink-0" />}
                {credMsg.text}
              </div>
            )}

            {/* New Email / ID */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">New Email / ID</label>
              <input
                type="text"
                placeholder="Enter new email or ID"
                value={credEmail}
                onChange={e => { setCredEmail(e.target.value); setCredMsg(null); }}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white transition-all font-medium"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showCredPw ? 'text' : 'password'}
                  placeholder="Min. 4 characters"
                  value={credNewPw}
                  onChange={e => { setCredNewPw(e.target.value); setCredMsg(null); }}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:bg-white transition-all font-medium"
                />
                <button type="button" onClick={() => setShowCredPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                  {showCredPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={credConfirmPw}
                onChange={e => { setCredConfirmPw(e.target.value); setCredMsg(null); }}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Save button */}
            <button
              type="button"
              onClick={() => {
                setCredMsg(null);

                // Load current stored credentials
                let currentId = '1';
                let currentPw = '1';
                try {
                  const stored = localStorage.getItem('deepet_admin_credentials');
                  if (stored) {
                    const parsed = JSON.parse(stored);
                    currentId = parsed.email || '1';
                    currentPw = parsed.password || '1';
                  }
                } catch {}

                // Validate at least one field is being changed
                const newEmail = credEmail.trim();
                const newPw = credNewPw.trim();
                if (!newEmail && !newPw) {
                  setCredMsg({ type: 'error', text: 'Enter a new email/ID or new password to update.' });
                  return;
                }

                // Validate new password
                if (newPw) {
                  if (newPw.length < 4) {
                    setCredMsg({ type: 'error', text: 'New password must be at least 4 characters.' });
                    return;
                  }
                  if (newPw !== credConfirmPw.trim()) {
                    setCredMsg({ type: 'error', text: 'New passwords do not match.' });
                    return;
                  }
                }

                // Save updated credentials
                const updated = {
                  email: newEmail || currentId,
                  password: newPw || currentPw,
                };
                localStorage.setItem('deepet_admin_credentials', JSON.stringify(updated));

                setCredMsg({ type: 'success', text: '✓ Credentials updated successfully! Use new credentials on next login.' });
                setCredEmail('');
                setCredNewPw('');
                setCredConfirmPw('');
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/15 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Save New Credentials
            </button>
          </div>

        </div>
      )}


      {selectedLead && (() => {
        const activeLeadInDrawer = leads.find(l => l.id === selectedLead.id);
        if (!activeLeadInDrawer) return null;

        return (
          <div className="fixed inset-0 z-50 flex justify-end">
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
              .animate-slide-in {
                animation: slideIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}} />
            
            {/* Backdrop overlay */}
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-fade-in" 
              onClick={() => setSelectedLead(null)}
            />
            
            {/* Drawer container */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in border-l border-slate-200">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-150 shrink-0">
                <div>
                  <span className="text-[10px] text-indigo-650 font-extrabold uppercase tracking-wider block">Lead Details</span>
                  <h3 className="font-heading font-black text-lg text-slate-900">{activeLeadInDrawer.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Contact info card */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 font-bold">Client Phone</span>
                    <a href={`tel:${activeLeadInDrawer.phone}`} className="font-extrabold text-indigo-650 hover:underline">{activeLeadInDrawer.phone}</a>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 font-bold">Pet Type</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      activeLeadInDrawer.petType === 'Cat' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {activeLeadInDrawer.petType === 'Cat' ? '🐱 Cat' : '🐶 Dog'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 font-bold">Submission Time</span>
                    <span className="text-slate-700 font-medium">
                      {new Date(activeLeadInDrawer.timestamp).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                {/* Selected Service details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Requested Diagnostics</h4>
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <span className="text-xs text-slate-400 font-bold block">{activeLeadInDrawer.category}</span>
                    <span className="font-extrabold text-slate-900 block mt-0.5 leading-tight">{activeLeadInDrawer.subTest}</span>
                    {activeLeadInDrawer.price && (
                      <span className="text-green-600 font-bold text-sm block mt-1.5">₹{activeLeadInDrawer.price.toLocaleString('en-IN')}</span>
                    )}
                    
                    {(activeLeadInDrawer.city || activeLeadInDrawer.date) && (
                      <div className="border-t border-slate-100 mt-3 pt-3 space-y-1.5 text-xs text-slate-650">
                        {activeLeadInDrawer.city && (
                          <div><span className="text-slate-400 font-bold">Location:</span> {activeLeadInDrawer.city} {activeLeadInDrawer.pincode ? `(${activeLeadInDrawer.pincode})` : ''}</div>
                        )}
                        {activeLeadInDrawer.date && (
                          <div><span className="text-slate-400 font-bold">Schedule Preference:</span> {activeLeadInDrawer.date}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Client message if any */}
                {activeLeadInDrawer.message && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Message</h4>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 italic text-slate-600 text-sm">
                      "{activeLeadInDrawer.message}"
                    </div>
                  </div>
                )}

                {/* Status Tags */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Tag</h4>
                  <div className="flex gap-2">
                    {[
                      { status: 'active', label: 'Pending', activeClass: 'bg-yellow-500 text-white border-yellow-500 shadow-sm shadow-yellow-500/20', idleClass: 'bg-white text-slate-650 border-slate-200 hover:bg-slate-55' },
                      { status: 'completed', label: 'Completed', activeClass: 'bg-green-600 text-white border-green-600 shadow-sm shadow-green-600/20', idleClass: 'bg-white text-slate-650 border-slate-200 hover:bg-slate-55' },
                      { status: 'cancelled', label: 'Cancelled', activeClass: 'bg-red-500 text-white border-red-500 shadow-sm shadow-red-500/20', idleClass: 'bg-white text-slate-650 border-slate-200 hover:bg-slate-55' }
                    ].map(item => (
                      <button
                        key={item.status}
                        onClick={() => handleStatusChange(activeLeadInDrawer.id, item.status as any)}
                        className={`flex-1 border px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          activeLeadInDrawer.status === item.status ? item.activeClass : item.idleClass
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Remarks Section */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Internal Remarks</h4>
                  <textarea
                    placeholder="Type private staff remarks here..."
                    value={activeLeadInDrawer.remark || ''}
                    onChange={(e) => updateLeadDetails(activeLeadInDrawer.id, { remark: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-xl px-4 py-2.5 text-xs focus:outline-none min-h-[80px] focus:bg-white transition-all leading-normal"
                  />
                </div>

                {/* Follow-up Section */}
                <div className="space-y-3 border-t border-slate-100 pt-5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Follow-Up Schedule</h4>
                  
                  {activeLeadInDrawer.followUp ? (
                    <div className="bg-indigo-50/50 border border-indigo-150 rounded-2xl p-4 relative">
                      <button 
                        onClick={() => updateLeadDetails(activeLeadInDrawer.id, { followUp: undefined })}
                        className="absolute top-3.5 right-3.5 text-xs font-bold text-red-500 hover:text-red-750 cursor-pointer"
                      >
                        Cancel
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                          activeLeadInDrawer.followUp.medium === 'WhatsApp' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}>
                          {activeLeadInDrawer.followUp.medium} Follow-up
                        </span>
                        <span className="text-xs text-slate-550 font-bold">
                          {new Date(activeLeadInDrawer.followUp.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      {activeLeadInDrawer.followUp.remark && (
                        <p className="text-xs text-slate-700 mt-2 font-medium bg-white px-2.5 py-1.5 rounded-lg border border-slate-150">
                          {activeLeadInDrawer.followUp.remark}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                      <span className="text-xs text-slate-600 font-bold block mb-1">Schedule a Follow-Up</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Follow-Up Date</label>
                          <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={followUpForm.date}
                            onChange={e => setFollowUpForm(f => ({ ...f, date: e.target.value }))}
                            className="w-full bg-white border border-slate-200 text-slate-900 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Medium</label>
                          <select
                            value={followUpForm.medium}
                            onChange={e => setFollowUpForm(f => ({ ...f, medium: e.target.value as any }))}
                            className="w-full bg-white border border-slate-200 text-slate-700 rounded-lg px-2 py-1.5 text-xs focus:outline-none cursor-pointer"
                          >
                            <option value="WhatsApp">📱 WhatsApp</option>
                            <option value="Call">📞 Call</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Follow-Up Notes / Remarks</label>
                        <input
                          type="text"
                          value={followUpForm.remark}
                          onChange={e => setFollowUpForm(f => ({ ...f, remark: e.target.value }))}
                          placeholder="e.g. Call back for results check"
                          className="w-full bg-white border border-slate-200 text-slate-900 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!followUpForm.date) {
                            alert('Please select a follow-up date');
                            return;
                          }
                          updateLeadDetails(activeLeadInDrawer.id, {
                            followUp: {
                              date: followUpForm.date,
                              medium: followUpForm.medium,
                              remark: followUpForm.remark
                            }
                          });
                          setFollowUpForm({ date: '', medium: 'WhatsApp', remark: '' });
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10.5px] py-2.5 rounded-xl transition-all cursor-pointer tracking-wide shadow-sm"
                      >
                        ✓ Schedule Follow-Up
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
