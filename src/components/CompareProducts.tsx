import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CompareStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  clearAll: () => void;
}

export const useCompare = create<CompareStore>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        const current = get().products;
        if (current.length >= 3) return;
        if (current.find((p) => p.id === product.id)) return;
        set({ products: [...current, product] });
      },
      removeProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) });
      },
      clearAll: () => set({ products: [] }),
    }),
    { name: "compare-storage" }
  )
);

export const CompareSheet = () => {
  const { products, removeProduct, clearAll } = useCompare();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Scale className="h-5 w-5" />
          {products.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {products.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Compare Products ({products.length}/3)</span>
            {products.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <AnimatePresence>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Scale className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products to compare</h3>
              <p className="text-sm text-muted-foreground">
                Add up to 3 products to compare features and prices
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {/* Product Cards */}
              <div className="grid gap-4">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <Link to={`/product/${product.id}`} className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${product.id}`}>
                        <h4 className="font-semibold hover:text-primary transition-colors">
                          {product.name}
                        </h4>
                      </Link>
                      <Badge variant="secondary" className="mt-1">
                        {product.category}
                      </Badge>
                      <p className="text-lg font-bold text-primary mt-2">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProduct(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Comparison Table */}
              {products.length > 1 && (
                <div className="border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left text-sm font-semibold">Feature</th>
                        {products.map((product) => (
                          <th key={product.id} className="p-3 text-sm font-semibold">
                            Product
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border">
                        <td className="p-3 text-sm font-medium">Price</td>
                        {products.map((product) => (
                          <td key={product.id} className="p-3 text-sm text-center">
                            ₹{product.price.toLocaleString()}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t border-border bg-muted/50">
                        <td className="p-3 text-sm font-medium">Category</td>
                        {products.map((product) => (
                          <td key={product.id} className="p-3 text-sm text-center capitalize">
                            {product.category}
                          </td>
                        ))}
                      </tr>
                      {products.some((p) => p.badge) && (
                        <tr className="border-t border-border">
                          <td className="p-3 text-sm font-medium">Badge</td>
                          {products.map((product) => (
                            <td key={product.id} className="p-3 text-sm text-center">
                              {product.badge ? (
                                <Badge variant="secondary" className="uppercase">
                                  {product.badge}
                                </Badge>
                              ) : (
                                "-"
                              )}
                            </td>
                          ))}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
};
