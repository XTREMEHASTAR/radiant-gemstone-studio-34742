import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { Sparkles, TrendingUp, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/FilterBar";
import { LiveMetalRates } from "@/components/LiveMetalRates";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Gold = () => {
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  // Fetch products from database
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products', 'gold'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'gold');
      
      if (error) throw error;
      return data;
    },
  });

  const maxPrice = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.price)) : 100000;

  const highlightRandom = () => {
    if (allProducts.length > 0) {
      const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
      setHighlightedProduct(randomProduct.id);
      setTimeout(() => setHighlightedProduct(null), 3000);
    }
  };

  // Filter and sort products
  const filteredProducts = (() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
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

    return filtered;
  })();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-gray-900 dark:via-yellow-900/10 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-16 h-16 text-amber-500 animate-pulse mx-auto mb-4" />
          <p className="text-xl font-serif">Loading gold collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-gray-900 dark:via-yellow-900/10 dark:to-gray-900">
      {/* Hero Section with Golden Theme */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-radial from-white/40 to-transparent blur-3xl" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-radial from-white/60 to-transparent blur-2xl" />
        </div>
        
        {/* Animated golden particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full blur-sm"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: -20,
                opacity: 0 
              }}
              animate={{
                y: '100vh',
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
            <motion.div
              className="w-32 h-32 mx-auto mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-gradient-radial from-white/50 to-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center">
                <Crown className="w-16 h-16 text-amber-100" />
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 text-white drop-shadow-2xl">
              Gold Collection
            </h1>
            <p className="text-2xl text-white/90 max-w-2xl mx-auto font-light tracking-wide mb-8 drop-shadow-lg">
              Rich Golden Luxury — Timeless Treasures in Pure Gold
            </p>
            
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 30px rgba(255, 255, 255, 0.3)",
                  "0 0 60px rgba(255, 255, 255, 0.6)",
                  "0 0 30px rgba(255, 255, 255, 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-40 h-1 bg-white/80 mx-auto rounded-full"
            />
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Live Metal Rates */}
        <section className="py-12 -mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LiveMetalRates />
          </motion.div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">
                Explore Our Gold Jewelry
              </h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {filteredProducts.length} of {allProducts.length} pieces available
              </p>
            </div>
            
            <Button
              onClick={highlightRandom}
              variant="outline"
              className="gap-2 border-amber-500/50 hover:bg-amber-500/10"
            >
              <Sparkles className="h-4 w-4" />
              Surprise Me
            </Button>
          </div>

          {/* Filter Bar */}
          <FilterBar
            onSearchChange={setSearchTerm}
            onSortChange={setSortBy}
            onPriceRangeChange={setPriceRange}
            priceRange={priceRange}
            maxPrice={maxPrice}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className={`${
                  highlightedProduct === product.id
                    ? "ring-4 ring-primary shadow-[0_0_50px_rgba(251,191,36,0.6)]"
                    : ""
                } rounded-2xl transition-all duration-500`}
              >
                <ProductCard {...product} index={index} />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl text-muted-foreground">No products match your filters</p>
              <Button onClick={() => {
                setSearchTerm('');
                setPriceRange([0, maxPrice]);
                setSortBy('featured');
              }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Footer with Gold Theme */}
      <div className="border-t border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-yellow-500/5 to-amber-500/5 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Certified Authenticity • Lifetime Warranty • Free Shipping
            <Sparkles className="h-4 w-4 text-amber-500" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gold;
