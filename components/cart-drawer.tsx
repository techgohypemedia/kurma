"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Tag,
} from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  priceDisplay?: string;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onExploreProducts: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onExploreProducts,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "success">("cart");

  // Checkout address state
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod" as "cod" | "online",
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 499;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const discountAmount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === "SACRED10" || couponCode.trim().toUpperCase() === "KURMA10") {
      setAppliedCoupon(couponCode.trim().toUpperCase());
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon. Try 'SACRED10' for 10% off!");
    }
  };

  const handleProceedCheckout = () => {
    setCheckoutStep("checkout");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingDetails.name || !shippingDetails.phone || !shippingDetails.address) {
      alert("Please enter your name, phone number, and delivery address.");
      return;
    }
    setCheckoutStep("success");
  };

  const handleCloseAndReset = () => {
    setCheckoutStep("cart");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={handleCloseAndReset}
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-stone-200 bg-[#fbf6ea]/60">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#c0881b]" />
              <h2 className="text-lg font-serif font-bold text-stone-900">
                {checkoutStep === "cart"
                  ? `Your Cart (${totalCount})`
                  : checkoutStep === "checkout"
                  ? "Express Checkout"
                  : "Order Confirmed!"}
              </h2>
            </div>
            <button
              onClick={handleCloseAndReset}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* STEP 1: CART VIEW */}
          {checkoutStep === "cart" && (
            <>
              {/* Free Shipping Progress Bar */}
              {items.length > 0 && (
                <div className="bg-[#072515] text-white px-6 py-3 border-b border-[#0d3f27]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    {isFreeShipping ? (
                      <span className="font-semibold text-[#eed08e] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Unlocked FREE Sacred Delivery!
                      </span>
                    ) : (
                      <span className="text-stone-300">
                        Add <strong className="text-[#eed08e]">₹{amountNeededForFreeShipping}</strong> more for FREE Shipping
                      </span>
                    )}
                    <span className="text-[11px] text-stone-400">₹499 Threshold</span>
                  </div>
                  <div className="w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-linear-to-r from-[#c0881b] to-[#eed08e] h-full transition-all duration-500 rounded-full"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100">
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#fbf6ea] text-[#c0881b] rounded-full flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-bold text-stone-900">
                        Your sacred cart is empty
                      </h3>
                      <p className="text-stone-500 text-xs mt-1 max-w-xs mx-auto">
                        Explore our handcrafted Mysore sandalwood, temple flora, and heirloom brass burners.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onExploreProducts();
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c0881b] hover:bg-[#a97514] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      <span>Explore Incense</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="py-4 flex gap-3.5 items-start">
                      {/* Thumbnail */}
                      <div className="relative w-18 h-18 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>

                      {/* Info & Controls */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-stone-900 leading-snug truncate pr-2">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs font-bold text-[#c0881b] mt-1">
                          ₹{item.price}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-xs font-semibold text-stone-800 min-w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-stone-900">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {items.length > 0 && (
                <div className="border-t border-stone-200 p-6 bg-stone-50/70 space-y-4">
                  {/* Coupon Code Input */}
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Promo code (e.g. SACRED10)"
                          className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg uppercase tracking-wider focus:outline-hidden focus:border-[#c0881b] bg-white"
                        />
                        <Tag className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-2.5" />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedCoupon && (
                      <div className="flex items-center justify-between text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <span>Code &apos;{appliedCoupon}&apos; Applied (-10%)</span>
                        <button
                          type="button"
                          onClick={() => setAppliedCoupon(null)}
                          className="text-stone-400 hover:text-stone-700 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    {couponError && (
                      <p className="text-[11px] text-rose-600">{couponError}</p>
                    )}
                  </form>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-stone-900">₹{subtotal}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Discount (10%)</span>
                        <span className="font-semibold">-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Sacred Shipping</span>
                      <span>
                        {isFreeShipping ? (
                          <span className="text-emerald-700 font-semibold">FREE</span>
                        ) : (
                          "₹49"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                      <span>Total Amount</span>
                      <span className="text-[#c0881b]">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleProceedCheckout}
                    className="w-full py-3 px-4 bg-[#c0881b] hover:bg-[#a97514] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10.5px] text-stone-500 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      100% Charcoal-Free
                    </span>
                    <span>•</span>
                    <span>Safe Temple Packaging</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: EXPRESS CHECKOUT FORM */}
          {checkoutStep === "checkout" && (
            <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <h3 className="text-sm font-serif font-bold text-stone-900 mb-1">
                    Shipping &amp; Delivery Information
                  </h3>
                  <p className="text-xs text-stone-500">
                    Enter your delivery address for fast doorstep dispatch.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.name}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                      placeholder="e.g. Aditi Sharma"
                      className="w-full text-xs px-3 py-2.5 border border-stone-200 rounded-lg focus:border-[#c0881b] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number (For Delivery Updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs px-3 py-2.5 border border-stone-200 rounded-lg focus:border-[#c0881b] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={shippingDetails.address}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                      placeholder="House/Flat No., Apartment, Street, Landmark"
                      className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:border-[#c0881b] focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={shippingDetails.city}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                        placeholder="e.g. Bengaluru"
                        className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:border-[#c0881b] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={shippingDetails.pincode}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: e.target.value })}
                        placeholder="560001"
                        className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:border-[#c0881b] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-2">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer text-xs transition-all ${
                          shippingDetails.paymentMethod === "cod"
                            ? "border-[#c0881b] bg-[#fbf6ea] font-bold text-stone-900"
                            : "border-stone-200 text-stone-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={shippingDetails.paymentMethod === "cod"}
                          onChange={() => setShippingDetails({ ...shippingDetails, paymentMethod: "cod" })}
                          className="accent-[#c0881b]"
                        />
                        <span>Cash on Delivery</span>
                      </label>

                      <label
                        className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer text-xs transition-all ${
                          shippingDetails.paymentMethod === "online"
                            ? "border-[#c0881b] bg-[#fbf6ea] font-bold text-stone-900"
                            : "border-stone-200 text-stone-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={shippingDetails.paymentMethod === "online"}
                          onChange={() => setShippingDetails({ ...shippingDetails, paymentMethod: "online" })}
                          className="accent-[#c0881b]"
                        />
                        <span>UPI / Card / NetBanking</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs space-y-1 text-stone-700 mt-4">
                  <div className="flex justify-between font-bold text-stone-900">
                    <span>Payable Total</span>
                    <span className="text-[#c0881b]">₹{grandTotal}</span>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Includes all taxes &amp; sacred fragile-proof gift packaging.
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="px-4 py-3 border border-stone-200 text-stone-600 rounded-xl text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-[#c0881b] hover:bg-[#a97514] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Place Sacred Order (₹{grandTotal})
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
          {checkoutStep === "success" && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 overflow-y-auto">
              <div className="w-18 h-18 bg-[#fbf6ea] text-[#c0881b] rounded-full flex items-center justify-center mx-auto border-2 border-[#eed08e]">
                <CheckCircle2 className="w-10 h-10 stroke-[2]" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#c0881b] uppercase tracking-widest block mb-1">
                  Order Placed Successfully
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Thank You, {shippingDetails.name}!
                </h3>
                <p className="text-xs text-stone-500 mt-2 max-w-xs mx-auto leading-relaxed">
                  Your order for {totalCount} sacred item(s) worth ₹{grandTotal} has been confirmed. We are packing your pure incense with delicate care.
                </p>
              </div>

              <div className="bg-[#fbf6ea] border border-[#eed08e] rounded-xl p-4 w-full text-left text-xs space-y-2 text-stone-800">
                <div className="flex justify-between">
                  <span className="text-stone-500">Order ID:</span>
                  <span className="font-mono font-bold text-stone-900">
                    KRM-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Dispatch:</span>
                  <span className="font-semibold text-stone-900">Within 24 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Delivery To:</span>
                  <span className="font-medium text-stone-900 truncate max-w-[180px]">
                    {shippingDetails.address}, {shippingDetails.city || "India"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Payment:</span>
                  <span className="font-bold text-emerald-700 uppercase">
                    {shippingDetails.paymentMethod === "cod" ? "Cash on Delivery" : "Online Confirmed"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCloseAndReset}
                className="w-full py-3 bg-[#c0881b] hover:bg-[#a97514] text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
