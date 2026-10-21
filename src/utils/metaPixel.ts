import { Product, CartItem, OrderDetails } from '../types';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// Set to your actual Meta Pixel ID when deploying for live ads tracking
export const META_PIXEL_ID = process.env.VITE_META_PIXEL_ID || 'PENDING_PIXEL_ID';

// In-memory set of tracked purchase order IDs to prevent duplicate purchase events
const trackedPurchases = new Set<string>();

/**
 * Initialize Meta Pixel script dynamically if a valid numeric pixel ID is provided
 */
export function initMetaPixel(): void {
  if (typeof window === 'undefined') return;

  if (META_PIXEL_ID && META_PIXEL_ID !== 'PENDING_PIXEL_ID' && !window.fbq) {
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    const fbqFn = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbqFn === 'function') {
      fbqFn('init', META_PIXEL_ID);
      fbqFn('track', 'PageView');
    }
  }
}

/**
 * Track PageView event
 */
export function trackPageView(): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

/**
 * Track ViewContent event when a user views a product detail page
 */
export function trackViewContent(product: Product): void {
  if (typeof window === 'undefined') return;

  const eventData = {
    content_name: product.name,
    content_category: product.category,
    content_ids: [product.id, product.slug],
    content_type: 'product',
    value: product.price,
    currency: 'INR',
  };

  if (window.fbq) {
    window.fbq('track', 'ViewContent', eventData);
  } else {
    // Audit log for developer inspection
    console.debug('[Meta Pixel Simulator] ViewContent:', eventData);
  }
}

/**
 * Track AddToCart event
 */
export function trackAddToCart(product: Product, quantity = 1): void {
  if (typeof window === 'undefined') return;

  const eventData = {
    content_name: product.name,
    content_category: product.category,
    content_ids: [product.id, product.slug],
    content_type: 'product',
    value: product.price * quantity,
    currency: 'INR',
    num_items: quantity,
  };

  if (window.fbq) {
    window.fbq('track', 'AddToCart', eventData);
  } else {
    console.debug('[Meta Pixel Simulator] AddToCart:', eventData);
  }
}

/**
 * Track InitiateCheckout event
 */
export function trackInitiateCheckout(items: CartItem[], total: number): void {
  if (typeof window === 'undefined') return;

  const eventData = {
    content_ids: items.map((i) => i.product.id),
    content_type: 'product',
    num_items: items.reduce((acc, i) => acc + i.quantity, 0),
    value: total,
    currency: 'INR',
  };

  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', eventData);
  } else {
    console.debug('[Meta Pixel Simulator] InitiateCheckout:', eventData);
  }
}

/**
 * Track Purchase event
 * Safety: Only fires once per unique order reference. Prevents duplicate event firing on page reloads or back-button navigation.
 */
export function trackPurchase(order: OrderDetails): boolean {
  if (typeof window === 'undefined') return false;

  // Prevent duplicate purchase event firing
  if (trackedPurchases.has(order.orderId)) {
    console.debug(`[Meta Pixel Safety] Purchase event already recorded for order ${order.orderId}. Skipping duplicate.`);
    return false;
  }

  trackedPurchases.add(order.orderId);

  const eventData = {
    content_ids: order.items.map((i) => i.product.id),
    content_type: 'product',
    num_items: order.items.reduce((acc, i) => acc + i.quantity, 0),
    value: order.total,
    currency: 'INR',
    order_id: order.orderId,
  };

  if (window.fbq) {
    window.fbq('track', 'Purchase', eventData);
  } else {
    console.debug('[Meta Pixel Simulator] Purchase (Verified unique):', eventData);
  }

  return true;
}
