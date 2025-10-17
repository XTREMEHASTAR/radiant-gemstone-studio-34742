import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PushNotifications = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    if ("Notification" in window && Notification.permission === "granted") {
      setIsSubscribed(true);
    }
  };

  const subscribeToPush = async () => {
    setLoading(true);
    try {
      if (!("Notification" in window)) {
        throw new Error("Browser doesn't support notifications");
      }

      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          toast({
            title: "Notifications enabled",
            description: "You'll receive updates about new arrivals and offers",
          });
        }
        setIsSubscribed(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enable notifications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isSubscribed ? "ghost" : "ghost"}
      size="icon"
      onClick={subscribeToPush}
      disabled={loading || isSubscribed}
      className="hover:scale-110 transition-transform"
    >
      {isSubscribed ? (
        <Bell className="h-5 w-5" />
      ) : (
        <BellOff className="h-5 w-5" />
      )}
    </Button>
  );
};
