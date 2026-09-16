"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Plus, Check } from "lucide-react";

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  priceDisplay?: string;
  image: string;
  quantity?: number;
}

interface ProductShowcaseProps {
  onAddToCart: (item: ProductItem) => void;
}

export function ProductShowcase({ onAddToCart }: ProductShowcaseProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    {
      id: "cat-1",
      title: "MYSORE SANDALWOOD AGARBATTI",
      description: "Pure aged chandan with slow-burning divine aromatic bliss.",
      image: "/images/agarbatti-sandalwood.jpg",
    },
    {
      id: "cat-2",
      title: "SACRED TEMPLE FLORA & MOGRA",
      description: "Handcrafted with consecrated temple petals and natural herbs.",
      image: "/images/agarbatti-temple-flora.jpg",
    },
    {
      id: "cat-3",
      title: "ANTIQUE BRASS INCENSE BURNERS",
      description: "Heirloom lotus burners, urlis, and handcrafted pooja holders.",
      image: "/images/agarbatti-brass-burner.jpg",
    },
    {
      id: "cat-4",
      title: "ROYAL INCENSE GIFT TRUNKS",
      description: "Bespoke festive trunks with glass vials and dhoop cones.",
      image: "/images/agarbatti-gift-hamper.jpg",
    },
    {
      id: "cat-5",
      title: "ORGANIC CHARCOAL-FREE AGARBATTI",
      description: "100% natural essential oils with zero toxic black smoke.",
      image: "/images/agarbatti-hero.jpg",
    },
  ];

  const signaturePicks = [
    {
      id: "pick-1",
      title: "Royal Mysore Sandalwood Agarbatti (Pack of 50)",
      price: 550,
      priceDisplay: "₹550",
      image: "/images/agarbatti-sandalwood.jpg",
    },
    {
      id: "pick-2",
      title: "Vastu Deva Temple Flora & Rose Bathi",
      price: 480,
      priceDisplay: "₹480",
      image: "/images/agarbatti-temple-flora.jpg",
    },
    {
      id: "pick-3",
      title: "Handcrafted Antique Brass Lotus Burner",
      price: 1450,
      priceDisplay: "₹1,450",
      image: "/images/agarbatti-brass-burner.jpg",
    },
    {
      id: "pick-4",
      title: "Imperial Royal Incense Festive Trunk",
      price: 2950,
      priceDisplay: "₹2,950",
      image: "/images/agarbatti-gift-hamper.jpg",
    },
    {
      id: "pick-5",
      title: "Aromatha Pure Oudh & Sandalwood Cylinders",
      price: 890,
      priceDisplay: "₹890",
      image: "/images/agarbatti-hero.jpg",
    },
  ];

  const scrollToBestsellers = () => {
    const el = document.getElementById("bestsellers");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlusClick = (pick: typeof signaturePicks[0]) => {
    onAddToCart({
      id: pick.id,
      name: pick.title,
      price: pick.price,
      priceDisplay: pick.priceDisplay,
      image: pick.image,
      quantity: 1,
    });
    setAddedId(pick.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="w-full bg-[#072515] bg-[url('/images/green-texture.png')] bg-repeat py-12 space-y-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* SECTION 1: Shop by Category */}
        <section>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-white font-normal">
              Shop by Category
            </h2>
            {/* Delicate Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-3 mt-2.5">
              <div className="h-px w-20 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#eed08e] bg-[#072515] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#eed08e]" />
              </div>
              <div className="h-px w-20 bg-[#eed08e]" />
            </div>
          </div>

          {/* Categories Grid with Crisp White Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-md hover:shadow-2xl hover:border-amber-400/80 transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={scrollToBestsellers}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>

                {/* Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-[11px] font-bold text-stone-900 tracking-wider uppercase mb-1.5 leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-[10.5px] sm:text-[11px] text-stone-600 leading-snug line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Arrow Action Button */}
                  <div className="flex justify-end pt-3">
                    <span
                      aria-label={`Explore ${cat.title}`}
                      className="w-6 h-6 rounded-full bg-[#fbf6ea] group-hover:bg-[#eed08e] text-[#c0881b] flex items-center justify-center transition-colors"
                    >
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Our Signature Picks */}
        <section id="bestsellers">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-white font-normal">
              Our Signature Picks
            </h2>
            {/* Delicate Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-3 mt-2.5">
              <div className="h-px w-20 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#eed08e] bg-[#072515] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#eed08e]" />
              </div>
              <div className="h-px w-20 bg-[#eed08e]" />
            </div>
          </div>

          {/* Signature Picks Grid with Crisp White Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {signaturePicks.map((pick) => (
              <div
                key={pick.id}
                className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-md hover:shadow-2xl hover:border-amber-400/80 transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={pick.image}
                    alt={pick.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>

                {/* Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white">
                  <h3 className="text-[11.5px] font-semibold text-stone-900 leading-snug mb-2 line-clamp-1">
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
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        addedId === pick.id
                          ? "bg-emerald-600 text-white"
                          : "bg-[#fbf6ea] hover:bg-[#eed08e] text-[#c0881b]"
                      }`}
                    >
                      {addedId === pick.id ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
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
