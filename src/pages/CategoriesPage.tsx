import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoriesPageProps {
  onNavigate: (route: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
  // Editorial imagery for each of the 5 categories
  const categoryImages: Record<string, string> = {
    Earrings: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
    Necklaces: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    'Bangles & Bracelets': 'https://images.unsplash.com/photo-1611591475879-da652a265691?auto=format&fit=crop&w=1200&q=80',
    Rings: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
    'Jewellery Sets': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
  };

  const handleCategoryClick = (categoryName: string) => {
    onNavigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#292522]">
      {/* Editorial Page Header */}
      <section className="border-b border-[#ECE4D8] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#641E32] font-semibold">
            <span className="w-6 h-[1px] bg-[#641E32]" />
            <span>The Five Disciplines</span>
            <span className="w-6 h-[1px] bg-[#641E32]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#292522]">
            Atelier Categories
          </h1>

          <p className="text-sm sm:text-base text-[#665E58] font-light max-w-2xl mx-auto leading-relaxed">
            Five distinguished curations encompassing 40 masterwork designs. Explore our balance of contemporary refinement and Indian goldsmithing heritage.
          </p>

          <div className="pt-2 text-xs text-[#C5A46D] font-medium tracking-wider uppercase">
            Total 40 Products Across 5 Curations
          </div>
        </div>
      </section>

      {/* Asymmetric 5-Category Editorial Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* Tile 1: Earrings (10 Products) - Large Asymmetric Split */}
          <div
            onClick={() => handleCategoryClick('Earrings')}
            className="group cursor-pointer bg-[#FAF7F2] border border-[#ECE4D8] hover:border-[#C5A46D] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xs hover:shadow-md"
          >
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden">
              <JewelleryVisual
                src={categoryImages['Earrings']}
                alt="Earrings Collection"
                category="Earrings"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#8C827A] uppercase tracking-widest pb-3 border-b border-[#ECE4D8]">
                  <span>01. Collection</span>
                  <span className="text-[#641E32] font-bold">10 Products</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#292522] group-hover:text-[#641E32] transition-colors mt-4">
                  Earrings
                </h2>
                <p className="text-xs text-[#C5A46D] uppercase tracking-wider font-medium mt-1">
                  Sculptural Drops, Huggies & Traditional Chandbalis
                </p>
                <p className="text-sm text-[#665E58] leading-relaxed mt-4 font-light">
                  From baroque pearl drops to grand kundan jhumkas, every pair is engineered for weight balance and radiant light dispersion.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#641E32] group-hover:text-[#4A1424] flex items-center gap-2">
                  Explore Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-[11px] text-[#8C827A] font-mono">10 Designs</span>
              </div>
            </div>
          </div>

          {/* Tiles 2 & 3: Necklaces & Bangles - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tile 2: Necklaces (8 Products) */}
            <div
              onClick={() => handleCategoryClick('Necklaces')}
              className="group cursor-pointer bg-[#FAF7F2] border border-[#ECE4D8] hover:border-[#C5A46D] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md"
            >
              <div className="aspect-[16/11] overflow-hidden">
                <JewelleryVisual
                  src={categoryImages['Necklaces']}
                  alt="Necklaces Collection"
                  category="Necklaces"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C827A] uppercase tracking-widest pb-3 border-b border-[#ECE4D8]">
                    <span>02. Collection</span>
                    <span className="text-[#641E32] font-bold">8 Products</span>
                  </div>
                  <h2 className="font-serif text-3xl text-[#292522] group-hover:text-[#641E32] transition-colors mt-4">
                    Necklaces
                  </h2>
                  <p className="text-xs text-[#C5A46D] uppercase tracking-wider font-medium mt-1">
                    Solitaire Pendants, Hasli Collars & Chandy Neckpieces
                  </p>
                  <p className="text-sm text-[#665E58] leading-relaxed mt-3 font-light">
                    Fluid chains and structured torques that frame the neckline with timeless restraint.
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#ECE4D8]">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#641E32] flex items-center gap-2">
                    Explore Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-[#8C827A] font-mono">8 Designs</span>
                </div>
              </div>
            </div>

            {/* Tile 3: Bangles & Bracelets (8 Products) */}
            <div
              onClick={() => handleCategoryClick('Bangles & Bracelets')}
              className="group cursor-pointer bg-[#FAF7F2] border border-[#ECE4D8] hover:border-[#C5A46D] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md"
            >
              <div className="aspect-[16/11] overflow-hidden">
                <JewelleryVisual
                  src={categoryImages['Bangles & Bracelets']}
                  alt="Bangles & Bracelets Collection"
                  category="Bangles & Bracelets"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C827A] uppercase tracking-widest pb-3 border-b border-[#ECE4D8]">
                    <span>03. Collection</span>
                    <span className="text-[#641E32] font-bold">8 Products</span>
                  </div>
                  <h2 className="font-serif text-3xl text-[#292522] group-hover:text-[#641E32] transition-colors mt-4">
                    Bangles & Bracelets
                  </h2>
                  <p className="text-xs text-[#C5A46D] uppercase tracking-wider font-medium mt-1">
                    Filigree Kadas, Modern Cuffs & Tennis Bracelets
                  </p>
                  <p className="text-sm text-[#665E58] leading-relaxed mt-3 font-light">
                    Masterpieces of tactile wrist ornamentation, featuring traditional screw-pin hinges and comfort profiles.
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#ECE4D8]">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#641E32] flex items-center gap-2">
                    Explore Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-[#8C827A] font-mono">8 Designs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tiles 4 & 5: Rings (7) & Jewellery Sets (7) - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tile 4: Rings (7 Products) */}
            <div
              onClick={() => handleCategoryClick('Rings')}
              className="group cursor-pointer bg-[#FAF7F2] border border-[#ECE4D8] hover:border-[#C5A46D] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md"
            >
              <div className="aspect-[16/11] overflow-hidden">
                <JewelleryVisual
                  src={categoryImages['Rings']}
                  alt="Rings Collection"
                  category="Rings"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C827A] uppercase tracking-widest pb-3 border-b border-[#ECE4D8]">
                    <span>04. Collection</span>
                    <span className="text-[#641E32] font-bold">7 Products</span>
                  </div>
                  <h2 className="font-serif text-3xl text-[#292522] group-hover:text-[#641E32] transition-colors mt-4">
                    Rings
                  </h2>
                  <p className="text-xs text-[#C5A46D] uppercase tracking-wider font-medium mt-1">
                    Emerald-Cut Cocktails, Bands & Ribbed Croissants
                  </p>
                  <p className="text-sm text-[#665E58] leading-relaxed mt-3 font-light">
                    Subtle or dramatic statements for the hand, engineered for everyday comfort.
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#ECE4D8]">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#641E32] flex items-center gap-2">
                    Explore Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-[#8C827A] font-mono">7 Designs</span>
                </div>
              </div>
            </div>

            {/* Tile 5: Jewellery Sets (7 Products) */}
            <div
              onClick={() => handleCategoryClick('Jewellery Sets')}
              className="group cursor-pointer bg-[#FAF7F2] border border-[#ECE4D8] hover:border-[#C5A46D] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md"
            >
              <div className="aspect-[16/11] overflow-hidden">
                <JewelleryVisual
                  src={categoryImages['Jewellery Sets']}
                  alt="Jewellery Sets Collection"
                  category="Jewellery Sets"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C827A] uppercase tracking-widest pb-3 border-b border-[#ECE4D8]">
                    <span>05. Collection</span>
                    <span className="text-[#641E32] font-bold">7 Products</span>
                  </div>
                  <h2 className="font-serif text-3xl text-[#292522] group-hover:text-[#641E32] transition-colors mt-4">
                    Jewellery Sets
                  </h2>
                  <p className="text-xs text-[#C5A46D] uppercase tracking-wider font-medium mt-1">
                    Bridal Suites, Gala Parures & Solitaire Duets
                  </p>
                  <p className="text-sm text-[#665E58] leading-relaxed mt-3 font-light">
                    Cohesive suites designed for milestone moments, grand celebrations, and festive weddings.
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#ECE4D8]">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#641E32] flex items-center gap-2">
                    Explore Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-[#8C827A] font-mono">7 Designs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
