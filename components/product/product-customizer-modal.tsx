"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  PenTool,
  ShoppingBag,
  Check,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { ProductSKU, formatPrice, createCartItemId } from "@/lib/products";
import { CartItem } from "@/components/cart/cart-drawer";

interface ProductCustomizerModalProps {
  product: ProductSKU | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export function ProductCustomizerModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductCustomizerModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none">
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 lg:p-8 relative z-10">
        <CustomizerContent
          key={product.id}
          product={product}
          onClose={onClose}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
}

function CustomizerContent({
  product,
  onClose,
  onAddToCart,
}: {
  product: ProductSKU;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Initialize custom options directly from product definition without useEffect
  const [customValues, setCustomValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {};
    product.customizationFields.forEach((field) => {
      if (field.defaultValue) {
        initialValues[field.id] = field.defaultValue;
      } else if (field.options && field.options.length > 0) {
        initialValues[field.id] = field.options[0].value;
      } else {
        initialValues[field.id] = "";
      }
    });
    return initialValues;
  });

  // Calculate price with add-ons if any
  let unitPrice = product.price;
  product.customizationFields.forEach((field) => {
    if (field.options) {
      const selectedOption = field.options.find(
        (opt) => opt.value === customValues[field.id]
      );
      if (selectedOption?.priceDelta) {
        unitPrice += selectedOption.priceDelta;
      }
    }
  });

  const totalPrice = unitPrice * quantity;

  const handleFieldChange = (fieldId: string, value: string) => {
    setCustomValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleAddToCart = () => {
    const readableCustomizations: Record<string, string> = {};
    product.customizationFields.forEach((field) => {
      const val = customValues[field.id];
      if (val && val.trim() !== "") {
        readableCustomizations[field.label] = val;
      }
    });

    const item: CartItem = {
      id: createCartItemId(product.id),
      skuId: product.id,
      name: product.name,
      price: unitPrice,
      priceDisplay: formatPrice(unitPrice),
      image: selectedImage || product.image,
      quantity,
      customizations: readableCustomizations,
    };

    onAddToCart(item);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="w-full max-w-4xl bg-white text-stone-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#eed08e]/50 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh] relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close customizer"
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/40 hover:bg-stone-900/60 text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      {/* LEFT COLUMN: Gallery & Product Visuals */}
      <div className="w-full md:w-1/2 bg-[#072515] p-5 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden">
        {/* Background texture subtle shine */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at center, #eed08e 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div>
          {/* Category & Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#eed08e]">
              {product.category}
            </span>
            {product.badge && (
              <span className="text-[10px] font-semibold bg-[#eed08e]/20 text-[#eed08e] px-2.5 py-0.5 rounded-full border border-[#eed08e]/40">
                {product.badge}
              </span>
            )}
          </div>

          {/* Main Image Frame */}
          <div className="relative aspect-4/3 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#eed08e]/30 shadow-2xl bg-stone-950">
            <Image
              src={selectedImage || product.image}
              alt={product.name}
              fill
              className="object-cover transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>

          {/* Thumbnails (if gallery exists) */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    selectedImage === img
                      ? "border-[#eed08e] scale-105 shadow-md"
                      : "border-stone-700/60 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Highlights Specs at bottom of image panel */}
        <div className="pt-4 border-t border-white/10 mt-4 space-y-1.5 hidden sm:block">
          <h4 className="text-[11px] font-semibold text-[#eed08e] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Craftsmanship Highlights
          </h4>
          <ul className="text-xs text-stone-300 space-y-1">
            {product.details.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#eed08e]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Customization Form */}
      <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto bg-stone-50/50">
        <div className="space-y-5">
          {/* Product Title and Price Header */}
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight">
              {product.name}
            </h3>
            <p className="text-xs text-[#c0881b] font-medium tracking-wide mt-1">
              {product.subtitle}
            </p>

            <div className="flex items-baseline gap-2.5 mt-2.5">
              <span className="text-xl sm:text-2xl font-bold text-stone-900">
                {formatPrice(unitPrice)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Customization Included
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* SKU Customization Fields */}
          <div className="border-t border-stone-200 pt-4 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 uppercase tracking-wider">
              <PenTool className="w-3.5 h-3.5 text-[#c0881b]" />
              <span>Personalize This SKU</span>
            </div>

            {product.customizationFields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-800">
                  {field.label}
                </label>

                {field.description && (
                  <p className="text-[11px] text-stone-500">
                    {field.description}
                  </p>
                )}

                {/* Text input */}
                {field.type === "text" && (
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={field.maxLength}
                      value={customValues[field.id] || ""}
                      onChange={(e) =>
                        handleFieldChange(field.id, e.target.value)
                      }
                      placeholder={field.placeholder}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#c0881b] focus:ring-1 focus:ring-[#c0881b] shadow-2xs"
                    />
                    {field.maxLength && (
                      <span className="text-[10px] text-stone-400 absolute right-3 top-2.5">
                        {(customValues[field.id] || "").length}/
                        {field.maxLength}
                      </span>
                    )}
                  </div>
                )}

                {/* Radio Options / Finish Selectors */}
                {field.type === "radio" && field.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {field.options.map((opt) => {
                      const isSelected = customValues[field.id] === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() =>
                            handleFieldChange(field.id, opt.value)
                          }
                          className={`text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "border-[#c0881b] bg-[#fbf6ea] font-semibold text-stone-900 shadow-xs"
                              : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#c0881b] shrink-0 ml-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Dropdown Select */}
                {field.type === "select" && field.options && (
                  <select
                    value={customValues[field.id] || ""}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#c0881b] cursor-pointer shadow-2xs"
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Summary & Add to Cart Button */}
        <div className="border-t border-stone-200 pt-4 mt-6 space-y-3">
          {/* Quantity Stepper & Total */}
          <div className="flex items-center justify-between">
            <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer text-sm font-bold"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-stone-800 min-w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer text-sm font-bold"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-stone-500 block">
                Total Amount
              </span>
              <span className="text-lg font-bold text-stone-900">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-[#c0881b] hover:bg-[#a97514] text-white active:scale-[0.99]"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Sacred Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add Customized Item to Cart • {formatPrice(totalPrice)}</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-3 text-[10.5px] text-stone-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Handcrafted in India
            </span>
            <span>•</span>
            <span>Doorstep Insured Dispatch</span>
          </div>
        </div>
      </div>
    </div>
  );
}
