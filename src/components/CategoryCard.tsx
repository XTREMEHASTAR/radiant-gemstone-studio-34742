import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  gradient: string;
  index: number;
  icon?: string;
}

const CategoryCard = ({ title, description, image, link, gradient, index, icon }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={link} className="group block">
        <div className="relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-elegant)] hover-lift border border-border/50">
          {/* Image with Overlay */}
          <div className="relative h-72 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className={`absolute inset-0 ${gradient} opacity-40 group-hover:opacity-50 transition-opacity duration-500`} />
            
            {/* Icon Badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">{icon || "💎"}</span>
            </div>

            {/* Sparkle Effect */}
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 bg-gradient-to-b from-card to-card/80">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <Badge variant="secondary" className="text-xs">Premium</Badge>
            </div>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                <span className="text-sm">Explore Collection</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View All →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
