import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, formatINR } from '../data/products';
import { ProductCategory, Product } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

interface ShopPageProps {
  onNavigate: (route: string) => void;
  initialCategory?: ProductCategory | 'All';
  initialSearchQuery?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigate,
  initialCategory = 'All',
  initialSearchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(
    initialCategory
  );
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [visibleCount, setVisibleCount] = useState(16);

  // Sync if initial prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Earrings',
    'Necklaces',
    'Bangles & Bracelets',
    'Rings',
    'Jewellery Sets',
  ];

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // 'featured'
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortOption]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredProducts.length));
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortOption('featured');
    setVisibleCount(16);
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#292522]">
      {/* Compact Burgundy Title Banner */}
      <section className="bg-[#641E32] text-[#F5F0E8] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#7E263F]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#DFC79B] font-medium block">
              Complete Catalogue · 40 Curated Designs
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F5F0E8]">
              Shop All Jewellery
            </h1>
            <p className="text-xs sm:text-sm text-[#F5F0E8]/80 font-light max-w-xl">
              Earrings, necklaces, bangles, rings and matching suites handcrafted with artisanal finesse. All prices and stock are displayed for demonstration.
            </p>
          </div>

          <div className="bg-[#4A1424] px-4 py-2.5 border border-[#DFC79B]/30 flex items-center gap-3 text-xs text-[#DFC79B]">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Sample pricing in INR (₹) · All inventory simulated</span>
          </div>
        </div>
      </section>

      {/* Main Filter & Catalogue Controls Bar */}
      <section className="sticky top-20 z-30 bg-[#FAF7F2] border-b border-[#ECE4D8] py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Filter Tabs (Interactive Segmented Controls) */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count =
                  cat === 'All'
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setVisibleCount(16);
                    }}
                    className={`px-3.5 py-1.5 text-xs font-medium tracking-wider whitespace-nowrap cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#641E32] text-[#F5F0E8]'
                        : 'bg-[#F5F0E8] text-[#292522] hover:bg-[#ECE4D8]'
                    }`}
                  >
                    {cat} <span className="opacity-70 text-[10px]">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(16);
                  }}
                  placeholder="Filter by keyword..."
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#F5F0E8] border border-[#ECE4D8] text-[#292522] placeholder-[#8C827A] focus:outline-hidden focus:border-[#C5A46D]"
                />
                <Search className="w-3.5 h-3.5 text-[#8C827A] absolute left-2.5 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8C827A] hover:text-[#292522]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-[#F5F0E8] border border-[#ECE4D8] px-3 py-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8C827A]" />
                <span className="text-[11px] uppercase tracking-wider text-[#8C827A] hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortOption}
                  onChange={(e) =>
                    setSortOption(
                      e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'newest'
                    )
                  }
                  className="bg-transparent text-xs text-[#292522] font-medium focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">Curated & Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Grid & Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results Counter & Active Filter Pills (Interactive removal) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#ECE4D8] gap-3 text-xs text-[#665E58]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#292522]">
              Showing {displayedProducts.length} of {filteredProducts.length} designs
            </span>
            <span>(Catalogue Total: 40)</span>
          </div>

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-[#641E32] underline hover:text-[#4A1424] font-medium self-start sm:self-auto cursor-pointer"
            >
              Clear all active filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#FAF7F2] border border-[#ECE4D8] p-8">
            <h3 className="font-serif text-2xl text-[#292522] mb-2">
              No Jewellery Matches Found
            </h3>
            <p className="text-sm text-[#665E58] max-w-md mx-auto mb-6">
              We couldn’t find pieces matching &quot;{searchQuery}&quot; in the {selectedCategory} category.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#641E32] text-[#F5F0E8] text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters & View All 40 Designs
            </button>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3.5 bg-[#292522] hover:bg-[#3D3733] text-[#F5F0E8] text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Load More Designs ({filteredProducts.length - displayedProducts.length} remaining)
            </button>
          </div>
        )}

        {/* Promoted Meta Ads Quick Landing Strip */}
        <div className="mt-20 p-8 bg-[#FAF7F2] border border-[#C5A46D]/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#641E32] font-semibold block mb-1">
                Direct Campaign Landings
              </span>
              <h3 className="font-serif text-xl text-[#292522]">
                Looking for pieces featured in our Meta Ads?
              </h3>
              <p className="text-xs text-[#665E58] mt-1">
                Jump directly to dedicated high-resolution pages for the promoted earring, pendant necklace, and traditional bangles.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('/products/elegant-earrings')}
                className="px-4 py-2 bg-[#F5F0E8] hover:bg-[#ECE4D8] text-xs text-[#292522] border border-[#ECE4D8] transition-colors cursor-pointer"
              >
                Aurora Pearl Drops (Earrings Ad) &rarr;
              </button>
              <button
                onClick={() => onNavigate('/products/pendant-necklace')}
                className="px-4 py-2 bg-[#F5F0E8] hover:bg-[#ECE4D8] text-xs text-[#292522] border border-[#ECE4D8] transition-colors cursor-pointer"
              >
                Celestial Solitaire (Pendant Ad) &rarr;
              </button>
              <button
                onClick={() => onNavigate('/products/traditional-bangles')}
                className="px-4 py-2 bg-[#F5F0E8] hover:bg-[#ECE4D8] text-xs text-[#292522] border border-[#ECE4D8] transition-colors cursor-pointer"
              >
                Royal Filigree (Bangles Ad) &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
