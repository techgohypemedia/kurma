"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Leaf,
  Flame,
  Sparkles,
  ShieldCheck,
  Check,
  ShoppingBag,
} from "lucide-react";

interface SolutionsAndTrustProps {
  onAddToCart?: (item: { id: string; name: string; price: number; image: string; quantity: number }) => void;
  onExploreProducts?: () => void;
}

export function SolutionsAndTrust({ onAddToCart, onExploreProducts }: SolutionsAndTrustProps) {
  const [addedIdx, setAddedIdx] = useState<number | null>(null);

  const giftHampers = [
    {
      id: "hamper-1",
      title: "MINDFULNESS SANDALWOOD HAMPER",
      description: "Aged Mysore chandan sticks, brass lotus stand & organic dhoop.",
      price: 950,
      priceDisplay: "₹950",
      image: "/images/agarbatti-sandalwood.jpg",
    },
    {
      id: "hamper-2",
      title: "SACRED TEMPLE BLESSINGS TRUNK",
      description: "Consecrated temple mogra & rose bathi in velvet keepsake box.",
      price: 1450,
      priceDisplay: "₹1,450",
      image: "/images/agarbatti-hero.jpg",
    },
    {
      id: "hamper-3",
      title: "ANTIQUE BRASS LOTUS & OUDH BOX",
      description: "Heirloom handcrafted brass burner paired with rich Assam oudh.",
      price: 2250,
      priceDisplay: "₹2,250",
      image: "/images/agarbatti-brass-burner.jpg",
    },
    {
      id: "hamper-4",
      title: "ROYAL FESTIVE INCENSE & URLI SET",
      description: "Grand brass pooja urli, assorted artisanal bathi & brass diya.",
      price: 3850,
      priceDisplay: "₹3,850",
      image: "/images/agarbatti-gift-hamper.jpg",
    },
  ];

  const pillars = [
    {
      num: "01",
      icon: Leaf,
      title: "100% Pure & Natural",
      desc: "Pure aged sandalwood, aromatic herbs, and sacred tree resins.",
    },
    {
      num: "02",
      icon: Flame,
      title: "Zero Toxic Charcoal",
      desc: "Clean white fragrant smoke with zero headache or black soot.",
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Temple Petals",
      desc: "Sacred consecrated temple flowers hand-rolled with devotion.",
    },
    {
      num: "04",
      icon: Sparkles,
      title: "Express Delivery",
      desc: "Safe fragile-proof doorstep delivery across India in 2-4 days.",
    },
  ];

  const handleAddHamper = (item: typeof giftHampers[0], idx: number) => {
    if (onAddToCart) {
      onAddToCart({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
      setAddedIdx(idx);
      setTimeout(() => setAddedIdx(null), 1500);
    }
  };

  return (
    <div className="w-full bg-[#072515] bg-[url('/images/green-texture.png')] bg-repeat pb-24 space-y-20 text-white">
      {/* Top Centered CTA Button: View All Products */}
      <div className="flex justify-center -mt-2">
        <button
          onClick={onExploreProducts}
          className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white hover:bg-stone-50 text-stone-900 text-xs sm:text-sm font-medium rounded-md border border-stone-200 hover:border-[#eed08e] transition-all shadow-md group cursor-pointer"
        >
          <span>Explore All Incense Sticks</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#c0881b]" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* SECTION 1: Sacred Gift Hampers */}
        <section id="solutions">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif text-white font-normal">
              Sacred Gift Hampers &amp; Collections
            </h2>
            {/* Elegant Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-2 mt-2.5">
              <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#eed08e] bg-[#072515] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#eed08e]" />
              </div>
              <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
            </div>
          </div>

          {/* 4 Hampers Grid with Crisp White Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {giftHampers.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 overflow-hidden shadow-md hover:shadow-2xl hover:border-amber-400/80 transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-center relative bg-white">
                  <div>
                    <h3 className="text-[11px] sm:text-xs font-bold text-stone-900 tracking-wider uppercase mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed max-w-[210px] mx-auto">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-3">
                    <span className="text-xs sm:text-sm font-bold text-stone-900">
                      {item.priceDisplay}
                    </span>

                    <button
                      onClick={() => handleAddHamper(item, idx)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        addedIdx === idx
                          ? "bg-emerald-600 text-white"
                          : "bg-[#fbf6ea] hover:bg-[#eed08e] text-[#c0881b]"
                      }`}
                    >
                      {addedIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Why Customers Choose Kurma */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif text-white font-normal">
              Why Thousands Choose Kurma Incense
            </h2>
            {/* Elegant Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-2 mt-2.5">
              <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#eed08e] bg-[#072515] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#eed08e]" />
              </div>
              <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
            </div>
          </div>

          {/* 4 Process Capsules with Crisp White Background */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-1.5">
            {pillars.map((step, idx) => (
              <div key={idx} className="flex items-center w-full lg:w-auto">
                {/* Capsule */}
                <div className="w-full lg:w-[245px] xl:w-[260px] bg-white rounded-full border border-stone-200/90 hover:border-amber-400 px-4 py-3 flex items-center gap-3.5 shadow-md hover:shadow-lg transition-all">
                  {/* Left Circle Icon */}
                  <div className="w-11 h-11 rounded-full border border-amber-200 bg-[#fbf6ea] flex items-center justify-center text-[#c0881b] shrink-0">
                    <step.icon className="w-5 h-5 stroke-[1.6]" />
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
                {idx < pillars.length - 1 && (
                  <div className="hidden lg:flex items-center px-1 text-[#eed08e] shrink-0">
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
