'use client';

interface PetCategoryCardsProps {
  onExploreClick?: (petType: 'cat' | 'dog') => void;
}

export const PetCategoryCards: React.FC<PetCategoryCardsProps> = ({ onExploreClick }) => {
  return (
    <section id="categories" className="py-10 lg:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Complete Blood Testing Solutions for Your Pets
          </h2>
          <p className="text-slate-500 mt-2 font-medium text-sm sm:text-base leading-relaxed">
            From routine checkups to advanced diagnostics, we help you stay ahead in your pet’s health journey.
          </p>
        </div>

        {/* 2 Cards: Pet heads pop OUT above card top border */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-6">
          
          {/* CATS CATEGORY CARD */}
          <div className="bg-[#fceef3] rounded-[2rem] p-5 sm:p-8 lg:p-10 relative flex flex-row items-center justify-between min-h-[200px] sm:min-h-[280px] shadow-sm border border-pink-100/80 group">
            
            {/* Cat Cutout Image: Anchored at left-0 bottom-0, head popping out top border */}
            <img
              src="/cat-image.png"
              alt="Cat Blood Testing"
              className="absolute bottom-0 left-0 h-[115%] sm:h-[135%] w-auto max-w-[42%] object-contain object-bottom z-20 pointer-events-none drop-shadow-xl rounded-bl-[2rem]"
            />

            {/* Cat Text Info & CTA - Right Aligned inside card (leaves space on the left for the absolute image) */}
            <div className="space-y-1.5 sm:space-y-3 text-right w-[58%] ml-auto relative z-30 flex flex-col items-end">
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#eb366d] font-heading leading-tight">
                Blood Tests for Cats
              </h3>
              <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm leading-relaxed font-medium">
                Detect early signs of illness and ensure a healthy, happy life for your feline friend.
              </p>
              <button
                onClick={() => onExploreClick?.('cat')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#eb366d] hover:bg-[#d4275b] text-white font-bold text-[10px] sm:text-xs md:text-sm shadow-md hover:shadow-pink-500/20 transition-all hover:scale-105 cursor-pointer mt-1.5 sm:mt-3"
              >
                <span>Explore Cat Tests</span>
                <span>🐾</span>
              </button>
            </div>

          </div>

          {/* DOGS CATEGORY CARD */}
          <div className="bg-[#eee8fd] rounded-[2rem] p-5 sm:p-8 lg:p-10 relative flex flex-row items-center justify-between min-h-[200px] sm:min-h-[280px] shadow-sm border border-purple-100/80 group">
            
            {/* Dog Text Info & CTA - Left Aligned inside card (leaves space on the right for the absolute image) */}
            <div className="space-y-1.5 sm:space-y-3 text-left w-[55%] mr-auto relative z-30 flex flex-col items-start">
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#653bf7] font-heading leading-tight">
                Blood Tests for Dogs
              </h3>
              <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm leading-relaxed font-medium">
                Monitor your dog’s health with accurate and reliable blood test panels.
              </p>
              <button
                onClick={() => onExploreClick?.('dog')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#653bf7] hover:bg-[#5024f5] text-white font-bold text-[10px] sm:text-xs md:text-sm shadow-md hover:shadow-purple-500/20 transition-all hover:scale-105 cursor-pointer mt-1.5 sm:mt-3"
              >
                <span>Explore Dog Tests</span>
                <span>🐾</span>
              </button>
            </div>

            {/* Dog Cutout Image: Anchored at right-0 bottom-0, head popping out top border */}
            <img
              src="/dog-image.png"
              alt="Dog Blood Testing"
              className="absolute bottom-0 right-0 h-[125%] sm:h-[150%] lg:h-[160%] w-auto max-w-[42%] object-contain object-bottom z-20 pointer-events-none drop-shadow-xl rounded-br-[2rem]"
            />

          </div>

        </div>
      </div>
    </section>
  );
};
