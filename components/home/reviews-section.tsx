"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Check, ArrowRight } from "lucide-react";

interface ReviewsSectionProps {
  onExploreProducts?: () => void;
}

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  category: "corporate" | "festive" | "luxury";
  rating: number;
  date: string;
  orderInfo: string;
  productImage: string;
  title: string;
  comment: string;
}

const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Simran Kapoor",
    role: "Head of People & Culture",
    company: "FinVertex Technologies",
    avatar: "/images/community/simran.jpg",
    category: "corporate",
    rating: 5,
    date: "2 weeks ago",
    orderInfo: "380x Elements in Harmony Marble Gift Boxes",
    productImage: "/images/product/image9.png",
    title: "The green marble trunk and 5 elements amazed our board",
    comment:
      "We ordered 380 custom Elements in Harmony Marble Gift Boxes with our leadership insignia engraved on the interior brass plaque. The 5 sacred element fragrances and solid brass turtle stand made this the most cherished gift we have ever presented.",
  },
  {
    id: "rev-2",
    name: "Rohan Varma",
    role: "VP Marketing & Partnerships",
    company: "Apex Capital, Mumbai",
    avatar: "/images/community/rohan.jpg",
    category: "luxury",
    rating: 5,
    date: "3 weeks ago",
    orderInfo: "150x Handcrafted Brass Turtle Incense Stands",
    productImage: "/images/product/image8.png",
    title: "Heirloom weight and exquisite paisley repoussé",
    comment:
      "The cast brass turtle stand is substantial and timeless. Each holder came individually personalized with our partners' initials on the base plate. Truly represents the sacred Kurma avatar with unparalleled elegance.",
  },
  {
    id: "rev-3",
    name: "Ananya Deshmukh",
    role: "Director of Brand Experience",
    company: "Kalaah Studios, Pune",
    avatar: "/images/community/ananya.jpg",
    category: "festive",
    rating: 5,
    date: "1 month ago",
    orderInfo: "250x Earth & Water Fragrance Boxes (Personalized)",
    productImage: "/images/product/image1.png",
    title: "100% Charcoal-free with celestial natural aroma",
    comment:
      "The Earth blend is profoundly grounding and the Water fragrance brings immense peace during our evening mindfulness sessions. The custom gold foil name sleeves on each box added a deeply personal touch.",
  },
  {
    id: "rev-4",
    name: "Siddharth Malhotra",
    role: "Managing Director",
    company: "Malhotra Logistics, New Delhi",
    avatar: "/images/community/siddharth.jpg",
    category: "corporate",
    rating: 5,
    date: "1 month ago",
    orderInfo: "450x Kurma MDF Keepsake Gift Boxes",
    productImage: "/images/product/image.png",
    title: "Flawless rigid wooden box craft with zero damage",
    comment:
      "The warm natural wood finish, gold debossed Kurma emblem, and plush velvet interior of the MDF box were executed with world-class precision. Doorstep delivery across 18 states arrived in pristine condition.",
  },
  {
    id: "rev-5",
    name: "Tanvi Sharma",
    role: "Senior HR Partner",
    company: "CloudScale India",
    avatar: "/images/community/tanvi.jpg",
    category: "corporate",
    rating: 5,
    date: "2 months ago",
    orderInfo: "300x The 5 Elements Complete Fragrance Suites",
    productImage: "/images/product/image7.png",
    title: "Pure essential oils with 60-min soothing burn time",
    comment:
      "Our employees loved experiencing each element — from Earth's deep woods to Space's cosmic agarwood. Completely non-toxic, gentle on sensitive eyes, and filled our homes with authentic serenity.",
  },
  {
    id: "rev-6",
    name: "Nikhil Joshi",
    role: "Chief Operating Officer",
    company: "Nexus Ventures, Bengaluru",
    avatar: "/images/community/nikhil.jpg",
    category: "luxury",
    rating: 5,
    date: "2 months ago",
    orderInfo: "200x Embroidered Pashmina Squares & Medallions",
    productImage: "/images/product/image8.png",
    title: "Sophisticated golden zari turtle embroidery",
    comment:
      "The rich forest green pashmina pocket squares with embroidered gold Kurma turtle alongside the keepsake medallion made a profound impression at our annual investor summit.",
  },
];

