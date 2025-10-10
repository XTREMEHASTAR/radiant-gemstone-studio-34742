import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LivePrice {
  metal: string;
  price: number;
  change: number;
  lastUpdate: string;
}

export const LivePriceIndicator = ({ metal = 'gold' }: { metal?: string }) => {
  const [priceData, setPriceData] = useState<LivePrice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('live-metal-prices', {
          body: { metal }
        });

        if (!error && data) {
          setPriceData(data);
        }
      } catch (err) {
        console.error('Error fetching live prices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [metal]);

  if (loading || !priceData) return null;

  const isPositive = priceData.change >= 0;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border text-sm">
      <span className="font-medium capitalize">{priceData.metal}</span>
      <span className="font-bold">${priceData.price.toFixed(2)}/g</span>
      <span className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {Math.abs(priceData.change).toFixed(2)}%
      </span>
    </div>
  );
};
