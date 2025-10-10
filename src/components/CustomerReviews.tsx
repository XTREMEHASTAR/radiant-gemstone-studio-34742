import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const reviews = [
  {
    id: 1,
    author: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    rating: 5,
    date: "2 weeks ago",
    comment: "Absolutely stunning! The quality exceeded my expectations. Highly recommend!",
    verified: true,
  },
  {
    id: 2,
    author: "Rajesh Kumar",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    rating: 4,
    date: "1 month ago",
    comment: "Beautiful piece. The craftsmanship is excellent. Worth the price.",
    verified: true,
  },
  {
    id: 3,
    author: "Anita Desai",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita",
    rating: 5,
    date: "2 months ago",
    comment: "Gorgeous! Received so many compliments. Will definitely buy again.",
    verified: true,
  },
];

const ratingDistribution = [
  { stars: 5, count: 45, percentage: 75 },
  { stars: 4, count: 10, percentage: 17 },
  { stars: 3, count: 3, percentage: 5 },
  { stars: 2, count: 2, percentage: 3 },
  { stars: 1, count: 0, percentage: 0 },
];

export const CustomerReviews = () => {
  const [reviewText, setReviewText] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const averageRating = 4.6;
  const totalReviews = 60;

  const handleSubmitReview = () => {
    if (!reviewText || selectedRating === 0) {
      toast.error("Please select a rating and write a review");
      return;
    }
    toast.success("Review submitted!", {
      description: "Thank you for your feedback!",
    });
    setReviewText("");
    setSelectedRating(0);
  };

  return (
    <div className="mt-12 space-y-8">
      <div>
        <h2 className="text-3xl font-serif font-bold mb-6">Customer Reviews</h2>

        {/* Rating Summary */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center p-6 bg-card rounded-xl border border-border/50">
            <div className="text-5xl font-serif font-bold mb-2">{averageRating}</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {totalReviews} reviews
            </p>
          </div>

          <div className="md:col-span-2 space-y-2">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{dist.stars}</span>
                  <Star className="h-3 w-3 fill-primary text-primary" />
                </div>
                <Progress value={dist.percentage} className="flex-1" />
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {dist.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review */}
        <div className="p-6 bg-card rounded-xl border border-border/50 mb-8">
          <h3 className="text-xl font-serif font-bold mb-4">Write a Review</h3>
          <div className="space-y-4">
            <div>
              <Label>Your Rating</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    onMouseEnter={() => setHoverRating(rating)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        rating <= (hoverRating || selectedRating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="review">Your Review</Label>
              <Textarea
                id="review"
                placeholder="Share your experience with this product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
            <Button onClick={handleSubmitReview}>Submit Review</Button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 bg-card rounded-xl border border-border/50"
            >
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} alt={review.author} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{review.author}</h4>
                      {review.verified && (
                        <span className="text-xs text-green-600">Verified Purchase</span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
