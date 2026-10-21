import React from 'react';
import { Product } from '../../types';
import { formatINR } from '../../data/products';
import { JewelleryVisual } from './JewelleryVisual';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onNavigate: (route: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultOption = product.options ? product.options.values[0] : undefined;
    addToCart(product, 1, defaultOption);
  };

  const handleCardClick = () => {
    onNavigate(`/product/${product.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col bg-[#FAF7F2] border border-[#ECE4D8] transition-all duration-300 hover:border-[#C5A46D]/60 hover:shadow-md"
    >
      {/* Product Image Area */}
      <div className="relative overflow-hidden aspect-[4/5] bg-[#ECE4D8]/30">
        <JewelleryVisual
          src={product.image}
          alt={product.name}
          category={product.category}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Tag (No pill clusters, maximum 1 quiet tag) */}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-[#641E32] text-[#F5F0E8] text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 shadow-xs">
            New Arrival
          </div>
        )}

        {product.stockStatus.includes('Low') && (
          <div className="absolute top-3 right-3 bg-[#FAF7F2]/90 border border-[#C5A46D]/40 text-[#641E32] text-[10px] font-medium tracking-wider px-2 py-0.5">
            Demo Low Stock
          </div>
        )}

        {/* Floating Quick Action Overlay on Desktop */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={handleQuickAdd}
            type="button"
            className="flex-1 py-2.5 px-3 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-medium tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Bag
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            type="button"
            className="py-2.5 px-3 bg-[#FAF7F2] hover:bg-white text-[#292522] border border-[#ECE4D8] text-xs transition-colors flex items-center justify-center shadow-sm"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed Quiet Category Label */}
          <div className="text-[11px] uppercase tracking-widest text-[#665E58] mb-1 font-medium">
            {product.category}
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-[15px] font-semibold text-[#292522] group-hover:text-[#641E32] transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-[#ECE4D8]/80 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-[15px] font-semibold text-[#292522] tabular-nums tracking-tight">
              {formatINR(product.price)}
            </span>
            <span className="text-[10px] text-[#8C827A] tracking-wider uppercase">
              Demo Price
            </span>
          </div>

          <span className="text-[11px] text-[#C5A46D] font-medium group-hover:underline">
            View Design &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
