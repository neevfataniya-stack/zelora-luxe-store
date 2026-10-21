import React, { useState } from 'react';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface AboutContactPageProps {
  onNavigate: (route: string) => void;
}

export const AboutContactPage: React.FC<AboutContactPageProps> = ({ onNavigate }) => {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How are Zelora Jewels pieces crafted and finished?',
      a: 'Our collection blends contemporary jewellery silhouettes with traditional Indian artisanal techniques. Pieces feature high-precision stone settings, micro-plated 18k and 22k champagne gold finishes, handcrafted kundan foil work, and hand-selected cultured freshwater pearls.',
    },
    {
      q: 'What is the estimated delivery timeframe across India?',
      a: 'We offer complimentary insured delivery on all orders above ₹5,000. Orders destined for metropolitan cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) generally arrive within 3–5 business days. Other regions typically arrive in 5–7 business days.',
    },
    {
      q: 'How should I care for my earrings, pendants, and bangles?',
      a: 'To preserve the luster of your jewellery, always put on your jewellery after cosmetics, hairspray, and perfume have dried. Avoid immersion in water, swimming pools, or domestic cleaning solutions. Store each piece in its individual pouch or presentation box.',
    },
    {
      q: 'Can I exchange or return a piece if the fit is unsuitable?',
      a: 'Yes. We offer a 7-day inspection and exchange period for items returned unworn, in their original presentation packaging, with the security seal intact. Please review our Shipping & Returns page for complete details.',
    },
    {
      q: 'How do I determine my bangle or ring size?',
      a: 'Our rings are sized according to standard US sizing (sizes 5 to 9), and our bangles are sized in traditional Indian measurements (2.4, 2.6, 2.8). Detailed millimeter inner-diameter conversions are provided on each product details page.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please choose or write a subject.';
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please enter a message with at least 10 characters.';
    }

    setFormErrors(errs);

    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#292522]">
      {/* Editorial Header */}
      <section className="border-b border-[#ECE4D8] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#641E32] font-semibold block">
            About Our Atelier & Client Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#292522]">
            Expressive Adornments, Considered Living
          </h1>
          <p className="text-sm sm:text-base text-[#665E58] font-light max-w-2xl mx-auto leading-relaxed">
            Zelora Jewels is an online jewellery store created for those who cherish subtle radiance, geometric balance, and rich Indian artisanal metallurgy.
          </p>
        </div>
      </section>

      {/* ==========================================
          1. ABOUT US: Brand Story & Collections Style
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#641E32] font-semibold block">
              The Aesthetic Ethos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292522] leading-tight">
              Honoring Heritage Crafts for the Contemporary Wardrobe
            </h2>
            <div className="space-y-4 text-sm text-[#665E58] font-light leading-relaxed">
              <p>
                Zelora Jewels curates a dedicated 40-piece collection across five key jewellery disciplines: sculptural earrings, solitary pendant necklaces, heritage bangles and cuffs, architectural rings, and coordinated gala suites.
              </p>
              <p>
                Our aesthetic philosophy centers on warm champagne gold palettes, organic freshwater baroque pearls, and precision-cut simulated stones that deliver brilliant dispersion without ostentation. Every silhouette is conceived to move gracefully between daytime tailored styling and festive evening celebrations.
              </p>
              <p>
                As an online-first luxury storefront, we ensure direct-to-client attention, transparent specifications, and dedicated concierge coordination for every inquiry.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/shop')}
                className="px-6 py-3.5 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-semibold tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                Explore 40-Piece Catalogue <ArrowRight className="w-3.5 h-3.5 text-[#DFC79B]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-[#292522] border border-[#ECE4D8] overflow-hidden shadow-lg">
              <JewelleryVisual
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Zelora Jewels Handcrafted Pieces"
                category="Jewellery Sets"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FAF7F2] border border-[#ECE4D8] p-5 shadow-lg max-w-xs hidden sm:block">
              <span className="text-[10px] uppercase tracking-widest text-[#641E32] font-semibold block mb-1">
                Materiality & Finish
              </span>
              <p className="font-serif text-xs text-[#292522] leading-relaxed">
                Warm champagne gold tones, hand-strung baroque pearls, and hand-painted reverse meenakari enamel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. CONTACT & CLIENT CONCIERGE
         ========================================== */}
      <section className="bg-[#FAF7F2] border-t border-[#ECE4D8] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#641E32] font-semibold block mb-2">
              Get in Touch
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292522]">
              Client Concierge
            </h2>
            <p className="text-xs sm:text-sm text-[#665E58] mt-2 font-light">
              Inquire about sizing, custom styling combinations, or delivery timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#F5F0E8] border border-[#ECE4D8] p-6 sm:p-8">
              <h3 className="font-serif text-xl text-[#292522] mb-1">
                Send a Message to the Concierge
              </h3>
              <p className="text-xs text-[#8C827A] mb-6">
                All inquiries receive a response within 24 business hours.
              </p>

              {submitted ? (
                <div className="p-6 bg-[#FAF7F2] border border-[#C5A46D]/60 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#641E32] mx-auto" />
                  <h4 className="font-serif text-lg text-[#292522]">
                    Message Received (Demo Mode)
                  </h4>
                  <p className="text-xs text-[#665E58] max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Because this storefront is running in a demonstration environment without a live mail server, your message has been simulated successfully.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2 bg-[#641E32] text-[#F5F0E8] text-xs uppercase tracking-wider font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#292522] mb-1 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Priya Kapoor"
                        className={`w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border ${
                          formErrors.name ? 'border-red-500' : 'border-[#ECE4D8]'
                        } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                      />
                      {formErrors.name && (
                        <span className="text-[11px] text-red-600 mt-1 block">
                          {formErrors.name}
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
                        placeholder="priya@example.com"
                        className={`w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border ${
                          formErrors.email ? 'border-red-500' : 'border-[#ECE4D8]'
                        } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                      />
                      {formErrors.email && (
                        <span className="text-[11px] text-red-600 mt-1 block">
                          {formErrors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#292522] mb-1 font-medium">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. Sizing inquiry regarding Royal Filigree Bangles"
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border ${
                        formErrors.subject ? 'border-red-500' : 'border-[#ECE4D8]'
                      } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                    />
                    {formErrors.subject && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        {formErrors.subject}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#292522] mb-1 font-medium">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please let us know how our concierge team can assist you..."
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border ${
                        formErrors.message ? 'border-red-500' : 'border-[#ECE4D8]'
                      } text-[#292522] focus:outline-hidden focus:border-[#C5A46D]`}
                    />
                    {formErrors.message && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        {formErrors.message}
                      </span>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Inquiries (Demo Submission)</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Support Information Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#292522] text-[#F5F0E8] p-6 sm:p-8 border border-[#3D3733] space-y-5">
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold block">
                  Studio Coordinates
                </span>
                <h3 className="font-serif text-xl text-[#FAF7F2]">
                  Dedicated Client Assistance
                </h3>
                <p className="text-xs text-[#8C827A] leading-relaxed">
                  Reach our concierge for personal styling guidance, bridal pairing advice, and order tracking inquiries.
                </p>

                <div className="space-y-4 pt-2 text-xs text-[#ECE4D8]">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-[#8C827A] uppercase tracking-wider block">
                        Email Concierge
                      </span>
                      <span className="font-medium">concierge@zelorajewels.example</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-[#8C827A] uppercase tracking-wider block">
                        Direct Assistance (Demo)
                      </span>
                      <span className="font-medium">+91 98765 43210</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-[#8C827A] uppercase tracking-wider block">
                        Client Hours
                      </span>
                      <span>Monday to Saturday: 10:00 AM – 7:00 PM IST</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-[#8C827A] uppercase tracking-wider block">
                        Atelier Studio (Demo Placeholder)
                      </span>
                      <span>Atelier Zelora, Bandra West, Mumbai 400050, India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Quick Links */}
              <div className="p-5 bg-[#F5F0E8] border border-[#ECE4D8] text-xs space-y-2">
                <span className="font-semibold text-[#292522] block uppercase tracking-wider text-[11px]">
                  Helpful Resources
                </span>
                <p className="text-[#665E58]">
                  Review our complete delivery timelines and returns protocol:
                </p>
                <div className="pt-1 flex gap-4">
                  <button
                    onClick={() => onNavigate('/shipping-returns')}
                    className="text-[#641E32] font-semibold underline hover:text-[#4A1424]"
                  >
                    Shipping & Returns Page &rarr;
                  </button>
                  <button
                    onClick={() => onNavigate('/privacy-terms')}
                    className="text-[#641E32] font-semibold underline hover:text-[#4A1424]"
                  >
                    Terms & Privacy &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. FAQ ACCORDION
         ========================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#641E32] font-semibold block mb-2">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl text-[#292522]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border border-[#ECE4D8] divide-y divide-[#ECE4D8] bg-[#FAF7F2]">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="transition-colors">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5F0E8]/50"
                >
                  <span className="font-serif text-base font-medium text-[#292522]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A46D] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#665E58] leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
