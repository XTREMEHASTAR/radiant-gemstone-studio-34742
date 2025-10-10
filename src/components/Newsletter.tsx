import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Successfully subscribed!", {
        description: "You'll receive our latest updates and exclusive offers.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl luxury-gradient text-white p-12">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Stay Updated with Exclusive Offers
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new collections,
                special discounts, and jewelry care tips.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                />
                <Button type="submit" variant="secondary" className="whitespace-nowrap">
                  Subscribe Now
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
