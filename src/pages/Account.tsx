import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { User, Settings, Heart, Package, LogOut, Bell, Award, MapPin } from "lucide-react";

const Account = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({ display_name: "", avatar_url: "" });
  const [orders, setOrders] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const activeTab = searchParams.get('tab') || 'profile';

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) {
        navigate("/");
        return;
      }

      setUser(currentUser);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          ),
          payments (*)
        `)
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (ordersData) setOrders(ordersData);

      // Fetch notifications
      const { data: notificationsData } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (notificationsData) setNotifications(notificationsData);

      // Fetch loyalty points
      const { data: pointsData } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (pointsData) setLoyaltyPoints(pointsData);

      setLoading(false);
    };
    fetchProfile();
  }, [navigate]);

  const updateProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        user_id: user.id,
        display_name: profile.display_name,
        avatar_url: profile.avatar_url,
      });

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: any = {
      pending: "bg-yellow-500",
      processing: "bg-blue-500",
      shipped: "bg-purple-500",
      delivered: "bg-green-500",
      cancelled: "bg-red-500",
      refunded: "bg-gray-500"
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Card className="glass-card mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl">
                    {user?.email?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{profile.display_name || "Guest User"}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                  {loyaltyPoints && (
                    <Badge className="mt-2 bg-gradient-to-r from-gold to-accent">
                      <Award className="h-3 w-3 mr-1" />
                      {loyaltyPoints.tier.toUpperCase()} - {loyaltyPoints.points} points
                    </Badge>
                  )}
                </div>
              </div>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={(v) => navigate(`/account?tab=${v}`)} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-4 w-full glass-card p-1">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="loyalty">
              <Award className="h-4 w-4 mr-2" />
              Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={profile.display_name}
                    onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input
                    id="avatarUrl"
                    value={profile.avatar_url}
                    onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <Button onClick={updateProfile} className="w-full btn-premium">
                  <Settings className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            {orders.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No orders yet</p>
                  <Button onClick={() => navigate("/")} className="mt-4">Start Shopping</Button>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="glass-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.order_number}</CardTitle>
                        <CardDescription>
                          {new Date(order.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {order.order_items?.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.products.image}
                              alt={item.products.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.products.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-semibold">₹{item.total.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center">
                      <span className="font-semibold">Total Amount</span>
                      <span className="text-xl font-bold">₹{order.total_amount.toLocaleString()}</span>
                    </div>
                    {order.shipping_address && (
                      <div className="border-t pt-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                          <div className="text-sm">
                            <p className="font-medium">{order.shipping_address.fullName}</p>
                            <p className="text-muted-foreground">
                              {order.shipping_address.addressLine1}, {order.shipping_address.city}
                            </p>
                            <p className="text-muted-foreground">
                              {order.shipping_address.state} - {order.shipping_address.pincode}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            {notifications.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="text-center py-12">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No notifications</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notif) => (
                <Card key={notif.id} className={`glass-card ${!notif.read ? 'border-primary' : ''}`}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{notif.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(notif.created_at).toLocaleString()}
                        </p>
                      </div>
                      {!notif.read && <Badge>New</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Loyalty Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                {loyaltyPoints ? (
                  <div className="text-center space-y-6">
                    <div>
                      <p className="text-5xl font-bold bg-gradient-to-r from-gold to-accent bg-clip-text text-transparent">
                        {loyaltyPoints.points}
                      </p>
                      <p className="text-muted-foreground mt-2">Total Points</p>
                    </div>
                    <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-gold to-accent">
                      {loyaltyPoints.tier.toUpperCase()} MEMBER
                    </Badge>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-4 border rounded-lg">
                        <p className="text-2xl font-bold">₹{(loyaltyPoints.points * 0.1).toFixed(0)}</p>
                        <p className="text-sm text-muted-foreground">Reward Value</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-2xl font-bold">{Math.floor(loyaltyPoints.points / 1000)}</p>
                        <p className="text-sm text-muted-foreground">Redeemable Vouchers</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-6">
                    Start shopping to earn loyalty points!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;