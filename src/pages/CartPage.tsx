import React from 'react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../data/products';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

interface CartPageProps {
  onNavigate: (route: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, updateQuantity, removeFromCart, subtotal, shipping, total, cartCount } =
    useCart();

  const freeShippingThreshold = 5000;
  const amountToFreeShipping = freeShippingThreshold - subtotal;

  if (cart.length === 0) {
    return (
      <div className="bg-[#F5F0E8] min-h-[75vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-[#FAF7F2] border border-[#ECE4D8] p-10 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#ECE4D8] flex items-center justify-center mx-auto mb-6 text-[#C5A46D]">
            <ShoppingBag className="w-8 h-8 stroke-1" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#641E32] font-semibold block mb-2">
            Your Selection
          </span>
          <h1 className="font-serif text-3xl text-[#292522] mb-3">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#665E58] font-light leading-relaxed mb-8">
            You haven’t added any pieces to your bag yet. Explore our 40-piece collection of earrings, solitary pendants, bangles, and bridal suites.
          </p>
          <button
            onClick={() => onNavigate('/shop')}
            className="w-full py-4 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase transition-colors shadow-sm cursor-pointer"
          >
            Discover the Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#292522] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="pb-8 mb-8 border-b border-[#ECE4D8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-[#641E32] font-semibold block mb-1">
              Curated Review
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#292522]">
              Shopping Bag ({cartCount} {cartCount === 1 ? 'Piece' : 'Pieces'})
            </h1>
          </div>
          <button
            onClick={() => onNavigate('/shop')}
            className="text-xs font-semibold uppercase tracking-widest text-[#641E32] hover:text-[#4A1424] flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            &larr; <span>Continue Shopping</span>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="mb-8 p-4 bg-[#FAF7F2] border border-[#ECE4D8] text-xs text-[#665E58] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>
              {amountToFreeShipping > 0 ? (
                <>
                  Add <strong className="text-[#292522]">{formatINR(amountToFreeShipping)}</strong> more to unlock <strong className="text-[#641E32]">Complimentary Insured Delivery</strong> across India.
                </>
              ) : (
                <span className="text-[#641E32] font-semibold">
                  You have unlocked Complimentary Insured Delivery across India!
                </span>
              )}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#8C827A] hidden md:inline">
            Standard threshold: ₹5,000
          </span>
        </div>

        {/* Layout: Two Columns (Cart items left, Order summary right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border border-[#ECE4D8] divide-y divide-[#ECE4D8] bg-[#FAF7F2]">
              {cart.map((item, index) => {
                const { product, quantity, selectedOption } = item;
                const itemTotal = product.price * quantity;

                return (
                  <div
                    key={`${product.id}-${selectedOption || ''}-${index}`}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => onNavigate(`/product/${product.slug}`)}
                      className="w-20 h-24 sm:w-24 sm:h-28 bg-[#ECE4D8] shrink-0 overflow-hidden cursor-pointer border border-[#ECE4D8]"
                    >
                      <JewelleryVisual
                        src={product.image}
                        alt={product.name}
                        category={product.category}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                        {product.category}
                      </span>
                      <h3
                        onClick={() => onNavigate(`/product/${product.slug}`)}
                        className="font-serif text-base font-semibold text-[#292522] hover:text-[#641E32] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      {selectedOption && (
                        <p className="text-xs text-[#665E58]">
                          Option: <span className="font-medium text-[#292522]">{selectedOption}</span>
                        </p>
                      )}

                      <div className="pt-2 text-xs text-[#665E58]">
                        Unit Price: <span className="font-semibold text-[#292522] tabular-nums">{formatINR(product.price)}</span>
                      </div>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#ECE4D8]">
                      <div className="font-sans text-base font-semibold text-[#292522] tabular-nums">
                        {formatINR(itemTotal)}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#ECE4D8] bg-[#F5F0E8]">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1, selectedOption)}
                          className="px-2.5 py-1 text-xs text-[#292522] hover:bg-[#ECE4D8] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1, selectedOption)}
                          className="px-2.5 py-1 text-xs text-[#292522] hover:bg-[#ECE4D8] transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(product.id, selectedOption)}
                        className="text-xs text-[#8C827A] hover:text-[#641E32] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Remove piece"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-[#FAF7F2] border border-[#ECE4D8] text-xs text-[#665E58] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <span>
                All pieces are packaged in luxury velvet gift boxes with serialized demo authenticity documentation.
              </span>
            </div>
          </div>

          {/* Order Summary Panel (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF7F2] border border-[#ECE4D8] p-6 sm:p-8 space-y-6 sticky top-28 shadow-xs">
              <h2 className="font-serif text-xl text-[#292522] pb-4 border-b border-[#ECE4D8]">
                Summary of Selection
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#665E58]">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold text-[#292522] tabular-nums">
                    {formatINR(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-[#665E58]">
                  <span>Insured Courier Delivery (India)</span>
                  <span className="tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-[#641E32] font-medium">Free</span>
                    ) : (
                      formatINR(shipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-[#8C827A]">
                  <span>Demo Taxes & Hallmarking</span>
                  <span>Included</span>
                </div>
              </div>

              {/* Gold Divider */}
              <div className="h-[1px] bg-[#C5A46D]/40" />

              {/* Total */}
              <div className="flex justify-between items-baseline">
                <span className="font-serif text-lg font-semibold text-[#292522]">
                  Total Amount
                </span>
                <span className="font-sans text-2xl font-bold text-[#641E32] tabular-nums">
                  {formatINR(total)}
                </span>
              </div>

              {/* Primary Actions */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onNavigate('/checkout')}
                  className="w-full py-4 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#DFC79B]" />
                </button>

                <button
                  onClick={() => onNavigate('/shop')}
                  className="w-full py-3 bg-transparent hover:bg-[#ECE4D8] text-[#292522] border border-[#ECE4D8] text-xs uppercase tracking-wider font-medium transition-colors"
                >
                  Continue Browsing
                </button>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#8C827A]">
                  Demo Storefront · No real charge will occur
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
