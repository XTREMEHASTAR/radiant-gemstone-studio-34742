import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { CustomerManagement } from "@/components/admin/CustomerManagement";
import { AnalyticsPanel } from "@/components/admin/AnalyticsPanel";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
    avgRating: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
    loadStats();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/";
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roles) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      window.location.href = "/";
    }
  };

  const loadStats = async () => {
    try {
      const [ordersRes, productsRes, customersRes, reviewsRes] = await Promise.all([
        supabase.from("orders").select("total_amount"),
        supabase.from("products").select("id"),
        supabase.from("profiles").select("id"),
        supabase.from("product_reviews").select("rating"),
      ]);

      const totalRevenue = ordersRes.data?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const avgRating =
        reviewsRes.data?.reduce((sum, review) => sum + review.rating, 0) / (reviewsRes.data?.length || 1) || 0;

      setStats({
        totalOrders: ordersRes.data?.length || 0,
        totalRevenue,
        totalProducts: productsRes.data?.length || 0,
        totalCustomers: customersRes.data?.length || 0,
        avgRating,
      });
    } catch (error: any) {
      toast({
        title: "Error loading stats",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-blue-500",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-purple-500",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "text-orange-500",
    },
    {
      title: "Avg Rating",
      value: stats.avgRating.toFixed(1),
      icon: Star,
      color: "text-yellow-500",
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your e-commerce platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="orders">
          <OrderManagement />
        </TabsContent>

        <TabsContent value="customers">
          <CustomerManagement />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
