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
  Plus,
  Bookmark,
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
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 space-y-16 pt-6">

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

          {/* 4 Hampers Grid with Luxury Minimal Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {featuredCollections.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCustomize(item.skuId)}
                className="group relative flex flex-col cursor-pointer select-none transition-transform duration-300"
              >
                {/* Modern Image Canvas with Aspect-[4/5] & Rounded Corners */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-[#061e11] shadow-2xs">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                  />

                  {/* Bookmark Ribbon Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    title="Save to Wishlist"
                    aria-label="Save to Wishlist"
                    className="absolute top-3.5 right-3.5 z-10 p-1 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-transform active:scale-90 hover:scale-110 cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4 text-white stroke-[2]" />
                  </button>
                </div>

                {/* Minimalist Info Row Directly Beneath Image */}
                <div className="mt-2.5 flex items-start justify-between gap-2 px-0.5">
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <h3 className="text-xs sm:text-[13px] font-medium tracking-tight leading-snug truncate transition-colors text-[#fdfcf9] group-hover:text-[#eed08e]">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-[12.5px] font-medium text-[#eed08e]">
                        {item.priceDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddHamper(item, idx);
                    }}
                    title={`Add ${item.title} to cart`}
                    aria-label={`Add ${item.title} to cart`}
                    className="shrink-0 p-1 text-[#eed08e] hover:text-white hover:scale-125 transition-all duration-200 cursor-pointer"
                  >
                    {addedIdx === idx ? (
                      <Check className="w-4 h-4 stroke-[2.5] text-emerald-400" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[1.75]" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Why Customers Choose Kurma */}
        <section className="pt-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">
              Why Devotees &amp; Families Choose Kurma
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2.5">
              <div className="h-px w-20 bg-[#eed08e]/50" />
              <div className="w-2 h-2 rotate-45 border border-[#eed08e] bg-[#072515]" />
              <div className="h-px w-20 bg-[#eed08e]/50" />
            </div>
          </div>

          {/* 4 Clean Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pillars.map((step, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#0a311d]/60 border border-[#eed08e]/20 p-6 flex flex-col items-start text-left space-y-3 hover:border-[#eed08e]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#072515] border border-[#eed08e]/30 flex items-center justify-center text-[#eed08e]">
                  <step.icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-serif text-white font-medium">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
