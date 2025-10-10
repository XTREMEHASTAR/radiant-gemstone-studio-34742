import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export const AIRecommendations = ({ currentProductId, category }: { currentProductId: string; category: string }) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('ai-recommendations', {
          body: { 
            type: 'recommend',
            productId: currentProductId, 
            category 
          }
        });

        if (!error && data?.recommendations) {
          setRecommendations(data.recommendations);
        }
      } catch (err) {
        console.error('Error fetching AI recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentProductId, category]);

  if (loading) {
    return (
      <div className="py-12">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <h2 className="text-2xl font-serif font-bold">AI-Powered Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-muted h-80 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="py-12">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-serif font-bold">You Might Also Love</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((product, index) => (
          <ProductCard key={product.id} {...product} index={index} />
        ))}
      </div>
    </div>
  );
};
