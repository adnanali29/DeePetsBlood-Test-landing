'use client';

import { useApp } from '@/context/AppContext';

export const GallerySection: React.FC = () => {
  const { testimonials } = useApp();

  // Duplicate the array to ensure a seamless infinite scroll width
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="why-trust" className="py-20 bg-slate-50 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        
        {/* 4.9/5 Rating Badge at the top center, exactly matching the reference design */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-sm text-xs sm:text-sm font-extrabold text-slate-800">
            <div className="flex items-center gap-0.5 text-lime-500 font-bold text-sm sm:text-base">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <span>4.9/5 Rating</span>
          </div>
        </div>

        <span className="text-deepblue-600 font-extrabold text-xs uppercase tracking-widest bg-deepblue-100 px-4 py-1.5 rounded-full">
          Real Care Stories
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-4">
          What Pet Parents Say About Us
        </h2>
        <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2 font-medium">
          Hear from our community of loving pet owners who choose stress-free, accurate doorstep care.
        </p>
      </div>

      {/* Infinite Horizontal Scrolling Slider Container */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        
        {/* Soft horizontal ambient gradient fade for premium layout */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-6 flex">
          {duplicatedTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 w-[350px] sm:w-[380px] flex-shrink-0 flex flex-col justify-between h-[230px] transition-all hover:shadow-md hover:border-slate-200/50"
            >
              {/* Star Rating & Score */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-lime-500 text-xs sm:text-sm font-bold">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span className="text-slate-400 text-[10px] sm:text-xs font-extrabold tracking-tight bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                  {item.score}
                </span>
              </div>

              {/* Review Text block */}
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic my-4 flex-grow flex items-center text-left">
                "{item.text}"
              </p>

              {/* Avatar profile line */}
              <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-auto">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 border border-slate-100 shadow-sm"
                />
                <div className="flex flex-col text-left">
                  <span className="text-slate-800 font-extrabold text-xs sm:text-sm">{item.name}</span>
                  <span className="text-slate-400 text-[10px] sm:text-[11px] font-bold tracking-wide mt-0.5">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
