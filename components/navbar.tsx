"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ShoppingBag, Menu, X } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onExploreProducts?: () => void;
}

export function Navbar({ cartCount, onOpenCart, onExploreProducts }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinks = [
    { name: "Home", href: "#home", active: true },
    {
      name: "Agarbatti Collection",
      href: "#categories",
      hasDropdown: true,
      items: [
        { title: "Mysore Sandalwood Bathi", desc: "Pure aged chandan, 100% charcoal-free" },
        { title: "Temple Flora & Mogra", desc: "Recycled holy flowers & sacred herbs" },
        { title: "Rare Oudh & Loban Resins", desc: "Deep aromatic slow-burning sticks" },
        { title: "Antique Brass Burners", desc: "Hand-carved lotus stands & pooja urlis" },
      ],
    },
    { name: "Signature Picks", href: "#bestsellers" },
    { name: "Gift Sets", href: "#solutions" },
    { name: "Reviews", href: "#reviews" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 text-stone-900 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
            <Image
              src="/images/kurma-logo-white.jpg"
              alt="Kurma Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.14em] text-[15px] font-bold text-stone-900 leading-tight">
              KURMA
            </span>
            <span className="font-serif tracking-[0.12em] text-[12px] text-[#c0881b] leading-tight">
              SACRED IMPRESSIONS
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
                <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-xl border border-stone-100 p-2 mt-1 animate-in fade-in-50 duration-150 text-stone-900">
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
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#c0881b] hover:bg-[#a97514] text-white text-xs sm:text-sm font-medium rounded-md shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            <span>Cart</span>
            <span className="ml-0.5 px-1.5 py-0.2 bg-white/20 text-white rounded-full text-xs font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 hover:text-stone-900 lg:hidden rounded-lg hover:bg-stone-100 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-4 space-y-3 shadow-lg text-stone-900">
          {navLinks.map((link) => (
            <div key={link.name} className="border-b border-stone-100 pb-2">
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
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
                onOpenCart();
              }}
              className="w-full py-2.5 bg-[#c0881b] hover:bg-[#a97514] text-white text-sm font-medium rounded-md text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2]" />
              <span>View Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
