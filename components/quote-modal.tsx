"use client";

import { useState } from "react";
import { X, CheckCircle2, ArrowRight, Building2, Mail, Phone, User, Package, Calendar } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    phoneNumber: "",
    quantity: "50-100 units",
    occasion: "Client Appreciation",
    budget: "$100 - $200 per box",
    neededBy: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 bg-stone-50/50">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.22em] text-[#c0881b] uppercase block">
              Kurma Bespoke Concierge
            </span>
            <h3 className="text-xl font-serif font-semibold text-stone-900 mt-0.5">
              Request a Tailored Corporate Quote
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-10 px-4 text-center">
              <div className="w-16 h-16 bg-[#fbf6ea] text-[#c0881b] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                Quote Request Received
              </h4>
              <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed mb-6">
                Thank you, <span className="font-semibold text-stone-900">{formData.fullName}</span>. 
                A Kurma Corporate Concierge will prepare your custom proposal and sample preview within 2 hours.
              </p>
              <div className="bg-[#fbf6ea] border border-[#eed08e] rounded-xl p-4 max-w-sm mx-auto text-left text-xs space-y-1.5 mb-6 text-stone-700">
                <div className="flex justify-between">
                  <span className="text-stone-500">Company:</span>
                  <span className="font-medium text-stone-900">{formData.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Quantity:</span>
                  <span className="font-medium text-stone-900">{formData.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Budget Tier:</span>
                  <span className="font-medium text-stone-900">{formData.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Inquiry ID:</span>
                  <span className="font-mono text-[#c0881b]">KRM-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#c0881b] hover:bg-[#a97514] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Back to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone-500 mb-4">
                Tell us about your gifting requirements. We provide digital mockups with your company logo within 24 hours.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jonathan Reynolds"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c0881b]/20 focus:border-[#c0881b] text-stone-900 placeholder:text-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-stone-400" />
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Global Advisory"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c0881b]/20 focus:border-[#c0881b] text-stone-900 placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jonathan@apexadvisory.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c0881b]/20 focus:border-[#c0881b] text-stone-900 placeholder:text-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 321-7890"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c0881b]/20 focus:border-[#c0881b] text-stone-900 placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-stone-400" />
                    Volume / Quantity *
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c0881b]/20 focus:border-[#c0881b] text-stone-900"
                  >
                    <option value="25-50 units">25 - 50 units</option>
                    <option value="50-100 units">50 - 100 units</option>
                    <option value="100-250 units">100 - 250 units</option>
                    <option value="250-500 units">250 - 500 units</option>
                    <option value="500+ units">500+ units (Tier discounts)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5">
                    Target Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c0881b]/20 focus:border-[#c0881b] text-stone-900"
                  >
                    <option value="$50 - $100 per box">$50 - $100 per box</option>
                    <option value="$100 - $200 per box">$100 - $200 per box</option>
                    <option value="$200 - $350 per box">$200 - $350 per box</option>
                    <option value="$350+ Luxury Tier">$350+ Luxury Tier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    Target Delivery
                  </label>
                  <input
                    type="date"
                    value={formData.neededBy}
                    onChange={(e) => setFormData({ ...formData, neededBy: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c0881b]/20 focus:border-[#c0881b] text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Branding Needs & Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention custom logo debossing, personalized message cards, specific items or delivery to multiple recipient addresses..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c0881b]/20 focus:border-[#c0881b] text-stone-900 placeholder:text-stone-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#c0881b] hover:bg-[#a97514] text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow flex items-center gap-2"
                >
                  <span>Submit Quote Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
