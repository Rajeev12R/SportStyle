
import type { LucideIcon } from 'lucide-react';
import { Home, Shirt, Shield, ShoppingCart, Heart, User, Bot, Phone, LogIn, UserPlus } from 'lucide-react';
import type { Product } from '@/types';

export interface NavLinkItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLinkItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/sportswear', label: 'Sportswear', icon: Shirt },
  { href: '/uniforms', label: 'Uniforms', icon: Shield },
  { href: '/style-assistant', label: 'Style AI', icon: Bot },
  { href: '/contact', label: 'Contact Us', icon: Phone },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/profile', label: 'Profile', icon: User },
  // { href: '/login', label: 'Login', icon: LogIn }, // Example conditional link
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pro Performance T-Shirt',
    category: 'Sportswear',
    price: 29.99,
    description: 'Lightweight, breathable fabric for peak performance. Moisture-wicking technology keeps you dry and comfortable.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    dataAiHint: 'performance shirt',
    variants: [
      { type: 'Color', value: 'Red' },
      { type: 'Color', value: 'Blue' },
      { type: 'Size', value: 'S' },
      { type: 'Size', value: 'M' },
      { type: 'Size', value: 'L' },
    ],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: '2',
    name: 'Elite Soccer Uniform',
    category: 'Uniforms',
    price: 79.99,
    description: 'Complete soccer kit including jersey and shorts. Durable and designed for professional play.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    dataAiHint: 'soccer uniform',
    variants: [
      { type: 'Color', value: 'Team Yellow' },
      { type: 'Color', value: 'Team Green' },
      { type: 'Size', value: 'Youth M' },
      { type: 'Size', value: 'Adult L' },
    ],
    rating: 4.8,
    reviews: 85,
  },
  {
    id: '3',
    name: 'FlexFit Training Shorts',
    category: 'Sportswear',
    price: 34.99,
    description: 'Stretchable and comfortable shorts perfect for any workout. Features secure pockets and an adjustable waistband.',
    images: ['https://placehold.co/600x600.png'],
    dataAiHint: 'training shorts',
    variants: [
      { type: 'Color', value: 'Black' },
      { type: 'Color', value: 'Grey' },
      { type: 'Size', value: 'M' },
      { type: 'Size', value: 'XL' },
    ],
    rating: 4.2,
    reviews: 95,
  },
  {
    id: '4',
    name: 'All-Weather Running Jacket',
    category: 'Sportswear',
    price: 89.99,
    description: 'Water-resistant and windproof jacket for running in any condition. Reflective details for visibility.',
    images: ['https://placehold.co/600x600.png'],
    dataAiHint: 'running jacket',
    variants: [
      { type: 'Color', value: 'Neon Yellow' },
      { type: 'Color', value: 'Stealth Black' },
      { type: 'Size', value: 'S' },
      { type: 'Size', value: 'M' },
      { type: 'Size', value: 'L' },
    ],
    rating: 4.7,
    reviews: 150,
  },
  {
    id: '5',
    name: 'Championship Basketball Jersey',
    category: 'Uniforms',
    price: 55.00,
    description: 'Authentic design basketball jersey. Breathable mesh fabric for ultimate comfort on the court.',
    images: ['https://placehold.co/600x600.png'],
    dataAiHint: 'basketball jersey',
    variants: [
      { type: 'Color', value: 'Home White' },
      { type: 'Color', value: 'Away Blue' },
      { type: 'Number', value: 'Custom' },
      { type: 'Size', value: 'L' },
      { type: 'Size', value: 'XL' },
    ],
    rating: 4.9,
    reviews: 210,
  },
   {
    id: '6',
    name: 'Yoga Comfort Leggings',
    category: 'Sportswear',
    price: 45.99,
    description: 'High-waisted leggings with four-way stretch for maximum comfort and flexibility during yoga or pilates.',
    images: ['https://placehold.co/600x600.png'],
    dataAiHint: 'yoga leggings',
    variants: [
      { type: 'Color', value: 'Mystic Purple' },
      { type: 'Color', value: 'Ocean Teal' },
      { type: 'Size', value: 'XS' },
      { type: 'Size', value: 'S' },
      { type: 'Size', value: 'M' },
    ],
    rating: 4.6,
    reviews: 180,
  },
];
