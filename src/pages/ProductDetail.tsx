import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, ArrowLeft, Share2, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductById, getAllProducts } from "@/data/products";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useCompare } from "@/components/CompareProducts";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { CustomerReviews } from "@/components/CustomerReviews";
import { RelatedProducts } from "@/components/RelatedProducts";
import { ImageZoom } from "@/components/ImageZoom";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Product3DViewer } from "@/components/Product3DViewer";
import { CustomDesignStudio } from "@/components/CustomDesignStudio";
import { VirtualTryOn } from "@/components/VirtualTryOn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SmartReviews } from "@/components/SmartReviews";
import { trackProductView } from "@/components/RecentlyViewed";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const wishlist = useWishlist();
  const cart = useCart();
  const compare = useCompare();
  const product = id ? getProductById(id) : null;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Track product view
    if (product) {
      trackProductView(product.id);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.isInWishlist(product.id);
  const images = [product.image, product.image, product.image]; // Mock multiple images

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      cart.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
    toast.success("Added to cart!", {
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      wishlist.removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      wishlist.addToWishlist(product.id);
      toast.success("Added to wishlist!");
    }
  };

  const handleAddToCompare = () => {
    compare.addProduct(product);
    toast.success("Added to compare!", {
      description: `${product.name} added to comparison.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-8">
              <div className="relative overflow-hidden rounded-2xl bg-card shadow-elegant mb-4">
                <ImageZoom
                  images={images}
                  productName={product.name}
                  selectedIndex={selectedImage}
                />
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {product.badge && (
                  <Badge className="absolute top-4 right-4 luxury-gradient uppercase">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary shadow-glow"
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
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? "fill-primary text-primary" : "fill-muted text-muted"
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground">(4.0 rating)</span>
              </div>
              <p className="text-3xl font-serif font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Exquisite {product.category} jewelry piece crafted with precision and elegance.
                This stunning {product.name} features premium materials and timeless design,
                perfect for special occasions or everyday luxury. Each piece is carefully
                inspected to ensure the highest quality standards.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Material</p>
                <p className="font-medium capitalize">{product.category}</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Availability</p>
                <p className="font-medium text-green-600">In Stock</p>
              </div>
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                Add {quantity} to Cart - ₹{(product.price * quantity).toLocaleString()}
              </Button>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={handleToggleWishlist}
                >
                  <Heart
                    className={`h-5 w-5 ${isInWishlist ? "fill-primary text-primary" : ""}`}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={handleAddToCompare}
                >
                  Compare
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 rounded-xl luxury-gradient text-white">
              <h4 className="font-serif text-lg mb-2">Free Shipping</h4>
              <p className="text-sm opacity-90">
                Get free delivery on all orders. Express shipping available.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Advanced Features Tabs */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-2">Experience Advanced Features</h2>
            <p className="text-muted-foreground">Try our cutting-edge shopping technology</p>
          </div>
          
          <Tabs defaultValue="tryon" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto p-2">
              <TabsTrigger value="tryon" className="flex-col h-auto py-3 gap-1">
                <span className="text-2xl">📸</span>
                <span className="text-sm font-medium">Virtual Try-On</span>
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex-col h-auto py-3 gap-1">
                <span className="text-2xl">🎨</span>
                <span className="text-sm font-medium">Custom Design</span>
              </TabsTrigger>
              <TabsTrigger value="3d" className="flex-col h-auto py-3 gap-1">
                <span className="text-2xl">🔄</span>
                <span className="text-sm font-medium">360° View</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-col h-auto py-3 gap-1">
                <span className="text-2xl">⭐</span>
                <span className="text-sm font-medium">Reviews</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tryon" className="mt-6">
              <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border-2 border-primary/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-serif font-bold mb-2">Try Before You Buy</h3>
                  <p className="text-muted-foreground">Upload your photo or use your camera to see how this piece looks on you</p>
                </div>
                <VirtualTryOn 
                  productImage={product.image}
                  productName={product.name}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="mt-6">
              <div className="p-6 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-2xl border-2 border-primary/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-serif font-bold mb-2">Design Your Own</h3>
                  <p className="text-muted-foreground">Customize every detail to create your perfect piece</p>
                </div>
                <CustomDesignStudio 
                  baseProduct={{
                    id: product.id,
                    name: product.name,
                    category: product.category
                  }}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="3d" className="mt-6">
              <Product3DViewer productName={product.name} />
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <SmartReviews productId={product.id} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="max-w-6xl mx-auto mt-12">
          <RelatedProducts
            currentProductId={product.id}
            category={product.category}
            products={getAllProducts()}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
