import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { AccountModal } from './components/common/AccountModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { ShippingReturnsPage } from './pages/ShippingReturnsPage';
import { LegalPage } from './pages/LegalPage';
import { ProductCategory } from './types';
import { getProductBySlugOrId } from './data/products';
import { initMetaPixel, trackPageView } from './utils/metaPixel';

export default function App() {
  const getInitialRoute = (): string => {
    if (typeof window === 'undefined') return '/';
    // 1. Check hash first if present (e.g., #/shop or #shop)
    if (window.location.hash) {
      const cleanHash = window.location.hash.replace(/^#\/?/, '/');
      return cleanHash.startsWith('/') ? cleanHash : '/' + cleanHash;
    }
    // 2. Check pathname directly (e.g. /products/elegant-earrings or /shop)
    if (window.location.pathname && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Sync route changes with window hash and browser history popstate
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(getInitialRoute());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    try {
      window.history.pushState({}, '', route);
    } catch {
      window.location.hash = route;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parse path and query parameters
  const [path, queryString] = currentRoute.split('?');
  const searchParams = new URLSearchParams(queryString || '');

  const categoryParam = searchParams.get('category') as ProductCategory | 'All' | null;
  const searchParam = searchParams.get('search') || '';

  // Initialize Meta Pixel tracker
  useEffect(() => {
    initMetaPixel();
  }, []);

  // Dynamic Document Title and PageView Tracking
  useEffect(() => {
    trackPageView();
    
    if (path.startsWith('/product/') || path.startsWith('/products/')) {
      const slug = path.replace(/^\/(product|products)\//, '');
      const prod = getProductBySlugOrId(slug);
      document.title = prod ? `${prod.name} | Zelora Jewels` : 'Jewellery Design | Zelora Jewels';
    } else {
      switch (path) {
        case '/shop':
        case 'shop':
          document.title = 'Catalogue of 40 Designs | Zelora Jewels';
          break;
        case '/categories':
        case 'categories':
          document.title = 'Atelier Categories | Zelora Jewels';
          break;
        case '/cart':
        case 'cart':
          document.title = 'Your Shopping Bag | Zelora Jewels';
          break;
        case '/checkout':
        case 'checkout':
          document.title = 'Secure Checkout Concierge | Zelora Jewels';
          break;
        case '/confirmation':
        case 'confirmation':
          document.title = 'Order Confirmation | Zelora Jewels';
          break;
        case '/about-contact':
        case '/about':
        case '/contact':
        case 'about-contact':
          document.title = 'About Our Atelier & Contact | Zelora Jewels';
          break;
        case '/shipping-returns':
        case '/shipping':
        case 'shipping-returns':
          document.title = 'Shipping & Returns Policy | Zelora Jewels';
          break;
        case '/privacy-terms':
        case '/legal':
        case 'privacy-terms':
          document.title = 'Privacy Policy & Terms of Sale | Zelora Jewels';
          break;
        default:
          document.title = 'Zelora Jewels - Luxury Editorial Jewellery';
          break;
      }
    }
  }, [path]);

  // Render active page based on route path
  const renderPage = () => {
    // Product Detail Page & Meta Ad Landing Pages: /product/:slug or /products/:slug
    if (path.startsWith('/product/') || path.startsWith('/products/')) {
      const slug = path.replace(/^\/(product|products)\//, '');
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }

    switch (path) {
      case '/':
      case '':
      case 'home':
        return <HomePage onNavigate={navigate} />;

      case '/shop':
      case 'shop':
        return (
          <ShopPage
            onNavigate={navigate}
            initialCategory={categoryParam || 'All'}
            initialSearchQuery={searchParam}
          />
        );

      case '/categories':
      case 'categories':
        return <CategoriesPage onNavigate={navigate} />;

      case '/cart':
      case 'cart':
        return <CartPage onNavigate={navigate} />;

      case '/checkout':
      case 'checkout':
        return <CheckoutPage onNavigate={navigate} />;

      case '/confirmation':
      case 'confirmation':
        return <ConfirmationPage onNavigate={navigate} />;

      case '/about-contact':
      case '/about':
      case '/contact':
      case 'about-contact':
        return <AboutContactPage onNavigate={navigate} />;

      case '/shipping-returns':
      case '/shipping':
      case 'shipping-returns':
        return <ShippingReturnsPage onNavigate={navigate} />;

      case '/privacy-terms':
      case '/legal':
      case 'privacy-terms':
        return <LegalPage onNavigate={navigate} />;

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#292522] selection:bg-[#641E32] selection:text-[#F5F0E8]">
        {/* Navigation Top Bar */}
        <Header
          currentRoute={currentRoute}
          onNavigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
        />

        {/* Active Page Content */}
        <main className="flex-1">{renderPage()}</main>

        {/* Global Footer */}
        <Footer onNavigate={navigate} />

        {/* Global Search Dialog */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={(slug) => navigate(`/product/${slug}`)}
          onViewAllResults={(query) =>
            navigate(`/shop?search=${encodeURIComponent(query)}`)
          }
        />

        {/* Client Account / Concierge Modal */}
        <AccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          onNavigate={navigate}
        />
      </div>
    </CartProvider>
  );
}
