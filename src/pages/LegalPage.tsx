import React, { useState } from 'react';
import { Shield, FileText, Scale, Lock, Mail, AlertCircle } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (route: string) => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({
  onNavigate,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#292522] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Document Header */}
        <div className="border-b border-[#ECE4D8] pb-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#641E32] font-semibold">
            <Scale className="w-4 h-4" />
            <span>Legal Disclosures & Governance</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292522]">
            {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions of Sale'}
          </h1>

          <p className="text-xs text-[#8C827A] tracking-wider uppercase">
            Effective Date: October 2026 · Registered Entity Placeholder: Zelora Jewels Atelier LLP (Proposed)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border border-[#ECE4D8] bg-[#FAF7F2] p-1 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-[#641E32] text-[#F5F0E8] shadow-xs'
                : 'text-[#665E58] hover:text-[#292522]'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-[#641E32] text-[#F5F0E8] shadow-xs'
                : 'text-[#665E58] hover:text-[#292522]'
            }`}
          >
            Terms & Conditions
          </button>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 bg-[#FAF7F2] border-l-4 border-[#C5A46D] text-xs text-[#665E58] space-y-1">
          <div className="flex items-center gap-2 font-semibold text-[#292522]">
            <AlertCircle className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>Compliance Notice for Business Owners</span>
          </div>
          <p>
            The disclosures below outline actual data handling, client communication, and commercial terms applicable to the Zelora Jewels storefront. Store owners should review and finalize these policies with qualified legal counsel in accordance with the <em>Information Technology Act, 2000</em>, the <em>Digital Personal Data Protection Act, 2023 (DPDP)</em>, and the <em>Consumer Protection (E-Commerce) Rules, 2020</em> of India before commercial transactions commence.
          </p>
        </div>

        {/* Document Content */}
        <div className="bg-[#FAF7F2] border border-[#ECE4D8] p-8 sm:p-12 space-y-10 text-xs sm:text-sm text-[#5C554F] leading-relaxed">
          {activeTab === 'privacy' ? (
            /* ==========================================
               PRIVACY POLICY SECTIONS
               ========================================== */
            <div className="space-y-8">
              <section className="space-y-3">
                <h2 className="font-serif text-xl text-[#292522] font-semibold">
                  1. Information Collected from Visitors and Customers
                </h2>
                <p>
                  Zelora Jewels collects personal information solely to fulfill orders, provide concierge services, and enhance your shopping experience. Information collected may include:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Contact Details:</strong> Your full name, email address, phone number, and postal address.</li>
                  <li><strong>Delivery Information:</strong> Physical shipping address, landmark, city, state, and postal PIN code.</li>
                  <li><strong>Order History:</strong> Simulated purchase records, selected jewelry designs, sizes, quantities, and order references.</li>
                  <li><strong>Technical Data:</strong> Browser user agent, approximate geographic location, and session dwell times.</li>
                </ul>
              </section>

              <div className="h-[1px] bg-[#ECE4D8]" />

              <section className="space-y-3">
                <h2 className="font-serif text-xl text-[#292522] font-semibold">
                  2. Use of Order and Contact Details
                </h2>
                <p>
                  We utilize client information strictly for legitimate commercial purposes:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Processing, packaging, and dispatching jewellery orders.</li>
                  <li>Sending order verification notices and courier tracking updates via SMS and email.</li>
                  <li>Responding to concierge inquiries submitted via our contact forms.</li>
                  <li>Delivering seasonal Gazette newsletters only where explicit client subscription has been granted.</li>
                </ul>
              </section>

              <div className="h-[1px] bg-[#ECE4D8]" />

              <section className="space-y-3">
                <h2 className="font-serif text-xl text-[#292522] font-semibold">
                  3. Cookies, Analytics and Meta Pixel Disclosures
                </h2>
                <p>
                  We believe in transparent digital practices. In this demonstration deployment, client-side session storage (<code>localStorage</code>) is used solely to maintain shopping bag contents and simulated order references across browser reloads.
                </p>
                <p>
                  When marketing integrations (such as Meta Pixel or Google Analytics) are activated in production, they collect aggregated event data (such as page views and product views) to assess advertising effectiveness. You may configure your browser to decline non-essential cookies at any time without forfeiting access to our storefront.
                </p>
              </section>

              <div className="h-[1px] bg-[#ECE4D8]" />

              <section className="space-y-3">
                <h2 className="font-serif text-xl text-[#292522] font-semibold">
                  4. Data Sharing with Payment, Hosting & Delivery Partners
                </h2>
                <p>
                  Zelora Jewels does not sell, rent, or trade your personal information. Data is shared exclusively with verified service providers necessary to operate our business:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li><strong>Logistics Couriers:</strong> Delivery name, address, and mobile number are shared with our domestic courier partners for package dispatch.</li>
                  <li><strong>Hosting Providers:</strong> Secure application hosting infrastructure governed by industry-standard data protection standards.</li>
                  <li><strong>Payment Processors:</strong> In production mode, payments are processed directly by RBI-authorized payment aggregators (e.g., Razorpay, Cashfree, or Stripe India). Zelora Jewels never stores sensitive credit or debit card numbers on our servers.</li>
                </ul>
              </section>

              <div className="h-[1px] bg-[#ECE4D8]" />

              <section className="space-y-3">
                <h2 className="font-serif text-xl text-[#292522] font-semibold">
                  5. Data Security, Retention and Privacy Requests
                </h2>
                <p>
                  We implement robust administrative, technical, and physical measures to protect client records against unauthorized disclosure or loss.
                </p>
                <p>
                  You have the right to request access to your personal data, request correction of erroneous records, or request complete deletion of your customer profile. Privacy requests may be addressed to our Data Protection Officer at: <code>legal@zelorajewels.example</code>.
                </p>
              </section>
            </div>
          ) : (
            /* ==========================================
               TERMS & CONDITIONS SECTIONS
               ========================================== */
            <div className="space-y-8">
              <section className="space-y-3">
                <h2 className="font-serif text-xl text-[#292522] font-semibold">
                  1. Product Descriptions, Pricing and Order Acceptance
                </h2>
                <p>
                  Zelora Jewels strives to ensure that product photographs, specifications, and dimensions faithfully depict our jewellery pieces. However, subtle variations in pearl contours and finish luster may naturally occur due to hand-crafting and screen calibrations.
                </p>
                <p>
                  All prices listed on this demonstration website are stated in Indian Rupees (INR) and are simulated for demonstration purposes. Order placement constitutes an offer to purchase; order acceptance occurs upon physical handover to our courier.
                </p>
              </section>

              <div className="h-[1px] bg-[#ECE4D8]" />

              <section className="space-y-3">
                <h2 className="font-serif text-xl text-[#292522] font-semibold">
                  2. Payment, Delivery and Risk of Loss
                </h2>
                <p>
                  Payment methods supported in production include UPI, NetBanking, Debit/Credit Cards, and Cash on Delivery (COD) for eligible pin codes.
                </p>
                <p>
                  Risk of loss and title for all ordered jewellery pass to the purchaser upon physical delivery and receipt signature at the designated shipping address.
                </p>
              </section>

              <div className="h-[1px] bg-[#ECE4D8]" />

              <section className="space-y-3">
                <h2 className="font-serif text-xl text-[#292522] font-semibold">
                  3. Cancellation, Return and Inspection Rights
                </h2>
                <p>
                  Customers have a 7-day inspection window from the date of confirmed delivery to examine their piece and request an exchange or return, subject to the conditions outlined in our <button onClick={() => onNavigate('/shipping-returns')} className="text-[#641E32] underline font-medium">Shipping & Returns Policy</button>.
                </p>
                <p>
                  Items must be returned in their original condition with security tags intact. Broken or altered tags void return eligibility.
                </p>
              </section>

              <div className="h-[1px] bg-[#ECE4D8]" />

              <section className="space-y-3">
                <h2 className="font-serif text-xl text-[#292522] font-semibold">
                  4. Intellectual Property Rights
                </h2>
                <p>
                  All trademarks, jewellery sketches, photographs, editorial prose, typography arrangements, and software source code comprising Zelora Jewels are the proprietary intellectual property of the brand and may not be reproduced without prior written permission.
                </p>
              </section>

              <div className="h-[1px] bg-[#ECE4D8]" />

              <section className="space-y-3">
                <h2 className="font-serif text-xl text-[#292522] font-semibold">
                  5. Governing Law and Dispute Jurisdiction
                </h2>
                <p>
                  These terms are governed by and construed in accordance with the laws of the Republic of India. Any legal proceedings or arbitration arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.
                </p>
              </section>
            </div>
          )}

          {/* Contact Details Box */}
          <div className="p-6 bg-[#F5F0E8] border border-[#ECE4D8] space-y-2 text-xs">
            <span className="font-semibold text-[#292522] uppercase tracking-wider block">
              Legal & Compliance Contact
            </span>
            <p>
              <strong>Entity:</strong> Zelora Jewels Atelier LLP (Proposed Placeholder)
            </p>
            <p>
              <strong>Atelier Address:</strong> Atelier Zelora, Bandra West, Mumbai 400050, Maharashtra, India
            </p>
            <p>
              <strong>Legal Inquiries:</strong> <code>legal@zelorajewels.example</code> · Phone: <code>+91 98765 43210</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
