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
    orderInfo: "380x Royal Mysore Sandalwood Agarbatti Sets",
    productImage: "/images/agarbatti-sandalwood.jpg",
    title: "Divine aroma with zero charcoal smoke",
    comment:
      "We ordered 380 custom luxury incense sets for employee gifting across 22 cities. The Mysore sandalwood aroma is completely natural with zero chemical sharpness. Received countless messages praising the fragrance and the brass lotus stand.",
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
    orderInfo: "120x Handcrafted Brass Lotus & Oudh Sets",
    productImage: "/images/agarbatti-brass-burner.jpg",
    title: "The standard for executive client gifting",
    comment:
      "When gifting high-net-worth institutional partners, standard synthetic incense doesn't cut it. Kurma's slow-burning Kashmiri rose and aged sandalwood sticks left an unforgettable, serene impression on our board.",
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
    orderInfo: "250x Temple Flora & Mogra Gift Boxes",
    productImage: "/images/agarbatti-temple-flora.jpg",
    title: "Authentic temple fragrance and heirloom presentation",
    comment:
      "The consecrated temple flower blend is sublime and brings instant tranquility. Our clients loved that the packaging used zero plastic and the brass burner could be treasured forever.",
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
    orderInfo: "500x Imperial Royal Incense Festive Trunks",
    productImage: "/images/agarbatti-gift-hamper.jpg",
    title: "Flawless bulk order execution during peak festive rush",
    comment:
      "Managing 500 custom festive agarbatti hampers during Diwali was completely seamless. Kurma provided real-time dispatch tracking, personalized gold-foil branding, and 100% on-time delivery with zero glass damage.",
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
    orderInfo: "320x Charcoal-Free Oudh & Sandalwood Cylinders",
    productImage: "/images/agarbatti-hero.jpg",
    title: "Calming essential oils with 65-min burn time",
    comment:
      "The charcoal-free organic formulation was a massive hit with our leadership team. No eye irritation, just pure soothing botanicals that burn evenly for well over an hour.",
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
    orderInfo: "150x Mysore Sandalwood & Brass Keepsake Sets",
    productImage: "/images/agarbatti-sandalwood.jpg",
    title: "Sophisticated presentation that elevated our brand",
    comment:
      "Our leadership summit delegates were mesmerized by the aroma. The custom gold foil debossing of our corporate seal on the deep green trunks was done with exquisite precision.",
  },
];

export function ReviewsSection({ onExploreProducts }: ReviewsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "corporate" | "festive" | "luxury">("all");

  const filteredReviews =
    activeCategory === "all"
      ? REVIEWS
      : REVIEWS.filter((r) => r.category === activeCategory);

  return (
    <section id="reviews" className="w-full bg-[#072515] bg-[url('/images/green-texture.png')] bg-repeat py-16 sm:py-24 border-b border-[#eed08e]/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Brand Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif text-white font-normal">
            What Our Clients Say
          </h2>

          {/* Elegant Gold Diamond Divider */}
          <div className="flex items-center justify-center gap-2 mt-2.5 mb-4">
            <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
            <div className="w-2.5 h-2.5 rotate-45 border border-[#eed08e] bg-[#072515] flex items-center justify-center">
              <div className="w-1 h-1 bg-[#eed08e]" />
            </div>
            <div className="h-[1px] w-20 sm:w-28 bg-[#eed08e]" />
          </div>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Trusted by India’s leading enterprises and families for divine rituals, executive wellness, and festive gifting.
          </p>

          {/* Overall Rating Strip with Crisp White Card */}
          <div className="inline-flex items-center gap-2.5 bg-white border border-stone-200 rounded-full px-4 py-1.5 shadow-sm mt-4 text-stone-900">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-stone-900">4.9 / 5</span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-stone-600">Based on 12,500+ verified incense &amp; corporate orders</span>
          </div>
        </div>

        {/* Filter Pills with Crisp White Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-8 no-scrollbar">
          {[
            { id: "all", label: "All Reviews" },
            { id: "corporate", label: "Corporate & Team Gifting" },
            { id: "festive", label: "Festive & Temple Hampers" },
            { id: "luxury", label: "Executive & Brass Burners" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === tab.id
                  ? "bg-white text-stone-900 font-bold shadow-md"
                  : "bg-white/90 text-stone-700 hover:bg-white border border-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews 3-Column Grid with Crisp White Cards */}
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
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-stone-200 shrink-0">
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
              Experience Divine Serenity in Your Sanctuary
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Enjoy 10% off your order with code <strong className="text-[#c0881b]">SACRED10</strong> at checkout. Complimentary handmade brass incense holder on orders above ₹999.
            </p>
          </div>

          <button
            onClick={onExploreProducts}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c0881b] hover:bg-[#a67414] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shrink-0 cursor-pointer hover:shadow-lg"
          >
            <span>Shop Bestselling Agarbatti</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
