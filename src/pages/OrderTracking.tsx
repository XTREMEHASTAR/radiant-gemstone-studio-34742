import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle, Clock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq("id", orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "processing":
        return <Package className="w-5 h-5" />;
      case "shipped":
        return <Truck className="w-5 h-5" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const statusSteps = [
    { key: "pending", label: "Order Placed" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Order not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex((step) => step.key === order.status);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-serif">Track Your Order</h1>
        <p className="text-muted-foreground">Order #{order.order_number}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex justify-between mb-12">
              {statusSteps.map((step, index) => (
                <div key={step.key} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index <= currentStepIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {getStatusIcon(step.key)}
                  </div>
                  <p className="text-sm mt-2 text-center">{step.label}</p>
                  {step.key === order.status && (
                    <Badge className="mt-2">Current</Badge>
                  )}
                </div>
              ))}
            </div>
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted -z-10">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {order.tracking_number && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Tracking Number</p>
              <p className="font-mono text-lg">{order.tracking_number}</p>
            </div>
          )}

          {order.estimated_delivery && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="text-lg">
                {new Date(order.estimated_delivery).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.order_items?.map((item: any) => (
              <div key={item.id} className="flex gap-4 items-center">
                <img
                  src={item.products.image}
                  alt={item.products.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.products.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">₹{item.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {order.packaging_type === "luxury" && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Luxury Packaging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your order will arrive in our signature luxury packaging with premium gift wrapping,
              authenticity certificate, and care instructions.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
