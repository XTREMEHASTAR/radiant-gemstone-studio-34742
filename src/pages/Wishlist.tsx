import { motion } from "framer-motion";
import { useWishlist } from "@/hooks/useWishlist";
import { getProductById } from "@/data/products";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlist = useWishlist();
  const cart = useCart();

  const wishlistProducts = wishlist.items
    .map((item) => getProductById(item.productId))
    .filter((product) => product !== undefined);

  const handleAddToCart = (product: any) => {
    cart.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemove = (id: string) => {
    wishlist.removeFromWishlist(id);
    toast.info("Removed from wishlist");
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center">
            My Wishlist
          </h1>
          <div className="max-w-md mx-auto text-center py-16">
            <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground/30" />
            <h2 className="text-2xl font-serif font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Start adding your favorite jewelry pieces to your wishlist
            </p>
            <Button asChild size="lg">
              <Link to="/">Explore Collections</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">
              My Wishlist
            </h1>
            <div className="text-muted-foreground">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-elegant hover-lift"
              >
                <Link to={`/product/${product.id}`} className="block relative aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif font-bold text-xl mb-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-2xl font-serif font-bold text-primary mb-4">
                    ₹{product.price.toLocaleString()}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 gap-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemove(product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl luxury-gradient text-white text-center">
            <h3 className="text-2xl font-serif font-bold mb-2">
              Continue Shopping
            </h3>
            <p className="mb-6 opacity-90">
              Discover more beautiful jewelry pieces from our collections
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/">Browse Collections</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
