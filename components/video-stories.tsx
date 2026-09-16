"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

interface StoryItem {
  id: number;
  title: string;
  image: string;
  caption: string;
  price: number;
}

interface VideoStoriesProps {
  onAddToCart?: (item: { id: string; name: string; price: number; image: string; quantity: number }) => void;
  onExploreProducts?: () => void;
}

const storiesData: StoryItem[] = [
  {
    id: 1,
    title: "Mysore Sandalwood Ritual",
    image: "/images/agarbatti-sandalwood.jpg",
    caption: "Pure aged chandan incense burning with delicate soothing aromatic smoke.",
    price: 550,
  },
  {
    id: 2,
    title: "Temple Flora & Rose Bathi",
    image: "/images/agarbatti-temple-flora.jpg",
    caption: "Sacred consecrated temple flowers hand-rolled into pure fragrant sticks.",
    price: 480,
  },
  {
    id: 3,
    title: "Handcrafted Lotus Burner",
    image: "/images/agarbatti-brass-burner.jpg",
    caption: "Antique brass lotus incense holder with fragrant white smoke spirals.",
    price: 1450,
  },
  {
    id: 4,
    title: "Imperial Incense Gift Trunk",
    image: "/images/agarbatti-gift-hamper.jpg",
    caption: "Luxury festive velvet trunk unboxing with assorted fragrances & brass diya.",
    price: 2950,
  },
  {
    id: 5,
    title: "Artisanal Charcoal-Free Oudh",
    image: "/images/agarbatti-hero.jpg",
    caption: "100% natural organic incense cylinders with zero eye-stinging soot.",
    price: 890,
  },
];

export function VideoStories({ onAddToCart, onExploreProducts }: VideoStoriesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fullscreen video modal state
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleOpenModal = (index: number) => {
    setActiveStoryIndex(index);
  };

  const handleCloseModal = () => {
    setActiveStoryIndex(null);
  };

  return (
    <section className="w-full bg-[#072515] bg-[url('/images/green-texture.png')] bg-repeat py-12 sm:py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight font-normal">
            Sacred Incense &amp; Gifting Stories
          </h2>
          <div className="h-0.5 w-24 bg-[#eed08e] mt-2.5" />
        </div>

        {/* Carousel Wrapper */}
        <div className="relative group/carousel">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous stories"
              className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-stone-200/80 flex items-center justify-center text-stone-700 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow Button matching the screenshot */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next stories"
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-stone-200/80 flex items-center justify-center text-stone-700 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          )}

          {/* Story Cards Horizontal Scroll Row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto scrollbar-none pb-4 pt-1 px-1 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {storiesData.map((story, index) => (
              <div
                key={story.id}
                onClick={() => handleOpenModal(index)}
                className="relative w-[190px] sm:w-[215px] lg:w-[230px] aspect-[9/15.5] h-[340px] sm:h-[380px] lg:h-[410px] shrink-0 rounded-2xl sm:rounded-[22px] overflow-hidden shadow-xs hover:shadow-xl border border-[#eed08e]/30 hover:border-[#eed08e] group select-none bg-stone-900 transition-all duration-300 cursor-pointer"
              >
                {/* Clean Image Only */}
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 190px, (max-width: 1024px) 215px, 230px"
                  priority={index < 3}
                />

                {/* Subtle soft gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20 pointer-events-none group-hover:opacity-75 transition-opacity" />

                {/* Centered Play Button Only */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/40 group-hover:bg-black/60 backdrop-blur-xs flex items-center justify-center text-white transition-all transform group-hover:scale-110 shadow-lg border border-white/20">
                    <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULLSCREEN STORY MODAL */}
      {activeStoryIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            aria-label="Close story"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Arrow to Previous Story */}
          {activeStoryIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveStoryIndex((curr) =>
                  curr !== null && curr > 0 ? curr - 1 : curr
                );
              }}
              aria-label="Previous story"
              className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow to Next Story */}
          {activeStoryIndex < storiesData.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveStoryIndex((curr) =>
                  curr !== null && curr < storiesData.length - 1
                    ? curr + 1
                    : curr
                );
              }}
              aria-label="Next story"
              className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Vertical Reel Phone Frame */}
          <div
            className="relative w-full max-w-[390px] h-[82vh] max-h-[780px] rounded-3xl overflow-hidden bg-stone-950 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0">
              <Image
                src={storiesData[activeStoryIndex].image}
                alt={storiesData[activeStoryIndex].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
            </div>

            {/* Header */}
            <div className="relative z-20 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#c0881b] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  K
                </div>
                <div>
                  <h5 className="text-xs font-bold leading-tight">Kurma</h5>
                  <span className="text-[10px] text-white/80 block">
                    Joyful Gifting Stories
                  </span>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Drawer */}
            <div className="relative z-20 p-4 space-y-2.5">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-stone-200">
                <h4 className="text-sm font-bold text-stone-900">
                  {storiesData[activeStoryIndex].title}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {storiesData[activeStoryIndex].caption}
                </p>
                <button
                  onClick={() => {
                    const story = storiesData[activeStoryIndex];
                    handleCloseModal();
                    if (onAddToCart) {
                      onAddToCart({
                        id: `story-${story.id}`,
                        name: story.title,
                        price: story.price,
                        image: story.image,
                        quantity: 1,
                      });
                    }
                  }}
                  className="mt-3 w-full py-2.5 px-4 bg-[#c0881b] hover:bg-[#a67211] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart • ₹{storiesData[activeStoryIndex].price}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
