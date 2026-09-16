"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ShoppingBag, Menu, X } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onRequestQuote: () => void;
}

export function Navbar({ cartCount, onOpenCart, onRequestQuote }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinks = [
    { name: "Home", href: "#home", active: true },
    {
      name: "Corporate Gifts",
      href: "#categories",
      hasDropdown: true,
      items: [
        { title: "Executive Hampers", desc: "Curated luxury for leadership & VIPs" },
        { title: "Gourmet & Celebrations", desc: "Artisanal saffron, nuts & treats" },
        { title: "Desk & Lifestyle Sets", desc: "Eco-friendly organizers & essentials" },
        { title: "Festive Keepsakes", desc: "Handcrafted celebration boxes" },
      ],
    },
    { name: "Solutions", href: "#solutions" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact", isContact: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching Image 1 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
            <Image
              src="/images/kurma-logo-white.jpg"
              alt="Kurma Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.14em] text-[15px] font-bold text-stone-900 leading-tight">
              KURMA
            </span>
            <span className="font-serif tracking-[0.12em] text-[12px] text-stone-700 leading-tight">
              IMPRESSIONS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-[14px] text-stone-700 font-medium">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group py-2"
              onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={link.href}
                onClick={(e) => {
                  if (link.isContact) {
                    e.preventDefault();
                    onRequestQuote();
                  }
                }}
                className={`flex items-center gap-1 transition-colors hover:text-[#c0881b] cursor-pointer ${
                  link.active
                    ? "text-[#c0881b] font-semibold border-b-[2px] border-[#c0881b] pb-1"
                    : "text-stone-700"
                }`}
              >
                <span>{link.name}</span>
                {link.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#c0881b] transition-transform duration-200 group-hover:rotate-180" />
                )}
              </a>

              {/* Dropdown Menu */}
              {link.hasDropdown && openDropdown === link.name && (
                <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-xl border border-stone-100 p-2 mt-1 animate-in fade-in-50 duration-150">
                  {link.items?.map((item, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="block p-2.5 rounded-lg hover:bg-[#fbf6ea] transition-colors"
                    >
                      <div className="text-xs font-semibold text-stone-900">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {item.desc}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Action CTAs */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={onRequestQuote}
            className="hidden sm:inline-flex items-center justify-center px-4.5 py-2 bg-[#c0881b] hover:bg-[#a97514] text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs hover:shadow transition-all duration-200 active:scale-[0.98]"
          >
            Request a Quote
          </button>

          {/* Cart Icon matching Image 1 */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-stone-700 hover:text-[#c0881b] transition-colors"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            <span className="absolute top-1 right-0.5 w-3.5 h-3.5 bg-[#c0881b] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 hover:text-stone-900 lg:hidden rounded-lg hover:bg-stone-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <div key={link.name} className="border-b border-stone-100 pb-2">
              <a
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.isContact) {
                    e.preventDefault();
                    onRequestQuote();
                  }
                }}
                className="block text-sm font-medium text-stone-800 hover:text-[#c0881b]"
              >
                {link.name}
              </a>
            </div>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full py-2.5 bg-[#c0881b] hover:bg-[#a97514] text-white text-sm font-medium rounded-md text-center"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
