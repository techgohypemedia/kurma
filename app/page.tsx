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
import { QuoteModal } from "@/components/quote-modal";

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const scrollToCategories = () => {
    const el = document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation matching Image 1 */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsQuoteOpen(true)}
        onRequestQuote={() => setIsQuoteOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section matching Image 1 */}
        <Hero
          onRequestQuote={() => setIsQuoteOpen(true)}
          onExploreGifts={scrollToCategories}
        />

        {/* Promo Banner Slider Section matching reference image */}
        <PromoBanner
          onRequestQuote={() => setIsQuoteOpen(true)}
          onExploreGifts={scrollToCategories}
        />

        {/* Categories & Signature Picks Section matching Image 2 */}
        <div id="categories">
          <ProductShowcase
            onAddToCart={handleAddToCart}
            onRequestQuote={() => setIsQuoteOpen(true)}
          />
        </div>

        {/* Joyful Gifting Stories Video Section matching reference screenshot */}
        <VideoStories
          onRequestQuote={() => setIsQuoteOpen(true)}
        />

        {/* Corporate Gifting Solutions, Process & Features */}
        <SolutionsAndTrust
          onRequestQuote={() => setIsQuoteOpen(true)}
        />

        {/* Trust Metrics Bar matching reference image */}
        <TrustStats />

        {/* Customer Reviews & Feedback Section */}
        <ReviewsSection
          onRequestQuote={() => setIsQuoteOpen(true)}
        />
      </main>

      {/* Footer matching reference image */}
      <Footer />

      {/* Interactive Request a Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </div>
  );
}
