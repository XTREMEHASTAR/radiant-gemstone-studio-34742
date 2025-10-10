import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Lock, Truck, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "@/components/Breadcrumb";
import { toast } from "sonner";
import { useState } from "react";

const Cart = () => {
  const cart = useCart();
  const items = cart.items;
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  
  const subtotal = cart.getTotalPrice();
  const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 500) : 0;
  const tax = subtotal * 0.03;
  const total = subtotal + shipping + tax - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      toast.success("Promo code applied!", {
        description: `You saved ₹${discountAmount.toLocaleString()}`,
      });
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...", {
      description: "You will be redirected to payment gateway.",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
        <div className="container mx-auto px-4 py-16">
          <Breadcrumb />
          <div className="max-w-md mx-auto text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground/30" />
            <h2 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Start adding beautiful jewelry pieces to your cart
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
          <Breadcrumb />
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground mb-8">{items.length} items in your cart</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-4 shadow-sm border border-border/50"
                >
                  <div className="flex gap-4">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-serif font-bold text-lg mb-1 hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <Badge variant="secondary" className="mb-2">
                        {item.category}
                      </Badge>
                      <p className="text-xl font-serif font-bold text-primary">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => cart.removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-2 border border-border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-xl p-6 shadow-elegant border border-border/50 sticky top-24"
              >
                <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (3%)</span>
                    <span className="font-medium">₹{tax.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span className="font-serif font-bold">Total</span>
                    <span className="font-serif font-bold text-primary">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Input 
                    placeholder="Enter Promo Code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" className="w-full" onClick={handleApplyPromo}>
                    Apply Code
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Try code: <span className="font-semibold">SAVE10</span> for 10% off
                  </p>
                </div>

                <Button className="w-full gap-2 mb-3" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>

                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span className="text-muted-foreground">Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span className="text-muted-foreground">
                      {shipping === 0 ? "Free shipping on this order" : "Free shipping on orders over ₹5,000"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <RotateCcw className="h-4 w-4 text-purple-600" />
                    <span className="text-muted-foreground">30-day return policy</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <Card className="p-6">
              <h3 className="font-serif text-lg font-bold mb-4 text-center">Why Buy From Us</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Secure Payment</h4>
                  <p className="text-sm text-muted-foreground">256-bit SSL encryption</p>
                </div>
                <div>
                  <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Fast Delivery</h4>
                  <p className="text-sm text-muted-foreground">Express shipping available</p>
                </div>
                <div>
                  <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Easy Returns</h4>
                  <p className="text-muted-foreground text-sm">30-day money back</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
