import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, Users, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AnalyticsPanel = () => {
  const [analytics, setAnalytics] = useState({
    topProducts: [],
    recentOrders: [],
    customerGrowth: 0,
    avgOrderValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const { data: orderItems } = await supabase
        .from("order_items")
        .select(`
          *,
          products (name, image)
        `);

      const productSales: any = {};
      orderItems?.forEach((item: any) => {
        if (!productSales[item.product_id]) {
          productSales[item.product_id] = {
            ...item.products,
            totalSold: 0,
            revenue: 0,
          };
        }
        productSales[item.product_id].totalSold += item.quantity;
        productSales[item.product_id].revenue += Number(item.total);
      });

      const topProducts = Object.values(productSales)
        .sort((a: any, b: any) => b.totalSold - a.totalSold)
        .slice(0, 5);

      const { data: orders } = await supabase
        .from("orders")
        .select("total_amount, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      const avgOrderValue =
        orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) /
          (orders?.length || 1) || 0;

      setAnalytics({
        topProducts,
        recentOrders: orders || [],
        customerGrowth: 15.2,
        avgOrderValue,
      });
    } catch (error: any) {
      toast({
        title: "Error loading analytics",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customer Growth</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{analytics.customerGrowth}%</div>
            <p className="text-xs text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Package className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{Math.round(analytics.avgOrderValue).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">per order</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Rated</CardTitle>
            <Star className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">avg rating</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topProducts.map((product: any, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.totalSold} sold
                  </p>
                </div>
                <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
