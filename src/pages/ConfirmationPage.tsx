import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../data/products';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { trackPurchase } from '../utils/metaPixel';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  ShieldCheck,
  Mail,
  HelpCircle,
} from 'lucide-react';

interface ConfirmationPageProps {
  onNavigate: (route: string) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onNavigate }) => {
  const { lastOrder } = useCart();

  // Fire Meta Pixel Purchase event with strict deduplication
  useEffect(() => {
    if (lastOrder) {
      trackPurchase(lastOrder);
    }
  }, [lastOrder]);

  // Guard against direct fake navigation if no order was ever placed
  if (!lastOrder) {
    return (
      <div className="bg-[#F5F0E8] min-h-[75vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-[#FAF7F2] border border-[#ECE4D8] p-8 text-center shadow-xs">
          <HelpCircle className="w-12 h-12 text-[#C5A46D] mx-auto mb-4 stroke-1" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#641E32] font-semibold block mb-2">
            No Active Order Found
          </span>
          <h2 className="font-serif text-2xl text-[#292522] mb-3">
            Awaiting Your Selection
          </h2>
          <p className="text-xs text-[#665E58] mb-6 leading-relaxed">
            Direct navigation to the confirmation receipt requires completing a simulated order. Browse our catalogue of 40 pieces and test our seamless checkout flow.
          </p>
          <button
            onClick={() => onNavigate('/shop')}
            className="w-full py-3.5 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Explore Catalogue &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#292522] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Restrained Luxury Confirmation Illustration & Heading */}
        <div className="bg-[#FAF7F2] border border-[#ECE4D8] p-8 sm:p-12 text-center relative overflow-hidden shadow-xs">
          {/* Champagne Gold Accent Corner */}
          <div className="w-20 h-20 bg-gradient-to-br from-[#DFC79B]/20 to-transparent absolute top-0 left-0" />

          {/* Restrained Checkmark */}
          <div className="w-16 h-16 rounded-full bg-[#641E32] text-[#DFC79B] flex items-center justify-center mx-auto mb-6 shadow-md">
            <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
          </div>

          <span className="text-xs tracking-[0.3em] uppercase text-[#641E32] font-semibold block mb-2">
            Sample Order Placed Successfully
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#292522] mb-3">
            Thank You for Your Order
          </h1>

          <p className="text-sm text-[#665E58] font-light max-w-lg mx-auto leading-relaxed">
            We have prepared your simulated order receipt. A confirmation summary has been registered for your review.
          </p>

          {/* Prominent Demo Notice */}
          <div className="mt-6 inline-block bg-[#F5F0E8] border border-[#C5A46D]/40 px-4 py-2 text-xs text-[#665E58]">
            <span className="font-semibold text-[#641E32]">Sample Order Notice:</span> This is a demonstration purchase. No actual money was debited from any account.
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-[#FAF7F2] border border-[#ECE4D8] p-6 sm:p-8 space-y-6">
          {/* Metadata Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#ECE4D8] text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                Order Reference
              </span>
              <span className="font-mono font-semibold text-[#292522] text-sm">
                {lastOrder.orderId}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                Date
              </span>
              <span className="font-medium text-[#292522]">{lastOrder.orderDate}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                Payment Method
              </span>
              <span className="font-medium text-[#292522]">
                {lastOrder.customer.paymentMethod}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                Total Amount
              </span>
              <span className="font-sans font-bold text-[#641E32] text-sm tabular-nums">
                {formatINR(lastOrder.total)}
              </span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#292522] font-semibold">
              Selected Pieces ({lastOrder.items.length})
            </h3>

            <div className="divide-y divide-[#ECE4D8] border-y border-[#ECE4D8]">
              {lastOrder.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center gap-4 text-xs">
                  <div className="w-16 h-18 bg-[#ECE4D8] shrink-0 overflow-hidden border border-[#ECE4D8]">
                    <JewelleryVisual
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                      {item.product.category}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-[#292522]">
                      {item.product.name}
                    </h4>
                    {item.selectedOption && (
                      <span className="text-[11px] text-[#665E58] block">
                        Option: {item.selectedOption}
                      </span>
                    )}
                    <span className="text-[11px] text-[#665E58]">
                      Quantity: {item.quantity} &times; {formatINR(item.product.price)}
                    </span>
                  </div>
                  <span className="font-semibold text-sm text-[#292522] tabular-nums">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#ECE4D8] text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block mb-1">
                Recipient & Delivery Address
              </span>
              <div className="font-medium text-[#292522] space-y-0.5">
                <p className="font-semibold">{lastOrder.customer.fullName}</p>
                <p>{lastOrder.customer.address}</p>
                <p>
                  {lastOrder.customer.city}, {lastOrder.customer.state} -{' '}
                  {lastOrder.customer.pinCode}
                </p>
                <p className="text-[#665E58] pt-1">
                  Phone: {lastOrder.customer.phone} · Email: {lastOrder.customer.email}
                </p>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block mb-1">
                Estimated Delivery Window
              </span>
              <div className="text-[#665E58] space-y-1">
                <p className="flex items-center gap-1.5 font-medium text-[#292522]">
                  <Truck className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>3 to 5 business days</span>
                </p>
                <p>Insured courier dispatch in velvet gift presentation box.</p>
                <p className="text-[#8C827A]">
                  Courier tracking number will be simulated upon dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-[#ECE4D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => onNavigate('/shop')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4 text-[#DFC79B]" />
            </button>

            <button
              onClick={() => onNavigate('/about-contact')}
              className="text-xs uppercase tracking-wider text-[#641E32] hover:underline font-semibold"
            >
              Need assistance? Contact Client Concierge &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
