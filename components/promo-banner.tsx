"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface PromoBannerProps {
  onExploreGifts: () => void;
}

interface BannerSlide {
  id: number;
  type: "image" | "composed";
  image?: string;
  bgGradient?: string;
  accentColor?: string;
  tagline?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  productImage?: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 0,
    type: "composed",
    bgGradient: "bg-gradient-to-r from-[#0b3320] via-[#0f432a] to-[#155938]",
    accentColor: "text-[#eed08e]",
    tagline: "Royal Heritage Collection",
    title: "Mysore Sandalwood & Oudh Agarbatti",
    subtitle: "Handcrafted with pure aged chandan, aromatic resins & natural oils",
    ctaText: "Explore Sandalwood",
    productImage: "/images/agarbatti-sandalwood.jpg",
  },
  {
    id: 1,
    type: "composed",
    bgGradient: "bg-gradient-to-r from-[#072818] via-[#0d3f27] to-[#125032]",
    accentColor: "text-[#eed08e]",
    tagline: "Sacred Devotion & Blessings",
    title: "Temple Floral & Rose Dhoop Sticks",
    subtitle: "Hand-rolled from sacred temple flowers, 100% charcoal-free & soothing",
    ctaText: "Order Now",
    productImage: "/images/agarbatti-temple-flora.jpg",
  },
  {
    id: 2,
    type: "composed",
    bgGradient: "bg-gradient-to-r from-[#051f13] via-[#0a351f] to-[#10472c]",
    accentColor: "text-[#eed08e]",
    tagline: "Festive Heirloom Gifting",
    title: "Royal Incense & Brass Urli Trunks",
    subtitle: "Handcrafted antique lotus burners paired with luxury agarbatti sets",
    ctaText: "View Festive Trunks",
    productImage: "/images/agarbatti-gift-hamper.jpg",
  },
];

export function PromoBanner({ onExploreGifts }: PromoBannerProps) {
  // Start with Slide 1 (Green Birthday Banner) active by default matching reference screenshot
  const [currentIndex, setCurrentIndex] = useState(1);
  const touchStartX = useRef<number | null>(null);

  // Auto-move: smoothly advances every 3.8s continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 40) handleNext();
    if (diff < -40) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      className="w-full bg-[#072515] bg-[url('/images/green-texture.png')] bg-repeat py-4 sm:py-6 overflow-hidden relative select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full max-w-[1440px] mx-auto px-2 sm:px-4">
        {/* Floating Left Navigation Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous banner"
          className="absolute left-2 sm:left-4 md:left-7 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-stone-200/80 flex items-center justify-center text-stone-700 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Floating Right Navigation Button */}
        <button
          onClick={handleNext}
          aria-label="Next banner"
          className="absolute right-2 sm:right-4 md:right-7 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-stone-200/80 flex items-center justify-center text-stone-700 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Carousel Track with Distinct Gap and Centered Active Slide */}
        <div className="relative flex items-center justify-center h-[210px] sm:h-[260px] md:h-[300px] lg:h-[320px]">
          {bannerSlides.map((slide, idx) => {
            // Determine relative position: 0 is active, -1 is left peek, 1 is right peek
            let position = idx - currentIndex;
            if (position < -1) position += bannerSlides.length;
            if (position > 1) position -= bannerSlides.length;

            const isActive = position === 0;
            const isLeft = position === -1;
            const isRight = position === 1;

            // Only render current, left neighbor, and right neighbor
            if (!isActive && !isLeft && !isRight) return null;

            return (
              <div
                key={slide.id}
                onClick={() => {
                  if (isLeft) handlePrev();
                  else if (isRight) handleNext();
                  else onExploreGifts();
                }}
                style={{
                  // Clear 22px gap between banners with no overlapping
                  transform: isActive
                    ? "translateX(0)"
                    : isLeft
                    ? "translateX(calc(-100% - 22px))"
                    : "translateX(calc(100% + 22px))",
                }}
                className={`absolute top-0 w-[82vw] sm:w-[78vw] md:w-[76vw] max-w-[1020px] h-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer ${
                  isActive
                    ? "z-20 shadow-[0_8px_30px_rgba(0,0,0,0.12)] opacity-100 ring-1 ring-stone-900/5"
                    : "z-10 shadow-xs opacity-90 hover:opacity-100"
                }`}
              >
                {/* Render Slide: Image type (exact match for reference green banner) */}
                {slide.type === "image" && slide.image && (
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={isActive}
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 85vw, 1024px"
                    />

                    {/* Transparent Clickable Hotspot over the "Order Now >" button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExploreGifts();
                      }}
                      aria-label="Order Now"
                      className="absolute left-[8%] bottom-[20%] w-[120px] sm:w-[140px] h-[36px] sm:h-[42px] rounded-full z-20 cursor-pointer opacity-0"
                    />
                  </div>
                )}

                {/* Render Slide: Composed type (Amber & Blue companion banners) */}
                {slide.type === "composed" && (
                  <div
                    className={`relative w-full h-full ${slide.bgGradient} flex items-center justify-between px-6 sm:px-12 md:px-16 overflow-hidden`}
                  >
                    {/* Subtle geometric 4-point star lattice overlay */}
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                        backgroundSize: "28px 28px",
                      }}
                    />

                    {/* Left Content */}
                    <div className="relative z-10 max-w-md text-white py-4 space-y-2 sm:space-y-3">
                      {slide.tagline && (
                        <span
                          className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase block ${slide.accentColor}`}
                        >
                          {slide.tagline}
                        </span>
                      )}
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold font-sans tracking-tight leading-tight">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed line-clamp-2">
                        {slide.subtitle}
                      </p>
                      <div className="pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onExploreGifts();
                          }}
                          className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-stone-900 text-xs sm:text-sm font-semibold rounded-full inline-flex items-center gap-1.5 shadow-sm hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          <span>{slide.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Product Image */}
                    {slide.productImage && (
                      <div className="relative w-[36%] h-[82%] shrink-0 rounded-2xl overflow-hidden shadow-xl hidden sm:block border border-white/20">
                        <Image
                          src={slide.productImage}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          sizes="400px"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
