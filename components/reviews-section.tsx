"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Check, ArrowRight } from "lucide-react";

interface ReviewsSectionProps {
  onRequestQuote?: () => void;
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
    orderInfo: "380x Royal Saffron & Brass Hampers",
    productImage: "/images/kurma-gift-box.jpg",
    title: "Seamless nationwide delivery with zero damage",
    comment:
      "We needed custom festive hampers shipped directly to employees across 22 cities. The packaging was immaculate, the brass boxes looked like heirloom pieces, and our corporate branding was subtly engraved. Received countless unboxing videos from our team.",
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
    orderInfo: "120x Handcrafted Leather Keepsake Trunks",
    productImage: "/images/kurma-hero-box.jpg",
    title: "The standard for executive client gifting",
    comment:
      "When gifting high-net-worth institutional partners, standard retail boxes don't make the cut. Kurma's leatherette finish, Kashmiri saffron, and personalized wax-sealed cards left a memorable impression on our entire board.",
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
    orderInfo: "250x Heritage Silver Gourmet Boxes",
    productImage: "/images/kurma-festive-box.jpg",
    title: "Authentic taste and heirloom-grade presentation",
    comment:
      "The mamra almonds and gold-dusted sweets were exceptionally fresh. Our recipients loved that the boxes could be repurposed as jewelry and tabletop organizers. Outstanding attention to detail.",
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
    orderInfo: "500x Velvet & Brass Welcome Kits",
    productImage: "/images/kurma-onboarding-box.jpg",
    title: "Dedicated account manager made bulk ordering effortless",
    comment:
      "Managing 500 custom corporate gifts during peak festive rush usually brings delivery headaches. Kurma provided real-time dispatch tracking, dedicated bulk support, and 100% on-time doorstep arrival.",
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
    orderInfo: "320x Artisanal Desk Organizers & Candles",
    productImage: "/images/cat-scented-candle.jpg",
    title: "Unrivaled quality and eco-conscious packaging",
    comment:
      "The zero-plastic packaging commitment combined with pure brass accents and high-grade organic dry fruits was a big hit with our leadership team. We have already renewed for the upcoming quarter.",
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
    orderInfo: "150x Executive Gourmet & Desk Sets",
    productImage: "/images/cat-desk-clock.jpg",
    title: "Sophisticated presentation that elevated our brand",
    comment:
      "Our leadership summit delegates specifically complimented the curation. The custom gold foil debossing of our emblem was done with jeweler-level precision.",
  },
];

export function ReviewsSection({ onRequestQuote }: ReviewsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "corporate" | "festive" | "luxury">("all");

  const filteredReviews =
    activeCategory === "all"
      ? REVIEWS
      : REVIEWS.filter((r) => r.category === activeCategory);

  return (
    <section id="reviews" className="w-full bg-[#fdfcf9] py-16 sm:py-24 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Brand Header matching site theme */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif text-stone-900 font-normal">
            What Our Clients Say
          </h2>

          {/* Elegant Gold Diamond Divider */}
          <div className="flex items-center justify-center gap-2 mt-2.5 mb-4">
            <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
            <div className="w-2.5 h-2.5 rotate-45 border border-[#c0881b] bg-white flex items-center justify-center">
              <div className="w-1 h-1 bg-[#c0881b]" />
            </div>
            <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
          </div>

          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Trusted by India’s leading enterprises and families for milestone celebrations and executive gifting.
          </p>

          {/* Overall Rating Strip */}
          <div className="inline-flex items-center gap-2.5 bg-white border border-stone-200/80 rounded-full px-4 py-1.5 shadow-2xs mt-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-stone-900">4.9 / 5</span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-stone-600">Based on 12,500+ verified corporate & festive orders</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-8 no-scrollbar">
          {[
            { id: "all", label: "All Reviews" },
            { id: "corporate", label: "Corporate & Team Gifting" },
            { id: "festive", label: "Festive & Diwali Hampers" },
            { id: "luxury", label: "Executive & VIP Keepsakes" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === tab.id
                  ? "bg-[#12172b] text-white shadow-sm"
                  : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80"
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
              className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-7 flex flex-col justify-between hover:shadow-md hover:border-amber-200/80 transition-all duration-300 group"
            >
              <div>
                {/* Stars and Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-full border border-emerald-200/60">
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
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                    <Image
                      src={review.productImage}
                      alt={review.orderInfo}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <span className="text-xs text-stone-600 font-medium truncate">
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

        {/* Bottom Refined Call to Action */}
        <div className="mt-12 bg-white border border-[#eed08e]/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
              Planning custom gifting for your organization?
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Receive a curated proposal with bespoke branding options and digital sample previews within 24 hours.
            </p>
          </div>

          <button
            onClick={onRequestQuote}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c0881b] hover:bg-[#a67414] text-white text-xs sm:text-sm font-medium rounded-sm transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <span>Request Custom Catalog & Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
