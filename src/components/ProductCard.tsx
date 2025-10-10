import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  index: number;
}

const ProductCard = ({ id, name, price, image, description, index }: ProductCardProps) => {
  const wishlist = useWishlist();
  const cart = useCart();
  const isLiked = wishlist.isInWishlist(id);

  const toggleWishlist = () => {
    if (isLiked) {
      wishlist.removeFromWishlist(id);
      toast.success('Removed from wishlist');
    } else {
      wishlist.addToWishlist(id);
      toast.success('Added to wishlist ❤️');
    }
  };

  const handleAddToCart = () => {
    cart.addToCart({
      id,
      name,
      price,
      image,
      category: 'general',
    });
    toast.success("Added to cart!", {
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover-lift flex flex-col"
    >
      {/* Image */}
      <Link to={`/product/${id}`} className="relative aspect-square overflow-hidden bg-muted block">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleWishlist}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-lg z-10"
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isLiked ? "fill-primary text-primary" : "text-foreground/60"
            }`}
          />
        </motion.button>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <Link to={`/product/${id}`}>
          <h3 className="font-serif font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        
        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-serif font-bold text-primary">
              ₹{price.toLocaleString()}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/product/${id}`}>View</Link>
            </Button>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="luxury-gradient text-white hover:glow-gold transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
