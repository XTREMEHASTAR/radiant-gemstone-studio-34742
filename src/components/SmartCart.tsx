import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useCart } from '@/hooks/useCart';
import { Tag, AlertCircle, Check, Gift, Truck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const SmartCart = () => {
  const cart = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  const subtotal = cart.getTotalPrice();
  const shipping = subtotal >= 10000 ? 0 : 250;
  const giftWrapFee = giftWrap ? 99 : 0;
  const discount = appliedCoupon 
    ? (subtotal * appliedCoupon.discount_percent) / 100
    : 0;
  const total = subtotal + shipping + giftWrapFee - discount;

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    setValidatingCoupon(true);
    try {
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast.error('Invalid coupon code');
        return;
      }

      // Check validity
      if (data.valid_until && new Date(data.valid_until) < new Date()) {
        toast.error('This coupon has expired');
        return;
      }

      if (data.max_uses && data.used_count >= data.max_uses) {
        toast.error('This coupon has reached its usage limit');
        return;
      }

      if (data.min_purchase && subtotal < data.min_purchase) {
        toast.error(`Minimum purchase of ₹${data.min_purchase} required`);
        return;
      }

      setAppliedCoupon(data);
      toast.success('Coupon applied successfully!');
    } catch (error) {
      console.error('Coupon validation error:', error);
      toast.error('Failed to validate coupon');
    } finally {
      setValidatingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.info('Coupon removed');
  };

  const saveCart = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to save cart');
        return;
      }

      const { error } = await supabase
        .from('saved_carts')
        .upsert([{
          user_id: user.id,
          cart_data: cart.items as any,
          coupon_code: appliedCoupon?.code,
          gift_wrap: giftWrap,
          gift_message: giftMessage,
        }]);

      if (error) throw error;
      toast.success('Cart saved!');
    } catch (error) {
      console.error('Save cart error:', error);
      toast.error('Failed to save cart');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Apply Coupon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!appliedCoupon ? (
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                disabled={validatingCoupon}
              />
              <Button 
                onClick={validateCoupon}
                disabled={validatingCoupon}
              >
                {validatingCoupon ? 'Validating...' : 'Apply'}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">{appliedCoupon.code}</p>
                  <p className="text-sm text-muted-foreground">
                    {appliedCoupon.discount_percent}% off
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeCoupon}>
                Remove
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium">Available Coupons:</p>
            <div className="space-y-2">
              <div className="p-2 border rounded flex justify-between items-center">
                <div>
                  <Badge variant="secondary">FIRST10</Badge>
                  <p className="text-xs text-muted-foreground mt-1">10% off first order</p>
                </div>
              </div>
              <div className="p-2 border rounded flex justify-between items-center">
                <div>
                  <Badge variant="secondary">SAVE500</Badge>
                  <p className="text-xs text-muted-foreground mt-1">₹500 off on orders above ₹5000</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Gift Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Add Gift Wrap</p>
              <p className="text-sm text-muted-foreground">Premium packaging with ribbon</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">₹99</span>
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="h-4 w-4"
              />
            </div>
          </div>

          {giftWrap && (
            <div>
              <label className="text-sm font-medium mb-2 block">Gift Message (Optional)</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={3}
                placeholder="Add a personal message..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {giftMessage.length}/200 characters
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          {shipping > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Shipping
              </span>
              <span>₹{shipping}</span>
            </div>
          )}

          {shipping === 0 && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <Check className="h-4 w-4" />
              Free shipping on orders above ₹10,000
            </div>
          )}

          {subtotal < 10000 && subtotal > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <AlertCircle className="h-4 w-4" />
              Add ₹{(10000 - subtotal).toLocaleString()} more for free shipping
            </div>
          )}

          {giftWrap && (
            <div className="flex justify-between">
              <span>Gift Wrap</span>
              <span>₹{giftWrapFee}</span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount.toLocaleString()}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <div className="space-y-2 pt-4">
            <Button className="w-full" size="lg" disabled={cart.items.length === 0}>
              Proceed to Checkout
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={saveCart}
              disabled={cart.items.length === 0}
            >
              Save Cart for Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};