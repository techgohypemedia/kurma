"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Plus, Check } from "lucide-react";

interface ProductShowcaseProps {
  onAddToCart: (item: { id: string; name: string; price: number }) => void;
  onRequestQuote: () => void;
}

export function ProductShowcase({ onAddToCart, onRequestQuote }: ProductShowcaseProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    {
      id: "cat-1",
      title: "GOURMET GIFT BASKETS",
      description: "Indulgent treats for every celebration and milestone.",
      image: "/images/cat-gourmet-basket.jpg",
    },
    {
      id: "cat-2",
      title: "PERSONALIZED DESK CLOCKS",
      description: "Timeless desk pieces that make a statement.",
      image: "/images/cat-desk-clock.jpg",
    },
    {
      id: "cat-3",
      title: "CUSTOM-BRANDED WIRELESS CHARGERS",
      description: "Modern, useful, and branded with your identity.",
      image: "/images/cat-wireless-charger.jpg",
    },
    {
      id: "cat-4",
      title: "LUXURY SCENTED CANDLES",
      description: "Sophisticated scents to inspire and relax.",
      image: "/images/cat-scented-candle.jpg",
    },
    {
      id: "cat-5",
      title: "ECO-FRIENDLY BAMBOO DESK ORGANIZERS",
      description: "Sustainable solutions for organized workspaces.",
      image: "/images/cat-bamboo-organizer.jpg",
    },
  ];

  const signaturePicks = [
    {
      id: "pick-1",
      title: "Executive Gourmet Gift Basket",
      price: 2950,
      priceDisplay: "₹2,950",
      image: "/images/cat-gourmet-basket.jpg",
    },
    {
      id: "pick-2",
      title: "Personalized Executive Desk Clock",
      price: 1850,
      priceDisplay: "₹1,850",
      image: "/images/cat-desk-clock.jpg",
    },
    {
      id: "pick-3",
      title: "Custom Wireless Charging Pad",
      price: 1250,
      priceDisplay: "₹1,250",
      image: "/images/cat-wireless-charger.jpg",
    },
    {
      id: "pick-4",
      title: "Luxury Scented Candle",
      price: 1450,
      priceDisplay: "₹1,450",
      image: "/images/cat-scented-candle.jpg",
    },
    {
      id: "pick-5",
      title: "Bamboo Desk Organizer",
      price: 1750,
      priceDisplay: "₹1,750",
      image: "/images/cat-bamboo-organizer.jpg",
    },
  ];

  const handlePlusClick = (pick: typeof signaturePicks[0]) => {
    onAddToCart({ id: pick.id, name: pick.title, price: pick.price });
    setAddedId(pick.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="w-full bg-white py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* SECTION 1: Shop by Category */}
        <section>
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-stone-900 font-normal">
              Shop by Category
            </h2>
            {/* Delicate Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-3 mt-2.5">
              <div className="h-px w-20 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#c0881b] bg-white flex items-center justify-center">
                <div className="w-1 h-1 bg-[#c0881b]" />
              </div>
              <div className="h-px w-20 bg-[#eed08e]" />
            </div>
          </div>

          {/* Categories Grid (5 columns on desktop, compact card height) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-lg border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#eed08e] transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={onRequestQuote}
              >
                {/* Image - Compact 4:3 aspect ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-50">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>

                {/* Content - Streamlined compact padding */}
                <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[10.5px] font-bold text-stone-900 tracking-wider uppercase mb-1 leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-[10px] sm:text-[10.5px] text-stone-500 leading-snug line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Arrow Action Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      aria-label={`Explore ${cat.title}`}
                      className="w-6 h-6 rounded-full bg-[#f7e8c4] group-hover:bg-[#eed08e] text-[#c0881b] flex items-center justify-center transition-colors"
                    >
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Our Signature Picks */}
        <section>
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-stone-900 font-normal">
              Our Signature Picks
            </h2>
            {/* Delicate Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-3 mt-2.5">
              <div className="h-px w-20 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#c0881b] bg-white flex items-center justify-center">
                <div className="w-1 h-1 bg-[#c0881b]" />
              </div>
              <div className="h-px w-20 bg-[#eed08e]" />
            </div>
          </div>

          {/* Signature Picks Grid (5 columns on desktop, compact card height) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {signaturePicks.map((pick) => (
              <div
                key={pick.id}
                className="bg-white rounded-lg border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#eed08e] transition-all duration-300 flex flex-col group"
              >
                {/* Image - Compact 4:3 aspect ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-50">
                  <Image
                    src={pick.image}
                    alt={pick.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>

                {/* Content - Streamlined compact padding */}
                <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                  <h3 className="text-[11px] font-medium text-stone-900 leading-snug mb-2 line-clamp-1">
                    {pick.title}
                  </h3>

                  {/* Price and Add Button */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-stone-900 tracking-tight">
                      {pick.priceDisplay}
                    </span>

                    <button
                      onClick={() => handlePlusClick(pick)}
                      aria-label={`Add ${pick.title} to curation`}
                      className={`w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all ${
                        addedId === pick.id
                          ? "bg-emerald-600 text-white"
                          : "bg-[#f7e8c4] hover:bg-[#eed08e] text-[#c0881b]"
                      }`}
                    >
                      {addedId === pick.id ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
