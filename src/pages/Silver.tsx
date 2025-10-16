import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/FilterBar";
import { OccasionFilter } from "@/components/OccasionFilter";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Silver = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  // Fetch products from database
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products', 'silver'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'silver');
      
      if (error) throw error;
      return data;
    },
  });

  const maxPrice = useMemo(() => 
    allProducts.length > 0 ? Math.max(...allProducts.map(p => p.price)) : 50000, 
    [allProducts]
  );

  const products = useMemo(() => {
    let filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (!selectedOccasion || (Array.isArray(product.occasion) && product.occasion.includes(selectedOccasion as any)))
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
  }, [allProducts, searchTerm, sortBy, priceRange, selectedOccasion]);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('horizontal-scroll');
    if (container) {
      const scrollAmount = 400;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-serif">Loading silver collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      {/* Hero Section - Minimal Silver Theme */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-900 dark:to-gray-800">
        <div className="absolute inset-0 silver-gradient opacity-30" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600">
              Silver Collection
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
              Elegant Silver Grace — Modern Minimalism in Sterling
            </p>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Scrolling Product Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <OccasionFilter
            selectedOccasion={selectedOccasion}
            onOccasionChange={setSelectedOccasion}
          />
          
          <div className="mt-8">
            <FilterBar
              onSearchChange={setSearchTerm}
              onSortChange={setSortBy}
              onPriceRangeChange={setPriceRange}
              priceRange={priceRange}
              maxPrice={maxPrice}
            />
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold">Featured Silver Pieces</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => scroll('left')}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => scroll('right')}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Horizontal scroll container */}
          <div
            id="horizontal-scroll"
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {products.slice(0, 10).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-80"
              >
                <ProductCard {...product} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid View */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-serif font-bold mb-8">All Silver Jewelry</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProductCard {...product} index={index} />
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground">No products match your filters</p>
          </div>
        )}
      </section>

      {/* Footer with Silver Theme */}
      <div className="border-t border-gray-300 dark:border-gray-700 bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">Sterling silver • Hypoallergenic • Perfect for daily wear</p>
        </div>
      </div>
    </div>
  );
};

export default Silver;
