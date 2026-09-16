"use client";

import Image from "next/image";
import { ArrowRight, Leaf, Flame, ShieldCheck, Truck } from "lucide-react";

interface HeroProps {
  onExploreGifts: () => void;
  onExploreBestsellers?: () => void;
}

export function Hero({ onExploreGifts, onExploreBestsellers }: HeroProps) {
  const trustFeatures = [
    {
      icon: Leaf,
      title: "100% Organic",
      subtitle: "Charcoal-Free",
    },
    {
      icon: Flame,
      title: "Pure Mysore",
      subtitle: "Sandalwood & Resins",
    },
    {
      icon: ShieldCheck,
      title: "60+ Mins",
      subtitle: "Long Burning",
    },
    {
      icon: Truck,
      title: "Nationwide",
      subtitle: "Care Delivery",
    },
  ];

  return (
    <section
      id="home"
      className="relative w-full bg-[#072515] bg-[url('/images/green-texture.png')] bg-repeat overflow-hidden min-h-[680px] md:min-h-[740px] lg:min-h-[820px] flex items-center pt-8 pb-16 lg:py-20 text-white"
    >
      {/* Right-Side Hero Scene Image - Agarbatti with Smoke & Brass Burner */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] xl:w-[60%] h-full pointer-events-none z-0">
        <Image
          src="/images/agarbatti-hero.jpg"
          alt="Artisanal Agarbatti and Brass Lotus Incense Burner"
          fill
          priority
          className="object-cover object-[70%_center] lg:object-[74%_center] xl:object-[78%_center]"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        {/* Soft edge blend into deep green */}
        <div className="absolute inset-y-0 left-0 w-36 sm:w-56 bg-linear-to-r from-[#072515] via-[#072515]/85 to-transparent pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Left Section */}
        <div className="max-w-2xl lg:max-w-[560px] xl:max-w-[640px] space-y-7">
          {/* Eyebrow */}
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#eed08e] uppercase">
              ARTISANAL TEMPLE INCENSE &amp; AGARBATTI
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-[64px] xl:text-[72px] font-serif font-normal text-white leading-[1.06] tracking-tight">
            Sacred Aromas. <br />
            <span className="italic font-normal text-[#eed08e]">
              Pure Devotion.
            </span>
          </h1>

          {/* Delicate Gold Diamond Divider */}
          <div className="flex items-center gap-4 py-1">
            <div className="h-[1.5px] w-32 bg-[#eed08e]" />
            <div className="w-3 h-3 rotate-45 border border-[#eed08e] bg-[#072515] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#eed08e]" />
            </div>
            <div className="h-[1.5px] w-32 bg-[#eed08e]" />
          </div>

          {/* Subtext */}
          <p className="text-stone-200 text-base sm:text-lg lg:text-[19px] leading-relaxed font-sans max-w-xl">
            Handcrafted with pure Mysore sandalwood, sacred temple flowers, and organic essential oils. 100% charcoal-free luxury agarbatti and dhoop sticks for divine rituals, mindfulness, and sacred living.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreGifts}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#c0881b] hover:bg-[#a97514] text-white text-base sm:text-[17px] font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] group cursor-pointer"
            >
              <span>Explore Incense Collection</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreBestsellers || onExploreGifts}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0a311d]/70 hover:bg-[#0e3d25] text-white text-base sm:text-[17px] font-medium rounded-lg border border-[#eed08e]/50 hover:border-[#eed08e] transition-all duration-200 shadow-2xs active:scale-[0.98] cursor-pointer"
            >
              View Best Sellers
            </button>
          </div>

          {/* Trust Features Bar */}
          <div className="pt-10 mt-6 border-t border-[#eed08e]/20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#eed08e]/20">
              {trustFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 ${idx !== 0 ? "sm:pl-5" : ""} ${idx >= 2 ? "pt-4 sm:pt-0" : ""}`}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-[#eed08e]/60 bg-[#0b331f] flex items-center justify-center shrink-0 text-[#eed08e]">
                    <feat.icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-semibold text-white leading-tight">
                      {feat.title}
                    </span>
                    <span className="text-[11px] sm:text-xs text-stone-300 leading-tight mt-0.5">
                      {feat.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
