export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'gold' | 'silver' | 'diamond' | 'gems';
  badge?: "new" | "sale" | "popular";
  featured?: boolean;
  clarity?: string;
  gemType?: string;
}

export const products: Product[] = [
  // Gold Products
  {
    id: 'gold-1',
    name: 'Royal Gold Necklace',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    description: '22K gold necklace with traditional design',
    category: 'gold',
    featured: true,
    badge: "popular",
  },
  {
    id: 'gold-2',
    name: 'Classic Gold Bangles',
    price: 2899,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    description: 'Set of 4 elegant 18K gold bangles',
    category: 'gold',
    badge: "new",
  },
  {
    id: 'gold-3',
    name: 'Designer Gold Earrings',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    description: 'Contemporary 18K gold drop earrings',
    category: 'gold',
    featured: true,
  },
  {
    id: 'gold-4',
    name: 'Heritage Gold Ring',
    price: 2299,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    description: '22K gold ring with antique finish',
    category: 'gold',
  },
  {
    id: 'gold-5',
    name: 'Temple Gold Pendant',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    description: 'Sacred temple design in 18K gold',
    category: 'gold',
  },
  {
    id: 'gold-6',
    name: 'Bridal Gold Set',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    description: 'Complete bridal set in 22K gold',
    category: 'gold',
    featured: true,
  },

  // Silver Products
  {
    id: 'silver-1',
    name: 'Contemporary Silver Ring',
    price: 799,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    description: 'Modern sterling silver minimalist ring',
    category: 'silver',
    featured: true,
  },
  {
    id: 'silver-2',
    name: 'Silver Chain Necklace',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    description: 'Elegant sterling silver cable chain',
    category: 'silver',
  },
  {
    id: 'silver-3',
    name: 'Oxidized Silver Bangles',
    price: 899,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    description: 'Traditional oxidized silver bangles set',
    category: 'silver',
  },
  {
    id: 'silver-4',
    name: 'Silver Hoop Earrings',
    price: 599,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    description: 'Classic sterling silver hoops',
    category: 'silver',
    featured: true,
  },
  {
    id: 'silver-5',
    name: 'Infinity Silver Bracelet',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    description: 'Infinity symbol sterling silver bracelet',
    category: 'silver',
  },
  {
    id: 'silver-6',
    name: 'Silver Pendant Set',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    description: 'Geometric pendant with matching earrings',
    category: 'silver',
  },

  // Diamond Products
  {
    id: 'diamond-1',
    name: 'Solitaire Diamond Ring',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    description: '1.5 carat VVS1 diamond in platinum',
    category: 'diamond',
    clarity: 'VVS1',
    featured: true,
    badge: "popular",
  },
  {
    id: 'diamond-2',
    name: 'Diamond Tennis Bracelet',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    description: '3 carat total weight, VS2 clarity',
    category: 'diamond',
    clarity: 'VS2',
    featured: true,
  },
  {
    id: 'diamond-3',
    name: 'Diamond Stud Earrings',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    description: '1 carat pair, IF clarity diamonds',
    category: 'diamond',
    clarity: 'IF',
  },
  {
    id: 'diamond-4',
    name: 'Halo Diamond Pendant',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    description: '0.75 carat center stone with halo',
    category: 'diamond',
    clarity: 'VVS2',
    featured: true,
  },
  {
    id: 'diamond-5',
    name: 'Eternity Diamond Band',
    price: 11999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    description: 'Full eternity band, VS1 clarity',
    category: 'diamond',
    clarity: 'VS1',
  },
  {
    id: 'diamond-6',
    name: 'Three Stone Diamond Ring',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    description: '2 carat total, VVS2 clarity trilogy',
    category: 'diamond',
    clarity: 'VVS2',
  },

  // Gems Products
  {
    id: 'gems-1',
    name: 'Emerald Drop Earrings',
    price: 4299,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    description: 'Colombian emeralds in white gold',
    category: 'gems',
    gemType: 'Emerald',
    featured: true,
  },
  {
    id: 'gems-2',
    name: 'Ruby Heart Pendant',
    price: 5499,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    description: 'Burmese ruby with diamond halo',
    category: 'gems',
    gemType: 'Ruby',
    featured: true,
  },
  {
    id: 'gems-3',
    name: 'Sapphire Cocktail Ring',
    price: 6999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    description: 'Kashmir sapphire statement piece',
    category: 'gems',
    gemType: 'Sapphire',
  },
  {
    id: 'gems-4',
    name: 'Multi-Gem Bracelet',
    price: 4799,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    description: 'Rainbow gemstones in gold setting',
    category: 'gems',
    gemType: 'Mixed',
    featured: true,
  },
  {
    id: 'gems-5',
    name: 'Tanzanite Solitaire Ring',
    price: 5799,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    description: 'Rare tanzanite in platinum',
    category: 'gems',
    gemType: 'Tanzanite',
  },
  {
    id: 'gems-6',
    name: 'Opal Pendant Necklace',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    description: 'Australian opal with fire',
    category: 'gems',
    gemType: 'Opal',
  },
];

export const getProductsByCategory = (category: Product['category']) => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(p => p.featured);
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};

export const getRandomProduct = (category?: Product['category']) => {
  const pool = category ? getProductsByCategory(category) : products;
  return pool[Math.floor(Math.random() * pool.length)];
};

export const getAllProducts = () => {
  return products;
};
