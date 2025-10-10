import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from './ProductCard';
import { getProductById } from '@/data/products';

export const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const loadRecentlyViewed = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('recently_viewed')
        .select('product_id')
        .eq('user_id', user.id)
        .order('viewed_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      const products = data
        ?.map(item => getProductById(item.product_id))
        .filter(Boolean) || [];

      setRecentProducts(products);
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    }
  };

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProducts.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const trackProductView = async (productId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('recently_viewed').insert({
      user_id: user.id,
      product_id: productId,
    });
  } catch (error) {
    console.error('Error tracking view:', error);
  }
};