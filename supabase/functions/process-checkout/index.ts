import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const {
      cartItems,
      shippingAddress,
      billingAddress,
      paymentMethod,
      discountCode,
      notes
    } = await req.json();

    // Calculate totals
    const subtotal = cartItems.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    );
    
    let discountAmount = 0;
    if (discountCode) {
      const { data: discount } = await supabaseClient
        .from('discount_codes')
        .select('*')
        .eq('code', discountCode)
        .single();
      
      if (discount && (!discount.valid_until || new Date(discount.valid_until) > new Date())) {
        if (!discount.max_uses || discount.used_count < discount.max_uses) {
          if (!discount.min_purchase || subtotal >= discount.min_purchase) {
            discountAmount = (subtotal * discount.discount_percent) / 100;
            
            // Update discount usage
            await supabaseClient
              .from('discount_codes')
              .update({ used_count: discount.used_count + 1 })
              .eq('id', discount.id);
          }
        }
      }
    }

    const taxAmount = (subtotal - discountAmount) * 0.18; // 18% GST
    const shippingAmount = subtotal > 50000 ? 0 : 500; // Free shipping over ₹50,000
    const totalAmount = subtotal - discountAmount + taxAmount + shippingAmount;

    // Generate order number
    const orderNumber = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create order
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        status: 'pending',
        total_amount: totalAmount,
        subtotal,
        tax_amount: taxAmount,
        shipping_amount: shippingAmount,
        discount_amount: discountAmount,
        discount_code: discountCode || null,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        notes: notes || null
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    }));

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Create payment record
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        order_id: order.id,
        user_id: user.id,
        amount: totalAmount,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'completed',
        transaction_id: paymentMethod === 'cod' ? null : `TXN${Date.now()}`
      })
      .select()
      .single();

    if (paymentError) throw paymentError;

    // Create notification
    await supabaseClient
      .from('notifications')
      .insert({
        user_id: user.id,
        title: 'Order Confirmed',
        message: `Your order ${orderNumber} has been placed successfully!`,
        type: 'order',
        link: `/account?tab=orders`
      });

    // Update loyalty points
    const pointsToAdd = Math.floor(totalAmount / 100); // 1 point per ₹100
    const { data: existingPoints } = await supabaseClient
      .from('loyalty_points')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (existingPoints) {
      const newPoints = existingPoints.points + pointsToAdd;
      let newTier = existingPoints.tier;
      
      if (newPoints >= 10000) newTier = 'platinum';
      else if (newPoints >= 5000) newTier = 'gold';
      else if (newPoints >= 1000) newTier = 'silver';
      else newTier = 'bronze';

      await supabaseClient
        .from('loyalty_points')
        .update({ 
          points: newPoints,
          tier: newTier
        })
        .eq('user_id', user.id);
    } else {
      await supabaseClient
        .from('loyalty_points')
        .insert({
          user_id: user.id,
          points: pointsToAdd,
          tier: 'bronze'
        });
    }

    // Clear user's saved cart
    await supabaseClient
      .from('saved_carts')
      .delete()
      .eq('user_id', user.id);

    return new Response(
      JSON.stringify({
        success: true,
        order,
        payment,
        orderNumber,
        pointsEarned: pointsToAdd
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});