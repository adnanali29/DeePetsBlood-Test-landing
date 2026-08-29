'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { X, Search, CheckCircle, ArrowRight, ShieldCheck, Heart, Activity } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { WholeBodyTestCategory } from '@/data/testsData';

interface ExploreTestsModalProps {
  isOpen: boolean;
  petType: 'cat' | 'dog';
  onClose: () => void;
  onBookTest: (testName: string, price: number) => void;
}

export const ExploreTestsModal: React.FC<ExploreTestsModalProps> = ({
  isOpen,
  petType,
  onClose,
  onBookTest,
}) => {
  const { catTests, dogTests } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    return petType === 'cat' ? catTests : dogTests;
  }, [petType, catTests, dogTests]);

  // Reset states when opening modal or changing pet type
  useEffect(() => {
    if (isOpen && categories.length > 0) {
      setActiveCategory(categories[0].categoryName);
      setSearchQuery('');
    }
  }, [isOpen, categories]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle backdrop click to close (Light dismiss fallback)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Filter items and categories based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return { categories, hasMatches: true };
    }

    const query = searchQuery.toLowerCase();
    const resultCategories: WholeBodyTestCategory[] = [];
    let hasMatches = false;

    categories.forEach((cat) => {
      const matchedItems = cat.items.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(query);
        const subTestsMatch = item.subTests?.some((sub) => sub.toLowerCase().includes(query)) || false;
        return nameMatch || subTestsMatch;
      });

      if (matchedItems.length > 0) {
        resultCategories.push({
          ...cat,
          items: matchedItems
        });
        hasMatches = true;
      }
    });

    return { categories: resultCategories, hasMatches };
  }, [categories, searchQuery]);

  // Update active category if search results render the current active category invisible
  useEffect(() => {
    if (searchQuery.trim() && filteredData.categories.length > 0) {
      const activeStillExists = filteredData.categories.some(
        (cat) => cat.categoryName === activeCategory
      );
      if (!activeStillExists) {
        setActiveCategory(filteredData.categories[0].categoryName);
      }
    }
  }, [searchQuery, filteredData, activeCategory]);

  if (!isOpen) return null;

  const currentCategoryData = filteredData.categories.find(
    (cat) => cat.categoryName === activeCategory
  );

  const themeColor = petType === 'cat' ? 'text-[#eb366d]' : 'text-[#653bf7]';
  const themeBg = petType === 'cat' ? 'bg-[#fceef3] text-[#eb366d]' : 'bg-[#eee8fd] text-[#653bf7]';
  const themeBorderFocus = petType === 'cat' ? 'focus:border-[#eb366d] focus:ring-[#eb366d]/10' : 'focus:border-[#653bf7] focus:ring-[#653bf7]/10';
  const themeBtnBg = petType === 'cat' ? 'bg-[#eb366d] hover:bg-[#d4275b]' : 'bg-[#653bf7] hover:bg-[#5024f5]';

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white w-full h-full md:h-[90vh] md:max-w-6xl md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border border-slate-100 relative"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <span className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm ${themeBg}`}>
              {petType === 'cat' ? '🐱' : '🐶'}
            </span>
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">
                DeePet Whole Body Directory
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                Complete {petType === 'cat' ? 'Cat' : 'Dog'} Test List
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 md:max-w-md">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tests, biomarkers (e.g. CBC, SDMA, Glucose)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:bg-white transition-all ${themeBorderFocus}`}
              />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Container */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50/30">
          
          {/* Categories list: Left sidebar on desktop, horizontal track on mobile */}
          {filteredData.hasMatches ? (
            <>
              {/* Mobile scroll tabs */}
              <div className="md:hidden border-b border-slate-100 bg-white flex items-center overflow-x-auto py-3 px-4 gap-2 shrink-0 scrollbar-none">
                {filteredData.categories.map((cat) => {
                  const isActive = activeCategory === cat.categoryName;
                  return (
                    <button
                      key={cat.categoryName}
                      onClick={() => setActiveCategory(cat.categoryName)}
                      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isActive 
                          ? `${petType === 'cat' ? 'bg-[#eb366d] text-white' : 'bg-[#653bf7] text-white'} shadow-sm` 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.categoryName}
                    </button>
                  );
                })}
              </div>

              {/* Desktop sidebar */}
              <div className="hidden md:block w-72 border-r border-slate-100 bg-white overflow-y-auto p-4 space-y-1.5 shrink-0">
                <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-2">
                  Test Categories
                </span>
                {filteredData.categories.map((cat) => {
                  const isActive = activeCategory === cat.categoryName;
                  return (
                    <button
                      key={cat.categoryName}
                      onClick={() => setActiveCategory(cat.categoryName)}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold flex items-center justify-between group transition-all cursor-pointer ${
                        isActive
                          ? `${petType === 'cat' ? 'bg-[#eb366d] text-white' : 'bg-[#653bf7] text-white'} shadow-md`
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.categoryName}</span>
                      {cat.price && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {cat.price.replace(' starting', '')}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Content Panel */}
              <div className="flex-1 overflow-y-auto p-6">
                {currentCategoryData ? (
                  <div className="space-y-6">
                    {/* Category Title & Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-100/80 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${themeBg}`}>
                          <Activity className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-xl font-extrabold text-slate-900 font-heading">
                            {currentCategoryData.categoryName}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Comprehensive diagnostic profile
                          </p>
                        </div>
                      </div>
                      {currentCategoryData.price && (
                        <div className="text-right">
                          <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
                            Starting Price
                          </span>
                          <span className={`text-2xl font-black font-heading ${themeColor}`}>
                            ₹{currentCategoryData.price.replace(' starting', '').replace('Rs ', '')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Test items in this category */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {currentCategoryData.items.map((item, idx) => {
                        // Extract number from price
                        const priceNum = item.price 
                          ? parseInt(item.price.replace(/[^0-9]/g, ''), 10) 
                          : currentCategoryData.price 
                            ? parseInt(currentCategoryData.price.replace(/[^0-9]/g, ''), 10) 
                            : 1099;

                        return (
                          <div
                            key={idx}
                            className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-3 mb-4">
                                <h5 className="font-extrabold text-slate-900 leading-snug flex-1">
                                  {item.name}
                                </h5>
                                {item.price && (
                                  <span className={`px-3 py-1.5 rounded-full text-xs font-black shrink-0 ${themeBg}`}>
                                    {item.price.replace('Rs ', '₹')}
                                  </span>
                                )}
                              </div>

                              {/* Included Biomarkers Grid */}
                              {item.subTests && item.subTests.length > 0 && (
                                <div className="space-y-2">
                                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Biomarkers & Parts:
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {item.subTests.map((sub, sIdx) => (
                                      <div
                                        key={sIdx}
                                        className="flex items-center gap-2 p-2 bg-slate-50/80 rounded-xl border border-slate-100/50"
                                      >
                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        <span className="text-slate-700 text-xs font-medium truncate" title={sub}>
                                          {sub}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() => onBookTest(item.name, priceNum)}
                              className={`w-full mt-6 text-white font-extrabold text-xs py-3.5 rounded-full flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer ${themeBtnBg}`}
                            >
                              <span>Book Home Visit</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            /* No search results view */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mb-4">
                🔍
              </div>
              <h4 className="text-base font-extrabold text-slate-900 font-heading">
                No Tests or Biomarkers Found
              </h4>
              <p className="text-slate-500 text-xs mt-1 max-w-sm">
                We couldn't find any results matching "{searchQuery}". Try searching for categories like Liver, CBC, or specific markers like SDMA.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-5 py-2 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-xs transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
