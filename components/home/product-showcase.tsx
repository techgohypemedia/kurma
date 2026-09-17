"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Check, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { PRODUCTS, ProductSKU, formatPrice, createCartItemId } from "@/lib/products";
import { CartItem } from "@/components/cart/cart-drawer";

interface ProductShowcaseProps {
  onAddToCart: (item: CartItem) => void;
  onCustomizeProduct: (product: ProductSKU) => void;
}

type PurchasingMode = "direct" | "custom";

export function ProductShowcase({
  onAddToCart,
  onCustomizeProduct,
}: ProductShowcaseProps) {
  const [activeMode, setActiveMode] = useState<PurchasingMode>("direct");
  const [addedId, setAddedId] = useState<string | null>(null);

  // 1. The Four Initial Flagship Products (Gift Boxes & Complete Suites)
  const initialGiftBoxes = [
    PRODUCTS.find((p) => p.id === "marble-gift-box"),
    PRODUCTS.find((p) => p.id === "mdf-gift-box"),
    PRODUCTS.find((p) => p.id === "5-elements-suite"),
    PRODUCTS.find((p) => p.id === "empty-marble-box"),
  ].filter(Boolean) as ProductSKU[];

  // 2. 5 Individual Fragrance Boxes (Single Products)
  const singleFragrances = PRODUCTS.filter((p) => p.category === "Fragrances");

  // 3. 4 Sacred Accessories (Single Products)
  const singleAccessories = PRODUCTS.filter((p) => p.category === "Sacred Accessories");

  // Helper to format clean, elegant titles
  const getCleanTitle = (product: ProductSKU) => {
    switch (product.id) {
      case "marble-gift-box":
        return "Elements in Harmony Marble Gift Box";
      case "mdf-gift-box":
        return "Kurma MDF Keepsake Gift Box";
      case "5-elements-suite":
        return "5 Elements Complete Fragrance Suite";
      case "empty-marble-box":
        return "Artisanal Empty Green Marble Box";
      case "turtle-incense-holder":
        return "Solid Brass Turtle Holder";
      case "medallion":
        return "Keepsake Brass Medallion";
      case "pashmina-pocket-square":
        return "Pashmina Pocket Square";
      case "bookmark":
        return "Textured Silk Tassel Bookmark";
      default:
        return product.name.replace(/\s*\([^)]*\)/g, "").trim();
    }
  };

  // E-commerce pill badge matching the reference design
  const getProductBadge = (id: string): { label: string; color: string } | null => {
    switch (id) {
      // 4 Flagship Initial Products
      case "marble-gift-box":
        return { label: "Flagship Suite", color: "bg-[#7a1532]" };
      case "mdf-gift-box":
        return { label: "Artisanal Wood", color: "bg-[#7a1532]" };
      case "5-elements-suite":
        return { label: "Complete Suite", color: "bg-[#5b2273]" };
      case "empty-marble-box":
        return { label: "Heirloom Keepsake", color: "bg-[#7a1532]" };

      // Fragrances
      case "fragrance-earth":
        return { label: "Bestseller", color: "bg-[#7a1532]" };
      case "fragrance-water":
        return { label: "100% Charcoal-Free", color: "bg-[#7a1532]" };
      case "fragrance-fire":
        return { label: "Pure Resins", color: "bg-[#7a1532]" };
      case "fragrance-air":
        return { label: "Handcrafted Devotion", color: "bg-[#7a1532]" };
      case "fragrance-space":
        return { label: "Rare Oudh", color: "bg-[#5b2273]" };

      // Accessories
      case "turtle-incense-holder":
        return { label: "Pure Solid Brass", color: "bg-[#7a1532]" };
      case "medallion":
        return { label: "Keepsake Talisman", color: "bg-[#5b2273]" };
      case "pashmina-pocket-square":
        return { label: "Pure Pashmina", color: "bg-[#7a1532]" };
      case "bookmark":
        return { label: "Silk Tassel", color: "bg-[#7a1532]" };
      default:
        return null;
    }
  };

  const getDiscountPercent = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const handleQuickAdd = (product: ProductSKU) => {
    onAddToCart({
      id: createCartItemId(product.id),
      skuId: product.id,
      name: product.name,
      price: product.price,
      priceDisplay: formatPrice(product.price),
      image: product.image,
      quantity: 1,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };


interface ProductCardItemProps {
  product: ProductSKU;
  activeMode: PurchasingMode;
  addedId: string | null;
  onQuickAdd: (product: ProductSKU) => void;
  onCustomize: (product: ProductSKU) => void;
  badge: { label: string; color: string } | null;
  discount: number | null;
  cleanTitle: string;
}

function ProductCardItem({
  product,
  activeMode,
  addedId,
  onQuickAdd,
  onCustomize,
  badge,
  discount,
  cleanTitle,
}: ProductCardItemProps) {
  // Ensure fresh fetch and bypass any stale browser 404 cache
  const primarySrc = product.image ? `${product.image}?v=4` : "/images/product/image9.png";
  const [imgSrc, setImgSrc] = useState(primarySrc);
  const [imgError, setImgError] = useState(false);

  const handleCardClick = () => {
    if (activeMode === "direct") {
      onQuickAdd(product);
    } else {
      onCustomize(product);
    }
  };

  const handleImageError = () => {
    // Fall back to secondary gallery image or full scene image
    if (product.gallery && product.gallery.length > 1 && imgSrc !== product.gallery[1]) {
      setImgSrc(product.gallery[1]);
    } else if (imgSrc !== "/images/product/image9.png") {
      setImgSrc("/images/product/image9.png");
    } else {
      setImgError(true);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group cursor-pointer text-stone-900"
    >
      {/* Compact Product Image Area (Square Aspect Ratio) */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#faf9f6]">
        {!imgError ? (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            unoptimized
            onError={handleImageError}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400 text-xs px-2 text-center">
            {cleanTitle}
          </div>
        )}

        {/* Quick Action Button in Top Right */}
        {activeMode === "direct" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            title={`Add ${product.name} to cart`}
            className={`absolute top-2 right-2 w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-all shadow-md z-10 ${
              addedId === product.id
                ? "bg-emerald-600 text-white scale-105 opacity-100"
                : "bg-white/95 hover:bg-white text-stone-800 hover:text-[#7a1532] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
            }`}
          >
            {addedId === product.id ? (
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCustomize(product);
            }}
            title={`Customize ${product.name}`}
            className="absolute top-2 right-2 w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white/95 hover:bg-white text-stone-800 hover:text-[#7a1532] flex items-center justify-center transition-all shadow-md z-10 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        )}

        {/* Customization Hint Badge when in Customize mode */}
        {activeMode === "custom" && (
          <div className="absolute bottom-2 left-2 right-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <span className="bg-[#072515]/90 backdrop-blur-xs text-[#eed08e] text-[10px] font-medium px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              Customise
            </span>
          </div>
        )}
      </div>

      {/* Text Details Area: Compact, Clean, Left-Aligned */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1 bg-white space-y-1">
        <div>
          {/* Title */}
          <h4 className="text-[12px] sm:text-[13px] font-medium text-stone-900 leading-snug line-clamp-1 group-hover:text-[#7a1532] transition-colors">
            {cleanTitle}
          </h4>

          {/* Pill Badge */}
          {badge && (
            <div className="mt-0.5">
              <span
                className={`inline-block px-1.5 py-0.5 rounded-[3px] text-[9.5px] sm:text-[10px] font-semibold text-white tracking-wide ${badge.color}`}
              >
                {badge.label}
              </span>
            </div>
          )}
        </div>

        {/* Price Row: Bold Price + Strikethrough + Discount % OFF */}
        <div className="pt-0.5 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-[11px] text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              {discount && (
                <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600">
                  {discount}% OFF
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="w-full bg-[#072515] bg-[url('/images/textures/green-texture.png')] bg-repeat py-12 sm:py-16 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* SECTION 1: Our Four Initial Products & Purchasing Flow Selector */}
        <section className="space-y-7">
          {/* Top Purchasing Flow Selector Pills */}
          <div className="flex justify-center">
            <div className="inline-flex items-center p-1 rounded-full bg-[#0a311d]/90 border border-[#eed08e]/30 shadow-inner backdrop-blur-sm gap-1">
              <button
                onClick={() => setActiveMode("direct")}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeMode === "direct"
                    ? "bg-[#eed08e] text-[#072515] shadow-md"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>1. Direct Buy (Our 4 Products)</span>
              </button>

              <button
                onClick={() => setActiveMode("custom")}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeMode === "custom"
                    ? "bg-[#eed08e] text-[#072515] shadow-md"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>2. Customise Your Product</span>
              </button>
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center space-y-2.5 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif text-white font-normal">
              {activeMode === "direct" ? "Our Four Initial Products" : "Customise Your Sacred Gift Box"}
            </h2>

            {/* Delicate Gold Diamond Divider */}
            <div className="flex items-center justify-center gap-3 pt-0.5">
              <div className="h-px w-16 bg-[#eed08e]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#eed08e] bg-[#072515] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#eed08e]" />
              </div>
              <div className="h-px w-16 bg-[#eed08e]" />
            </div>

            <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto">
              {activeMode === "direct"
                ? "Ready-to-ship luxury gift boxes and fragrance suites. Click (+) to add directly to your sacred cart."
                : "Select any heirloom box or suite to personalize with custom brass plaque engravings, velvet linings & handwritten wax-sealed notes."}
            </p>
          </div>

          {/* 4 Flagship Initial Products Grid (Compact, max-w-5xl, 4 columns on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {initialGiftBoxes.map((product) => (
              <ProductCardItem
                key={product.id}
                product={product}
                activeMode={activeMode}
                addedId={addedId}
                onQuickAdd={handleQuickAdd}
                onCustomize={onCustomizeProduct}
                badge={getProductBadge(product.id)}
                discount={getDiscountPercent(product.price, product.originalPrice)}
                cleanTitle={getCleanTitle(product)}
              />
            ))}
          </div>
        </section>

        {/* SECTION 2: The 5 Elements Fragrance Boxes */}
        <section className="space-y-6 pt-4 border-t border-[#eed08e]/15">
          <div className="flex items-center justify-between border-b border-[#eed08e]/20 pb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-serif text-white font-normal">
                The 5 Elements Fragrance Boxes
              </h3>
              <p className="text-xs text-stone-300 mt-0.5">
                Earth, Water, Fire, Air, Space — 27 sticks per box. 100% charcoal-free pure devotion.
              </p>
            </div>
            <span className="text-xs text-[#eed08e] font-semibold hidden sm:inline">
              ₹399 each
            </span>
          </div>

          {/* 5 Fragrances Cards - Responsive Row Grid (5 columns on large screens) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5">
            {singleFragrances.map((product) => (
              <ProductCardItem
                key={product.id}
                product={product}
                activeMode={activeMode}
                addedId={addedId}
                onQuickAdd={handleQuickAdd}
                onCustomize={onCustomizeProduct}
                badge={getProductBadge(product.id)}
                discount={getDiscountPercent(product.price, product.originalPrice)}
                cleanTitle={getCleanTitle(product)}
              />
            ))}
          </div>
        </section>

        {/* SECTION 3: Sacred Artisanal Accessories */}
        <section className="space-y-6 pt-4 border-t border-[#eed08e]/15">
          <div className="flex items-center justify-between border-b border-[#eed08e]/20 pb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-serif text-white font-normal">
                Sacred Artisanal Accessories
              </h3>
              <p className="text-xs text-stone-300 mt-0.5">
                Solid brass burners, elemental medallions, embroidered pashmina & silk bookmarks
              </p>
            </div>
            <span className="text-xs text-[#eed08e] font-semibold hidden sm:inline">
              Handcrafted Heirloom Pieces
            </span>
          </div>

          {/* 4 Accessories Cards - Responsive Row Grid (4 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {singleAccessories.map((product) => (
              <ProductCardItem
                key={product.id}
                product={product}
                activeMode={activeMode}
                addedId={addedId}
                onQuickAdd={handleQuickAdd}
                onCustomize={onCustomizeProduct}
                badge={getProductBadge(product.id)}
                discount={getDiscountPercent(product.price, product.originalPrice)}
                cleanTitle={getCleanTitle(product)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

