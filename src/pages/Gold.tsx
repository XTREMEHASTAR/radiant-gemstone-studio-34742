import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, getRandomProduct } from "@/data/products";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/FilterBar";

const Gold = () => {
  const allProducts = getProductsByCategory('gold');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const maxPrice = Math.max(...allProducts.map(p => p.price));

  const highlightRandom = () => {
    const randomProduct = getRandomProduct('gold');
    if (randomProduct) {
      setHighlightedProduct(randomProduct.id);
      setTimeout(() => setHighlightedProduct(null), 3000);
    }
  };

  // Filter and sort products
  const handleFilterAndSort = () => {
    let filtered = [...allProducts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  };

  // Re-filter when dependencies change
  useState(() => {
    handleFilterAndSort();
  });

  // Update when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setTimeout(handleFilterAndSort, 300);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    handleFilterAndSort();
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    handleFilterAndSort();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900/20 to-black">
      {/* Hero Section with Golden Theme */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 luxury-gradient opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
        
        {/* Animated golden particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: -20,
                opacity: 0 
              }}
              animate={{
                y: window.innerHeight + 20,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 drop-shadow-lg">
              Gold Collection
            </h1>
            <p className="text-xl text-yellow-100/80 max-w-2xl mx-auto font-light tracking-wide">
              Rich Golden Luxury — Timeless Treasures in Pure Gold
            </p>
            
            {/* Glowing border decoration */}
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.3)",
                  "0 0 40px rgba(251, 191, 36, 0.6)",
                  "0 0 20px rgba(251, 191, 36, 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-1 luxury-gradient mx-auto mt-6 rounded-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-white mb-2">
              Explore Our Gold Jewelry
            </h2>
            <p className="text-yellow-100/60">
              {filteredProducts.length} of {allProducts.length} pieces
            </p>
          </div>
          
          <Button
            onClick={highlightRandom}
            className="luxury-gradient hover:glow-gold transition-all duration-300 text-white font-semibold px-6 py-3 rounded-full shadow-xl"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Highlight Random Product
          </Button>
        </div>

        {/* Filter Bar */}
        <FilterBar
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onPriceRangeChange={handlePriceRangeChange}
          priceRange={priceRange}
          maxPrice={maxPrice}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className={`${
                highlightedProduct === product.id
                  ? "ring-4 ring-primary ring-offset-4 ring-offset-black rounded-2xl glow-gold"
                  : ""
              } transition-all duration-500`}
            >
              <ProductCard {...product} index={index} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer with Gold Theme */}
      <div className="border-t border-primary/20 bg-gradient-to-r from-yellow-900/10 via-yellow-800/10 to-yellow-900/10 py-8">
        <div className="container mx-auto px-4 text-center text-yellow-100/60">
          <p className="text-sm">Crafted with precision • Certified authenticity • Lifetime warranty</p>
        </div>
      </div>
    </div>
  );
};

export default Gold;
