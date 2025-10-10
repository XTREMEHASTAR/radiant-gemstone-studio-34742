import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickView = ({ product, isOpen, onClose }: QuickViewProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [product.image, product.image, product.image];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Quick View</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Image Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-lg mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              <Badge className="absolute top-4 right-4 luxury-gradient">
                {product.category}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">{product.name}</h2>
              <p className="text-3xl font-serif font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-muted-foreground">
              Exquisite {product.category} jewelry piece crafted with precision and
              elegance. Perfect for special occasions or everyday luxury.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Material</p>
                <p className="font-medium capitalize">{product.category}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Availability</p>
                <p className="font-medium text-green-600">In Stock</p>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Button size="lg" className="w-full">
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={`/product/${product.id}`}>View Full Details</a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
