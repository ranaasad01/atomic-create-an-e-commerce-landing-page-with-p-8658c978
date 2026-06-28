export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Featured", href: "#featured" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#newsletter" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export const brandConstants = {
  name: "Lumière",
  tagline: "Crafted for modern living",
  email: "hello@lumiere.store",
  instagram: "@lumiere.store",
  twitter: "@lumiere",
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  badge?: string;
  description: string;
};

export type CartItem = Product & {
  quantity: number;
};