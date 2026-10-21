import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getProductBySlugOrId, PRODUCTS, formatINR } from '../data/products';
import { useCart } from '../context/CartContext';
import { JewelleryVisual } from '../components/common/JewelleryVisual';
import { ProductCard } from '../components/common/ProductCard';
import { trackViewContent } from '../utils/metaPixel';
import {
  ShoppingBag,
  Sparkles,
  Shield,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
}) => {
  const { addToCart } = useCart();
  const product = getProductBySlugOrId(slug) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>(
    product.options ? product.options.values[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  // Reset states and track ViewContent when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    if (product.options) {
      setSelectedOption(product.options.values[0]);
    }
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackViewContent(product);
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption || undefined);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedOption || undefined);
    onNavigate('/checkout');
  };

  // Related products (from same category, excluding current product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const images = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#292522]">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#ECE4D8] bg-[#FAF7F2]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-[#665E58] flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-[#641E32] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C827A]" />
          <button
            onClick={() => onNavigate('/shop')}
            className="hover:text-[#641E32] transition-colors cursor-pointer"
          >
            Shop All
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C827A]" />
          <button
            onClick={() => onNavigate(`/shop?category=${encodeURIComponent(product.category)}`)}
            className="hover:text-[#641E32] transition-colors cursor-pointer"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C827A]" />
          <span className="text-[#292522] font-medium truncate max-w-xs">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main PDP Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails (vertical on desktop, horizontal on mobile) */}
            {images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:w-20">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square w-16 md:w-20 border transition-all cursor-pointer overflow-hidden bg-[#FAF7F2] ${
                      activeImageIndex === idx
                        ? 'border-[#641E32] ring-1 ring-[#641E32]'
                        : 'border-[#ECE4D8] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <JewelleryVisual
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      category={product.category}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured View */}
            <div className="flex-1 bg-[#FAF7F2] border border-[#ECE4D8] overflow-hidden shadow-xs relative aspect-[4/5] max-h-[700px]">
              <JewelleryVisual
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                category={product.category}
                className="w-full h-full object-cover"
              />

              {product.styleNote && (
                <div className="absolute top-4 left-4 bg-[#641E32] text-[#F5F0E8] text-[10px] uppercase tracking-wider font-semibold px-3 py-1 shadow-sm">
                  {product.styleNote}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Information Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              {/* Category & Serial Code */}
              <div className="flex items-center justify-between text-xs text-[#8C827A] uppercase tracking-widest mb-1.5 font-medium">
                <span>{product.category}</span>
                <span className="font-mono text-[11px]">ID: {product.id}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#292522] leading-tight">
                {product.name}
              </h1>

              {/* Price & Demo Notification */}
              <div className="mt-4 pt-4 border-t border-[#ECE4D8] flex items-baseline gap-3">
                <span className="font-sans text-2xl sm:text-3xl font-semibold text-[#292522] tabular-nums tracking-tight">
                  {formatINR(product.price)}
                </span>
                <span className="text-xs text-[#8C827A] tracking-wider uppercase font-medium">
                  Inclusive of Demo Taxes
                </span>
              </div>

              {/* Stock Status */}
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.stockStatus.includes('Low')
                      ? 'bg-amber-600'
                      : 'bg-emerald-700'
                  }`}
                />
                <span className="font-medium text-[#292522]">
                  {product.stockStatus}
                </span>
                <span className="text-[#8C827A]">
                  ({product.stockCount} simulated items available)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#665E58] font-light leading-relaxed">
              {product.description}
            </p>

            {/* Options Selection (e.g. Ring Size, Finish Tone, Chain Length) */}
            {product.options && (
              <div className="pt-2 border-t border-[#ECE4D8] space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium uppercase tracking-wider text-[#292522]">
                    Select {product.options.name}:
                  </span>
                  <span className="text-[#641E32] font-semibold">
                    {selectedOption}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.options.values.map((val) => (
                    <button
                      key={val}
                      onClick={() => setSelectedOption(val)}
                      type="button"
                      className={`px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                        selectedOption === val
                          ? 'bg-[#641E32] text-[#F5F0E8] font-medium border border-[#641E32]'
                          : 'bg-[#FAF7F2] text-[#292522] border border-[#ECE4D8] hover:border-[#C5A46D]'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action CTAs */}
            <div className="pt-4 border-t border-[#ECE4D8] space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-[#665E58]">
                  Quantity
                </span>
                <div className="flex items-center border border-[#ECE4D8] bg-[#FAF7F2]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    type="button"
                    className="px-3 py-1.5 text-sm text-[#292522] hover:bg-[#ECE4D8] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    type="button"
                    className="px-3 py-1.5 text-sm text-[#292522] hover:bg-[#ECE4D8] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className="flex-1 py-4 px-6 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#DFC79B]" />
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  type="button"
                  className="py-4 px-8 bg-[#292522] hover:bg-[#3D3733] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Delivery & Assurance Strip */}
            <div className="pt-4 border-t border-[#ECE4D8] grid grid-cols-2 gap-4 text-xs text-[#665E58]">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>Complimentary insured delivery across India for orders ≥ ₹5,000</span>
              </div>
              <div className="flex items-start gap-2">
                <RotateCcw className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>7-Day inspection window with tamper-evident seal</span>
              </div>
            </div>

            {/* Accordion Tabs for Details, Care, and Shipping */}
            <div className="pt-6 border-t border-[#ECE4D8]">
              <div className="flex border-b border-[#ECE4D8]">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-2.5 px-4 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-b-2 border-[#641E32] text-[#641E32]'
                      : 'text-[#8C827A] hover:text-[#292522]'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`py-2.5 px-4 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                    activeTab === 'care'
                      ? 'border-b-2 border-[#641E32] text-[#641E32]'
                      : 'text-[#8C827A] hover:text-[#292522]'
                  }`}
                >
                  Care Guide
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`py-2.5 px-4 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-[#641E32] text-[#641E32]'
                      : 'text-[#8C827A] hover:text-[#292522]'
                  }`}
                >
                  Shipping & Return
                </button>
              </div>

              <div className="pt-4 text-xs text-[#665E58] leading-relaxed">
                {activeTab === 'details' && (
                  <ul className="space-y-2 list-disc list-inside">
                    {product.details.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                    <li className="text-[11px] text-[#8C827A] pt-1 list-none">
                      Note: Crafted with high-grade gold-tone metallurgy and simulated stones for daily and celebratory wear.
                    </li>
                  </ul>
                )}

                {activeTab === 'care' && (
                  <ul className="space-y-2 list-disc list-inside">
                    {product.care.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p>
                      Orders are dispatched in customized tamper-proof, plush velvet presentation boxes with insured courier tracking.
                    </p>
                    <p>
                      Estimated delivery window: 3–5 business days within metropolitan cities; 5–7 days for all other pin codes in India.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#ECE4D8]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#641E32] font-semibold block mb-1">
                  Cohesive Styling
                </span>
                <h3 className="font-serif text-2xl text-[#292522]">
                  More from {product.category}
                </h3>
              </div>
              <button
                onClick={() =>
                  onNavigate(`/shop?category=${encodeURIComponent(product.category)}`)
                }
                className="text-xs font-semibold uppercase tracking-widest text-[#641E32] hover:text-[#4A1424]"
              >
                View Category &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
