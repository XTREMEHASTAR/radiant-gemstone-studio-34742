import { motion } from "framer-motion";
import { Crown, Sparkles, Diamond, Gem } from "lucide-react";
import { EnhancedCategoryCard } from "./EnhancedCategoryCard";

const categories = [
  {
    id: "gold",
    title: "Gold",
    description: "Rich Golden Luxury",
    icon: Crown,
    gradient: "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600",
    shadowClass: "hover:shadow-[0_20px_60px_-10px_rgba(251,191,36,0.5)]",
    iconColor: "text-amber-100",
    link: "/gold",
  },
  {
    id: "silver",
    title: "Silver",
    description: "Elegant Silver Grace",
    icon: Sparkles,
    gradient: "bg-gradient-to-br from-slate-200 via-gray-100 to-slate-300",
    shadowClass: "hover:shadow-[0_20px_60px_-10px_rgba(148,163,184,0.5)]",
    iconColor: "text-slate-600",
    link: "/silver",
  },
  {
    id: "diamond",
    title: "Diamond",
    description: "Brilliant Diamond Radiance",
    icon: Diamond,
    gradient: "bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100",
    shadowClass: "hover:shadow-[0_20px_60px_-10px_rgba(56,189,248,0.5)]",
    iconColor: "text-blue-600",
    link: "/diamond",
  },
  {
    id: "gems",
    title: "Gems",
    description: "Vibrant Precious Stones",
    icon: Gem,
    gradient: "bg-gradient-to-br from-fuchsia-400 via-pink-500 to-purple-500",
    shadowClass: "hover:shadow-[0_20px_60px_-10px_rgba(236,72,153,0.5)]",
    iconColor: "text-pink-100",
    link: "/gems",
  },
];

export const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover exquisite pieces crafted with precision and passion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <EnhancedCategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              gradient={category.gradient}
              link={category.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};