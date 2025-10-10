import { useState, useEffect } from 'react';
import { Star, ThumbsUp, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  created_at: string;
  helpful_count: number;
  verified_purchase: boolean;
  user_id: string;
}

export const ProductReviewsSection = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
    }
  });

  const submitReview = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }

    if (!title.trim() || !comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from('product_reviews').insert({
      product_id: productId,
      user_id: user.id,
      rating,
      title: title.trim(),
      comment: comment.trim()
    });

    if (error) {
      toast.error('Failed to submit review');
    } else {
      toast.success('Review submitted successfully!');
      setTitle('');
      setComment('');
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    }
    setIsSubmitting(false);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.round(Number(averageRating)) ? 'fill-primary text-primary' : 'text-muted'}`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold">{averageRating}</span>
          <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
        </div>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">Write a Review</h3>
        <div>
          <label className="text-sm font-medium">Rating</label>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${star <= rating ? 'fill-primary text-primary' : 'text-muted'}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sum up your experience"
            className="mt-2"
            maxLength={100}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Your Review</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            className="mt-2 min-h-[120px]"
            maxLength={1000}
          />
        </div>
        <Button onClick={submitReview} disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </Card>

      <div className="space-y-4">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    {review.verified_purchase && (
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold mt-2">{review.title}</h4>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
              <div className="flex items-center gap-4 pt-2">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful_count})
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
