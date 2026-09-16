"use client";

import Image from "next/image";
import { ArrowRight, Gift, Award, ShieldCheck, Truck } from "lucide-react";

interface HeroProps {
  onRequestQuote: () => void;
  onExploreGifts: () => void;
}

export function Hero({ onRequestQuote, onExploreGifts }: HeroProps) {
  const trustFeatures = [
    {
      icon: Gift,
      title: "Bulk Orders",
      subtitle: "Made Easy",
    },
    {
      icon: Award,
      title: "Brand",
      subtitle: "Customization",
    },
    {
      icon: ShieldCheck,
      title: "Premium",
      subtitle: "Quality",
    },
    {
      icon: Truck,
      title: "Nationwide",
      subtitle: "Delivery",
    },
  ];

  return (
    <section
      id="home"
      className="relative w-full bg-white overflow-hidden min-h-[680px] md:min-h-[740px] lg:min-h-[820px] flex items-center pt-8 pb-16 lg:py-20"
    >
      {/* Right-Side Hero Scene Image */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] xl:w-[60%] h-full pointer-events-none z-0">
        <Image
          src="/images/kurma-hero-large.jpg"
          alt="Kurma Luxury Corporate Gift Box Presentation"
          fill
          priority
          className="object-cover object-[70%_center] lg:object-[74%_center] xl:object-[78%_center]"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        {/* Soft edge blend into white */}
        <div className="absolute inset-y-0 left-0 w-32 sm:w-48 bg-linear-to-r from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Left Section - Substantially Increased Scale */}
        <div className="max-w-2xl lg:max-w-[560px] xl:max-w-[640px] space-y-7">
          {/* Eyebrow */}
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#c0881b] uppercase">
              PREMIUM CORPORATE GIFTING
            </span>
          </div>

          {/* Headline - Big, Commanding & Elegant */}
          <h1 className="text-5xl sm:text-6xl lg:text-[64px] xl:text-[72px] font-serif font-normal text-stone-900 leading-[1.06] tracking-tight">
            Thoughtful Gifts. <br />
            <span className="italic font-normal text-[#c0881b]">
              Strong Impressions.
            </span>
          </h1>

          {/* Delicate Gold Diamond Divider matching Image 1 */}
          <div className="flex items-center gap-4 py-1">
            <div className="h-[1.5px] w-32 bg-[#eed08e]" />
            <div className="w-3 h-3 rotate-45 border border-[#c0881b] bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#c0881b]" />
            </div>
            <div className="h-[1.5px] w-32 bg-[#eed08e]" />
          </div>

          {/* Subtext - Increased Font Size */}
          <p className="text-stone-600 text-base sm:text-lg lg:text-[19px] leading-relaxed font-sans max-w-xl">
            Elevate relationships and show appreciation with curated, branded
            gifts that leave a lasting impact on employees, clients, and
            partners.
          </p>

          {/* Action Buttons - Larger Scale */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreGifts}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#c0881b] hover:bg-[#a97514] text-white text-base sm:text-[17px] font-medium rounded-lg shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98] group"
            >
              <span>Explore Corporate Gifts</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              onClick={onRequestQuote}
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 hover:text-[#c0881b] text-base sm:text-[17px] font-medium rounded-lg border border-stone-300 hover:border-[#c0881b] transition-all duration-200 shadow-2xs active:scale-[0.98]"
            >
              Request a Quote
            </button>
          </div>

          {/* Trust Features Bar - Larger Icons and Text */}
          <div className="pt-10 mt-6 border-t border-stone-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/80">
              {trustFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 ${idx !== 0 ? "sm:pl-5" : ""} ${idx >= 2 ? "pt-4 sm:pt-0" : ""}`}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-[#eed08e] bg-[#fbf6ea] flex items-center justify-center shrink-0 text-[#c0881b]">
                    <feat.icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-semibold text-stone-900 leading-tight">
                      {feat.title}
                    </span>
                    <span className="text-[11px] sm:text-xs text-stone-500 leading-tight mt-0.5">
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
