"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#f3f4f6] text-gray-800 border-t border-gray-200/80 font-sans">
      {/* Top 6-Column Section with Vertical Dividers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-0">
          {/* Column 1: Policy Info */}
          <div className="lg:pr-6 lg:border-r lg:border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-3.5 tracking-tight">
              Policy Info
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: About Company */}
          <div className="lg:px-6 lg:border-r lg:border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-3.5 tracking-tight">
              About Company
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Kurma Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  News Room
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Kurma Business */}
          <div className="lg:px-6 lg:border-r lg:border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-3.5 tracking-tight">
              Kurma Business
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Decoration Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Corporate Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Retails Stores
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Franchise
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Need Help ? */}
          <div className="lg:px-6 lg:border-r lg:border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-3.5 tracking-tight">
              Need Help ?
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: International Presence */}
          <div className="lg:px-6 lg:border-r lg:border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-3.5 tracking-tight">
              International
              <br className="hidden lg:block" /> Presence
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Dubai
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Qatar
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Saudi Arabia
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition-colors">
                  Singapore
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Subscribe Now */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 lg:pl-6">
            <h3 className="text-sm font-bold text-gray-900 mb-1 tracking-tight">
              Subscribe Now
            </h3>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Get updates on promotions and offers coupons.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-2xs focus-within:border-gray-500 transition-colors">
                <div className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center mr-2 shrink-0">
                  <Mail className="w-3 h-3 text-gray-600" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full text-xs text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="ml-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer shrink-0"
                >
                  {isSubscribed ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
              {isSubscribed && (
                <span className="text-[11px] text-emerald-600 absolute -bottom-5 left-1">
                  Thank you for subscribing!
                </span>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Legal, CIN & Grievance Information Section */}
      <div className="border-t border-gray-200/90 py-8 px-4 sm:px-6 lg:px-8 text-center text-[11px] sm:text-xs text-gray-700 leading-relaxed">
        <div className="max-w-5xl mx-auto space-y-2">
          <p>
            <span className="font-semibold text-gray-800">Company Name:</span> Kurma Impressions Private Limited
            <span className="mx-1.5 text-gray-300">|</span>
            <span className="font-semibold text-gray-800">CIN:</span> U52100HR2021PTC118882
            <span className="mx-1.5 text-gray-300">|</span>
            <span className="font-semibold text-gray-800">Regd. Office:</span> Plot No. 75P, Sector-44, Gurugram, Haryana - 122003
          </p>

          <p>
            <span className="font-semibold text-gray-800">Telephone No.:</span> +91-11-26802680
            <span className="mx-1.5 text-gray-300">|</span>
            <span className="font-semibold text-gray-800">Grievance Resolution Officer Name:</span> Mr. Sagarjit Karmakar
            <span className="mx-1.5 text-gray-300">|</span>
            <span className="font-semibold text-gray-800">Contact No.:</span> +91 9212422000 / 9755-248-248
            <span className="mx-1.5 text-gray-300">|</span>
            <span className="font-semibold text-gray-800">Email ID -</span>{" "}
            <a href="mailto:grievance@kurma.com" className="hover:underline">
              grievance@kurma.com
            </a>
          </p>

          <p className="pt-2">
            <Link
              href="#"
              className="text-[#2563eb] hover:underline font-medium"
            >
              Corporate Social Responsibility (CSR) Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
