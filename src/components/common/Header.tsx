import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Search, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  onOpenAccount,
}) => {
  const { cartCount, toastMessage, dismissToast } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Shop All (40)', route: '/shop' },
    { label: 'Categories', route: '/categories' },
    { label: 'About & Contact', route: '/about-contact' },
    { label: 'Shipping & Care', route: '/shipping-returns' },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const isActive = (route: string) => {
    if (route === '/' && currentRoute === '/') return true;
    if (route !== '/' && currentRoute.startsWith(route)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F0E8]/95 backdrop-blur-md border-b border-[#ECE4D8] transition-all">
      {/* Slim Top Announcement Bar */}
      <div className="bg-[#641E32] text-[#F5F0E8] py-1.5 px-4 text-center text-xs tracking-wider font-light flex items-center justify-center gap-2">
        <span className="hidden sm:inline">Curated High Jewellery</span>
        <span className="hidden sm:inline opacity-60">·</span>
        <span>Complimentary Insured Delivery on Orders Above ₹5,000</span>
        <span className="opacity-60">·</span>
        <span className="text-[#DFC79B]">Sample Storefront</span>
      </div>

      {/* Main Top Bar: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-left group flex flex-col justify-center shrink-0 cursor-pointer"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-[#292522] group-hover:text-[#641E32] transition-colors whitespace-nowrap">
            ZELORA JEWELS
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#C5A46D] font-medium -mt-1 hidden sm:block">
            Haute Joaillerie
          </span>
        </button>

        {/* Zone 2: 4-5 Concise Navigation Links (Single-line, subtle underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium tracking-wider uppercase text-[#292522]">
          {navLinks.map((link) => {
            const active = isActive(link.route);
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`py-1 relative whitespace-nowrap transition-colors cursor-pointer ${
                  active ? 'text-[#641E32] font-semibold' : 'text-[#292522] hover:text-[#641E32]'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#641E32]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Functional Actions (Search, Account, Cart Bag) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#292522] hover:text-[#641E32] transition-colors cursor-pointer"
            title="Search Catalogue"
            aria-label="Search Catalogue"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account Trigger */}
          <button
            onClick={onOpenAccount}
            className="p-2 text-[#292522] hover:text-[#641E32] transition-colors cursor-pointer hidden sm:block"
            title="Account & Concierge"
            aria-label="Account & Concierge"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Cart Bag Icon with Live Count */}
          <button
            onClick={() => handleNavClick('/cart')}
            className="relative p-2 text-[#292522] hover:text-[#641E32] transition-colors cursor-pointer flex items-center gap-1.5"
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="min-w-5 h-5 px-1 bg-[#641E32] text-[#F5F0E8] text-[11px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#292522] md:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#ECE4D8] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`text-left text-sm uppercase tracking-wider py-2 border-b border-[#ECE4D8]/60 cursor-pointer ${
                  isActive(link.route)
                    ? 'text-[#641E32] font-semibold'
                    : 'text-[#292522]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="flex items-center justify-between text-xs uppercase tracking-wider text-[#665E58] py-2"
            >
              <span>Client Concierge & Orders</span>
              <ArrowRight className="w-4 h-4 text-[#C5A46D]" />
            </button>
          </div>
        </div>
      )}

      {/* Global Toast Notification for Cart Actions */}
      {toastMessage && (
        <div className="bg-[#641E32] text-[#F5F0E8] px-4 py-2.5 text-xs flex items-center justify-between border-t border-[#7E263F] shadow-md animate-fade-in">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <span className="w-2 h-2 rounded-full bg-[#C5A46D]" />
            <span>{toastMessage}</span>
            <button
              onClick={() => onNavigate('/cart')}
              className="ml-auto underline font-semibold text-[#DFC79B] hover:text-white cursor-pointer"
            >
              View Shopping Bag
            </button>
            <button
              onClick={dismissToast}
              className="p-1 opacity-70 hover:opacity-100 cursor-pointer ml-3"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
