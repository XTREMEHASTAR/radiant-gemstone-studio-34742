import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { RefreshCw, Save, TrendingUp } from 'lucide-react';

interface MetalPrice {
  id: string;
  metal_type: string;
  price_per_gram: number;
  currency: string;
  last_updated: string;
}

const METAL_NAMES: Record<string, string> = {
  'gold-24k': '24K Gold',
  'gold-22k': '22K Gold',
  'gold-18k': '18K Gold',
  'silver': 'Silver',
  'platinum': 'Platinum',
};

export const MetalPriceManagement = () => {
  const [prices, setPrices] = useState<MetalPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editedPrices, setEditedPrices] = useState<Record<string, number>>({});

  const loadPrices = async () => {
    try {
      const { data, error } = await supabase
        .from('metal_prices')
        .select('*')
        .eq('currency', 'INR')
        .order('metal_type');

      if (error) throw error;
      setPrices(data || []);
      
      // Initialize edited prices
      const initialPrices: Record<string, number> = {};
      data?.forEach(price => {
        initialPrices[price.id] = price.price_per_gram;
      });
      setEditedPrices(initialPrices);
    } catch (error) {
      console.error('Error loading prices:', error);
      toast.error('Failed to load metal prices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, []);

  const handlePriceChange = (id: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setEditedPrices(prev => ({ ...prev, [id]: numValue }));
    }
  };

  const handleSave = async (id: string) => {
    setSaving(id);
    try {
      const { error } = await supabase
        .from('metal_prices')
        .update({
          price_per_gram: editedPrices[id],
          last_updated: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Price updated successfully');
      await loadPrices();
    } catch (error) {
      console.error('Error updating price:', error);
      toast.error('Failed to update price');
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Metal Price Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prices.map((price) => (
            <div
              key={price.id}
              className="flex items-center gap-4 p-4 rounded-lg border bg-card"
            >
              <div className="flex-1">
                <Label htmlFor={`price-${price.id}`} className="text-base font-medium">
                  {METAL_NAMES[price.metal_type]}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Last updated: {new Date(price.last_updated).toLocaleString()}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">₹</span>
                  <Input
                    id={`price-${price.id}`}
                    type="number"
                    step="0.01"
                    value={editedPrices[price.id] || ''}
                    onChange={(e) => handlePriceChange(price.id, e.target.value)}
                    className="pl-8 w-32"
                  />
                </div>
                <span className="text-sm text-muted-foreground">/g</span>
                
                <Button
                  onClick={() => handleSave(price.id)}
                  disabled={saving === price.id || editedPrices[price.id] === price.price_per_gram}
                  size="sm"
                >
                  {saving === price.id ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Price changes will be reflected immediately across the entire platform. 
            All prices are per gram in INR.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
