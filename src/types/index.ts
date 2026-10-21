export type ProductCategory = 
  | 'Earrings'
  | 'Necklaces'
  | 'Bangles & Bracelets'
  | 'Rings'
  | 'Jewellery Sets';

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number; // Demo price in INR
  originalPrice?: number;
  description: string;
  details: string[];
  care: string[];
  options?: ProductOption;
  stockStatus: 'In Stock' | 'Low Stock (Demo)' | 'Made to Order (Demo)';
  stockCount: number;
  featured?: boolean;
  isNew?: boolean;
  image: string;
  gallery: string[];
  styleNote?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface OrderDetails {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    paymentMethod: string;
  };
  isDemo: boolean;
}
