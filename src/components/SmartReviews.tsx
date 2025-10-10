import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Sparkles, ThumbsUp, Star, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SmartReviewsProps {
  productId: string;
}

export const SmartReviews = ({ productId }: SmartReviewsProps) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
      generateAISummary(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAISummary = (reviewData: any[]) => {
    if (reviewData.length === 0) return;

    // Calculate statistics
    const avgRating = reviewData.reduce((sum, r) => sum + r.rating, 0) / reviewData.length;
    const ratingCounts = reviewData.reduce((acc, r) => {
      acc[r.rating] = (acc[r.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // Extract common themes (simple keyword analysis)
    const allComments = reviewData.map(r => r.comment.toLowerCase()).join(' ');
    const positiveKeywords = ['beautiful', 'excellent', 'perfect', 'love', 'stunning', 'gorgeous', 'amazing'];
    const negativeKeywords = ['disappointed', 'poor', 'bad', 'worst', 'terrible', 'waste'];
    
    const positives = positiveKeywords.filter(word => allComments.includes(word));
    const negatives = negativeKeywords.filter(word => allComments.includes(word));

    // Most helpful review
    const mostHelpful = reviewData.reduce((max, r) => 
      r.helpful_count > (max?.helpful_count || 0) ? r : max
    , null);

    setAiSummary({
      avgRating: avgRating.toFixed(1),
      totalReviews: reviewData.length,
      ratingCounts,
      positives,
      negatives,
      mostHelpful,
      verifiedPurchasePercent: Math.round(
        (reviewData.filter(r => r.verified_purchase).length / reviewData.length) * 100
      ),
    });
  };

  const markHelpful = async (reviewId: string) => {
    try {
      const review = reviews.find(r => r.id === reviewId);
      if (!review) return;

      const { error } = await supabase
        .from('product_reviews')
        .update({ helpful_count: review.helpful_count + 1 })
        .eq('id', reviewId);

      if (error) throw error;
      loadReviews();
    } catch (error) {
      console.error('Error marking helpful:', error);
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="space-y-6">
      {aiSummary && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Review Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="text-2xl font-bold">{aiSummary.avgRating}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {aiSummary.totalReviews} reviews
                </p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{aiSummary.verifiedPurchasePercent}%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Verified purchases
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = aiSummary.ratingCounts[rating] || 0;
                const percentage = (count / aiSummary.totalReviews) * 100;
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-12">{rating} star</span>
                    <Progress value={percentage} className="flex-1" />
                    <span className="text-sm w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>

            {aiSummary.positives.length > 0 && (
              <div>
                <p className="font-medium mb-2">Common Praise:</p>
                <div className="flex flex-wrap gap-2">
                  {aiSummary.positives.map((word: string) => (
                    <Badge key={word} variant="secondary" className="capitalize">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {aiSummary.negatives.length > 0 && (
              <div>
                <p className="font-medium mb-2">Areas for Improvement:</p>
                <div className="flex flex-wrap gap-2">
                  {aiSummary.negatives.map((word: string) => (
                    <Badge key={word} variant="outline" className="capitalize">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {aiSummary.mostHelpful && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-base">Most Helpful Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < aiSummary.mostHelpful.rating
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                    {aiSummary.mostHelpful.verified_purchase && (
                      <Badge variant="secondary">Verified Purchase</Badge>
                    )}
                  </div>
                  <p className="font-medium mb-1">{aiSummary.mostHelpful.title}</p>
                  <p className="text-sm text-muted-foreground">{aiSummary.mostHelpful.comment}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">{aiSummary.mostHelpful.helpful_count} found this helpful</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">All Reviews</h3>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-primary text-primary'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                  {review.verified_purchase && (
                    <Badge variant="secondary">Verified Purchase</Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{review.comment}</p>
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Review ${idx + 1}`}
                      className="h-20 w-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => markHelpful(review.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Helpful ({review.helpful_count})
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};