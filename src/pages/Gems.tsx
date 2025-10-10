import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, getRandomProduct, type Product } from "@/data/products";
import { Sparkles, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilterBar } from "@/components/FilterBar";
import { toast } from "sonner";

const Gems = () => {
  const allProducts = getProductsByCategory('gems');
  const [discoveredGem, setDiscoveredGem] = useState<Product | null>(null);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const maxPrice = useMemo(() => 
    Math.max(...allProducts.map(p => p.price)), 
    [allProducts]
  );

  const products = useMemo(() => {
    let filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [allProducts, searchTerm, sortBy, priceRange]);

  const discoverRandomGem = () => {
    setIsDiscovering(true);
    const randomGem = getRandomProduct('gems');
    
    setTimeout(() => {
      if (randomGem) {
        setDiscoveredGem(randomGem);
        toast.success(`Discovered: ${randomGem.name}!`);
      }
      setIsDiscovering(false);
    }, 1500);
  };

  const gemInfo = [
    { type: 'Emerald', meaning: 'Symbol of rebirth and love', color: 'bg-emerald-500' },
    { type: 'Ruby', meaning: 'Stone of passion and energy', color: 'bg-red-600' },
    { type: 'Sapphire', meaning: 'Wisdom and royalty', color: 'bg-blue-600' },
    { type: 'Tanzanite', meaning: 'Transformation and insight', color: 'bg-indigo-600' },
    { type: 'Opal', meaning: 'Creativity and imagination', color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 relative overflow-hidden">
      {/* Vibrant gradient background animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 gems-gradient animate-pulse" />
      </div>

      {/* Colorful floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              ['bg-purple-400', 'bg-pink-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'][i % 5]
            }`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-6xl md:text-7xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-[length:200%_auto] drop-shadow-lg animate-float"
            >
              Precious Gems
            </motion.h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-light mb-8">
              Vibrant Precious Stones — Nature's Colorful Masterpieces
            </p>

            {/* Discover Gem Button */}
            <Button
              onClick={discoverRandomGem}
              disabled={isDiscovering}
              className="gems-gradient hover:glow-gems text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {isDiscovering ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                  </motion.div>
                  Discovering...
                </>
              ) : (
                <>
                  <Diamond className="mr-2 h-5 w-5" />
                  Discover Random Gem
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Discovered Gem Display */}
      <AnimatePresence>
        {discoveredGem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="container mx-auto px-4 mb-12"
          >
            <Card className="p-8 gems-gradient glow-gems text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif font-bold mb-4 text-center">
                ✨ Gem Discovery ✨
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={discoveredGem.image}
                  alt={discoveredGem.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                />
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-xl font-bold mb-2">{discoveredGem.name}</h4>
                  <p className="mb-2">{discoveredGem.description}</p>
                  {discoveredGem.gemType && (
                    <p className="text-sm opacity-90">
                      <span className="font-semibold">Gem Type:</span> {discoveredGem.gemType}
                    </p>
                  )}
                  <p className="text-2xl font-bold mt-3">${discoveredGem.price.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gem Info Cards */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-serif font-bold text-white text-center mb-8">
          Gemstone Meanings
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {gemInfo.map((gem, index) => (
            <motion.div
              key={gem.type}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="glassmorphism p-4 rounded-xl text-center text-white"
            >
              <div className={`w-12 h-12 ${gem.color} rounded-full mx-auto mb-2 shadow-lg`} />
              <h4 className="font-semibold text-sm mb-1">{gem.type}</h4>
              <p className="text-xs opacity-80">{gem.meaning}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Circular Product Cards */}
      <section className="container mx-auto px-4 pb-16">
        <FilterBar
          onSearchChange={setSearchTerm}
          onSortChange={setSortBy}
          onPriceRangeChange={setPriceRange}
          priceRange={priceRange}
          maxPrice={maxPrice}
        />
        
        <h2 className="text-3xl font-serif font-bold text-white text-center mb-12">
          Our Gemstone Collection
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ rotate: 3, scale: 1.05 }}
              className="group"
            >
              <div className="relative">
                {/* Rotating circular glow */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 glow-gems rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <ProductCard {...product} index={index} />
              </div>
              {product.gemType && (
                <div className="mt-3 text-center">
                  <span className="inline-block px-4 py-2 gems-gradient text-white text-sm font-semibold rounded-full shadow-lg">
                    {product.gemType}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer with Gems Theme */}
      <div className="border-t border-white/20 bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 backdrop-blur-md py-8">
        <div className="container mx-auto px-4 text-center text-white/80">
          <p className="text-sm">Natural gemstones • Ethically sourced • Certified authentic</p>
        </div>
      </div>
    </div>
  );
};

export default Gems;
