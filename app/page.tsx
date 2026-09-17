"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { PromoBanner } from "@/components/home/promo-banner";
import { ProductShowcase } from "@/components/home/product-showcase";
import { SolutionsAndTrust } from "@/components/home/solutions-and-trust";
import { VideoStories } from "@/components/home/video-stories";
import { TrustStats } from "@/components/home/trust-stats";
import { ReviewsSection } from "@/components/home/reviews-section";
import { Footer } from "@/components/layout/footer";
import { CartDrawer, CartItem } from "@/components/cart/cart-drawer";
import { ProductCustomizerModal } from "@/components/product/product-customizer-modal";
import { ProductSKU } from "@/lib/products";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingProduct, setCustomizingProduct] = useState<ProductSKU | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "init-marble-box",
      skuId: "marble-gift-box",
      name: "Elements in Harmony Luxury Marble Gift Box",
      price: 4999,
      priceDisplay: "₹4,999",
      image: "/images/product/image9.png",
      quantity: 1,
      customizations: {
        "Brass Plaque Engraving": "Om Shanti • Blessings & Harmony",
        "Wax Seal & Ribbon": "Imperial Gold Wax Seal",
      },
    },
  ]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // If exact same ID or same SKU without custom diff, increment
      const existing = prev.find(
        (i) =>
          i.id === item.id ||
          (i.skuId === item.skuId &&
            JSON.stringify(i.customizations || {}) === JSON.stringify(item.customizations || {}))
      );

      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }

      return [
        ...prev,
        {
          id: item.id || `item-${Date.now()}`,
          skuId: item.skuId,
          name: item.name,
          price: item.price,
          priceDisplay: item.priceDisplay,
          image: item.image || "/images/product/image.png",
          quantity: item.quantity || 1,
          customizations: item.customizations,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSolutions = () => {
    const el = document.getElementById("solutions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#072515] bg-[url('/images/textures/green-texture.png')] bg-repeat text-white selection:bg-[#eed08e] selection:text-[#072515]">
      {/* E-Commerce Header with Cart Drawer Trigger */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onExploreProducts={scrollToCatalog}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreGifts={scrollToCatalog}
          onExploreBestsellers={scrollToSolutions}
        />

        {/* Promo Banner Slider Section */}
        <PromoBanner
          onExploreGifts={scrollToCatalog}
        />

        {/* Master Catalog & 5 Elements Spotlight */}
        <div id="catalog">
          <ProductShowcase
            onAddToCart={handleAddToCart}
            onCustomizeProduct={(product) => setCustomizingProduct(product)}
          />
        </div>

        {/* Sacred Gifting Stories Video Section with Direct Add to Cart */}
        <VideoStories
          onAddToCart={handleAddToCart}
          onExploreProducts={scrollToCatalog}
        />

        {/* Curated Gifting Suites & Heirloom Trunks */}
        <SolutionsAndTrust
          onAddToCart={handleAddToCart}
          onCustomizeProduct={(product) => setCustomizingProduct(product)}
        />

        {/* Trust Metrics Bar */}
        <TrustStats />

        {/* Customer Reviews & Promotional Welcome Offer */}
        <ReviewsSection
          onExploreProducts={scrollToCatalog}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive SKU Customizer Modal */}
      <ProductCustomizerModal
        product={customizingProduct}
        isOpen={customizingProduct !== null}
        onClose={() => setCustomizingProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Interactive E-Commerce Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onExploreProducts={scrollToCatalog}
      />
    </div>
  );
}
