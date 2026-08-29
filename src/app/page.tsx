'use client';

import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PetCategoryCards } from '@/components/PetCategoryCards';
import { ProcessSection } from '@/components/ProcessSection';
import { WhyTrustSection } from '@/components/WhyTrustSection';
import { GallerySection } from '@/components/GallerySection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';
import { Toast } from '@/components/Toast';
import { TestCatalog } from '@/components/TestCatalog';
import { ExploreTestsModal } from '@/components/ExploreTestsModal';

import { useApp } from '@/context/AppContext';

export default function Home() {
  const { contactConfig } = useApp();
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);
  const [modalState, setModalState] = useState<{ isOpen: boolean; testTitle: string; testPrice: number }>({
    isOpen: false,
    testTitle: '',
    testPrice: 0,
  });
  const [exploreModalState, setExploreModalState] = useState<{ isOpen: boolean; petType: 'cat' | 'dog' }>({
    isOpen: false,
    petType: 'cat',
  });

  const handleOpenBookingModal = (testTitle: string, price: number) => {
    setModalState({
      isOpen: true,
      testTitle,
      testPrice: price,
    });
  };

  const handleCloseBookingModal = () => {
    setModalState({
      isOpen: false,
      testTitle: '',
      testPrice: 0,
    });
  };

  const handleOpenExploreModal = (petType: 'cat' | 'dog') => {
    setExploreModalState({
      isOpen: true,
      petType,
    });
  };

  const handleCloseExploreModal = () => {
    setExploreModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleBookFromExplore = (testTitle: string, price: number) => {
    handleCloseExploreModal();
    handleOpenBookingModal(testTitle, price);
  };

  const handleScrollToBooking = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans pb-20 md:pb-0">
      {/* Top Banner & Header */}
      <Header onBookClick={handleScrollToBooking} />

      {/* Hero Section */}
      <HeroSection
        onBookNowClick={handleScrollToBooking}
        onFormSuccess={(title, msg) => setToast({ title, message: msg })}
      />

      {/* Pet Blood Testing Categories */}
      <PetCategoryCards onExploreClick={handleOpenExploreModal} />

      {/* 4-Step Home Diagnostic Process */}
      <ProcessSection />

      {/* Complete Package Tiers Section (Cat/Dog packages selector) */}
      <TestCatalog onOpenBookingModal={handleOpenBookingModal} onExploreClick={handleOpenExploreModal} />

      {/* Why Pet Parents Trust DeePet + Promise Banner + Newsletter */}
      <WhyTrustSection onSuccess={(title, msg) => setToast({ title, message: msg })} />

      {/* Real Care Stories Gallery */}
      <GallerySection />

      {/* Contact Us Form & Info Section */}
      <ContactSection onSuccess={(title, msg) => setToast({ title, message: msg })} />

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={modalState.isOpen}
        testTitle={modalState.testTitle}
        testPrice={modalState.testPrice}
        onClose={handleCloseBookingModal}
        onConfirm={(title, msg) => setToast({ title, message: msg })}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Explore Tests Modal */}
      <ExploreTestsModal
        isOpen={exploreModalState.isOpen}
        petType={exploreModalState.petType}
        onClose={handleCloseExploreModal}
        onBookTest={handleBookFromExplore}
      />

      {/* Sticky Call Now & WhatsApp Bottom Bar for Mobile (Image 1 style) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex gap-3 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.08)] animate-fade-in">
        <a
          href={`tel:${contactConfig.primaryPhone}`}
          className="flex-1 bg-[#1e88e5] hover:bg-[#1565c0] text-white py-2 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
        >
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span>Call Now</span>
        </a>
        <a
          href={`https://wa.me/${contactConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi DeePet Services, I want to know more about your services.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
        >
          <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </main>
  );
}
