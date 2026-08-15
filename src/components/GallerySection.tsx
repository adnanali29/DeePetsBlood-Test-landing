'use client';

import React from 'react';
import Image from 'next/image';

export const GallerySection: React.FC = () => {
  const galleryItems = [
    {
      title: 'Golden Retriever Home Visit 🐾',
      src: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=500',
    },
    {
      title: 'Relaxed Feline Blood Screening 🐈',
      src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500',
    },
    {
      title: 'Professional Vet Consultation 🩺',
      src: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=500',
    },
    {
      title: 'Delighted Pet Parents 💙',
      src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-deepblue-600 font-extrabold text-xs uppercase tracking-widest bg-deepblue-100 px-4 py-1.5 rounded-full">
          Real Care Stories
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-3 mb-10">
          Happy Pets Receiving Gentle Home Care
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <div key={idx} className="h-52 sm:h-64 rounded-3xl overflow-hidden shadow-md group relative">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white text-xs font-bold z-10">
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
