import React, { useState } from 'react';
import {
  Truck,
  RotateCcw,
  ShieldAlert,
  Clock,
  PackageCheck,
  CreditCard,
  ChevronDown,
  Mail,
  Phone,
  ArrowRight,
} from 'lucide-react';

interface ShippingReturnsPageProps {
  onNavigate: (route: string) => void;
}

export const ShippingReturnsPage: React.FC<ShippingReturnsPageProps> = ({
  onNavigate,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    shipping_methods: true,
    delivery_windows: true,
    charges: false,
    tracking: false,
    returns: true,
    exchanges: false,
    refunds: false,
    cancellations: false,
    damaged: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const policySections = [
    {
      id: 'shipping_methods',
      title: '1. Shipping Methods & Tamper-Evident Packaging',
      icon: Truck,
      content: (
        <div className="space-y-3 text-xs text-[#665E58] leading-relaxed">
          <p>
            All Zelora Jewels shipments are packaged in personalized luxury presentation boxes, lined with soft jewelry velvet, and enveloped in a secondary sealed transit sleeve with a serialized tamper-evident seal.
          </p>
          <p>
            We partner with premier insured domestic couriers (e.g. Blue Dart, Delhivery Express) to guarantee transit security until physical handover to the authorized recipient.
          </p>
        </div>
      ),
    },
    {
      id: 'delivery_windows',
      title: '2. Estimated Delivery Windows',
      icon: Clock,
      content: (
        <div className="space-y-3 text-xs text-[#665E58] leading-relaxed">
          <p>
            Standard orders are processed at our Mumbai atelier within <strong>24–48 hours</strong> of verification.
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li>
              <strong>Metro Cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> Estimated 3 to 5 business days from dispatch.
            </li>
            <li>
              <strong>Tier 2 & Regional Pin Codes:</strong> Estimated 5 to 7 business days from dispatch.
            </li>
            <li>
              <strong>Made-to-Order Pieces:</strong> Require an additional 5 business days of artisanal preparation prior to dispatch.
            </li>
          </ul>
          <p className="text-[11px] text-[#8C827A] pt-1">
            Note: While every effort is made to adhere to these windows, transit times can vary based on public holidays, remote regional logistics, or adverse weather conditions.
          </p>
        </div>
      ),
    },
    {
      id: 'charges',
      title: '3. Shipping Charges & Free Delivery Threshold',
      icon: PackageCheck,
      content: (
        <div className="space-y-3 text-xs text-[#665E58] leading-relaxed">
          <p>
            <strong>Orders ₹5,000 and above:</strong> Complimentary insured delivery to all serviceable PIN codes throughout India.
          </p>
          <p>
            <strong>Orders below ₹5,000:</strong> A nominal insured courier charge of <strong>₹250</strong> is calculated at checkout to cover transit insurance and reinforced security boxing.
          </p>
        </div>
      ),
    },
    {
      id: 'tracking',
      title: '4. Order Tracking & Dispatch Coordination',
      icon: Truck,
      content: (
        <div className="space-y-3 text-xs text-[#665E58] leading-relaxed">
          <p>
            As soon as your shipment is scanned by our courier partner, you will receive an SMS and email notification containing your airway bill (AWB) tracking number and a direct live tracking link.
          </p>
          <p>
            A signature is required upon delivery for all orders exceeding ₹15,000 to ensure chain-of-custody integrity.
          </p>
        </div>
      ),
    },
    {
      id: 'returns',
      title: '5. 7-Day Return Eligibility & Conditions',
      icon: RotateCcw,
      content: (
        <div className="space-y-3 text-xs text-[#665E58] leading-relaxed">
          <p>
            We offer a <strong>7-day inspection window</strong> starting from the calendar date of confirmed delivery.
          </p>
          <p>To qualify for a return or store credit, items must meet the following criteria:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li>The piece must be completely unworn, undamaged, and free of cosmetic perfume or oil traces.</li>
            <li>The specialized tamper-evident tag attached to the jewelry must remain unbroken and unaltered.</li>
            <li>The original jewelry presentation box, velvet pouch, and documentation must be included.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'exchanges',
      title: '6. Exchanges & Ring / Bangle Sizing Adjustments',
      icon: RotateCcw,
      content: (
        <div className="space-y-3 text-xs text-[#665E58] leading-relaxed">
          <p>
            If a ring or bangle size does not fit comfortably, our concierge can assist with a complimentary one-time size exchange, subject to stock availability in our catalogue.
          </p>
          <p>
            Please email our concierge at <code>concierge@zelorajewels.example</code> within 7 days of delivery with your order reference number to arrange reverse courier pickup.
          </p>
        </div>
      ),
    },
    {
      id: 'refunds',
      title: '7. Refunds & Settlement Timelines',
      icon: CreditCard,
      content: (
        <div className="space-y-3 text-xs text-[#665E58] leading-relaxed">
          <p>
            Upon receipt of the returned item at our atelier, our quality inspection team verifies item authenticity and integrity within <strong>2 business days</strong>.
          </p>
          <p>
            Approved refunds are credited back to the original source payment instrument within <strong>5 to 7 banking days</strong>. For Cash on Delivery orders, refunds are disbursed via verified bank account NEFT / UPI transfer upon confirmation with the customer.
          </p>
        </div>
      ),
    },
    {
      id: 'cancellations',
      title: '8. Order Cancellations Protocol',
      icon: ShieldAlert,
      content: (
        <div className="space-y-3 text-xs text-[#665E58] leading-relaxed">
          <p>
            Standard catalogue orders may be cancelled at no charge before the package is handed over to our courier partner (typically within 12 hours of order placement).
          </p>
          <p>
            Once a shipment has been dispatched, cancellation is no longer possible in transit; you may accept the package and initiate a return through our standard 7-day protocol.
          </p>
        </div>
      ),
    },
    {
      id: 'damaged',
      title: '9. Damaged or Incorrect Products in Transit',
      icon: ShieldAlert,
      content: (
        <div className="space-y-3 text-xs text-[#665E58] leading-relaxed">
          <p>
            If your outer transit package appears visibly crushed, tampered with, or open upon courier arrival, <strong>please refuse delivery</strong> and instruct the courier to return it to sender.
          </p>
          <p>
            If you open the parcel and discover a defect or incorrect item, please photograph the piece and packaging, and inform our concierge within <strong>48 hours</strong> at <code>concierge@zelorajewels.example</code>. A priority replacement or full refund will be arranged immediately.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#292522]">
      {/* Burgundy Header Banner */}
      <section className="bg-[#641E32] text-[#F5F0E8] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#7E263F]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#DFC79B] font-semibold block">
            Customer Care Protocol
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F5F0E8]">
            Shipping & Returns Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#F5F0E8]/80 font-light max-w-2xl mx-auto leading-relaxed">
            Transparent delivery windows, insured courier protocols, and our 7-day inspection guarantee.
          </p>
        </div>
      </section>

      {/* Main Policy Content with Accordions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          {policySections.map((sec) => {
            const isOpen = openSections[sec.id];
            const Icon = sec.icon;

            return (
              <div
                key={sec.id}
                className="bg-[#FAF7F2] border border-[#ECE4D8] overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5F0E8]/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F5F0E8] text-[#641E32] border border-[#ECE4D8]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h2 className="font-serif text-base sm:text-lg font-semibold text-[#292522]">
                      {sec.title}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A46D] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-[#ECE4D8]/60 animate-fade-in">
                    {sec.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Concierge Assistance Callout */}
        <div className="mt-16 p-8 bg-[#FAF7F2] border border-[#C5A46D]/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl text-[#292522]">
              Require Custom Logistics Assistance?
            </h3>
            <p className="text-xs text-[#665E58]">
              Contact our client care desk for expedited delivery queries, wedding gifting orders, or AWB tracking updates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/about-contact')}
              className="px-6 py-3 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Contact Concierge
            </button>
            <button
              onClick={() => onNavigate('/shop')}
              className="px-6 py-3 bg-transparent hover:bg-[#ECE4D8] text-[#292522] border border-[#ECE4D8] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
            >
              Browse Catalogue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
