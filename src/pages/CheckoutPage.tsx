import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../data/products';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { trackInitiateCheckout } from '../utils/metaPixel';
import {
  Lock,
  ShieldCheck,
  AlertCircle,
  Truck,
  CreditCard,
  QrCode,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (route: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, subtotal, shipping, total, createOrder } = useCart();

  useEffect(() => {
    if (cart.length > 0) {
      trackInitiateCheckout(cart, total);
    }
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: 'neevfataniya@gmail.com',
    phone: '',
    address: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400050',
    paymentMethod: 'cod_demo',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect prompt
  if (cart.length === 0) {
    return (
      <div className="bg-[#F5F0E8] min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-[#FAF7F2] border border-[#ECE4D8] p-8 text-center">
          <h2 className="font-serif text-2xl text-[#292522] mb-3">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs text-[#665E58] mb-6">
            Please add jewellery pieces to your shopping bag before proceeding to checkout.
          </p>
          <button
            onClick={() => onNavigate('/shop')}
            className="w-full py-3 bg-[#641E32] text-[#F5F0E8] text-xs font-semibold uppercase tracking-wider"
          >
            Explore Catalogue
          </button>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) errs.fullName = 'Full name is required for delivery label.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'A valid email address is required for dispatch notifications.';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'A valid 10-digit mobile number is required for courier coordination.';
    }
    if (!formData.address.trim()) errs.address = 'Street delivery address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!formData.state.trim()) errs.state = 'State is required.';
    if (!formData.pinCode.trim() || formData.pinCode.length < 6) {
      errs.pinCode = 'Valid 6-digit Indian PIN code required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate clean order dispatch to confirmation page
    setTimeout(() => {
      createOrder({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
        paymentMethod:
          formData.paymentMethod === 'cod_demo'
            ? 'Cash on Delivery (Simulated Demo)'
            : 'UPI / NetBanking Simulator (Demo)',
      });

      setIsSubmitting(false);
      onNavigate('/confirmation');
    }, 600);
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#292522] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="pb-8 mb-8 border-b border-[#ECE4D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#641E32] font-semibold block mb-1">
              Secure Delivery & Client Details
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#292522]">
              Checkout Concierge
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8C827A] bg-[#FAF7F2] px-3 py-1.5 border border-[#ECE4D8]">
            <Lock className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>256-Bit SSL Encrypted Session</span>
          </div>
        </div>

        {/* Mandatory Demo Mode Notification */}
        <div className="mb-8 p-4 bg-[#FAF7F2] border-l-4 border-[#641E32] shadow-xs text-xs text-[#665E58] space-y-1">
          <div className="flex items-center gap-2 text-[#641E32] font-semibold text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Demonstration Environment Notice</span>
          </div>
          <p>
            This storefront is currently operating in <strong>demonstration mode</strong>. No real credit card information is collected or processed. Submitting this form will generate a simulated order confirmation reference (#ZELORA-IND-XXXXX) for evaluation purposes. Production deployment requires connecting a certified payment gateway (such as Razorpay or Stripe India) and an order management backend.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Customer & Delivery Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Customer Contact */}
              <div className="bg-[#FAF7F2] border border-[#ECE4D8] p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#ECE4D8]">
                  <h2 className="font-serif text-lg text-[#292522] font-semibold">
                    1. Contact Information
                  </h2>
                  <span className="text-[11px] text-[#8C827A] uppercase tracking-wider">
                    For Dispatch Notifications
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#292522] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="e.g. Ananya Sharma"
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F5F0E8] border ${
                        errors.fullName ? 'border-red-500' : 'border-[#ECE4D8]'
                      } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#292522] mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="ananya@example.com"
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F5F0E8] border ${
                        errors.email ? 'border-red-500' : 'border-[#ECE4D8]'
                      } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#292522] mb-1 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F5F0E8] border ${
                        errors.phone ? 'border-red-500' : 'border-[#ECE4D8]'
                      } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="bg-[#FAF7F2] border border-[#ECE4D8] p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#ECE4D8]">
                  <h2 className="font-serif text-lg text-[#292522] font-semibold">
                    2. Insured Shipping Address (India)
                  </h2>
                  <span className="text-[11px] text-[#8C827A] uppercase tracking-wider">
                    Dispatched in Security Seal
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#292522] mb-1 font-medium">
                      Street Address & Apartment / Villa *
                    </label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="e.g. Flat 402, Sea Crest Towers, Bandra West"
                      className={`w-full px-3.5 py-2 text-xs bg-[#F5F0E8] border ${
                        errors.address ? 'border-red-500' : 'border-[#ECE4D8]'
                      } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                    />
                    {errors.address && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        {errors.address}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#292522] mb-1 font-medium">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className={`w-full px-3.5 py-2.5 text-xs bg-[#F5F0E8] border ${
                          errors.city ? 'border-red-500' : 'border-[#ECE4D8]'
                        } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                      />
                      {errors.city && (
                        <span className="text-[11px] text-red-600 mt-1 block">
                          {errors.city}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#292522] mb-1 font-medium">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className={`w-full px-3.5 py-2.5 text-xs bg-[#F5F0E8] border ${
                          errors.state ? 'border-red-500' : 'border-[#ECE4D8]'
                        } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                      />
                      {errors.state && (
                        <span className="text-[11px] text-red-600 mt-1 block">
                          {errors.state}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#292522] mb-1 font-medium">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={formData.pinCode}
                        onChange={(e) =>
                          setFormData({ ...formData, pinCode: e.target.value })
                        }
                        className={`w-full px-3.5 py-2.5 text-xs bg-[#F5F0E8] border ${
                          errors.pinCode ? 'border-red-500' : 'border-[#ECE4D8]'
                        } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                      />
                      {errors.pinCode && (
                        <span className="text-[11px] text-red-600 mt-1 block">
                          {errors.pinCode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method Options (Supported demo flows only) */}
              <div className="bg-[#FAF7F2] border border-[#ECE4D8] p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#ECE4D8]">
                  <h2 className="font-serif text-lg text-[#292522] font-semibold">
                    3. Payment Simulation
                  </h2>
                  <span className="text-[11px] text-[#C5A46D] uppercase tracking-wider font-medium">
                    Demo Gateways Only
                  </span>
                </div>

                <div className="space-y-3">
                  {/* COD Demo Option */}
                  <label
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                      formData.paymentMethod === 'cod_demo'
                        ? 'bg-[#F5F0E8] border-[#641E32]'
                        : 'border-[#ECE4D8] hover:bg-[#F5F0E8]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod_demo"
                      checked={formData.paymentMethod === 'cod_demo'}
                      onChange={() =>
                        setFormData({ ...formData, paymentMethod: 'cod_demo' })
                      }
                      className="mt-1 accent-[#641E32]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-semibold text-[#292522]">
                        <span>Cash on Delivery (Simulated Demo)</span>
                        <span className="text-[#641E32]">Recommended for Testing</span>
                      </div>
                      <p className="text-[#665E58] mt-1">
                        Pay upon doorstep delivery after inspecting tamper-evident seal.
                      </p>
                    </div>
                  </label>

                  {/* UPI / NetBanking Simulator Option */}
                  <label
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                      formData.paymentMethod === 'upi_demo'
                        ? 'bg-[#F5F0E8] border-[#641E32]'
                        : 'border-[#ECE4D8] hover:bg-[#F5F0E8]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi_demo"
                      checked={formData.paymentMethod === 'upi_demo'}
                      onChange={() =>
                        setFormData({ ...formData, paymentMethod: 'upi_demo' })
                      }
                      className="mt-1 accent-[#641E32]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-semibold text-[#292522]">
                        <span>UPI / NetBanking Simulator (Demo)</span>
                        <QrCode className="w-4 h-4 text-[#C5A46D]" />
                      </div>
                      <p className="text-[#665E58] mt-1">
                        Simulates instant UPI authentication without requiring actual banking credentials.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Sample Order...</span>
                ) : (
                  <>
                    <span>Place Order ({formatINR(total)})</span>
                    <ArrowRight className="w-4 h-4 text-[#DFC79B]" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF7F2] border border-[#ECE4D8] p-6 sm:p-8 space-y-6 sticky top-28 shadow-xs">
              <h2 className="font-serif text-xl text-[#292522] pb-4 border-b border-[#ECE4D8]">
                Order Items ({cart.length})
              </h2>

              {/* Mini Item List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-[#ECE4D8] pr-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center gap-3 text-xs">
                    <div className="w-12 h-14 bg-[#ECE4D8] shrink-0 overflow-hidden">
                      <JewelleryVisual
                        src={item.product.image}
                        alt={item.product.name}
                        category={item.product.category}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-medium text-[#292522] truncate">
                        {item.product.name}
                      </h4>
                      {item.selectedOption && (
                        <span className="text-[10px] text-[#8C827A] block">
                          {item.selectedOption}
                        </span>
                      )}
                      <span className="text-[11px] text-[#665E58]">
                        Qty: {item.quantity} &times; {formatINR(item.product.price)}
                      </span>
                    </div>
                    <span className="font-semibold text-[#292522] tabular-nums">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="pt-4 border-t border-[#ECE4D8] space-y-2.5 text-xs text-[#665E58]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#292522] tabular-nums">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Courier</span>
                  <span>{shipping === 0 ? 'Complimentary' : formatINR(shipping)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8C827A]">
                  <span>Demo Taxes</span>
                  <span>Included</span>
                </div>
              </div>

              {/* Gold Divider */}
              <div className="h-[1px] bg-[#C5A46D]/40" />

              {/* Total */}
              <div className="flex justify-between items-baseline">
                <span className="font-serif text-lg font-semibold text-[#292522]">
                  Total Payable
                </span>
                <span className="font-sans text-2xl font-bold text-[#641E32] tabular-nums">
                  {formatINR(total)}
                </span>
              </div>

              <div className="p-3 bg-[#F5F0E8] border border-[#ECE4D8] text-[11px] text-[#8C827A] flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>
                  Delivery target: 3–5 business days across Indian metros. Dispatched from Mumbai Atelier.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
