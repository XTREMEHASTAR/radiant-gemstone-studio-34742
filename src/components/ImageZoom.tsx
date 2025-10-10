import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageZoomProps {
  images: string[];
  productName: string;
  selectedIndex: number;
}

export const ImageZoom = ({ images, productName, selectedIndex }: ImageZoomProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const openZoom = () => {
    setCurrentIndex(selectedIndex);
    setIsOpen(true);
  };

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-4 right-4 z-10 shadow-lg"
        onClick={openZoom}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg"
            onClick={() => setIsOpen(false)}
          >
            <div className="container mx-auto h-full flex items-center justify-center p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>

              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[currentIndex]}
                  alt={`${productName} ${currentIndex + 1}`}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                
                {images.length > 1 && (
                  <div className="flex justify-center gap-3 mt-6">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentIndex === idx
                            ? "border-primary scale-110"
                            : "border-border opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
