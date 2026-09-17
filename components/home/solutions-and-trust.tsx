"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Leaf,
  Flame,
  Award,
  ShieldCheck,
  Check,
  ShoppingBag,
} from "lucide-react";
import { getProductById, ProductSKU, createCartItemId } from "@/lib/products";
import { CartItem } from "@/components/cart/cart-drawer";

interface SolutionsAndTrustProps {
  onAddToCart?: (item: CartItem) => void;
  onCustomizeProduct?: (product: ProductSKU) => void;
}

export function SolutionsAndTrust({
  onAddToCart,
  onCustomizeProduct,
}: SolutionsAndTrustProps) {
  const [addedIdx, setAddedIdx] = useState<number | null>(null);

  const featuredCollections = [
    {
      skuId: "marble-gift-box",
      title: "ELEMENTS IN HARMONY MARBLE TRUNK",
      description: "Full suite: 5 Element boxes, solid brass turtle burner & keepsake medallion.",
      price: 4999,
      priceDisplay: "₹4,999",
      image: "/images/product/image9.png",
      badge: "Flagship Suite",
    },
    {
      skuId: "mdf-gift-box",
      title: "KURMA ARTISANAL MDF HERITAGE BOX",
      description: "Rigid wooden keepsake box with Scents Connect Worlds gold debossing.",
      price: 2499,
      priceDisplay: "₹2,499",
      image: "/images/product/image.png",
      badge: "Artisanal Wood",
    },
    {
      skuId: "fragrance-earth",
      title: "5 ELEMENTS SACRED FRAGRANCE SET",
      description: "Complete bundle of Earth, Water, Fire, Air & Space boxes (135 sticks).",
      price: 1799,
      priceDisplay: "₹1,799",
      image: "/images/product/image7.png",
      badge: "Pure Botanicals",
    },
    {
      skuId: "turtle-incense-holder",
      title: "HEIRLOOM BRASS TURTLE & MEDALLION",
      description: "Solid cast brass turtle stand paired with the 5 Elements keepsake medallion.",
      price: 1499,
      priceDisplay: "₹1,499",
      image: "/images/product/image8.png",
      badge: "Solid Brass",
    },
  ];

  const pillars = [
    {
      num: "01",
      icon: Leaf,
      title: "100% Pure & Natural",
      desc: "Natural wood powders, sacred tree resins, zero toxic black soot.",
    },
    {
      num: "02",
      icon: Flame,
      title: "Five Sacred Elements",
      desc: "Distinctive blends for Earth, Water, Fire, Air, and Space rituals.",
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Solid Cast Brass",
      desc: "Heirloom turtle incense holders designed to endure generations.",
    },
    {
      num: "04",
      icon: Award,
      title: "Bespoke Personalization",
      desc: "Separate custom engraving, messages, and finishes for every SKU.",
    },
  ];

  const handleAddHamper = (item: typeof featuredCollections[0], idx: number) => {
    if (onAddToCart) {
      onAddToCart({
        id: createCartItemId(item.skuId),
        skuId: item.skuId,
        name: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
      setAddedIdx(idx);
      setTimeout(() => setAddedIdx(null), 1500);
    }
  };

  const handleCustomize = (skuId: string) => {
    if (onCustomizeProduct) {
      const p = getProductById(skuId);
      if (p) onCustomizeProduct(p);
    }
  };

  return (
    <div className="w-full bg-[#072515] bg-[url('/images/textures/green-texture.png')] bg-repeat pb-20 space-y-16 text-white border-t border-[#eed08e]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-6">

        {/* SECTION 1: Featured Gifting Suites */}
        <section id="solutions">
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-[0.24em] text-[#eed08e] uppercase">
              CURATED HEIRLOOM HAMPER SETS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif text-white font-normal mt-1">
              Sacred Gift Sets &amp; Heirloom Trunks
            </h2>

            {/* Elegant Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-2 mt-2.5">
              <div className="h-px w-20 sm:w-28 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#eed08e] bg-[#072515] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#eed08e]" />
              </div>
              <div className="h-px w-20 sm:w-28 bg-[#eed08e]" />
            </div>
          </div>

          {/* 4 Hampers Grid with Crisp White Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCollections.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 overflow-hidden shadow-md hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col group text-stone-900"
              >
                {/* Image */}
                <div
                  className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 cursor-pointer"
                  onClick={() => handleCustomize(item.skuId)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {item.badge && (
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-[#072515]/90 text-[#eed08e] px-2 py-0.5 rounded-full border border-[#eed08e]/30 shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-center relative bg-white">
                  <div>
                    <h3
                      onClick={() => handleCustomize(item.skuId)}
                      className="text-xs font-bold text-stone-900 tracking-wider uppercase mb-1.5 hover:text-[#c0881b] cursor-pointer"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed max-w-[210px] mx-auto">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart Button (Exact original layout) */}
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
              Why Devotees &amp; Families Choose Kurma
            </h2>
            {/* Elegant Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-2 mt-2.5">
              <div className="h-px w-20 sm:w-28 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#eed08e] bg-[#072515] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#eed08e]" />
              </div>
              <div className="h-px w-20 sm:w-28 bg-[#eed08e]" />
            </div>
          </div>

          {/* 4 Process Capsules */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-1.5">
            {pillars.map((step, idx) => (
              <div key={idx} className="flex items-center w-full lg:w-auto">
                <div className="w-full lg:w-[245px] xl:w-[260px] bg-white rounded-full border border-stone-200/90 hover:border-amber-400 px-4 py-3 flex items-center gap-3.5 shadow-md hover:shadow-lg transition-all text-stone-900">
                  <div className="w-11 h-11 rounded-full border border-amber-200 bg-[#fbf6ea] flex items-center justify-center text-[#c0881b] shrink-0">
                    <step.icon className="w-5 h-5 stroke-[1.6]" />
                  </div>
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