export function ReviewsSection({ onExploreProducts }: ReviewsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "corporate" | "festive" | "luxury">("all");

  const filteredReviews =
    activeCategory === "all"
      ? REVIEWS
      : REVIEWS.filter((r) => r.category === activeCategory);

  return (
    <section id="reviews" className="w-full bg-[#072515] bg-[url('/images/textures/green-texture.png')] bg-repeat py-16 sm:py-24 border-b border-[#eed08e]/20 text-white">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Centered Brand Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.24em] text-[#eed08e] uppercase">
            PATRON TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-white font-normal mt-1">
            Voices of Devotion &amp; Trust
          </h2>

          {/* Elegant Gold Diamond Divider */}
          <div className="flex items-center justify-center gap-2 mt-2.5 mb-4">
            <div className="h-px w-20 sm:w-28 bg-[#eed08e]" />
            <div className="w-2.5 h-2.5 rotate-45 border border-[#eed08e] bg-[#072515] flex items-center justify-center">
              <div className="w-1 h-1 bg-[#eed08e]" />
            </div>
            <div className="h-px w-20 sm:w-28 bg-[#eed08e]" />
          </div>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Cherished by families, spiritual practitioners, and leading enterprises across India for sacred rituals and heirloom presentation.
          </p>

          {/* Overall Rating Strip */}
          <div className="inline-flex items-center gap-2.5 bg-white border border-stone-200 rounded-full px-4 py-1.5 shadow-sm mt-4 text-stone-900">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-stone-900">4.9 / 5</span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-stone-600">Based on 14,800+ handcrafted product shipments</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-8 no-scrollbar">
          {[
            { id: "all" as const, label: "All Reviews" },
            { id: "corporate" as const, label: "Corporate & Executive Gifting" },
            { id: "festive" as const, label: "Festive & Temple Trunks" },
            { id: "luxury" as const, label: "Artisanal Marble & Brass" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === tab.id
                  ? "bg-[#eed08e] text-[#072515] font-bold shadow-md"
                  : "bg-white/10 text-stone-200 hover:bg-white/20 border border-white/15"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white text-stone-900 rounded-2xl border border-stone-200/90 p-6 sm:p-7 flex flex-col justify-between hover:shadow-2xl hover:border-amber-300 transition-all duration-300 group"
            >
              <div>
                {/* Stars and Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                    Verified Order
                  </span>
                </div>

                {/* Review Title */}
                <h3 className="text-base font-bold text-stone-900 mb-2.5 leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>

                {/* Review Text */}
                <p className="text-stone-600 text-sm leading-relaxed mb-5">
                  {review.comment}
                </p>
              </div>

              <div>
                {/* Ordered Product Pill with Thumbnail */}
                <div className="mb-5 flex items-center gap-2.5 p-2 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-200">
                    <Image
                      src={review.productImage}
                      alt={review.orderInfo}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <span className="text-xs text-stone-700 font-medium truncate">
                    {review.orderInfo}
                  </span>
                </div>

                {/* Reviewer Profile */}
                <div className="flex items-center gap-3 pt-3.5 border-t border-stone-100">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-stone-200">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-stone-900 truncate">
                      {review.name}
                    </div>
                    <div className="text-xs text-stone-500 truncate">
                      {review.role} • {review.company}
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-400 shrink-0">
                    {review.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom E-Commerce Promotional Banner */}
        <div className="mt-12 bg-white border border-[#eed08e]/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-stone-900">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-bold text-[#c0881b] tracking-wider uppercase">
              Exclusive Online Welcome Gift
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mt-0.5">
              Elevate Your Sacred Space with Kurma
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Enjoy 10% off your initial order with code <strong className="text-[#c0881b]">SACRED10</strong> at checkout. Complimentary Brass Turtle Incense Stand on orders above ₹1,999.
            </p>
          </div>

          <button
            onClick={onExploreProducts}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c0881b] hover:bg-[#a67414] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shrink-0 cursor-pointer hover:shadow-lg"
          >
            <span>Shop Initial Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
