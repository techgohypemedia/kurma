"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { PromoBanner } from "@/components/promo-banner";
import { ProductShowcase } from "@/components/product-showcase";
import { SolutionsAndTrust } from "@/components/solutions-and-trust";
import { VideoStories } from "@/components/video-stories";
import { TrustStats } from "@/components/trust-stats";
import { ReviewsSection } from "@/components/reviews-section";
import { Footer } from "@/components/footer";
import { CartDrawer, CartItem } from "@/components/cart-drawer";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "pick-1",
      name: "Royal Mysore Sandalwood Agarbatti (Pack of 50)",
      price: 550,
      image: "/images/agarbatti-sandalwood.jpg",
      quantity: 1,
    },
  ]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity?: number;
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image || "/images/agarbatti-sandalwood.jpg",
          quantity: item.quantity || 1,
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

  const scrollToCategories = () => {
    const el = document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBestsellers = () => {
    const el = document.getElementById("bestsellers");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#072515] bg-[url('/images/green-texture.png')] bg-repeat text-white selection:bg-[#eed08e] selection:text-[#072515]">
      {/* E-Commerce Header with Cart Drawer Trigger */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onExploreProducts={scrollToCategories}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section - Pure E-Commerce with Shop CTAs */}
        <Hero
          onExploreGifts={scrollToCategories}
          onExploreBestsellers={scrollToBestsellers}
        />

        {/* Promo Banner Slider Section */}
        <PromoBanner
          onExploreGifts={scrollToCategories}
        />

        {/* Categories & Signature Picks Section */}
        <div id="categories">
          <ProductShowcase
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Joyful Gifting Stories Video Section with Add to Cart */}
        <VideoStories
          onAddToCart={handleAddToCart}
          onExploreProducts={scrollToCategories}
        />

        {/* Curated Gifting Hampers with Buy Now / Add to Cart */}
        <SolutionsAndTrust
          onAddToCart={handleAddToCart}
          onExploreProducts={scrollToCategories}
        />

        {/* Trust Metrics Bar */}
        <TrustStats />

        {/* Customer Reviews & Promotional Welcome Offer */}
        <ReviewsSection
          onExploreProducts={scrollToCategories}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Interactive E-Commerce Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onExploreProducts={scrollToCategories}
      />
    </div>
  );
}
