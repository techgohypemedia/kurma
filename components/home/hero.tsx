"use client";

import Image from "next/image";
import { ArrowRight, Leaf, Flame, ShieldCheck, PenTool } from "lucide-react";

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
      title: "5 Sacred Elements",
      subtitle: "Pure Resins",
    },
    {
      icon: ShieldCheck,
      title: "Solid Cast Brass",
      subtitle: "Turtle Stand",
    },
    {
      icon: PenTool,
      title: "Bespoke Engraving",
      subtitle: "Every SKU",
    },
  ];

  return (
    <section
      id="home"
      className="relative w-full bg-[#072515] bg-[url('/images/textures/green-texture.png')] bg-repeat overflow-hidden min-h-[640px] md:min-h-[700px] lg:min-h-[760px] flex flex-col justify-between text-white"
    >
      {/* Hero Showcase Area (Copy on left, Marble trunk image on right) */}
      <div className="relative flex-1 flex items-center py-10 sm:py-14 lg:py-18">
        {/* Right-Side Hero Scene Image - Kurma Luxury Collection & Marble Gift Box */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[54%] xl:w-[58%] h-full pointer-events-none z-0">
          <Image
            src="/images/product/image9.png"
            alt="Kurma Elements in Harmony Luxury Marble Gift Box"
            fill
            priority
            className="object-cover object-[70%_center] lg:object-[72%_center]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          {/* Soft edge blend into deep green */}
          <div className="absolute inset-y-0 left-0 w-48 sm:w-80 lg:w-96 bg-linear-to-r from-[#072515] via-[#072515]/95 to-transparent pointer-events-none" />
        </div>

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 z-10">
          {/* Left Copy Section */}
          <div className="max-w-2xl lg:max-w-[580px] xl:max-w-[660px] space-y-7">
            {/* Eyebrow */}
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#eed08e] uppercase">
                SCENTS CONNECT WORLDS • PURE FRAGRANCE
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[66px] font-serif font-normal text-white leading-[1.08] tracking-tight">
              Elements in Harmony. <br />
              <span className="italic font-normal text-[#eed08e]">
                Higher Consciousness.
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
            <p className="text-stone-200 text-base sm:text-lg leading-relaxed font-sans max-w-xl">
              Introducing Kurma&apos;s initial product suite — the iconic Green Marble &amp; MDF Gift Trunks, 5 Elemental Fragrance Boxes (Earth, Water, Fire, Air, Space), solid brass turtle incense stands, and silk pashmina pocket squares.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreGifts}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#c0881b] hover:bg-[#a97514] text-white text-base sm:text-[17px] font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] group cursor-pointer"
              >
                <span>Explore Initial Collection</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreBestsellers || onExploreGifts}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0a311d]/70 hover:bg-[#0e3d25] text-white text-base sm:text-[17px] font-medium rounded-lg border border-[#eed08e]/50 hover:border-[#eed08e] transition-all duration-200 shadow-2xs active:scale-[0.98] cursor-pointer"
              >
                View Marble Trunk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Features Bar - Full Width, Generous Spacing, Centered, One Line */}
      <div className="relative z-10 w-full border-t border-[#eed08e]/25 bg-[#04190e]/92 backdrop-blur-md py-4 sm:py-5">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-start lg:justify-between overflow-x-auto no-scrollbar gap-4 lg:gap-0 lg:grid lg:grid-cols-4 lg:divide-x divide-[#eed08e]/20">
            {trustFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-2.5 sm:gap-3 shrink-0 whitespace-nowrap px-4 sm:px-6 lg:px-3 xl:px-6 py-1"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[#eed08e]/50 bg-[#0b331f] flex items-center justify-center shrink-0 text-[#eed08e] shadow-xs">
                  <feat.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.6]" />
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-xs sm:text-[13px] font-semibold text-white tracking-wide">
                    {feat.title}
                  </span>
                  <span className="text-[#eed08e]/60 text-xs">•</span>
                  <span className="text-[11px] sm:text-xs text-[#eed08e] font-medium">
                    {feat.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
