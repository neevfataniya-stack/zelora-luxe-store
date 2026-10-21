import React, { useState, useMemo } from 'react';
import { PRODUCTS, formatINR } from '../../data/products';
import { JewelleryVisual } from './JewelleryVisual';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (slug: string) => void;
  onViewAllResults: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onViewAllResults,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#292522]/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF7F2] border border-[#ECE4D8] w-full max-w-2xl shadow-2xl overflow-hidden animate-slide-down">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#ECE4D8] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A46D] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search earrings, solitary pendants, bangles, rings..."
            autoFocus
            className="flex-1 bg-transparent text-base sm:text-lg text-[#292522] placeholder-[#8C827A] focus:outline-hidden font-serif"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8C827A] hover:text-[#292522] text-xs uppercase"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-[#292522] hover:text-[#641E32] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {!query.trim() ? (
            <div>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8C827A] block mb-3">
                Suggested Curations
              </span>
              <div className="flex flex-wrap gap-2">
                {['Solitaire', 'Baroque Pearl', 'Heritage Bangles', 'Bridal Sets', 'Chandbali', 'Emerald'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-[#F5F0E8] hover:bg-[#ECE4D8] text-xs text-[#292522] transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#665E58] pb-2 border-b border-[#ECE4D8]">
                <span>Found {searchResults.length} designs</span>
                <button
                  onClick={() => {
                    onViewAllResults(query);
                    onClose();
                  }}
                  className="text-[#641E32] font-semibold hover:underline flex items-center gap-1"
                >
                  View full catalogue search <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product.slug);
                    onClose();
                  }}
                  className="p-2 flex items-center gap-4 hover:bg-[#F5F0E8] transition-colors cursor-pointer group"
                >
                  <div className="w-14 h-16 shrink-0 bg-[#ECE4D8]">
                    <JewelleryVisual
                      src={product.image}
                      alt={product.name}
                      category={product.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] tracking-wider uppercase text-[#8C827A] block">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-[#292522] group-hover:text-[#641E32] truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#292522] tabular-nums">
                      {formatINR(product.price)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C5A46D] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="font-serif text-base text-[#292522]">
                No matching jewellery designs found
              </p>
              <p className="text-xs text-[#8C827A] mt-1">
                Try searching for pearls, bangles, choker, kundan or rings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
