"use client";

import { useState, useMemo } from "react";
import { PRODUCTS, ProductSKU } from "@/lib/products";
import {
  ProductCardItem,
  getCleanTitle,
  getProductBadge,
  getDiscountPercent,
} from "@/components/home/product-showcase";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/lib/cart-context";
import { Mountain, Droplets, Flame, Wind, Compass } from "lucide-react";

type ElementKey = "all" | "Earth" | "Water" | "Fire" | "Air" | "Space";

const ELEMENT_PHILOSOPHY = [
  {
    key: "Earth",
    name: "Prithvi (Earth)",
    icon: Mountain,
    tagline: "Ground • Nourish • Belong",
    time: "Brahma Muhurta & Dawn",
    notes: "Sacred Vetiver (Khus), Warm Indian Sandalwood, Forest Moss",
    intention: "Grounding erratic energy, root chakra awakening, deep calm & stability.",
  },
  {
    key: "Water",
    name: "Jal (Water)",
    icon: Droplets,
    tagline: "Flow • Purify • Renew",
    time: "Morning Ablution & Midday",
    notes: "Sacred Blue Lotus, Crisp Rain Accord, Himalayan Golden Amber",
    intention: "Emotional cleansing, releasing mental blockages, fluidity & creative receptivity.",
  },
  {
    key: "Fire",
    name: "Agni (Fire)",
    icon: Flame,
    tagline: "Transform • Clarify • Ascend",
    time: "Twilight Sandhya & Dusk",
    notes: "Golden Ceylon Clove, Cassia Bark, Sacred Smoked Dammar Resin",
    intention: "Purification of stagnant prana, mental focus, ignition of divine courage.",
  },
  {
    key: "Air",
    name: "Vayu (Air)",
    icon: Wind,
    tagline: "Elevate • Expand • Breathe",
    time: "Pranayama & Afternoon",
    notes: "Desi Gulab Petals, Temple Camphor, Crisp Himalayan Morning Dew",
    intention: "Heart chakra opening, expansiveness, freedom from anxiety & mental fatigue.",
  },
  {
    key: "Space",
    name: "Akasha (Space / Ether)",
    icon: Compass,
    tagline: "Transcend • Stillness • Awaken",
    time: "Deep Night Meditation & Solitude",
    notes: "Rare Wild Oudh (Agarwood), Frankincense (Loban), Somalian Myrrh",
    intention: "Connection to the cosmic void, crown chakra stillness, deep transcendent awareness.",
  },
];

export default function ElementsPage() {
  const { cartCount, setIsCartOpen, setCustomizingProduct, quickAddToCart } = useCart();
  const [activeTab, setActiveTab] = useState<ElementKey>("all");
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (product: ProductSKU) => {
    quickAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  const handleCustomize = (product: ProductSKU) => {
    setCustomizingProduct(product);
  };

  // Products belonging to the 5 elements
  const elementalProducts = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) => p.category === "Fragrances" || p.id === "5-elements-suite"
    );
    if (activeTab === "all") return list;
    return list.filter((p) => p.elements && p.elements.includes(activeTab));
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#eed08e] selection:text-[#072515]">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 space-y-12 sm:space-y-16">
        {/* Minimalist Editorial Header */}
        <div className="space-y-4 pt-1 pb-2 max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl font-serif text-stone-900 font-normal tracking-tight">
            The 5 Sacred Elements
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-sans max-w-xl mx-auto leading-relaxed">
            In Vedic wisdom, the Pancha Mahabhuta govern all existence. Each Kurma blend is formulated from pure botanicals to balance prana and harmonize the sacred spaces within.
          </p>

          {/* Clean Underline Element Tabs */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-2 text-xs font-cinzel tracking-wider border-b border-stone-200/60">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-1.5 transition-all whitespace-nowrap cursor-pointer uppercase ${
                activeTab === "all"
                  ? "text-stone-900 border-b-2 border-stone-900 font-semibold"
                  : "text-stone-400 hover:text-stone-800 font-normal"
              }`}
            >
              All Elements
            </button>
            {ELEMENT_PHILOSOPHY.map((el) => (
              <button
                key={el.key}
                onClick={() => setActiveTab(el.key as ElementKey)}
                className={`pb-1.5 transition-all whitespace-nowrap cursor-pointer uppercase ${
                  activeTab === el.key
                    ? "text-stone-900 border-b-2 border-stone-900 font-semibold"
                    : "text-stone-400 hover:text-stone-800 font-normal"
                }`}
              >
                {el.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Product Gallery Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {elementalProducts.map((product) => (
              <ProductCardItem
                key={product.id}
                product={product}
                activeMode="direct"
                addedId={addedId}
                onQuickAdd={handleQuickAdd}
                onCustomize={handleCustomize}
                badge={getProductBadge(product.id)}
                discount={getDiscountPercent(product.price, product.originalPrice)}
                cleanTitle={getCleanTitle(product)}
                variant="minimal"
              />
            ))}
          </div>
        </div>

        {/* Pancha Mahabhuta Ritual & Botanical Chart */}
        <section className="pt-8 border-t border-stone-200/80 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900 font-normal">
              Elemental Wisdom &amp; Burning Hours
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-sans max-w-lg mx-auto">
              Align your daily ritual with the natural rhythmic cycles of day, night, and consciousness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {ELEMENT_PHILOSOPHY.map((el) => {
              const Icon = el.icon;
              return (
                <div
                  key={el.key}
                  className="rounded-xl border border-stone-200/80 bg-white p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2.5">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-stone-900">
                        {el.name}
                      </h3>
                      <p className="text-[11px] font-cinzel text-stone-400 tracking-wider uppercase mt-0.5">
                        {el.tagline}
                      </p>
                    </div>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed">
                      {el.notes}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-1.5 text-[11px]">
                    <div className="text-stone-400 uppercase tracking-wider font-cinzel text-[9.5px]">
                      Optimal Hour
                    </div>
                    <div className="text-stone-800 font-medium font-sans">
                      {el.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
