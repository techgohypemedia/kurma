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
      name: "Initial Collection",
      href: "#catalog",
      hasDropdown: true,
      items: [
        { title: "Elements in Harmony Marble Box", desc: "Flagship 5 elements luxury trunk" },
        { title: "Kurma MDF Keepsake Gift Box", desc: "Artisanal rigid wooden gift box" },
        { title: "5 Elements Fragrance Boxes", desc: "Earth, Water, Fire, Air, Space (27 sticks)" },
        { title: "Heirloom Sacred Accessories", desc: "Brass Turtle Stand, Medallion, Pashmina, Bookmark" },
      ],
    },
    { name: "5 Elements", href: "#elements-suite" },
    { name: "Gift Trunks", href: "#solutions" },
    { name: "Reviews", href: "#reviews" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 text-stone-900 transition-all shadow-xs">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
            <Image
              src="/images/brand/kurma-turtle-transparent.png"
              alt="Kurma Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="font-serif tracking-[0.18em] text-[20px] sm:text-[22px] font-bold text-stone-900 leading-none">
            KURMA
          </span>
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
                  if (link.href === "#catalog" && onExploreProducts) {
                    e.preventDefault();
                    onExploreProducts();
                  }
                }}
                className={`flex items-center gap-1 transition-colors hover:text-[#c0881b] cursor-pointer ${
                  link.active
                    ? "text-[#c0881b] font-semibold"
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
