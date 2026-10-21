import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES_DATA } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { ArrowRight, Sparkles, Feather, Compass, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Curated Featured (4 products) & New Arrivals (4 products)
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#292522]">
      {/* ========================================================
          1. HERO SECTION: Fashion Editorial Hero
         ======================================================== */}
      <section className="relative overflow-hidden border-b border-[#ECE4D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Oversized Editorial Typography */}
            <div className="lg:col-span-7 space-y-6 lg:pr-8">
              <div className="flex items-center gap-2.5 text-xs tracking-[0.25em] uppercase text-[#641E32] font-semibold">
                <span className="w-8 h-[1px] bg-[#641E32]" />
                <span>Haute Jewellery Atelier</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-[#292522] leading-[1.08] text-balance">
                Jewellery That Tells <span className="italic font-serif text-[#641E32]">Your Story</span>
              </h1>

              <p className="text-base sm:text-lg text-[#665E58] font-light leading-relaxed max-w-xl">
                Discover expressive designs for everyday elegance and unforgettable occasions.
              </p>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('/shop')}
                  className="px-8 py-4 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Shop the Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#DFC79B] transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onNavigate('/about-contact')}
                  className="px-8 py-4 bg-transparent hover:bg-[#ECE4D8]/60 text-[#292522] border border-[#292522]/40 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-200 flex items-center justify-center cursor-pointer"
                >
                  Explore Our Story
                </button>
              </div>

              {/* Ad Highlight Strip */}
              <div className="pt-8 border-t border-[#ECE4D8] grid grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#8C827A] block">
                    Catalogue
                  </span>
                  <span className="font-serif text-lg text-[#292522]">
                    40 Unique Pieces
                  </span>
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#8C827A] block">
                    Craftsmanship
                  </span>
                  <span className="font-serif text-lg text-[#292522]">
                    Artisanal Indian
                  </span>
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#8C827A] block">
                    Pan-India Delivery
                  </span>
                  <span className="font-serif text-lg text-[#292522]">
                    Insured Courier
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Asymmetric Editorial Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative gold offset frame */}
                <div className="absolute -inset-3 border border-[#C5A46D]/40 translate-x-3 translate-y-3 pointer-events-none" />

                {/* Primary Hero Visual */}
                <div className="relative bg-[#292522] overflow-hidden shadow-xl aspect-[4/5]">
                  <JewelleryVisual
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80"
                    alt="Zelora Jewels Editorial Campaign"
                    category="Jewellery Sets"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/90 via-[#292522]/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[11px] uppercase tracking-widest text-[#DFC79B] font-medium">
                      Meta Ad Featured Campaign
                    </span>
                    <h3 className="font-serif text-xl text-[#F5F0E8] font-light mt-1">
                      Celestial Solitaire & Baroque Pearls
                    </h3>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => onNavigate('/product/celestial-solitaire-pendant')}
                        className="text-xs text-[#F5F0E8] underline hover:text-[#DFC79B] tracking-wider uppercase transition-colors"
                      >
                        Discover Pendant &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Secondary Inset Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-[#FAF7F2] p-4 border border-[#ECE4D8] shadow-lg max-w-[200px] hidden sm:block">
                  <span className="text-[9px] uppercase tracking-widest text-[#8C827A] block">
                    Curator’s Note
                  </span>
                  <p className="font-serif text-xs text-[#292522] mt-1 leading-snug">
                    Balanced proportions designed to catch natural daylight and candlelight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FIVE CATEGORY TILES: Asymmetric Grid with Counts
         ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-[#641E32] font-semibold block mb-2">
              Curated Classifications
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292522]">
              Explore by Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="text-xs font-semibold uppercase tracking-widest text-[#641E32] hover:text-[#4A1424] flex items-center gap-2 group cursor-pointer self-start md:self-end"
          >
            <span>View All Five Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Asymmetric 5-Category Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Tile 1: Earrings (Large Feature - 7 cols) */}
          <div
            onClick={() => onNavigate('/shop?category=Earrings')}
            className="md:col-span-7 group relative bg-[#FAF7F2] border border-[#ECE4D8] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#C5A46D]"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <JewelleryVisual
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
                alt="Earrings Collection"
                category="Earrings"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-8 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C827A] uppercase tracking-wider block">
                  10 Designs
                </span>
                <h3 className="font-serif text-2xl text-[#292522] group-hover:text-[#641E32] transition-colors mt-0.5">
                  Earrings
                </h3>
                <p className="text-xs text-[#665E58] mt-1 max-w-md hidden sm:block">
                  Luminous baroque drops, stud solitaires, and delicate huggie hoops.
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] group-hover:text-[#641E32] flex items-center gap-1 shrink-0">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Tile 2: Necklaces (5 cols) */}
          <div
            onClick={() => onNavigate('/shop?category=Necklaces')}
            className="md:col-span-5 group relative bg-[#FAF7F2] border border-[#ECE4D8] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#C5A46D]"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <JewelleryVisual
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
                alt="Necklaces Collection"
                category="Necklaces"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-8 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C827A] uppercase tracking-wider block">
                  8 Designs
                </span>
                <h3 className="font-serif text-2xl text-[#292522] group-hover:text-[#641E32] transition-colors mt-0.5">
                  Necklaces
                </h3>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] group-hover:text-[#641E32] flex items-center gap-1 shrink-0">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Tile 3: Bangles & Bracelets (4 cols) */}
          <div
            onClick={() => onNavigate('/shop?category=Bangles & Bracelets')}
            className="md:col-span-4 group relative bg-[#FAF7F2] border border-[#ECE4D8] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#C5A46D]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <JewelleryVisual
                src="https://images.unsplash.com/photo-1611591475879-da652a265691?auto=format&fit=crop&w=800&q=80"
                alt="Bangles and Bracelets"
                category="Bangles & Bracelets"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C827A] uppercase tracking-wider block">
                  8 Designs
                </span>
                <h3 className="font-serif text-xl text-[#292522] group-hover:text-[#641E32] transition-colors mt-0.5">
                  Bangles & Bracelets
                </h3>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] group-hover:text-[#641E32] flex items-center gap-1 shrink-0">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Tile 4: Rings (4 cols) */}
          <div
            onClick={() => onNavigate('/shop?category=Rings')}
            className="md:col-span-4 group relative bg-[#FAF7F2] border border-[#ECE4D8] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#C5A46D]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <JewelleryVisual
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
                alt="Rings Collection"
                category="Rings"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C827A] uppercase tracking-wider block">
                  7 Designs
                </span>
                <h3 className="font-serif text-xl text-[#292522] group-hover:text-[#641E32] transition-colors mt-0.5">
                  Rings
                </h3>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] group-hover:text-[#641E32] flex items-center gap-1 shrink-0">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Tile 5: Jewellery Sets (4 cols) */}
          <div
            onClick={() => onNavigate('/shop?category=Jewellery Sets')}
            className="md:col-span-4 group relative bg-[#FAF7F2] border border-[#ECE4D8] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#C5A46D]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <JewelleryVisual
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
                alt="Jewellery Sets Collection"
                category="Jewellery Sets"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C827A] uppercase tracking-wider block">
                  7 Designs
                </span>
                <h3 className="font-serif text-xl text-[#292522] group-hover:text-[#641E32] transition-colors mt-0.5">
                  Jewellery Sets
                </h3>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D] group-hover:text-[#641E32] flex items-center gap-1 shrink-0">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FEATURED PRODUCTS SECTION: Curated Highlights
         ======================================================== */}
      <section className="py-16 bg-[#FAF7F2] border-y border-[#ECE4D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase text-[#641E32] font-semibold block mb-2">
                Curator’s Selection
              </span>
              <h2 className="font-serif text-3xl text-[#292522]">
                Featured Highlights
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/shop')}
              className="text-xs font-semibold uppercase tracking-widest text-[#641E32] hover:text-[#4A1424] flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Explore All 40 Designs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. BRAND STORY SECTION: The Philosophy of Zelora
         ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-[#292522] overflow-hidden shadow-md">
              <JewelleryVisual
                src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80"
                alt="Craftsmanship in Atelier"
                category="Bangles & Bracelets"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#641E32] text-[#F5F0E8] p-6 max-w-xs shadow-xl hidden sm:block">
              <span className="font-serif text-2xl font-light block italic">
                “Form meets feeling.”
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#DFC79B] mt-2 block font-medium">
                Zelora Atelier Philosophy
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-xs tracking-[0.25em] uppercase text-[#641E32] font-semibold block">
              Editorial Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292522] leading-tight">
              Graceful Adornments Crafted for Enduring Memories
            </h2>
            <div className="space-y-4 text-sm text-[#665E58] font-light leading-relaxed">
              <p>
                At Zelora Jewels, we believe jewellery should evoke a deeply personal resonance. Rather than reserving elegance solely for grand occasions, our pieces are conceived to accompany you through every quiet triumph and radiant celebration.
              </p>
              <p>
                Each design in our 40-piece collection honors the tactile nuances of Indian artisanal metalwork—from delicate milgrain borders and hand-knotted cultured pearls to clean modern bezel settings that catch ambient light with effortless subtlety.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('/about-contact')}
                className="px-6 py-3.5 bg-[#292522] hover:bg-[#3D3733] text-[#F5F0E8] text-xs font-semibold tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                Learn More About Zelora <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. NEW ARRIVALS: Fresh Design Silhouettes
         ======================================================== */}
      <section className="py-16 bg-[#FAF7F2] border-t border-[#ECE4D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase text-[#641E32] font-semibold block mb-2">
                Recent Atelier Releases
              </span>
              <h2 className="font-serif text-3xl text-[#292522]">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/shop')}
              className="text-xs font-semibold uppercase tracking-widest text-[#641E32] hover:text-[#4A1424] flex items-center gap-1.5 group cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. NEWSLETTER INTERFACE: Private Curation Club
         ======================================================== */}
      <section className="py-20 bg-[#641E32] text-[#F5F0E8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs tracking-[0.3em] uppercase text-[#DFC79B] font-medium block">
            Private Client Gazette
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#F5F0E8]">
            Receive First Access to Seasonal Editions
          </h2>
          <p className="text-sm text-[#F5F0E8]/80 font-light leading-relaxed max-w-xl mx-auto">
            Join our private circle to preview limited design runs, styling notes from our atelier, and quiet editorial updates.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-[#4A1424] border border-[#DFC79B]/40 max-w-md mx-auto flex items-center justify-center gap-2 text-sm text-[#F5F0E8]">
              <CheckCircle2 className="w-5 h-5 text-[#DFC79B]" />
              <span>Thank you. Your invitation has been registered (Demo).</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-[#4A1424] border border-[#7E263F] text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/50 focus:outline-hidden focus:border-[#DFC79B]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#DFC79B] hover:bg-[#C5A46D] text-[#292522] text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#F5F0E8]/60 tracking-wider">
            We respect your privacy. Unsubscribe anytime with one click.
          </p>
        </div>
      </section>
    </div>
  );
};
