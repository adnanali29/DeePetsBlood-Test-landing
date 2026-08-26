'use client';

import React, { useState } from 'react';
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

export default function Home() {
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
    <main className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
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
    </main>
  );
}
