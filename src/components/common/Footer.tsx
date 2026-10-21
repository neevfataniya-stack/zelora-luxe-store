import React from 'react';
import { ShieldCheck, Sparkles, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#292522] text-[#F5F0E8] border-t border-[#C5A46D]/30 pt-16 pb-12">
      {/* 3 Trust pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#3D3733]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-start gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-full bg-[#3D3733] text-[#C5A46D] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-[#FAF7F2]">
                Artisanal Metallurgy
              </h4>
              <p className="text-xs text-[#8C827A] mt-1 leading-relaxed">
                Handcrafted finishes, foil-set kundan accents, and precision stone settings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-full bg-[#3D3733] text-[#C5A46D] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-[#FAF7F2]">
                Insured Secure Delivery
              </h4>
              <p className="text-xs text-[#8C827A] mt-1 leading-relaxed">
                Complimentary insured courier across India for orders above ₹5,000.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-full bg-[#3D3733] text-[#C5A46D] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-[#FAF7F2]">
                7-Day Inspection Guarantee
              </h4>
              <p className="text-xs text-[#8C827A] mt-1 leading-relaxed">
                Hassle-free return & exchange window with tamper-evident seal intact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#F5F0E8] block">
              ZELORA JEWELS
            </span>
            <p className="text-xs text-[#8C827A] leading-relaxed max-w-sm">
              Discover expressive designs for everyday elegance and unforgettable occasions. We bring modern silhouettes together with traditional Indian heritage crafts.
            </p>
            <div className="pt-2 text-xs text-[#C5A46D] space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span>concierge@zelorajewels.example</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 98765 43210 (Demo Mon–Sat, 10am–7pm IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Atelier Studio, Bandra West, Mumbai 400050 (Demo)</span>
              </div>
            </div>
          </div>

          {/* Collections Column */}
          <div>
            <h5 className="text-xs font-semibold tracking-widest uppercase text-[#C5A46D] mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[#ECE4D8]">
              <li>
                <button
                  onClick={() => onNavigate('/shop?category=Earrings')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Earrings (10)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop?category=Necklaces')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Necklaces (8)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop?category=Bangles & Bracelets')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Bangles & Bracelets (8)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop?category=Rings')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Rings (7)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop?category=Jewellery Sets')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Jewellery Sets (7)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/categories')}
                  className="text-[#C5A46D] font-medium hover:underline pt-1 block"
                >
                  View All Categories &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Campaign Spotlights (Meta Ads) */}
          <div>
            <h5 className="text-xs font-semibold tracking-widest uppercase text-[#C5A46D] mb-4">
              Featured Ads
            </h5>
            <ul className="space-y-2.5 text-xs text-[#ECE4D8]">
              <li>
                <button
                  onClick={() => onNavigate('/products/elegant-earrings')}
                  className="hover:text-[#C5A46D] transition-colors text-left cursor-pointer"
                >
                  Aurora Pearl Drops (Earrings Ad)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/products/pendant-necklace')}
                  className="hover:text-[#C5A46D] transition-colors text-left cursor-pointer"
                >
                  Celestial Solitaire (Pendant Ad)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/products/traditional-bangles')}
                  className="hover:text-[#C5A46D] transition-colors text-left cursor-pointer"
                >
                  Royal Filigree Bangles (Bangles Ad)
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('/shop')}
                  className="text-[#C5A46D] font-medium hover:underline"
                >
                  Full 40-Piece Catalogue &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Legal */}
          <div>
            <h5 className="text-xs font-semibold tracking-widest uppercase text-[#C5A46D] mb-4">
              Client Care & Policies
            </h5>
            <ul className="space-y-2.5 text-xs text-[#ECE4D8]">
              <li>
                <button
                  onClick={() => onNavigate('/shipping-returns')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shipping-returns')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about-contact')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  About Us & Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/cart')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Shopping Bag
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy-terms')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Demo Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#3D3733] text-[11px] text-[#8C827A] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} Zelora Jewels. All rights reserved.
        </div>
        <div className="text-center md:text-right max-w-xl">
          <span className="text-[#C5A46D] font-medium">Demonstration Notice:</span> All prices, precious metal references, inventory statuses, and checkout transactions are simulated for demonstration purposes. No real financial payments or precious metals are transacted.
        </div>
      </div>
    </footer>
  );
};
