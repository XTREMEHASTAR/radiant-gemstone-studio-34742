import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    rating: 5,
    text: "Absolutely stunning jewelry! The quality and craftsmanship are exceptional. I've been a loyal customer for years.",
    purchase: "Diamond Necklace",
  },
  {
    name: "Rajesh Kumar",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    rating: 5,
    text: "Bought my wife's wedding ring here. The staff was incredibly helpful and the selection is amazing. Highly recommend!",
    purchase: "Wedding Rings",
  },
  {
    name: "Anita Desai",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita",
    rating: 5,
    text: "The perfect place for traditional and modern jewelry. Every piece tells a story. Love their collection!",
    purchase: "Gold Earrings",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-card hover-lift"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <p className="text-sm text-primary font-medium">
                Purchased: {testimonial.purchase}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
