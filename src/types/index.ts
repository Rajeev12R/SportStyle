export interface ProductVariant {
  type: string; // e.g., 'Color', 'Size'
  value: string; // e.g., 'Red', 'XL'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Sportswear' | 'Uniforms' | string; // Allow other categories
  images: string[];
  dataAiHint?: string;
  variants?: ProductVariant[];
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  address?: Address;
  orderHistory?: Order[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  date: string; // ISO date string
  items: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}
