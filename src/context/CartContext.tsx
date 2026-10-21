import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails } from '../types';
import { trackAddToCart as pixelTrackAddToCart } from '../utils/metaPixel';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedOption?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedOption?: string) => void;
  removeFromCart: (productId: string, selectedOption?: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  lastOrder: OrderDetails | null;
  createOrder: (customer: OrderDetails['customer']) => OrderDetails;
  toastMessage: string | null;
  dismissToast: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PRIMARY_CART_KEY = 'zelora_jewels_cart_v1';
const LEGACY_CART_KEY = 'glow_jewels_cart_v1';
const PRIMARY_ORDER_KEY = 'zelora_jewels_last_order_v1';
const LEGACY_ORDER_KEY = 'glow_jewels_last_order_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(PRIMARY_CART_KEY) || localStorage.getItem(LEGACY_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem(PRIMARY_ORDER_KEY) || localStorage.getItem(LEGACY_ORDER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(PRIMARY_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not persist cart:', e);
    }
  }, [cart]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const addToCart = (product: Product, quantity = 1, selectedOption?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedOption === selectedOption
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedOption }];
      }
    });

    // Fire Meta Pixel AddToCart event
    pixelTrackAddToCart(product, quantity);

    setToastMessage(`Added "${product.name}" to your shopping bag.`);
  };

  const updateQuantity = (productId: string, quantity: number, selectedOption?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedOption);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedOption === selectedOption) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, selectedOption?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedOption === selectedOption)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Free delivery for orders above ₹5,000, else standard demo shipping ₹250
  const shipping = subtotal > 0 ? (subtotal >= 5000 ? 0 : 250) : 0;
  const total = subtotal + shipping;

  const createOrder = (customer: OrderDetails['customer']): OrderDetails => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: OrderDetails = {
      orderId: `ZELORA-IND-${randomNum}`,
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal,
      shipping,
      total,
      customer,
      isDemo: true,
    };

    setLastOrder(newOrder);
    try {
      localStorage.setItem(PRIMARY_ORDER_KEY, JSON.stringify(newOrder));
    } catch (e) {
      console.warn('Could not persist order:', e);
    }
    clearCart();
    return newOrder;
  };

  const dismissToast = () => setToastMessage(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        total,
        lastOrder,
        createOrder,
        toastMessage,
        dismissToast,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
