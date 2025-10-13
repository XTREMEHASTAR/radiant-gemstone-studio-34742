import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Bell, BellOff } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const PushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Notifications not supported in this browser');
      return;
    }

    setLoading(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        toast.success('Notifications enabled! You\'ll receive updates on new arrivals and offers.');
        
        // Save preference
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('user_preferences')
            .upsert([{
              user_id: user.id,
              notifications_enabled: true,
            }]);
        }
      } else {
        toast.error('Notification permission denied');
      }
    } catch (error) {
      console.error('Notification error:', error);
      toast.error('Failed to enable notifications');
    } finally {
      setLoading(false);
    }
  };

  const disableNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('user_preferences')
          .upsert([{
            user_id: user.id,
            notifications_enabled: false,
          }]);
      }
      toast.info('Notifications disabled');
    } catch (error) {
      console.error('Error disabling notifications:', error);
    }
  };

  if (!('Notification' in window)) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Push Notifications
        </CardTitle>
        <CardDescription>
          Stay updated with new arrivals, exclusive offers, and wishlist reminders
        </CardDescription>
      </CardHeader>
      <CardContent>
        {permission === 'granted' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <Bell className="h-5 w-5" />
              <span className="font-medium">Notifications Enabled</span>
            </div>
            <Button 
              variant="outline" 
              onClick={disableNotifications}
              className="w-full"
            >
              <BellOff className="h-4 w-4 mr-2" />
              Disable Notifications
            </Button>
          </div>
        ) : (
          <Button 
            onClick={requestPermission}
            disabled={loading || permission === 'denied'}
            className="w-full"
          >
            <Bell className="h-4 w-4 mr-2" />
            {permission === 'denied' ? 'Permission Denied' : 'Enable Notifications'}
          </Button>
        )}
        
        {permission === 'denied' && (
          <p className="text-xs text-muted-foreground mt-2">
            Please enable notifications in your browser settings
          </p>
        )}
      </CardContent>
    </Card>
  );
};