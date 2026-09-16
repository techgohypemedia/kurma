"use client";

import Image from "next/image";
import {
  ArrowRight,
  Users,
  SlidersHorizontal,
  FileEdit,
  ShieldCheck,
} from "lucide-react";

interface SolutionsAndTrustProps {
  onRequestQuote: () => void;
}

export function SolutionsAndTrust({ onRequestQuote }: SolutionsAndTrustProps) {
  const solutions = [
    {
      title: "EMPLOYEE ONBOARDING",
      description: "Warm welcomes that build belonging from day one.",
      image: "/images/kurma-onboarding-box.jpg",
    },
    {
      title: "CLIENT APPRECIATION",
      description: "Strengthen relationships with meaningful gestures.",
      image: "/images/kurma-gift-box.jpg",
    },
    {
      title: "EXECUTIVE GIFTS",
      description: "Premium gifts for leaders and top performers.",
      image: "/images/kurma-hero-box.jpg",
    },
    {
      title: "EVENT & CONFERENCE GIFTS",
      description: "Memorable giveaways that represent your brand.",
      image: "/images/kurma-festive-box.jpg",
    },
  ];

  const steps = [
    {
      num: "01",
      icon: Users,
      title: "Consult & Curate",
      desc: "Share your needs and we recommend the best options.",
    },
    {
      num: "02",
      icon: SlidersHorizontal,
      title: "Customize",
      desc: "Add your logo, message, and branding elements.",
    },
    {
      num: "03",
      icon: FileEdit,
      title: "Review & Approve",
      desc: "We share previews for your approval.",
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Deliver With Care",
      desc: "Nationwide delivery, on-time, every time.",
    },
  ];

  return (
    <div className="w-full bg-white pb-24 space-y-20">
      {/* Top Centered CTA Button: View All Products */}
      <div className="flex justify-center -mt-2">
        <button
          onClick={onRequestQuote}
          className="inline-flex items-center gap-2.5 px-6 py-2 bg-white hover:bg-[#fbf8f2] text-stone-700 text-xs sm:text-sm font-medium rounded-sm border border-[#c0881b]/70 hover:border-[#c0881b] transition-all shadow-2xs group cursor-pointer"
        >
          <span>View All Products</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-stone-600 group-hover:text-[#c0881b]" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* SECTION 1: Corporate Gifting Solutions */}
        <section id="solutions">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif text-stone-900 font-normal">
              Corporate Gifting Solutions
            </h2>
            {/* Elegant Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-2 mt-2.5">
              <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#c0881b] bg-white flex items-center justify-center">
                <div className="w-1 h-1 bg-[#c0881b]" />
              </div>
              <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
            </div>
          </div>

          {/* 4 Solutions Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((item, idx) => (
              <div
                key={idx}
                onClick={onRequestQuote}
                className="bg-white rounded-xl sm:rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#eed08e] transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Content - Centered text matching reference image */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-center relative">
                  <div>
                    <h3 className="text-[11px] sm:text-xs font-bold text-stone-900 tracking-wider uppercase mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed max-w-[210px] mx-auto">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow Action Button in bottom-right corner */}
                  <div className="flex justify-end pt-3">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#f4ebe1] group-hover:bg-[#eed08e] text-stone-600 group-hover:text-[#a97514] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Why Businesses Choose Us */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif text-stone-900 font-normal">
              Why Businesses Choose Us
            </h2>
            {/* Elegant Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-2 mt-2.5">
              <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#c0881b] bg-white flex items-center justify-center">
                <div className="w-1 h-1 bg-[#c0881b]" />
              </div>
              <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
            </div>
          </div>

          {/* 4 Process Capsules with Connecting Arrows */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-1.5">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center w-full lg:w-auto">
                {/* Capsule */}
                <div className="w-full lg:w-[245px] xl:w-[260px] bg-white rounded-full border border-[#e5d4b5] hover:border-[#c0881b] px-4 py-3 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-all">
                  {/* Left Circle Icon */}
                  <div className="w-11 h-11 rounded-full border border-[#eed08e] bg-[#fbf9f4] flex items-center justify-center text-stone-700 shrink-0">
                    <step.icon className="w-5 h-5 stroke-[1.6] text-stone-700" />
                  </div>
                  {/* Right Content */}
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-stone-400 block leading-tight">
                      {step.num}
                    </span>
                    <h4 className="text-xs sm:text-[13px] font-bold text-stone-900 truncate mt-0.5">
                      {step.title}
                    </h4>
                    <p className="text-[10px] sm:text-[10.5px] text-stone-500 leading-tight mt-0.5 line-clamp-2">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Connector Arrow for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex items-center px-1 text-[#c0881b] shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
